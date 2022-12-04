// ==UserScript==
// @name DebridsCached@rarbg.to
// @match https://rarbg.to/*
// @noframes
// @require https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// ==/UserScript==

import type {} from '../../types/violentmonkey.d.ts'

// import * as shortcut from 'https://esm.sh/@violentmonkey/shortcut?dev'
// import onetime from 'https://esm.sh/onetime?dev'
// // import { StandardWebSocketClient } from 'https://deno.land/x/websocket/mod.ts'

function DebridsCached(event: Event) {
	const anchor = document.querySelector('[href^="magnet:"]') as HTMLAnchorElement

	const button = document.createElement('button')
	button.className = 'button'
	button.textContent = 'Debrid'
	button.onclick = (event) => {
		fetch('http://127.0.0.1:15322/', { method: 'POST', body: JSON.stringify(anchor.href) })
	}
	anchor.after(button)

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

// @resource bulma https://cdn.jsdelivr.net/npm/bulma/css/bulma.css
// @grant GM_addStyle
// @grant GM_getResourceText
// // GM_addStyle(GM_getResourceText('bulma'))
// const bulma = GM_getResourceText('bulma')
// const minireset = bulma.indexOf('/*! minireset.css')
// const box = bulma.indexOf('.box{')
// GM_addStyle(bulma.slice(0, minireset) + bulma.slice(box))
