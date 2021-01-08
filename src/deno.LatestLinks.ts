// ==UserScript==
// @name deno.LatestLinks
// @match https://deno.land/*
// ==/UserScript==

let selects = Array.from(document.getElementsByTagName('select'))
let select = selects.find((el) => el.id == 'version')
if (select?.value != 'master') select.value = 'master'

for (let el of Array.from(document.links).filter(Boolean)) {
	if (!el.href) continue
	let matchers = {
		['']: /\b(@v\d+.\d+.\d+)\b/g,
		['master']: /\b(v\d+.\d+.\d+)\b/g,
	}
	for (let [replace, matcher] of Object.entries(matchers)) {
		if (!matcher.test(el.href)) continue
		el.href = el.href.replaceAll(matcher, replace)
		break
	}
}
