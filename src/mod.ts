// import 'https://raw.githubusercontent.com/roblav96/jellyfin-debrids/main/src/devops/console.ts'

import * as async from 'https://deno.land/std/async/mod.ts'
import * as fs from 'https://deno.land/std/fs/mod.ts'
import * as http from 'https://deno.land/std/http/mod.ts'
import * as path from 'https://deno.land/std/path/mod.ts'
import { bundle } from './bundler.ts'

export const DIRS = new (class Dirs {
	root = path.dirname(path.dirname(path.fromFileUrl(import.meta.url)))
	scripts = path.join(this.root, 'scripts')
	dist = path.join(this.root, 'dist')
})()

for await (let entry of fs.walk(DIRS.scripts, { exts: ['.ts'], skip: [/\.d\.ts$/] })) {
	await bundle(entry.path)
}

for await (let fsevent of Deno.watchFs(DIRS.scripts)) {
	for (let fpath of fsevent.paths) {
		await bundle(fpath)
	}
}
