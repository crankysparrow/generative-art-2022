import { inputOpts } from './input-types'
import { createEl } from './create-element'

export type sliderOpts = inputOpts & {
	min?: number
	max?: number
	step?: number
	prepend?: string
	append?: string
}

export const slider = (
	obj: {},
	prop: string | number,
	{
		min = 0,
		max = 1,
		step = 0.1,
		id,
		labelString,
		onChange,
		prepend = '',
		append = '',
	}: sliderOpts,
	count: number
) => {
	id = id ?? `controls-${count}`
	labelString = labelString ?? prop
	let value = obj[prop]

	let wrapper = createEl('div', null, { class: 'slider-wrap input-wrap' })
	let label = createEl('label', null, { for: id })
	let text = createEl('div', labelString.toString(), { class: 'label-text' })

	label.appendChild(text)
	wrapper.appendChild(label)

	const lblText = (t) => `${prepend}${t}${append}`

	let slider = createEl('input', null, {
		type: 'range',
		min,
		max,
		value,
		step,
		id: id,
	}) as HTMLInputElement

	let labelVal = createEl('span', lblText(value), { class: 'slider-val' })
	label.appendChild(slider)
	label.appendChild(labelVal)

	let onUpdated = (e: Event) => {
		let val = +slider.value
		let valRound = Math.round(val * 100) / 100
		labelVal.innerHTML = lblText(valRound)
		obj[prop] = val
		if (onChange) onChange(e)
	}

	let update = (newVal) => {
		slider.value = newVal
		labelVal.innerHTML = lblText(newVal)
		obj[prop] = newVal
		if (onChange) onChange()
	}

	slider.addEventListener('input', onUpdated)

	return { slider, update }
}
