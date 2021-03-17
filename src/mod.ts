import * as async from 'https://deno.land/std/async/mod.ts'
import * as fs from 'https://deno.land/std/fs/mod.ts'
import * as http from 'https://deno.land/std/http/mod.ts'
import * as path from 'https://deno.land/std/path/mod.ts'

// import * as scanner from 'https://deno.land/x/scanner/mod.ts'
// import { wait } from 'https://deno.land/x/wait/mod.ts'
// import { useThrottle } from 'https://deno.land/x/hyurl_utils/mod.ts'
// import { throttle } from 'https://esm.sh/functools?dev'
// console.log('throttle ->', throttle)

const DIRS = new (class Dirs {
	root = path.dirname(path.dirname(path.fromFileUrl(import.meta.url)))
	scripts = path.join(this.root, 'scripts')
	dist = path.join(this.root, 'dist')
})()

for await (let fsevent of Deno.watchFs(DIRS.scripts)) {
	console.log('fsevent ->', fsevent)
	for (let fpath of fsevent.paths) {
		let file = await Deno.open(fpath, { read: true })
		let fstat = await Deno.fstat(file.rid)
		if (!fstat.isFile) continue
		console.log('fstat ->', fstat)
		let fsource = await Deno.readTextFile(fpath)
		let distpath = path.join(DIRS.dist, path.relative(DIRS.scripts, fpath))
		distpath = distpath.replace(/\.ts$/, '.user')
		console.log('distpath ->', distpath)
		let disturl = path.toFileUrl(`${distpath}.js`).href
		console.log('disturl ->', disturl)
		fsource = fsource.replace('// @downloadURL', `// @downloadURL ${disturl}`)
		fsource = fsource.replace('// @version', `// @version ${fstat.mtime?.valueOf()}`)
		let dist = await Deno.emit(distpath, {
			sources: { [distpath]: fsource },
			// check: false,
			compilerOptions: {
				// allowUnreachableCode: true,
				// inlineSourceMap: true,
				// inlineSources: true,
				lib: ['dom', 'esnext'],
				removeComments: false,
				sourceMap: false,
			},
		})
		// console.log('dist ->', dist.files)
		console.log('dist.files ->', JSON.stringify(dist.files, null, 4))
		for (let [outpath, outsource] of Object.entries(dist.files)) {
			outpath = path.fromFileUrl(outpath)
			await fs.ensureDir(path.dirname(outpath))
			await Deno.writeTextFile(outpath, outsource)
		}
	}
}

async function onFsEvent(event: Deno.FsEvent) {}

// console.log('path.toFileUrl(Deno.cwd()) ->', path.toFileUrl(Deno.cwd()))

// console.log('dist ->', dist)
// console.log(
// 	'dist.files ->',
// 	JSON.stringify(dist.files, null, 4),
// 	JSON.stringify(dist.files, null, 4).length,
// )
