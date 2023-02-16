// ==UserScript==
// @name DebridsCached@rarbg.to
// @match https://rarbg.to/*
// @noframes
// ==/UserScript==

import type {} from '../../types/violentmonkey.d.ts'

// import { observe } from 'https://esm.sh/@violentmonkey/dom?dev'
// import { observe } from 'https://cdn.skypack.dev/@violentmonkey/dom?dts'

function DebridsCached() {
	const anchor = document.querySelector('[href^="magnet:"]') as HTMLAnchorElement
	if (anchor) {
		const button = document.createElement('button')
		button.className = 'button'
		button.textContent = 'Debrid'
		button.onclick = () => {
			fetch('http://127.0.0.1:15322/', { method: 'POST', body: JSON.stringify(anchor.href) })
		}
		anchor.after(button)
	}
}
DebridsCached()
// document.addEventListener('readystatechange', DebridsCached)
// document.addEventListener('DOMContentLoaded', DebridsCached)
