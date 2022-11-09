export function createEl(
	tagName: string,
	text?: string,
	attrs?: { [x: string]: string | number }
): HTMLElement {
	let el = document.createElement(tagName)
	if (text) el.innerHTML = text

	if (attrs) {
		let keys = Object.keys(attrs)
		keys.forEach((key) => {
			el.setAttribute(key, attrs[key].toString())
		})
	}

	return el
}
