// ==UserScript==
// @name TrimTabTitle@amazon.com
// @namespace amazon.com
// @match https://*.amazon.com/*
// @run-at document-idle
// @inject-into content
// @noframes
// ==/UserScript==

document.addEventListener('readystatechange', (event) => {
	if (document.readyState != 'complete') return
	let replacer = /^amazon\.com\s?:\s/i
	if (replacer.test(document.title)) {
		document.title = document.title.replace(replacer, '').trim()
	}
})
