import 'https://raw.githubusercontent.com/roblav96/futon-media-iptv/main/src/console.ts'

import 'https://deno.land/std/dotenv/load.ts'
import * as http from 'https://deno.land/std/http/mod.ts'
import { alldebrid } from './alldebrid.ts'
import { magnetDecode } from 'https://esm.sh/@ctrl/magnet-link?dev'
import { realdebrid } from './realdebrid.ts'

http.serve(
	async (request) => {
		const headers = new Headers({ 'Access-Control-Allow-Origin': '*' })
		if (request.method == 'OPTIONS') {
			return new Response(null, { headers })
		}
		try {
			let decoded = magnetDecode((await request.json()) as string)
			decoded.infoHash = decoded.infoHash?.toLowerCase()
			console.log(decoded.name)

			await Promise.allSettled([
				realdebrid(decoded),
				alldebrid(decoded),
				//
			])

			console.info(decoded.name)
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
