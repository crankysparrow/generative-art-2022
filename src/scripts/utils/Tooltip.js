import cssText from 'bundle-text:../../styles/components/tooltip.scss'
let style = document.createElement('style')
style.textContent = cssText
document.body.appendChild(style)

export class Tooltip {
	constructor({
		tipContentBlock,
		titleString,
		tipContent,
		btnName,
		note,
		right = false,
		startOpen = false,
	}) {
		this.btn
		this.closeBtn
		this.tip = createDiv().class(right ? 'tooltip right' : 'tooltip ')

		this.buildButtons(btnName, right)
		this.title = createElement('h2', titleString).parent(this.tip).class('tooltip-title')
		this.contentBlock = tipContentBlock
			? tipContentBlock.parent(this.tip)
			: createDiv().parent(this.tip)

		if (tipContent) {
			this.buildTable(tipContent)
		}

		if (note) {
			this.addNote(note)
		}

		if (startOpen) {
			this.openTooltip()
		}
	}

	buildButtons(btnName, right) {
		this.btn = createButton(btnName ?? 'controls').class(
			right ? 'tooltip-btn right' : 'tooltip-btn'
		)
		this.closeBtn = createButton('')
			.parent(this.tip)
			.class('tooltip-close')
			.attribute('aria-label', 'close tooltip')
		this.btn.elt.addEventListener('click', () => this.openTooltip())
		this.closeBtn.elt.addEventListener('click', () => this.closeTooltip())
	}

	buildTable(tipContent) {
		let tab = createElement('table').parent(this.contentBlock)
		tipContent.forEach((c) => {
			let tr = createElement('tr').parent(tab)
			createElement('th', c[0]).parent(tr).attribute('scope', 'row')
			createElement('td', c[1]).parent(tr)
		})
	}

	addNote(note) {
		createP(note).parent(this.contentBlock).class('note')
	}

	openTooltip() {
		this.tip.addClass('active')
		this.btn.attribute('aria-expanded', 'true')
		this.closeBtn.elt.focus()
	}

	closeTooltip() {
		this.tip.removeClass('active')
		this.btn.elt.focus()
		this.btn.attribute('aria-expanded', 'false')
	}
}
