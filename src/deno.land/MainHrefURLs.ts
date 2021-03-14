// ==UserScript==
// @name MainHrefURLs@deno.land
// @namespace deno.land
// @match https://deno.land/*
// @downloadURL http://127.0.0.1:13540/deno.land/MainHrefURLs.user.js
// @version {{date}}
// @run-at document-idle
// @inject-into content
// @noframes
// ==/UserScript==

function MainHrefURLs() {
	if (document.readyState != 'complete') return false

	let selects = Array.from(document.getElementsByTagName('select'))
	let select = selects.find((el) => el.id == 'version')
	if (select && select.value != 'master') select.value = 'master'

	for (let el of Array.from(document.links).filter(Boolean)) {
		if (!el.href) continue
		let matchers = [
			[/\b(@v\d+.\d+.\d+)\b/g, '@master'],
			[/\b(v\d+.\d+.\d+)\b/g, 'master'],
		] as [RegExp, string][]
		for (let [matcher, replace] of matchers) {
			if (!matcher.test(el.href)) continue
			el.href = el.href.replace(matcher, replace)
			break
		}
	}

	document.removeEventListener('readystatechange', MainHrefURLs)
}
MainHrefURLs() || document.addEventListener('readystatechange', MainHrefURLs)
