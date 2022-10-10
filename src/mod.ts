// import 'https://raw.githubusercontent.com/roblav96/futon-media-iptv/main/src/console.ts'

import * as async from 'https://deno.land/std/async/mod.ts'
import * as fs from 'https://deno.land/std/fs/mod.ts'
import * as http from 'https://deno.land/std/http/mod.ts'
import * as path from 'https://deno.land/std/path/mod.ts'
import bundler from './bundler.ts'

export const DIRS = new (class {
	root = path.dirname(path.dirname(path.fromFileUrl(import.meta.url)))
	scripts = path.join(this.root, 'scripts')
	dist = path.join(this.root, 'dist')
})()

if (await fs.exists(DIRS.dist)) {
	await Deno.remove(DIRS.dist, { recursive: true })
}

for await (let entry of fs.walk(DIRS.scripts, { exts: ['.ts'], skip: [/\.d\.ts$/] })) {
	await bundler(entry.path)
}

const SRCPATHS = new Set<string>()
const debounce = async.debounce(async () => {
	let srcpaths = Array.from(SRCPATHS)
	SRCPATHS.clear()
	for (let srcpath of srcpaths) {
		await bundler(srcpath)
	}
}, 100)
for await (let { paths } of Deno.watchFs([DIRS.scripts])) {
	paths.forEach((v) => SRCPATHS.add(v))
	debounce()
}
