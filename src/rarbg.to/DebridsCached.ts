// ==UserScript==
// @name DebridsCached@rarbg.to
// @namespace rarbg.to
// @match https://rarbg.to/*
// @downloadURL http://127.0.0.1:13540/rarbg.to/DebridsCached.user.js
// @version {{date}}
// @run-at document-idle
// @inject-into content
// @noframes
// ==/UserScript==

/// <reference no-default-lib="true"/>
/// <reference lib="dom" />

document.addEventListener('readystatechange', (event) => {
	if (document.readyState != 'complete') return
	console.warn(' 11:36:25 ->', document.readyState)
})
