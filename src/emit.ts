import 'https://raw.githubusercontent.com/roblav96/futon-media-iptv/main/src/console.ts'

import * as async from 'https://deno.land/std/async/mod.ts'
import * as fs from 'https://deno.land/std/fs/mod.ts'
import * as http from 'https://deno.land/std/http/mod.ts'
import * as path from 'https://deno.land/std/path/mod.ts'
import { bundle } from 'https://deno.land/x/emit/mod.ts'

const ROOT = path.dirname(path.dirname(path.fromFileUrl(import.meta.url)))
const SCRIPTS = path.join(ROOT, 'scripts')
const DIST = path.join(ROOT, 'dist')

if (await fs.exists(DIST)) {
	await Deno.remove(DIST, { recursive: true })
	await Deno.mkdir(DIST)
}

for await (let entry of fs.walk(SCRIPTS, {
	exts: ['.ts'],
	includeDirs: false,
	skip: [/\.d\.ts$/],
})) {
	console.log('entry ->', entry)
	const result = await bundle(entry.path)
	console.log('result ->', result.code)
	// let distpath = path.join(DIST, path.relative(SCRIPTS, entry.path))
	// distpath = distpath.replace(/ts$/, 'user.js')
	// await fs.ensureDir(path.dirname(distpath))
}
