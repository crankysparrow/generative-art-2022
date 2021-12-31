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
	colorSelect,
	previewLayer,
	previewLayerOpts,
	previewStatus,
	randomBtn,
	mode,
	modeSelect,
	paletteSelect
let layers = []
window.layers = layers
let urls = [
	'https://coolors.co/d9f0ff-a3d5ff-83c9f4-6f73d2-7681b3',
	'https://coolors.co/1a535c-4ecdc4-f7fff7-fbb5b1-ff6b6b',
	'https://coolors.co/b38cb4-b7918c-c5a48a-ddc67b-f8f272',
	'https://coolors.co/4059ad-6b9ac4-97d8c4-eff2f1-f4b942',
]
palette = paletteFromUrl(urls[1])

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	noFill()
	m = min(width, height) * 0.8
	mode = 'polygons'
	makeControls()
	// layers.push(layer({}))
	prettyRandom()
	frameRate(1)
}

function prettyRandomize(radius) {
	radius = radius ?? random(m * 0.41, m * 0.01)
	let sides = radius > m * 0.25 ? random([3, 4]) : random([3, 4, 5])
	layers.push(
		layer({
			radius,
			sides,
			n: sides > 3 ? random(2, 100) : random(10, 200),
			alph: radius > m * 0.25 ? random(30, 50) : random(50, 100),
			rotation: radius > m * 0.25 ? random(0.001, 1) : random(0.8, 1.5),
		})
	)
}

function randomize(n, pretty = false) {
	let i = 0
	while (i < n) {
		if (pretty) {
			prettyRandomize()
		} else {
			layers.push(layer({}))
		}
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
	let paletteVal = colorSelect.el.value()
	mode = modeSelect.el.value()

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
	if (modeSelect) {
		mode = modeSelect.el.value()
	}
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
			if (mode == 'polygons') {
				vertex(x, y)
			} else {
				line(0, 0, x, y)
			}
		}
		endShape(CLOSE)
		i++
	}
	pop()
}

function prettyRandom() {
	layers = []
	let i = 0.41

	while (i > 0.01) {
		let radius = m * i
		prettyRandomize(radius)
		i -= 0.08
	}
}

window.addEventListener('keypress', (e) => {
	if (e.code == 'Space') {
		prettyRandom()
	}
})

function makeControls() {
	controls = new Controls()
	let layerPanel = controls.addPanel({ titleString: 'add layers' })
	let layerPanelOpts = createDiv().parent(layerPanel)
	let generalPanel = controls.addPanel({ titleString: 'general settings' })
	radSlider = controls.createSlider({
		id: 'radius',
		labelString: 'radius',
		min: floor(m * 0.01),
		max: floor(m * 0.6),
		parent: layerPanelOpts,
		onChange: previewIfActive,
	})
	sidesSlider = controls.createSlider({
		parent: layerPanelOpts,
		labelString: 'numSides',
		min: 3,
		max: 7,
		step: 1,
		onChange: previewIfActive,
	})
	nSlider = controls.createSlider({
		parent: layerPanelOpts,
		labelString: 'n',
		min: 1,
		max: 200,
		step: 1,
		onChange: previewIfActive,
	})
	rotationSlider = controls.createSlider({
		parent: layerPanelOpts,
		labelString: 'rotation',
		min: 0.2,
		max: 100,
		step: 0.05,
		onChange: previewIfActive,
	})
	alphaSlider = controls.createSlider({
		parent: layerPanelOpts,
		labelString: 'alpha',
		min: 1,
		max: 100,
		step: 1,
		onChange: previewIfActive,
	})

	paletteSelect = controls.createSelect({
		id: 'palette-sel',
		labelString: 'palette',
		options: urls,
		useOptionsIndex: true,
		selected: 1,
		parent: generalPanel,
		onChange: (e) => {
			colorSelect.container.remove()
			palette = paletteFromUrl(urls[paletteSelect.el.value()])
			colorSelect = newColorSelect()
			layers.forEach((l) => {
				l.col = random(palette)
			})
		},
	})
	colorSelect = newColorSelect()

	modeSelect = controls.createSelect({
		id: 'mode-sel',
		labelString: 'mode',
		options: ['polygons', 'lines'],
		selected: mode,
		onChange: previewIfActive,
		parent: generalPanel,
	})

	function newColorSelect() {
		return controls.createSelect({
			id: 'color-sel',
			labelString: 'color',
			options: [...palette, 'random'],
			selected: 'random',
			onChange: previewIfActive,
			parent: layerPanelOpts,
		})
	}

	let layerBtnContainer = createDiv().parent(layerPanel)
	previewStatus = createDiv('preview: inactive').parent(layerBtnContainer).style('text-align', 'right')

	btns = controls.createBtnSet({
		btns: [
			{ labelString: 'preview layer', onClick: preview },
			{ labelString: 'add layer with current settings', onClick: addLayer },
			{ labelString: 'add 5 random', onClick: () => randomize(5) },
			{ labelString: 'add 1 random', onClick: () => randomize(1) },
			{ labelString: 'add pretty random', onClick: () => randomize(1, true) },
		],
		parent: layerBtnContainer,
	})
	btns2 = controls.createBtnSet({
		btns: [
			{ labelString: 'clear', onClick: clear },
			{ labelString: 'save', onClick: () => saveCanvas() },
			{ labelString: 'clear & randomize with pretty settings', onClick: prettyRandom },
		],
		// style: { 'margin-top': '5px', 'border-top': '1px solid' },
		className: 'break',
	})
}

window.setup = setup
window.draw = draw
