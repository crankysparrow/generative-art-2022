import { paletteFromUrl } from '../utils/utils.js'
import { Controls } from '../utils/Controls.js'

let m,
	palette,
	controls,
	radSlider,
	addLayerSection,
	sidesSlider,
	nSlider,
	rotationSlider,
	alphaSlider,
	btns,
	btns2,
	paletteSelect,
	previewLayer,
	previewLayerOpts,
	previewStatus,
	randomBtn
let layers = []
window.layers = layers
let urls = [
	'https://coolors.co/d9f0ff-a3d5ff-83c9f4-6f73d2-7681b3',
	'https://coolors.co/1a535c-4ecdc4-f7fff7-fbb5b1-ff6b6b',
]
palette = paletteFromUrl(urls[1])

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	noFill()
	m = min(width, height) * 0.8
	makeControls()
	// layers.push(layer({}))
	prettyRandom()
}

function randomize() {
	let i = 0
	while (i < 10) {
		layers.push(layer({}))
		i++
	}
}

function clear() {
	layers = []
	redraw()
}

function previewIfActive() {
	if (previewLayer) {
		preview()
	}
}

function preview(e) {
	let paletteVal = paletteSelect.value()

	previewLayerOpts = {
		sides: sidesSlider.value(),
		radius: radSlider.value(),
		n: nSlider.value(),
		rotation: rotationSlider.value(),
		col: paletteVal == 'random' ? random(palette) : paletteVal,
		alph: alphaSlider.value(),
	}
	previewLayer = layer(previewLayerOpts)
	previewStatus.html('preview: active')
}

function addLayer() {
	if (previewLayer) {
		layers.push(previewLayer)
		previewLayer = null
		previewStatus.html('preview: inactive')
	}
}

function draw() {
	background(20)
	translate(width / 2, height / 2)

	layers.forEach((l) => shapesss(l))

	if (previewLayer) {
		shapesss(previewLayer)
	}
}

function layer({ sides, radius, n, rotation, col, alph, initialRotate }) {
	sides = sides ?? random([3, 4, 5, 6, 7])
	radius = radius ? radius : sides > 5 ? random(m * 0.2, m * 0.5) : random(m * 0.5)
	alph = alph ?? random(50, 150)
	n = n ?? random(10, 200)
	rotation = rotation ? (rotation / 100) * (PI / 2) : random(PI / 2)
	col = col ?? random(palette)
	initialRotate = initialRotate ?? random(PI)

	let settings = {
		rotation,
		radius,
		sides,
		n,
		col,
		alph,
	}

	return settings
}

function shapesss({ rotation, radius, sides = 5, n = 4, col, alph = 100, initialRotate }) {
	let circleSides = sides
	let i = 0
	let angle = TWO_PI / circleSides

	let c = color(col)
	c.setAlpha(alph)
	strokeWeight(1)
	stroke(c)

	push()
	rotate(initialRotate)
	while (i < n) {
		rotate(rotation)
		beginShape()
		for (let i = 0; i <= circleSides; i++) {
			let x = cos(angle * i) * radius
			let y = sin(angle * i) * radius
			vertex(x, y)
		}
		endShape(CLOSE)
		i++
	}
	pop()
}

function prettyRandom() {
	layers = []
	// let radius = m * 0.5
	// let rMin = m * 0.03
	let i = 0.41

	while (i > 0.01) {
		let radius = m * i
		let sides = radius > m * 0.25 ? random([3, 4]) : random([3, 4, 5])
		layers.push(
			layer({
				radius,
				sides,
				// n: radius > m * 0.25 ? random(10, 200) : random(2, 100),
				n: sides > 3 ? random(2, 100) : random(10, 200),
				alph: radius > m * 0.25 ? random(30, 50) : random(50, 100),
				rotation: radius > m * 0.25 ? random(0.001, 1) : random(0.8, 1.5),
			})
		)
		i -= 0.08
	}

	console.log(layers)
}

window.addEventListener('keypress', (e) => {
	if (e.code == 'Space') {
		prettyRandom()
	}
})

function makeControls() {
	controls = new Controls()
	addLayerSection = controls.addSection({ labelString: 'new layer settings' })
	radSlider = controls.createSlider({
		id: 'radius',
		labelString: 'radius',
		min: floor(m * 0.01),
		max: floor(m * 0.6),
		parent: addLayerSection,
		onChange: previewIfActive,
	})
	sidesSlider = controls.createSlider({
		parent: addLayerSection,
		labelString: 'numSides',
		min: 3,
		max: 7,
		step: 1,
		onChange: previewIfActive,
	})
	nSlider = controls.createSlider({
		parent: addLayerSection,
		labelString: 'n',
		min: 1,
		max: 200,
		step: 1,
		onChange: previewIfActive,
	})
	rotationSlider = controls.createSlider({
		parent: addLayerSection,
		labelString: 'rotation',
		min: 0.2,
		max: 100,
		step: 0.05,
		onChange: previewIfActive,
	})
	alphaSlider = controls.createSlider({
		parent: addLayerSection,
		labelString: 'alpha',
		min: 1,
		max: 100,
		step: 1,
		onChange: previewIfActive,
	})
	paletteSelect = controls.createSelect({
		id: 'palette-sel',
		labelString: 'color',
		options: [...palette, 'random'],
		selected: 'random',
		onChange: previewIfActive,
		parent: addLayerSection,
	})

	previewStatus = createDiv('preview: inactive').parent(addLayerSection).style('text-align', 'right')

	btns = controls.createBtnSet([
		{ labelString: 'preview layer', onClick: preview },
		{ labelString: 'add layer', onClick: addLayer },
	])
	btns2 = controls.createBtnSet([
		{ labelString: 'add 10 random', onClick: randomize },
		{ labelString: 'draw pretty random', onClick: prettyRandom },
		{ labelString: 'clear', onClick: clear },
		{ labelString: 'save', onClick: () => saveCanvas() },
	])
}

window.setup = setup
window.draw = draw
