/// <reference lib='dom' />

import * as fs from 'https://deno.land/std/fs/mod.ts'
import * as http from 'https://deno.land/std/http/mod.ts'
import * as path from 'https://deno.land/std/path/mod.ts'

let dist = await Deno.emit(new URL('./rarbg.to/DebridsCached.ts', import.meta.url).href, {
	bundle: 'esm',
	compilerOptions: {
		inlineSourceMap: true,
		removeComments: false,
	}
})
console.log('dist ->', dist)
