// ==UserScript==
// @name deno.Latest.SelectMaster
// @match https://deno.land/*
// @run-at document-idle
// @inject-into content
// @noframes
// ==/UserScript==

function SelectMaster() {
	let selects = Array.from(document.getElementsByTagName('select'))
	console.log('selecss ->', selects)
	let select = selects.find((el) => el.id == 'version')
	console.log('select ->', select)
	if (select?.value != 'master') select.value = 'master'
}

// prettier-ignore
const events = ['DOMContentLoaded', 'readystatechange', 'visibilitychange'] as (keyof DocumentEventMap)[]
function onevent() {
	if (document.readyState != 'complete') return
	events.forEach((event) => document.removeEventListener(event, onevent))
	SelectMaster()
}
events.forEach((event) => document.addEventListener(event, onevent))
onevent()
