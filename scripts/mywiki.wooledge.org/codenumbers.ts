// ==UserScript==
// @name CodeNumbers@mywiki.wooledge.org
// @namespace mywiki.wooledge.org
// @match https://mywiki.wooledge.org/*
// @noframes
// ==/UserScript==

import '../../types/violentmonkey.d.ts'

document.addEventListener('readystatechange', function codenumbers(event) {
	if (document.readyState != 'complete') return
	for (let el of Array.from(document.querySelectorAll('a.codenumbers')) as HTMLElement[]) {
		el.click()
	}
})
