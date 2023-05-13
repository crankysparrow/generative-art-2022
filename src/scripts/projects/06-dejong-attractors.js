import lerpColorByHue from '../utils/lerpColorByHue.js'
import { Controls } from '../utils/Controls.js'

let a, b, c, d, prevX, prevY, nSteps, m, diag, c1, c2, controls, typeSelect, valsSelect, colsRadio
let inputA, inputB, inputC, inputD

let favs = [
	{ a: 1.1, b: 3.09, c: -1.6, d: 3.31 },
	{ a: 1.1, b: 2.08, c: 1.6, d: 3.31 },
	{ a: 1.14, b: 2.233, c: -3.434, d: 1.497 },
	{ a: -0.635, b: 1.724, c: 1.77, d: -0.955 },
	{ a: -0.686, b: -1.761, c: 1.029, d: 1.544 },
	{ a: 1.006, b: -1.062, c: 3.192, d: 1.148 },
	{ a: 1.313, b: 2.772, c: 1.072, d: -1.348 },
	{ a: 1.284, b: 1.921, c: 2.946, d: 1.984 },
]

let numsSet = false

let options = {
	type: ['circles', 'points', 'lines'],
	palette: ['bw', 'random'],
	vals: [...favs, 'random'],
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	buildControls()

	colorMode(HSB)
	nSteps = 1000
	m = min(width, height) * 0.9

	setupFlowField()
}

function setAttractors() {
	let val = valsSelect.el.value()
	if (val == 'random') {
		a = Math.round(random(-3, 3) * 1000) / 1000
		b = Math.round(random(-3, 3) * 1000) / 1000
		c = Math.round(random(-4, 4) * 1000) / 1000
		d = Math.round(random(-3, 3) * 1000) / 1000
	} else if (val == 'custom') {
		a = inputA.value()
		b = inputB.value()
		c = inputC.value()
		d = inputD.value()
	} else {
		;({ a, b, c, d } = favs[val])
	}

	prevX = random(m)
	prevY = random(m)

	let i = 0
	while (i < 10) {
		let x = sin(a * prevY) - cos(b * prevX)
		let y = sin(c * prevX) - cos(d * prevY)
		prevX = x
		prevY = y
		i++
	}
}

function setColors() {
	let c = colsRadio.value()
	if (c == 'color') {
		let hue1 = random(360)
		let hue2 = random(hue1, hue1 + 200) % 360
		c1 = color(hue1, random(80, 100), random(70, 100))
		c2 = color(hue2, random(80, 100), random(70, 100))
		fill(c1)
		rect(width - 100, height - 20, 10, 10)
		fill(c2)
		rect(width - 80, height - 20, 10, 10)
	} else {
		c1 = color(0, 0, 0)
		c2 = color(0, 0, 0)
	}
}

function setupFlowField() {
	background(0, 0, 5)

	setAttractors()
	setColors()

	fill(50)
	text(`a: ${a}`, width - 100, height - 100)
	text(`b: ${b}`, width - 100, height - 80)
	text(`c: ${c}`, width - 100, height - 60)
	text(`d: ${d}`, width - 100, height - 40)

	diag = dist(0, 0, m, m)
}

function drawLines() {
	push()
	translate((width - m) / 2, (height - m) / 2)
	translate(m / 2, m / 2)
	noFill()
	stroke(10, 10, 10, 0.009)

	let j = 0
	while (j < nSteps) {
		let x = sin(a * prevY) - cos(b * prevX)
		let y = sin(c * prevX) - cos(d * prevY)

		let s = scalePoint(x, y)
		let p = scalePoint(prevX, prevY)

		let dst = dist(x, y, prevX, prevY)
		let col = lerpColorByHue(c1, c2, dst / 2.82842)
		col.setAlpha(0.009)
		stroke(col)
		line(s.x, s.y, p.x, p.y)

		prevX = x
		prevY = y

		j++
	}
	pop()
}

