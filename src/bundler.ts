import * as colors from 'https://deno.land/std/fmt/colors.ts'
import * as fs from 'https://deno.land/std/fs/mod.ts'
import * as path from 'https://deno.land/std/path/mod.ts'
import { DIRS } from './mod.ts'

export default async function bundler(srcpath: string) {
	// console.info('bundler ->', srcpath)

	let { isFile, mtime } = await Deno.stat(srcpath)
	if (!isFile || !mtime) {
		return
	}

	let distpath = path.join(DIRS.dist, path.relative(DIRS.scripts, srcpath))
	distpath = distpath.replace(/ts$/, 'user.js')
	await fs.ensureDir(path.dirname(distpath))

	let httpurl = distpath.replace(DIRS.dist, 'http://127.0.0.1:14023')
	let srctext = await Deno.readTextFile(srcpath)
	srctext = srctext.replace(
		'// ==/UserScript==',
		`// @downloadURL ${httpurl}\n// ==/UserScript==`,
		// `// @downloadURL ${path.toFileUrl(distpath).toString()}\n// ==/UserScript==`,
	)
	srctext = srctext.replace(
		'// ==/UserScript==',
		`// @version ${mtime.valueOf()}\n// ==/UserScript==`,
	)
	let header = srctext.split('// ==UserScript==')[1].split('// ==/UserScript==')[0]
	header = `// ==UserScript==${header}// ==/UserScript==`

	let bundle = Deno.run({
		cmd: ['deno', 'bundle', '--unstable', '--no-check', srcpath, distpath],
	})
	await bundle.status()
	bundle.close()

	await Deno.writeTextFile(distpath, `${header}\n\n${await Deno.readTextFile(distpath)}`)

	console.log(`${colors.underline(httpurl)}\n`)

	// let { files } = await Deno.emit(srcpath, {
	// 	// sources: { [srcpath]: srctext },
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
