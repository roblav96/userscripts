// ==UserScript==
// @name DebridsCached@rarbg.to
// @namespace rarbg.to
// @match https://rarbg.to/*
// @run-at document-idle
// @inject-into content
// @noframes
// ==/UserScript==

// import { StandardWebSocketClient } from 'https://deno.land/x/websocket/mod.ts'
import onetime from 'https://esm.sh/onetime?dev'

const DebridsCached = onetime(() => {
	console.log('DebridsCached ->', DebridsCached.constructor)
})

document.addEventListener('readystatechange', (event) => {
	DebridsCached()
	if (document.readyState != 'complete') return
	console.warn('document.readyState ->', document.readyState)
	// let ws = new StandardWebSocketClient('ws://127.0.0.1:13874')
	// console.log('ws ->', ws)
	// GM_setClipboard()
})
