export const paletteFromUrl = (url) =>
	url
		.split('coolors.co/')
		.slice(1)[0]
		.split('-')
		.map((c) => '#' + c)

export const addScript = (src) => {
	let s = document.createElement('script')
	s.setAttribute('src', src)
	document.body.appendChild(s)
}
