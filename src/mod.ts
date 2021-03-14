import * as fs from 'https://deno.land/std/fs/mod.ts'
import * as http from 'https://deno.land/std/http/mod.ts'
import * as path from 'https://deno.land/std/path/mod.ts'

let dist = await Deno.emit(new URL('./rarbg.to/DebridsCached.ts', import.meta.url).href, {
	// check: false,
	compilerOptions: {
		// allowUnreachableCode: true,
		inlineSourceMap: true,
		// inlineSources: true,
		lib: ['dom', 'esnext'],
		removeComments: false,
		sourceMap: false,
	}
})
console.log('dist ->', dist)
console.log('dist.files ->', JSON.stringify(dist.files, null, 4), JSON.stringify(dist.files, null, 4).length)
