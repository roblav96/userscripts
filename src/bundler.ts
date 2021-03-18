import * as fs from 'https://deno.land/std/fs/mod.ts'
import * as path from 'https://deno.land/std/path/mod.ts'
import { DIRS } from './mod.ts'

export async function bundle(fpath: string) {
	console.info('bundle ->', fpath)
	let file = await Deno.open(fpath, { read: true })
	let fstat = await Deno.fstat(file.rid)
	if (!fstat.isFile) return

	let distpath = path.join(DIRS.dist, path.relative(DIRS.scripts, fpath))
	distpath = distpath.replace(/\.ts$/, '.user.js')
	let disturl = path.toFileUrl(distpath).toString()

	let fsource = await Deno.readTextFile(fpath)
	fsource = fsource.replace(
		'// ==/UserScript==',
		`// @downloadURL ${disturl}\n// ==/UserScript==`,
	)
	fsource = fsource.replace(
		'// ==/UserScript==',
		`// @version ${fstat.mtime?.valueOf()}\n// ==/UserScript==`,
	)

	let { files } = await Deno.emit(fpath, {
		sources: { [fpath]: fsource },
		// check: false,
		// bundle: 'esm',
		compilerOptions: {
			// allowUnreachableCode: true,
			// inlineSourceMap: true,
			// inlineSources: true,
			lib: ['dom', 'esnext'],
			removeComments: false,
			sourceMap: false,
		},
	})
	for (let [outurl, outsource] of Object.entries(files)) {
		outurl = outurl.replace(/\.ts\.js$/, '.user.js')
		let outpath = path.join(DIRS.dist, path.relative(DIRS.scripts, path.fromFileUrl(outurl)))
		await fs.ensureDir(path.dirname(outpath))
		await Deno.writeTextFile(outpath, outsource)
	}
}
