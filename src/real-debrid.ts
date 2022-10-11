import 'https://raw.githubusercontent.com/roblav96/futon-media-iptv/main/src/console.ts'
import 'https://deno.land/std/dotenv/load.ts'

import * as async from 'https://deno.land/std/async/mod.ts'
import * as http from 'https://deno.land/std/http/mod.ts'
import { magnetDecode } from 'https://esm.sh/@ctrl/magnet-link?dev'

http.serve(
	async (request) => {
		const headers = new Headers({ 'Access-Control-Allow-Origin': '*' })
		if (request.method == 'OPTIONS') {
			return new Response(null, { headers })
		}
		try {
			let magnet = (await request.json()) as string
			let decoded = magnetDecode(magnet)
			decoded.infoHash = decoded.infoHash?.toLowerCase()
			console.log(decoded.name)

			let transfers = (await (
				await fetch('https://api.real-debrid.com/rest/1.0/torrents', {
					headers: { authorization: `Bearer ${Deno.env.get('REALDEBRID_SECRET')}` },
				})
			).json()) as Transfer[]
			let transfer = transfers.find((v) => v.hash.toLowerCase() == decoded.infoHash)
			if (transfer) {
				console.info(decoded.name)
				return new Response(null, { headers })
			}

			let download = (await (
				await fetch('https://api.real-debrid.com/rest/1.0/torrents/addMagnet', {
					method: 'POST',
					headers: { authorization: `Bearer ${Deno.env.get('REALDEBRID_SECRET')}` },
					body: new URLSearchParams({ magnet }),
				})
			).json()) as Download
			await async.delay(3000)
			transfer = (await (
				await fetch(`https://api.real-debrid.com/rest/1.0/torrents/info/${download.id}`, {
					headers: { authorization: `Bearer ${Deno.env.get('REALDEBRID_SECRET')}` },
				})
			).json()) as Transfer

			let files = transfer.files.filter((v) => {
				if (v.path.toLowerCase().includes('rarbg.com.mp4')) return false
				return ['avi', '.mp4', '.mkv'].some((ext) => v.path.endsWith(ext))
			})
			await fetch(
				`https://api.real-debrid.com/rest/1.0/torrents/selectFiles/${transfer.id}`,
				{
					method: 'POST',
					headers: { authorization: `Bearer ${Deno.env.get('REALDEBRID_SECRET')}` },
					body: new URLSearchParams({ files: files.map((v) => v.id).join() }),
				},
			)

			console.info(decoded.name)
			return new Response(null, { headers })
		} catch (error) {
			console.error('http.serve request -> %O', error)
			return new Response(error.toString(), {
				headers,
				status: http.Status.InternalServerError,
			})
		}
	},
	{ hostname: '127.0.0.1', port: 15322 },
)

interface File {
	bytes: number
	id: number
	path: string
	selected: number
}

interface Transfer {
	added: string
	bytes: number
	filename: string
	files: File[]
	hash: string
	host: string
	id: string
	links: string[]
	progress: number
	seeders: number
	speed: number
	split: number
	status: string
}

interface Download {
	id: string
	uri: string
}
