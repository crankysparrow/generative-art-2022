import { paletteFromUrl } from '../utils/utils.js'
import { Controls } from '../utils/Controls.js'

let m, palette, controls, btn, slider
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

	controls = new Controls()
	btn = controls.createBtn({
		labelString: 'add layer',
		onClick: () => layers.push(layer()),
	})
	slider = controls.createSlider({
		id: 'radius',
		labelString: 'radius',
		min: floor(m * 0.1),
		max: floor(m * 0.6),
	})

	layers.push(layer())
}

function draw() {
	background(20)
	translate(width / 2, height / 2)

	layers.forEach((l) => shapesss(l))
}

function layer() {
	let sides = random([3, 4, 5, 6, 7])
	let radius = sides > 5 ? random(m * 0.2, m * 0.5) : random(m * 0.5)
	let n = radius > m * 0.15 ? random(1, 10) : random(10, 35)

	let settings = {
		rotation: random(PI / 2),
		radius,
		sides,
		n,
		col: random(palette),
		alph: 80,
	}

	return settings
}

function shapesss({ rotation, radius, sides = 5, n = 4, col, alph = 100 }) {
	let circleSides = sides
	let i = 0
	let angle = TWO_PI / circleSides

	let c = color(col)
	c.setAlpha(alph)
	strokeWeight(1)
	stroke(c)

	push()
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

window.addEventListener('keypress', (e) => {
	if (e.code == 'Space') {
		e.preventDefault()
		redraw()
	}
})

window.setup = setup
window.draw = draw
