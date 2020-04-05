// ==UserScript==
// @name youtube.filter-video-duration
// @match https://*.youtube.com/*
// @grant GM_addStyle
// @grant GM_getResourceText
// @grant GM_registerMenuCommand
// @resource bulma https://cdn.jsdelivr.net/npm/bulma/css/bulma.min.css
// ==/UserScript==

function addBulma() {
	let style = document.getElementById('bulma') as HTMLStyleElement
	if (style) return style
	let bulma = GM_getResourceText('bulma')
	style = GM_addStyle(bulma.slice(bulma.indexOf('.is-clearfix::after')))
	style.setAttribute('id', 'bulma')
	return style
}

function getVideoRenderers() {
	let renderers = Array.from(document.all).filter((el) => {
		let tag = el.tagName.toLowerCase()
		if ((tag.startsWith('ytd-') && tag.endsWith('-video-renderer')) == false) return
		if (el.getBoundingClientRect().height == 0) return
		return !!el.data
	})
	return renderers.map((el, i) => {
		// console.log(i, `${el.data.title.simpleText} ->`)
		// console.log(
		// 	JSON.stringify(
		// 		Object.keys(el.data).reduce((target, key) => {
		// 			if (
		// 				!['buttons', 'menu'].includes(key) &&
		// 				!key.toLowerCase().includes('thumbnail')
		// 			) {
		// 				target[key] = el.data[key]
		// 			}
		// 			return target
		// 		}, {}),
		// 		null,
		// 		4,
		// 	),
		// )
		let label = el.data.title?.accessibility?.accessibilityData?.label
		let viewCount = el.data.viewCountText?.simpleText || el.data.viewCountText?.runs[0]?.text
		if (!viewCount?.replace(/[^\d]/g, '')) {
			viewCount = label.match(/ (?<views>[\d,]+) views /)?.groups?.views
		}
		return {
			el,
			title: el.data.title?.simpleText || el.data.title?.runs[0]?.text,
			views: Number.parseInt(viewCount?.replace(/[^\d]/g, '')) || 0,
			duration: el.data.lengthText?.simpleText || 'live',
			published: el.data.publishedTimeText?.simpleText || 'live',
			channel: (el.data.ownerText || el.data.longBylineText)?.runs[0]?.text,
			id: el.data.videoId,
		}
	})
}

function filter(minimum = 10) {
	addBulma()
	getVideoRenderers().forEach(({ el }) => {
		let overlaytime = el.querySelector('ytd-thumbnail-overlay-time-status-renderer')
		let time = overlaytime.textContent.trim()
		let split = time.split(':').reverse()
		let [seconds, minutes, hours] = split.map(Number)
		if (hours) minutes += hours * 60
		if (minutes >= minimum) return
		el['style'].display = 'none'
	})
}

GM_registerMenuCommand('05', () => filter(5))
GM_registerMenuCommand('10', () => filter(10))
GM_registerMenuCommand('15', () => filter(15))
GM_registerMenuCommand('20', () => filter(20))
GM_registerMenuCommand('30', () => filter(30))
GM_registerMenuCommand('60', () => filter(60))
