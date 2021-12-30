import { paletteFromUrl } from './utils.js'
// import * as classes from '../../styles/components/controls.module.scss'
import cssText from 'bundle-text:../../styles/components/controls.scss'
let style = document.createElement('style')
style.textContent = cssText
document.body.appendChild(style)

export class Controls {
	constructor() {
		this.shown = this.shownFromStorage() ?? true
		this.container = this.buildContainer()
	}

	shownFromStorage() {
		let show = localStorage.getItem('showcontrols')

		if (show) {
			return boolean(show)
		}
	}

	buildContainer() {
		let outer = createDiv().class('custom-controls').position(0, 0)
		// .style('background-color', 'white')
		// .style('font-size', '0.8rem')
		let btn = createButton('toggle controls')
			.class('toggle-btn')
			.parent(outer)
			.attribute('aria-expanded', this.shown ? 'true' : 'false')
		let c = createDiv()
			.class('controls-inner')
			.parent(outer)
			.attribute('aria-hidden', this.shown ? 'false' : 'true')
		if (!this.shown) c.addClass('hidden')

		btn.elt.addEventListener('click', () => {
			if (this.shown) {
				c.addClass('hidden')
				c.attribute('aria-hidden', 'true')
				btn.attribute('aria-expanded', 'false')
				localStorage.setItem('showcontrols', 'false')
				this.shown = false
			} else {
				c.removeClass('hidden')
				c.attribute('aria-hidden', 'false')
				btn.attribute('aria-expanded', 'true')
				localStorage.setItem('showcontrols', 'true')
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

	createBtn({ onClick, labelString }) {
		let d = createDiv().parent(this.container).class('btn-container')
		let btn = createButton(labelString).class('controls-btn').parent(d)

		btn.elt.addEventListener('click', onClick)

		return btn
	}

	createSlider({ id, labelString, onChange, min, max, step = 1, val }) {
		val = val ?? floor((max - min) / 2 + min)
		let d = createDiv().parent(this.container).class('slider-container')
		let s = createSlider(min, max, val, step).parent(d).attribute('id', id)
		let l = createElement('label', labelString).parent(d).attribute('for', id)
		let sp = createSpan(val).class('slider-val').parent(l)

		s.input((e) => {
			sp.html(s.value())
		})

		return { el: s }
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
