import * as colors from 'https://deno.land/std/fmt/colors.ts'
import * as fs from 'https://deno.land/std/fs/mod.ts'
import * as path from 'https://deno.land/std/path/mod.ts'
import { bundle } from 'https://deno.land/x/emit/mod.ts'
import { DIST, SCRIPTS } from './mod.ts'

export async function bundler(srcpath: string) {
	// console.info('bundler ->', srcpath)

	let distpath = path.join(DIST, path.relative(SCRIPTS, srcpath))
	distpath = distpath.replace(/\.ts$/, '.user.js')
	await fs.ensureDir(path.dirname(distpath))

	let httpurl = distpath.replace(DIST, 'http://127.0.0.1:14023')
	let closer = '// ==/UserScript=='
	let lines = (await Deno.readTextFile(srcpath)).split('\n')
	lines = lines.slice(0, lines.indexOf(closer))
	lines.push(`// @downloadURL ${httpurl}`)
	lines.push(`// @version ${Date.now()}`)
	lines.push(closer)

	const result = await bundle(srcpath)
	await Deno.writeTextFile(distpath, `${lines.join('\n')}\n\n${result.code}`)

	console.log(`${colors.underline(httpurl)}\n`)
}
