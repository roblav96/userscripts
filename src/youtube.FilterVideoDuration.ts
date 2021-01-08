// ==UserScript==
// @name youtube.FilterVideoDuration
// @match https://*.youtube.com/*
// @grant GM_addStyle
// @grant GM_getResourceText
// @grant GM_registerMenuCommand
// @resource bulma https://cdn.jsdelivr.net/npm/bulma/css/bulma.min.css
// ==/UserScript==

function addBulma() {
	let style = document.getElementById('bulma')
	if (style) return style
	let bulma = GM_getResourceText('bulma')
	style = GM_addStyle(bulma.slice(bulma.indexOf('.is-clearfix::after')))
	style.setAttribute('id', 'bulma')
	return style
}

function getVideoRenderers() {
	let elements = Array.from(document.querySelectorAll('*')) as YouTubeRendererElement[]
	let renderers = elements.filter((el) => {
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
		let viewCount = el.data.viewCountText?.simpleText || el.data.viewCountText?.runs?.[0]?.text
		if (!viewCount?.replace(/[^\d]/g, '')) {
			viewCount = label.match(/ (?<views>[\d,]+) views /)?.groups?.views
		}
		return {
			title: el.data.title?.simpleText || el.data.title?.runs?.[0]?.text,
			duration: el.data.lengthText?.simpleText || 'live',
			views: Number.parseInt(viewCount?.replace(/[^\d]/g, '')) || 0,
			published: el.data.publishedTimeText?.simpleText || 'live',
			channel: (el.data.ownerText || el.data.longBylineText)?.runs?.[0]?.text,
			id: el.data.videoId,
			el,
		}
	})
}

function filter(minimum = 10) {
	addBulma()
	let renderers = getVideoRenderers().filter(({ el, duration }) => {
		if (duration == 'live') return true
		let split = duration.split(':').reverse()
		let [seconds, minutes, hours] = split.map(Number)
		if (hours) minutes += hours * 60
		if (minutes >= minimum) return true
		el['style'].display = 'none'
	})
	let views = renderers.map((v) => v.views)
	let average = views.reduce((target, value) => target + value, 0) / views.length
	renderers.forEach(({ el, views }) => {
		let meta = el.querySelector('#meta')
		meta.querySelector('progress')?.remove()
		let progress = document.createElement('progress')
		progress.innerHTML = `<progress class="progress is-small" style="margin-top: 0.5rem;" value="${views}" max="${average}">${views}</progress>`
		meta.appendChild(progress.firstElementChild)
	})
}

GM_registerMenuCommand('01', () => filter(1))
GM_registerMenuCommand('05', () => filter(5))
GM_registerMenuCommand('10', () => filter(10))
GM_registerMenuCommand('15', () => filter(15))
GM_registerMenuCommand('20', () => filter(20))
GM_registerMenuCommand('30', () => filter(30))
GM_registerMenuCommand('60', () => filter(60))

/** @require https://cdn.jsdelivr.net/npm/@violentmonkey/shortcut */
// VM.registerShortcut('Alt-Meta-¡', () => {
// 	console.log(`Alt-Meta-¡ ->`)
// })
