import * as fs from 'https://deno.land/std/fs/mod.ts'
import * as path from 'https://deno.land/std/path/mod.ts'
import { DIRS } from './mod.ts'

export async function bundle(fpath: string) {
	// console.info('bundle ->', fpath)
	let file = await Deno.open(fpath, { read: true })
	let fstat = await Deno.fstat(file.rid)
	if (!fstat.isFile) return

	let distpath = path.join(DIRS.dist, path.relative(DIRS.scripts, fpath))
	distpath = distpath.replace(/\.ts$/, '.user.js')

	let fsource = await Deno.readTextFile(fpath)
	fsource = fsource.replace(
		'// ==/UserScript==',
		`// @downloadURL ${path.toFileUrl(distpath).toString()}\n// ==/UserScript==`,
	)
	fsource = fsource.replace(
		'// ==/UserScript==',
		`// @version ${fstat.mtime?.valueOf()}\n// ==/UserScript==`,
	)
	let header = fsource.split('// ==UserScript==')[1].split('// ==/UserScript==')[0]
	header = `// ==UserScript==${header}// ==/UserScript==`

	let bundle = Deno.run({
		cmd: ['deno', 'bundle', '--unstable', '--no-check', fpath, distpath],
	})
	await bundle.status()
	bundle.close()
	await Deno.writeTextFile(distpath, `${header}\n\n${await Deno.readTextFile(distpath)}`)

	// let { files } = await Deno.emit(fpath, {
	// 	// sources: { [fpath]: fsource },
	// 	check: false,
	// 	bundle: 'esm',
	// 	compilerOptions: {
	// 		// allowUnreachableCode: true,
	// 		// inlineSourceMap: true,
	// 		// inlineSources: true,
	// 		// lib: ['dom', 'esnext'],
	// 		// removeComments: false,
	// 		// sourceMap: true,
	// 	},
	// })
	// for (let [outurl, outsource] of Object.entries(files)) {
	// 	// outurl = outurl.replace(/\.ts\.js$/, '.user.js')
	// 	// let outpath = path.join(DIRS.dist, path.relative(DIRS.scripts, path.fromFileUrl(outurl)))
	// 	await fs.ensureDir(path.dirname(distpath))
	// 	await Deno.writeTextFile(distpath, `${header}\n\n${outsource}`)
	// }
}
