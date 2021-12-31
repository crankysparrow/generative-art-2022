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
		this.count = 0
		this.activePanel = false
		this.panels = {}
		this.panelIds = []
		this.tabBtns = []
	}

	shownFromStorage() {
		let show = localStorage.getItem('showcontrols')

		if (show) {
			return boolean(show)
		}
	}

	buildContainer() {
		let outer = createDiv().class('custom-controls').position(0, 0)
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

	addPanelTabs() {
		this.tabsContainer = createDiv().class('tabs-container').parent(this.container)
	}

	addPanel({ titleString, id }) {
		this.count++
		id = id ?? `controls-panel-${this.count}`
		if (!this.tabsContainer) {
			this.addPanelTabs()
		}
		let tabBtn = createButton(titleString).parent(this.tabsContainer).attribute('data-for', id)
		this.tabBtns.push(tabBtn)
		tabBtn.elt.addEventListener('click', () => {
			this.activatePanel(id, tabBtn)
		})
		let panel = createDiv().addClass('panel').attribute('id', id).parent(this.container)
		this.panels[id] = panel
		this.panelIds.push(id)
		if (this.panelIds.length == 1) {
			panel.addClass('active')
			tabBtn.addClass('active')
		}

		return panel
	}

	activatePanel(id, btn) {
		this.tabBtns.forEach((b) => b.removeClass('active'))
		btn.addClass('active')
		this.panelIds.forEach((id) => this.panels[id].removeClass('active'))
		this.panels[id].addClass('active')
	}

	addSection({ id = '', labelString, style }) {
		this.count++
		id = id ?? `controls-section-${this.count}`
		let secDiv = createDiv().parent(this.container).class('section').attribute('id', id)
		if (labelString) {
			let title = createElement('h4', labelString).class('section-title').parent(secDiv)
		}

		if (style) {
			let props = Object.keys(style)
			props.forEach((p) => {
				secDiv.style(p, style[p])
			})
		}
		let d = secDiv
		return d
	}

	createInput({ id, labelString, onChange, parent = this.container }) {
		this.count++

		let inpDiv = createDiv().parent(parent).class('input-container')

		let lab = createElement('label', labelString).style('display', 'block').parent(inpDiv).attribute('for', id)
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

	btn({ onClick, labelString, parent }) {
		this.count++
		let btn = createButton(labelString).class('controls-btn').parent(parent)
		btn.elt.addEventListener('click', onClick)
		return btn
	}

	createBtn({ onClick, labelString, parent = this.container }) {
		let d = createDiv().parent(parent).class('btn-container')
		let btn = this.btn({ onClick, labelString, parent: d })
		return btn
	}

	createBtnSet({ btns, parent = this.container, style, className }) {
		let d = createDiv().parent(parent).class('btn-container')
		if (className) d.addClass(className)
		let btnsOutput = []
		btns.forEach((btn) => {
			btn.parent = d
			btnsOutput.push(this.btn(btn))
		})

		if (style) {
			let props = Object.keys(style)
			props.forEach((p) => {
				d.style(p, style[p])
			})
		}

		return btnsOutput
	}

	createText({ text, parent = this.container }) {
		let d = createDiv(text).parent(parent).class('text')
		return d
	}

	createSlider({ id, labelString, onChange, min, max, step = 1, val, parent = this.container }) {
		this.count++
		val = val ?? floor((max - min) / 2 + min)
		id = id ?? `controls-${this.count}`
		let d = createDiv().parent(parent).class('slider-container')
		let l = createElement('label').parent(d).attribute('for', id)
		let sp1 = createSpan(labelString).class('label-text').parent(l)
		let s = createSlider(min, max, val, step).parent(l).attribute('id', id)
		let sp2 = createSpan(val).class('slider-val').parent(l)

		s.input((e) => {
			sp2.html(s.value())
			if (onChange) {
				onChange(e)
			}
		})

		return s
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

	createSelect({
		id,
		labelString,
		options,
		useOptionsIndex = false,
		selected,
		onChange,
		parent = this.container,
		style,
	}) {
		this.count++
		id = id ?? `controls-sel-${this.count}`
		let sDiv = createDiv().parent(parent).class('select-container')

		if (style) {
			let props = Object.keys(style)
			props.forEach((p) => {
				sDiv.style(p, style[p])
			})
		}

		let lab = createElement('label', labelString).parent(sDiv).attribute('for', id)
		let sel = createSelect().parent(sDiv).attribute('id', id)

		for (let i = 0; i < options.length; i++) {
			sel.option(useOptionsIndex ? i : options[i])
		}

		if (selected) sel.selected(selected)
		sel.changed(onChange)

		return { el: sel, container: sDiv, label: lab }
	}

	createRadio({ id, labelString, options, selected, onChange, parent = this.container }) {
		this.count++
		id = id ?? `controls-radio-${this.count}`

		let rDiv = createDiv().style('display', 'flex').parent(parent).class('radio-container')
		let radio = createRadio().attribute('id', id).parent(rDiv)
		options.forEach((opt, i) => {
			radio.option(opt)
		})
		if (selected) {
			radio.selected(selected)
		}

		radio.changed(onChange)
		return radio
	}
}
