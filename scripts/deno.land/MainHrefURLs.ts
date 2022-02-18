// ==UserScript==
// @name MainHrefURLs@deno.land
// @match https://deno.land/*
// @noframes
// ==/UserScript==

import type {} from '../../types/violentmonkey.d.ts'

function MainHrefURLs(event: Event) {
	console.log('readystatechange ->', `[${document.readyState}]`, event)
	let selects = Array.from(document.getElementsByTagName('select'))
	let select = selects.find((el) => el.id == 'version')
	if (select && select.value != 'main') select.value = 'main'

	for (let el of Array.from(document.links).filter(Boolean)) {
		if (!el.href) continue
		let matchers = [
			[/\b(@v\d+.\d+.\d+)\b/g, '@main'],
			[/\b(v\d+.\d+.\d+)\b/g, 'main'],
		] as [RegExp, string][]
		for (let [matcher, replace] of matchers) {
			if (!matcher.test(el.href)) continue
			el.href = el.href.replace(matcher, replace)
			break
		}
	}
}
document.addEventListener('readystatechange', MainHrefURLs, { once: true })
