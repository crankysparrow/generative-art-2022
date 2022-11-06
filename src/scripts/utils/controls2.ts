export class Controls {
	shown: Boolean
	container: {}
	count: number
	panels: {}
	panelIds: any[]
	tabBtns: any[]

	constructor() {
		this.shown = this.shownFromStorage() ?? true
		this.container = this.buildContainer()
		this.count = 0
		// this.activePanel = false
		this.panels = {}
		this.panelIds = []
		this.tabBtns = []
		// this.clickOutside = new ClickOutside()
	}

	shownFromStorage() {
		let show = localStorage.getItem('showcontrols')

		if (show) {
			return boolean(show)
		}
	}

	buildContainer() {
		let outer = createDiv().class('custom-controls')
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

	// addPanelTabs() {
	// 	this.tabsContainer = createDiv().class('tabs-container').parent(this.container)
	// }

	addPanel({
		title,
		id,
		defaultOpen = true,
	}: {
		title: string
		id: string | undefined
		defaultOpen: boolean
	}) {
		this.count++
		id = id ?? `controls-panel-${this.count}`
		let tabBtn = createButton(title)

		tabBtn
			.class('panel-btn toggle-btn')
			.parent(this.container)
			.attribute('data-for', id)
			.attribute('aria-expanded', defaultOpen ? 'true' : 'false')

		this.tabBtns.push(tabBtn)
		tabBtn.elt.addEventListener('click', () => {
			this.activatePanel(id, tabBtn)
		})
		let panel = createDiv()
			.addClass('panel')
			.attribute('id', id)
			.attribute('aria-hidden', defaultOpen ? 'false' : 'true')
			.parent(this.container)
		this.panels[id] = panel
		this.panelIds.push(id)
		if (defaultOpen) {
			panel.addClass('active')
			tabBtn.addClass('active')
		}

		return panel
	}

	activatePanel(id, btn) {
		// this.tabBtns.forEach((b) => b.removeClass('active'))
		let panel = this.panels[id]
		if (btn.hasClass('active')) {
			btn.removeClass('active').attribute('aria-expanded', 'false')
			panel.attribute('aria-hidden', 'true').removeClass('active')
		} else {
			btn.addClass('active').attribute('aria-expanded', 'true')
			panel.attribute('aria-hidden', 'false').addClass('active')
		}
		// this.panelIds.forEach((id) => this.panels[id].removeClass('active'))
	}

	addSection({ id, labelString, parent = this.container, description }) {
		this.count++
		id = id ?? `controls-section-${this.count}`
		let title = null
		let secDiv = createDiv().class('section').attribute('id', id).parent(parent)
		if (labelString)
			title = createElement('h4', labelString).class('section-title').parent(secDiv)
		if (description) {
			// createDiv(description).class('description').parent(secDiv)
			let tip = this.createTooltip({ description, id })
			tip.parent(title ?? secDiv)
		}

		return secDiv
	}

	createInput({ id, labelString, onChange, parent = this.container }) {
		this.count++
		id = id ?? `controls-input-${this.count}`
		let inpDiv = createDiv().parent(parent).class('input-container control-item-wrap')

		let l = createElement('label').parent(inpDiv).attribute('for', id)
		let sp1 = createSpan(labelString).class('label-text').parent(l)
		let inp = createInput('').parent(l).attribute('id', id)
		let errorEl = createSpan('').class('error-label').parent(l)

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

	createSlider(
		obj,
		prop,
		{
			id,
			labelString,
			onChange,
			min,
			max,
			step = 1,
			val,
			appendVal = '',
			prependVal = '',
			parent = this.container,
			description,
		}
	) {
		this.count++
		val = val ?? (obj ? obj[prop] : floor((max - min) / 2 + min))
		val = Math.round(val * 100) / 100

		labelString = labelString ?? prop ?? ''
		id = id ?? `controls-${this.count}`
		let d = createDiv().parent(parent).class('slider-wrap control-item-wrap')
		let l = createElement('label').parent(d).attribute('for', id)
		let labeltext = createDiv(labelString).class('label-text').parent(l)
		let s = createSlider(min, max, val, step).parent(l).attribute('id', id)
		let sp2 = createSpan(`${prependVal}${val}${appendVal}`).class('slider-val').parent(l)
		// if (description) createDiv(description).class('description').parent(d)
		if (description) {
			this.createTooltip({ description, id: `${id}-tip` }).parent(labeltext)
		}

		let onUpdated = () => {
			let val = s.value()
			val = Math.round(val * 100) / 100
			sp2.html(`${prependVal}${val}${appendVal}`)
			obj && (obj[prop] = s.value())
			if (onChange) {
				onChange(s)
			}
		}

		s.update = (val) => {
			s.value(val)
			sp2.html(`${prependVal}${val}${appendVal}`)
			obj && (obj[prop] = s.value())
			if (onChange) {
				onChange(s)
			}
		}

		s.elt.addEventListener('change', onUpdated)

		return s
	}

	createColorPicker(
		obj,
		prop,
		{ id, labelString, val, parent = this.container, description, onChange }
	) {
		this.count++
		val = val ?? (obj ? obj[prop] : '#000')
		labelString = labelString ?? prop ?? ''
		id = id ?? `controls-${this.count}`
		let d = createDiv().parent(parent).class('color-wrap control-item-wrap')
		let l = createElement('label').parent(d).attribute('for', id)
		let sp1 = createSpan(labelString).class('label-text').parent(l)
		let picker = createColorPicker(val).parent(l)

		let col = color(val)
		let levelText = `${round(hue(col))} - ${round(saturation(col))} - ${round(lightness(col))}`
		let levels = createDiv(levelText).parent(l).class('color-levels')

		if (description) createDiv(description).class('description').parent(d)

		picker.input((e) => {
			obj && (obj[prop] = picker.color())
			let col = picker.color()
			levels.html(`${round(hue(col))} - ${round(saturation(col))} - ${round(lightness(col))}`)

			if (onChange) onChange(picker)
		})

		picker.update = ([x, y, z]) => {
			let col = color(x, y, z)
			let str = col.toString('#rrggbb')
			picker.elt.value = str
			obj && (obj[prop] = picker.color())
			levels.html(`${round(hue(col))} - ${round(saturation(col))} - ${round(lightness(col))}`)
			if (onChange) onChange(picker)
		}

		return picker
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

		let paletteInput = this.createInput({
			id,
			labelString,
			onChange: urlInputHandler,
		})

		return paletteInput
	}

	createCheckbox(
		obj,
		prop,
		{ id, labelString, val = false, onChange, parent = this.container } = {}
	) {
		this.count++
		id = id ?? `controls-check-${this.count}`
		val = obj && prop ? obj[prop] : val
		labelString = labelString ?? prop ?? ''
		let wrapper = createDiv()
			.style('display', 'flex')
			.parent(parent)
			.class('check-wrap control-item-wrap')
		let label = createElement('label').parent(wrapper).attribute('for', id)
		let sp1 = createSpan(labelString).parent(label)
		let check = createElement('input')
			.attribute('type', 'checkbox')
			.attribute('id', id)
			.parent(label)

		if (val) check.attribute('checked', '')

		check.changed((e) => {
			obj && (obj[prop] = check.elt.checked)
			if (onChange) onChange(e)
		})

		check.update = (val) => {
			check.elt.checked = val
			obj && (obj[prop] = check.elt.checked)
			if (onChange) onChange(check)
		}

		return check
	}

	createSelect(
		obj,
		prop,
		{
			id,
			labelString,
			options,
			useOptionsIndex = false,
			namesAndVals = false,
			selected,
			onChange,
			parent = this.container,
			style,
		}
	) {
		this.count++
		id = id ?? `controls-sel-${this.count}`
		let sDiv = createDiv().parent(parent).class('select-wrap control-item-wrap')

		if (style) {
			let props = Object.keys(style)
			props.forEach((p) => {
				sDiv.style(p, style[p])
			})
		}

		let lab = createElement('label', labelString).parent(sDiv).attribute('for', id)
		let sel = createSelect().parent(sDiv).attribute('id', id)

		for (let i = 0; i < options.length; i++) {
			if (namesAndVals) {
				sel.option(options[i].name, options[i].val)
			} else {
				sel.option(useOptionsIndex ? i : options[i])
			}
		}

		let currentSelected = (obj && obj[prop]) ?? selected ?? false
		if (currentSelected) sel.selected(currentSelected)

		sel.changed(() => {
			obj && (obj[prop] = sel.selected())
			if (onChange) onChange(sel)
		})

		sel.update = (val) => {
			sel.selected(val)
			obj && (obj[prop] = sel.selected())
			if (onChange) onChange(sel)
		}

		return sel
	}

	createRadio({ id, labelString, options, selected, onChange, parent = this.container }) {
		this.count++
		id = id ?? `controls-radio-${this.count}`

		let rDiv = createDiv().style('display', 'flex').parent(parent).class('radio-container')
		let radio = createRadio().attribute('id', id).attribute('class', 'radio-opts').parent(rDiv)
		options.forEach((opt, i) => {
			radio.option(opt)
		})
		if (selected) {
			radio.selected(selected)
		}

		radio.changed(onChange)
		return radio
	}

	createTooltip({ description, id }) {
		let d = createDiv().class('tip-container')
		let btn = createButton('i').parent(d)
		btn.class('tooltip-toggle').attribute('id', id)
		let tip = createDiv(description).parent(d)
		tip.class('tooltip-info hidden')
		btn.elt.addEventListener('click', (e) => {
			if (tip.hasClass('hidden')) {
				tip.removeClass('hidden')
			} else {
				// tip.addClass('hidden')
			}
		})

		// this.clickOutside.addItem({
		// 	el: d.elt,
		// 	onClickOutside: () => tip.addClass('hidden'),
		// })

		return d
	}
}

class ClickOutside {
	constructor() {
		this.items = []
		this.addListener()
	}

	addItem(item) {
		if (!item.el) {
			return console.log('missing required property el')
		}
		if (typeof item.onClickOutside !== 'function') {
			return console.warn('missing required onClickOutside function')
		}
		this.items.push(item)
	}

	addListener() {
		document.addEventListener('click', (e) => {
			this.items.forEach((item) => {
				if (!item.el.contains(e.target)) {
					item.onClickOutside(e)
				}
			})
		})
	}
}

const paletteFromUrl = (url) =>
	url
		.split('coolors.co/')
		.slice(1)[0]
		.split('-')
		.map((c) => '#' + c)
