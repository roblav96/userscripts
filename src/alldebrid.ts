import * as async from 'https://deno.land/std/async/mod.ts'
import axiod from 'https://deno.land/x/axiod/mod.ts'
import { assertExists } from 'https://deno.land/std/testing/asserts.ts'
import { MagnetData, magnetDecode, magnetEncode } from 'https://esm.sh/@ctrl/magnet-link?dev'

const ALLDEBRID_AGENT = Deno.env.get('ALLDEBRID_AGENT')!
assertExists(ALLDEBRID_AGENT, '!ALLDEBRID_AGENT')
const ALLDEBRID_KEY = Deno.env.get('ALLDEBRID_KEY')!
assertExists(ALLDEBRID_KEY, '!ALLDEBRID_KEY')

const client = axiod.create({
	baseURL: 'https://api.alldebrid.com/v4',
	params: { agent: ALLDEBRID_AGENT, apikey: ALLDEBRID_KEY },
})

export async function alldebrid(decoded: MagnetData) {
	let transfers = await client.get<MagnetsResponse<MagnetStatus>>('/magnet/status')
	let transfer = transfers.data.data.magnets.find((v) => v.hash.toLowerCase() == decoded.infoHash)
	if (transfer) {
		console.warn('[AD]', decoded.name)
		await client.get('/magnet/delete', { params: { id: transfer.id } })
	}

	let download = await client.post<MagnetsResponse<MagnetUpload>>(
		'/magnet/upload',
		new URLSearchParams({ 'magnets[]': magnetEncode(decoded) }),
	)

	if (!download.data.data.magnets[0].ready) {
		console.error('[AD]', decoded.name)
		await client.get('/magnet/delete', { params: { id: download.data.data.magnets[0].id } })
	} else {
		console.info('[AD]', decoded.name)
	}
}

interface MagnetsResponse<T> {
	data: {
		magnets: T[]
	}
	status: string
}
interface MagnetCache {
	hash: string
	instant: boolean
	magnet: string
	error: {
		code: string
		message: string
	}
}
interface MagnetStatus {
	completionDate: number
	downloaded: number
	downloadSpeed: number
	filename: string
	hash: string
	id: number
	links: MagnetLink[]
	notified: boolean
	processingPerc: number
	seeders: number
	size: number
	status: string
	statusCode: number
	type: string
	uploadDate: number
	uploaded: number
	uploadSpeed: number
	version: number
}
interface MagnetLink {
	filename: string
	files: string[]
	link: string
	size: number
}
interface MagnetUpload {
	filename_original: string
	hash: string
	id: number
	magnet: string
	name: string
	ready: boolean
	size: number
}
interface LinkUnlock {
	filename: string
	filesize: number
	host: string
	hostDomain: string
	id: string
	link: string
	paws: boolean
	streaming: any[]
	streams: LinkStream[]
}
interface LinkStream {
	ext: string
	filesize: number
	id: string
	link: string
	name: string
	quality: number
}
