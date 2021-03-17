// ==UserScript==
// @name codenumbers
// @match https://mywiki.wooledge.org/*
// @run-at document-idle
// @inject-into content
// @noframes
// ==/UserScript==

document.addEventListener('readystatechange', function codenumbers(event) {
	if (document.readyState != 'complete') return
	for (let el of Array.from(document.querySelectorAll('a.codenumbers')) as HTMLElement[]) {
		el.click()
	}
})
