import { Controls } from '../../utils/Controls'
import { type ForceVals } from './Curve'
import * as p5 from 'p5'

class Forces {
	initialVals: ForceVals
	controls: Controls
	panel: ReturnType<typeof Controls.prototype.addPanel>
	sliders: { vx1: any; vx2: any; vy1: any; vy2: any }

	constructor(controls, initialVals) {
		this.controls = controls
		this.initialVals = initialVals
		this.panel = this.controls.addPanel({ titleString: 'forceVals' })
		this.sliders = {
			vx1: this.createSlider('vx1'),
			vx2: this.createSlider('vx2', true),
			vy1: this.createSlider('vy1', true),
			vy2: this.createSlider('vy2'),
		}
	}

	createSlider(key, low = false) {
		return this.controls.createSlider({
			labelString: key,
			min: low ? 0.001 : 0.01,
			max: low ? 0.09 : 2,
			step: low ? 0.0001 : 0.01,
			val: round(this.initialVals[key], 3),
			parent: this.panel,
		})
	}

	get vx1() {
		return this.sliders.vx1.elt.value
	}

	get vx2() {
		return this.sliders.vx2.elt.value
	}

	get vy1() {
		return this.sliders.vy1.elt.value
	}

	get vy2() {
		return this.sliders.vy2.elt.value
	}

	set vx1(v) {
		this.sliders.vx1.update(round(v, 2))
	}

	set vx2(v) {
		this.sliders.vx2.update(round(v, 2))
	}

	set vy1(v) {
		this.sliders.vy1.update(round(v, 2))
	}

	set vy2(v) {
		this.sliders.vy2.update(round(v, 2))
	}
}

class CurveVals {
	initVals: { [key: string]: number }
	controls: Controls
	panel: ReturnType<typeof Controls.prototype.addPanel>
	sliders: { [key: string]: any }
	redrawCurves: () => void
	resize: () => void

	constructor(controls, initVals, redrawCurves, resize) {
		this.initVals = initVals
		this.controls = controls
		this.panel = this.controls.addPanel({ titleString: 'general' })
		this.redrawCurves = redrawCurves
		this.resize = resize
		this.sliders = {
			minLength: this.createSlider('minLength'),
			idealLength: this.createSlider('idealLength'),
			meetThreshold: this.createSlider('meetThreshold', 1, 30, 0.5),
			thickness: this.createSlider('thickness', 0.5, 30, 0.5, this.redrawCurves),
			alphaVal: this.createSlider('alphaVal', 10, 255, 1, this.redrawCurves),
			precision: this.createSlider('precision', 1, 100, 1),
			width: this.createSlider('width', 10, 2000, 10, this.resize),
			height: this.createSlider('height', 10, 2000, 10, this.resize),
		}
	}

	createSlider(key, min = 10, max = 1200, step = 1, changeFn: (() => void) | boolean = false) {
		return this.controls.createSlider({
			labelString: key,
			min,
			max,
			step,
			val: this.initVals[key],
			parent: this.panel,
			onChange: changeFn,
		})
	}

	get precision() {
		return this.sliders.precision.elt.value
	}

	get minLength() {
		return this.sliders.minLength.elt.value
	}

	get idealLength() {
		return this.sliders.idealLength.elt.value
	}

	get meetThreshold() {
		return this.sliders.meetThreshold.elt.value
	}

	get thickness() {
		return this.sliders.thickness.elt.value
	}

	get alphaVal() {
		return this.sliders.alphaVal.elt.value
	}

	get width() {
		return this.sliders.width.elt.value
	}

	get height() {
		return this.sliders.height.elt.value
	}

	set minLength(v) {
		this.sliders.minLength.update(v)
	}

	set idealLength(v) {
		this.sliders.idealLength.update(v)
	}

	set meetThreshold(v) {
		this.sliders.meetThreshold.update(v)
	}

	set thickness(v) {
		this.sliders.thickness.update(v)
	}

	set alphaVal(v) {
		this.sliders.alphaVal.update(v)
	}

	set width(v) {
		this.sliders.width.update(v)
	}

	set height(v) {
		this.sliders.height.update(v)
	}

	set precision(v) {
		this.sliders.precision.update(v)
	}
}

type ControlsOpts = {
	params: { [key: string]: number }
	doReset: (randomizeForces?: boolean, randomizeCurveVals?: boolean) => void
	redrawCurves: () => void
	addCurves: () => void
	initForceVals: ForceVals
	save: () => void
	resize: () => void
}

export function makeControls({
	params,
	doReset,
	redrawCurves,
	addCurves,
	initForceVals,
	save,
	resize,
}: ControlsOpts) {
	let controls = new Controls(true)

	let curveVals = new CurveVals(controls, params, redrawCurves, resize)
	let forces = new Forces(controls, initForceVals)
	controls.createBtnSet({
		btns: [
			{
				labelString: 'new drawing with current vals',
				onClick: () => doReset(false),
			},
			{
				labelString: 'new drawing + randomize forceVals',
				onClick: () => doReset(true, false),
			},
			{
				labelString: 'new drawing + randomize all',
				onClick: () => doReset(true, true),
			},
			{
				labelString: 'add curves',
				onClick: addCurves,
			},
			{
				labelString: 'save',
				onClick: save,
			},
		],
	})

	controls.createBtn({
		labelString: 'new drawing with above vals',
		onClick: () => doReset(false),
		parent: forces.panel,
	})

	return { forces, curveVals }
}

export function makeOverlay() {
	let el = document.createElement('div')
	el.style.backgroundColor = 'rgba(255,255,255,0.7)'
	el.style.width = '100%'
	el.style.height = '100%'
	el.style.left = '0'
	el.style.top = '0'
	el.style.position = 'absolute'
	el.style.display = 'flex'
	el.style.alignItems = 'center'
	el.style.justifyContent = 'center'
	el.style.display = 'none'
	el.innerHTML = 'please wait...'
	document.body.appendChild(el)

	return {
		el: el,
		show: () => {
			el.style.display = 'flex'
		},
		hide: () => {
			el.style.display = 'none'
		},
	}
}
