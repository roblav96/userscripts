// ==UserScript==
// @name DebridsCached@rarbg.to
// @match https://rarbg.to/*
// @noframes
// ==/UserScript==

import type {} from '../../types/violentmonkey.d.ts'

// import * as shortcut from 'https://esm.sh/@violentmonkey/shortcut?dev'
// import onetime from 'https://esm.sh/onetime?dev'
// // import { StandardWebSocketClient } from 'https://deno.land/x/websocket/mod.ts'

function DebridsCached(event: Event) {
	console.log('readystatechange ->', `[${document.readyState}]`, event)
	// console.log('window ->', window)
	// console.log('onetime ->', onetime)
	// console.log('shortcut ->', shortcut)
	// DebridsCached()
	// if (document.readyState != 'complete') return
	// let ws = new StandardWebSocketClient('ws://127.0.0.1:13874')
	// console.log('ws ->', ws)
	// GM_setClipboard('idk')
}
document.addEventListener('readystatechange', DebridsCached, { once: true })
