// ==UserScript==
// @name DebridsCached@rarbg.to
// @namespace rarbg.to
// @match https://rarbg.to/*
// @noframes
// ==/UserScript==

import '../../types/violentmonkey.d.ts'

import onetime from 'https://cdn.skypack.dev/onetime?dts'
import { StandardWebSocketClient } from 'https://deno.land/x/websocket/mod.ts'

const DebridsCached = onetime(() => {
	console.log('DebridsCached ->', DebridsCached.constructor)
})

document.addEventListener('readystatechange', (event) => {
	console.log('event ->', event)
	console.warn('document.readyState ->', document.readyState)
	console.log('window ->', window)
	console.log('unsafeWindow ->', unsafeWindow)
	DebridsCached()
	if (document.readyState != 'complete') return
	// let ws = new StandardWebSocketClient('ws://127.0.0.1:13874')
	// console.log('ws ->', ws)
	// GM_setClipboard()
})
