import { paletteFromUrl } from './utils.js'

export class Controls {
	constructor() {
		this.container = this.buildContainer()
		this.shown = true
	}

	buildContainer() {
		let outer = createDiv().class('custom-controls').position(0, 0)
		// .style('background-color', 'white')
		// .style('font-size', '0.8rem')
		let btn = createButton('toggle controls')
			.class('toggle-btn')
			.parent(outer)
			.attribute('aria-expanded', 'true')
		let c = createDiv().class('controls-inner').parent(outer)

		btn.elt.addEventListener('click', () => {
			if (this.shown) {
				c.addClass('hidden')
				c.attribute('aria-hidden', 'true')
				btn.attribute('aria-expanded', 'false')
				this.shown = false
			} else {
				c.removeClass('hidden')
				c.attribute('aria-hidden', 'false')
				btn.attribute('aria-expanded', 'true')
				this.shown = true
			}
		})

		return c
	}

	createInput({ id, labelString, onChange }) {
		let inpDiv = createDiv().parent(this.container).class('input-container')

		let lab = createElement('label', labelString)
			.style('display', 'block')
			.parent(inpDiv)
			.attribute('for', id)
		let inp = createInput('').parent(inpDiv).attribute('id', id)
		let errorEl = createSpan('').class('error-label').parent(inpDiv)

		let inputItems = {
			input: inp,
			container: inpDiv,
		}

		let timer
		inp.input((e) => {
			if (timer) {
				clearTimeout(timer)
			}
			timer = setTimeout(function () {
				let res = onChange(e)
				if (res && res.error) {
					console.log(errorEl)
					errorEl.html(res.error)
				} else {
					errorEl.html('')
				}
			}, 300)
		})

		return inputItems
	}

	createPaletteInput({ id = 'urlinput', labelString = 'custom palette: ', onPaletteUpdate }) {
		function urlInputHandler(e) {
			let v = e.target.value
			if (v == '') {
				return
			}
			let regex = /coolors.co\/(?:[a-fA-Z0-9]{6}-){1,}(?:[a-fA-Z0-9]{6})$/
			if (regex.test(v)) {
				let p = paletteFromUrl(v)
				return onPaletteUpdate(p)
			} else {
				return { error: 'invalid url' }
			}
		}

		let paletteInput = this.createInput({ id, labelString, onChange: urlInputHandler })

		return paletteInput
	}
}