function drawCircles() {
	push()
	translate((width - m) / 2, (height - m) / 2)
	translate(m / 2, m / 2)
	noStroke()
	c1.setAlpha(0.5)
	fill(c1)

	let j = 0
	while (j < nSteps) {
		let x = sin(a * prevY) - cos(b * prevX)
		let y = sin(c * prevX) - cos(d * prevY)

		prevX = x
		prevY = y

		circle(x * m * 0.25, y * m * 0.25, 2)
		j++
	}

	pop()
}

function drawPoints() {
	push()
	translate((width - m) / 2, (height - m) / 2)
	translate(m / 2, m / 2)
	noFill()

	let j = 0
	while (j < nSteps) {
		let x = sin(a * prevY) - cos(b * prevX)
		let y = sin(c * prevX) - cos(d * prevY)

		let xScl = x * m * 0.25
		let yScl = y * m * 0.25
		let dst = dist(x, y, prevX, prevY)
		let col = lerpColorByHue(c1, c2, abs(x - prevX) / 2)

		col.setAlpha(0.5)
		stroke(col)

		prevX = x
		prevY = y

		point(xScl, yScl)

		j++
	}
	pop()
}

function scalePoint(x, y, s = 0.25) {
	return { x: x * s * m, y: y * s * m }
}

function getArrayOfPoints(n = 1000) {
	let arr = []
	let j = 0
	while (j < n) {
		let x = sin(a * prevY) - cos(b * prevX)
		let y = sin(c * prevX) - cos(d * prevY)

		prevX = x
		prevY = y

		arr.push([x, y])
		j++
	}
	return arr
}

function draw() {
	let t = typeSelect.el.value()
	if (t == 'points') {
		drawPoints()
	} else if (t == 'circles') {
		drawCircles()
	} else if (t == 'lines') {
		drawLines()
	}
}

function buildControls() {
	controls = new Controls()

	let genPanel = controls.addPanel({ titleString: 'general' })
	let attractPanel = controls.addPanel({ titleString: 'custom attractors' })

	typeSelect = controls.createSelect({
		id: 'type-sel',
		labelString: 'type',
		options: options.type,
		selected: 'points',
		onChange: setupFlowField,
		parent: genPanel,
	})

	let vals = []
	favs.forEach((f, i) => {
		vals.push({ name: `preset ${i}`, val: i })
	})
	vals.push({ name: 'random', val: 'random' })
	vals.push({ name: 'custom', val: 'custom' })
	valsSelect = controls.createSelect({
		id: 'vals-sel',
		labelString: 'attractors',
		options: vals,
		onChange: setupFlowField,
		namesAndVals: true,
		selected: 'random',
		parent: genPanel,
	})

	colsRadio = controls.createRadio({
		labelString: 'colors',
		options: ['bw', 'color'],
		selected: 'color',
		onChange: setupFlowField,
		parent: genPanel,
	})

	let btns = controls.createBtnSet({
		btns: [
			{ onClick: setupFlowField, labelString: 'restart' },
			{ onClick: () => saveCanvas(), labelString: 'save' },
		],
	})

	controls.createText({
		text: 'make sure "custom" is selected in general panel and click "restart". not all combinations will create interesting results!',
		parent: attractPanel,
	})
	inputA = controls.createSlider({
		labelString: 'a',
		min: -4,
		max: 4,
		step: 0.001,
		parent: attractPanel,
	})
	inputB = controls.createSlider({
		labelString: 'b',
		min: -4,
		max: 4,
		step: 0.001,
		parent: attractPanel,
	})
	inputC = controls.createSlider({
		labelString: 'c',
		min: -4,
		max: 4,
		step: 0.001,
		parent: attractPanel,
	})
	inputD = controls.createSlider({
		labelString: 'd',
		min: -4,
		max: 4,
		step: 0.001,
		parent: attractPanel,
	})
}

window.setup = setup
window.draw = draw
