// ==UserScript==
// @name TabTitleTrim@www.amazon.com
// @match https://www.amazon.com/*
// @noframes
// ==/UserScript==

import type {} from '../../types/violentmonkey.d.ts'

// function TabTitleTrim(event: Event) {
console.log('readystatechange ->', `[${document.readyState}]`, event)
let replacer = /^amazon\.com ?: /i
if (replacer.test(document.title)) {
	document.title = document.title.replace(replacer, '').trim()
}
// }
// document.addEventListener('readystatechange', TabTitleTrim, { once: true })
