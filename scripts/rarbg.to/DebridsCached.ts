// ==UserScript==
// @name DebridsCached@rarbg.to
// @namespace rarbg.to
// @match https://rarbg.to/*
// @run-at document-idle
// @inject-into content
// @noframes
// @downloadURL
// @version
// ==/UserScript==

document.addEventListener('readystatechange', (event) => {
	if (document.readyState != 'complete') return
	console.warn('document.readyState ->', document.readyState)
})
