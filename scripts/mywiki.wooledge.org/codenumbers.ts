// ==UserScript==
// @name CodeNumbers@mywiki.wooledge.org
// @match https://mywiki.wooledge.org/*
// @noframes
// ==/UserScript==

import type {} from '../../types/violentmonkey.d.ts'

function CodeNumbers(event: Event) {
	console.log('readystatechange ->', `[${document.readyState}]`, event)
	for (let el of Array.from(document.querySelectorAll('a.codenumbers')) as HTMLElement[]) {
		el.click()
	}
}
document.addEventListener('readystatechange', CodeNumbers, { once: true })
