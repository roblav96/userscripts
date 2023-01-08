import 'https://raw.githubusercontent.com/roblav96/futon-media-iptv/main/src/console.ts'

import 'https://deno.land/std/dotenv/load.ts'
import * as async from 'https://deno.land/std/async/mod.ts'
import * as http from 'https://deno.land/std/http/mod.ts'
import { assertExists } from 'https://deno.land/std/testing/asserts.ts'
import { magnetDecode } from 'https://esm.sh/@ctrl/magnet-link?dev'

const REALDEBRID_SECRET = Deno.env.get('REALDEBRID_SECRET')!
assertExists(REALDEBRID_SECRET, '!REALDEBRID_SECRET')

const rdinit = {
	headers: { authorization: `Bearer ${REALDEBRID_SECRET}` },
} as RequestInit

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
				await fetch('https://api.real-debrid.com/rest/1.0/torrents?limit=999', rdinit)
			).json()) as Transfer[]
			let transfer = transfers.find((v) => v.hash.toLowerCase() == decoded.infoHash)
			if (transfer) {
				console.warn(decoded.name)
				await fetch(`https://api.real-debrid.com/rest/1.0/torrents/delete/${transfer.id}`, {
					...rdinit,
					method: 'DELETE',
				})
			}

			let download = (await (
				await fetch('https://api.real-debrid.com/rest/1.0/torrents/addMagnet', {
					...rdinit,
					method: 'POST',
					body: new URLSearchParams({ magnet }),
				})
			).json()) as Download
			console.log('download ->', download)
			for (let i = 0; i < 5; i++) {
				transfer = (await (
					await fetch(
						`https://api.real-debrid.com/rest/1.0/torrents/info/${download.id}`,
						rdinit,
					)
				).json()) as Transfer
				console.log('transfer ->', transfer)
				if (transfer.filename == 'Invalid Magnet') {
					break
				}
				if (transfer.status == 'magnet_error') {
					break
				}
				if (transfer.files.length > 0) {
					break
				}
				await async.delay(1000)
			}

			let files = (transfer?.files ?? []).filter((v) => {
				let path = v.path.toLowerCase()
				if (path.includes('rarbg.com.mp4')) return false
				if (path.includes('sample')) return false
				return ['avi', '.mp4', '.mkv'].some((ext) => v.path.endsWith(ext))
			})

			if (!transfer?.id || files.length == 0) {
				console.error(decoded.name)
				await fetch(`https://api.real-debrid.com/rest/1.0/torrents/delete/${download.id}`, {
					...rdinit,
					method: 'DELETE',
				}).catch(() => {})
			} else {
				await fetch(
					`https://api.real-debrid.com/rest/1.0/torrents/selectFiles/${transfer.id}`,
					{
						...rdinit,
						method: 'POST',
						body: new URLSearchParams({ files: files.map((v) => v.id).join() }),
					},
				)
				console.info(decoded.name)
			}

			return new Response(null, { headers })
		} catch (error) {
			console.error('http.serve request ->', error)
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
	original_bytes: number
	original_filename: string
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
