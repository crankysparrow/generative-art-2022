import { paletteFromUrl } from '../utils/utils.js'
import { Controls } from '../utils/Controls.js'
import { ShapesLayer, generateShapes } from './03-layers.ts'

let palette, controls, paletteSelect
let layers = []

let urls = [
	'https://coolors.co/d9f0ff-a3d5ff-83c9f4-6f73d2-7681b3',
	'https://coolors.co/1a535c-4ecdc4-f7fff7-fbb5b1-ff6b6b',
	'https://coolors.co/4059ad-6b9ac4-97d8c4-eff2f1-f4b942',
	'https://coolors.co/f9c80e-2b50aa-ff9fe5-43bccd-ff858d',
]

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	shuffle(urls)
	palette = paletteFromUrl(urls[0]).map((c) => color(c))
	layers = generateShapes(palette)
	makeControls()
	noLoop()
}

function draw() {
	noFill()
	strokeWeight(0.5)
	background(20)
	translate(width / 2, height / 2)
	layers.forEach((layer) => layer.draw())
}

function setLayerColors(doRedraw = true) {
	layers.forEach((layer) => (layer.color = random(palette)))
	if (doRedraw) redraw()
}

function reset(setPalette = true, setLayers = true, paletteIndex = false) {
	if (setPalette) {
		paletteIndex = paletteIndex ? paletteIndex : floor(random(urls.length))
		palette = paletteFromUrl(urls[paletteIndex]).map((c) => color(c))
		paletteSelect.el.selected(paletteIndex)
	}

	if (setLayers) {
		layers = generateShapes(palette)
	}
	setLayerColors()
}

function makeControls() {
	controls = new Controls()
	paletteSelect = controls.createSelect({
		labelString: 'palette',
		options: urls,
		useOptionsIndex: true,
		selected: 0,
		onChange: () => reset(true, false, paletteSelect.el.selected()),
	})

	controls.createBtnSet({
		btns: [
			{
				labelString: 'randomize colors',
				onClick: setLayerColors,
			},
			{ labelString: 'save', onClick: saveCanvas },
			{
				labelString: 'new image',
				onClick: () => reset(true, true),
			},
		],
	})
}

window.setup = setup
window.draw = draw
