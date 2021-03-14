// ==UserScript==
// @name DebridsCached@rarbg.to
// @namespace rarbg.to
// @match https://rarbg.to/*
// @downloadURL http://127.0.0.1:13540/rarbg.to/DebridsCached.user.js
// @run-at document-idle
// @inject-into content
// @noframes
// ==/UserScript==

document.addEventListener('readystatechange', (event) => {
	if (document.readyState != 'complete') return
	console.warn('document.readyState ->', document.readyState)
})
