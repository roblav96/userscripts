// import 'https://raw.githubusercontent.com/roblav96/futon-media-iptv/main/src/console.ts'

import * as async from 'https://deno.land/std/async/mod.ts'
import * as fs from 'https://deno.land/std/fs/mod.ts'
import * as http from 'https://deno.land/std/http/mod.ts'
import * as path from 'https://deno.land/std/path/mod.ts'
import bundler from './bundler.ts'

export const ROOT = path.dirname(path.dirname(path.fromFileUrl(import.meta.url)))
export const SCRIPTS = path.join(ROOT, 'scripts')
export const DIST = path.join(ROOT, 'dist')

if (await fs.exists(DIST)) {
	await Deno.remove(DIST, { recursive: true })
}

for await (let entry of fs.walk(SCRIPTS, {
	exts: ['.ts'],
	includeDirs: false,
	skip: [/\.d\.ts$/],
})) {
	await bundler(entry.path)
}

const srcpaths = new Set<string>()
const debounce = async.debounce(async () => {
	for (let srcpath of srcpaths) {
		await bundler(srcpath)
	}
	srcpaths.clear()
}, 100)
for await (let event of Deno.watchFs(SCRIPTS)) {
	event.paths.forEach((v) => srcpaths.add(v))
	debounce()
}
