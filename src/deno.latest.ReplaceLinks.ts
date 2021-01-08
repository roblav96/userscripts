// ==UserScript==
// @name deno.latest.ReplaceLinks
// @match https://deno.land/*
// @run-at document-idle
// @inject-into content
// @noframes
// ==/UserScript==

function run() {
	for (let el of Array.from(document.links).filter(Boolean)) {
		console.log('el.href ->', el.href)
		if (!el.href) continue
		let matchers = {
			['']: /\b(@v\d+.\d+.\d+)\b/g,
			['master']: /\b(v\d+.\d+.\d+)\b/g,
		}
		for (let [replace, matcher] of Object.entries(matchers)) {
			if (!matcher.test(el.href)) continue
			el.href = el.href.replaceAll(matcher, replace)
			console.log('el.href ->', el.href)
			break
		}
	}
}

{
	// prettier-ignore
	const events = ['DOMContentLoaded', 'readystatechange', 'visibilitychange'] as (keyof DocumentEventMap)[]
	function onevent() {
		if (document.readyState != 'complete') return
		events.forEach((event) => document.removeEventListener(event, onevent))
		run()
	}
	events.forEach((event) => document.addEventListener(event, onevent))
	onevent()
}
