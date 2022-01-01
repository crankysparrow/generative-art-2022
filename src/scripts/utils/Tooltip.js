import cssText from 'bundle-text:../../styles/components/tooltip.scss'
let style = document.createElement('style')
style.textContent = cssText
document.body.appendChild(style)

export class Tooltip {
	constructor({ tipContent, titleString }) {
		this.tipContent = tipContent
		this.btn = createButton('?').position(0, 0).class('tooltip-btn')
		this.tip = createDiv().position(0, 0).class('tooltip')
		this.title = createElement('h2', titleString).parent(this.tip)
		this.tipContent.parent(this.tip)
		this.closeBtn = createButton('X').parent(this.tip).class('tooltip-close')

		this.btn.elt.addEventListener('click', () => this.openTooltip())
		this.closeBtn.elt.addEventListener('click', () => this.closeTooltip())
	}

	openTooltip() {
		this.tip.addClass('active')
	}

	closeTooltip() {
		this.tip.removeClass('active')
	}
}
