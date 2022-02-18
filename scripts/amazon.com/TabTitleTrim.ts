// ==UserScript==
// @name TabTitleTrim@amazon.com
// @namespace amazon.com
// @match https://*.amazon.com/*
// @noframes
// ==/UserScript==

import type {} from '../../types/violentmonkey.d.ts'

// document.addEventListener('readystatechange', (event) => {
// if (document.readyState != 'complete') return
let replacer = /^amazon\.com\s?:\s/i
if (replacer.test(document.title)) {
	document.title = document.title.replace(replacer, '').trim()
}
// })
