// import * as p5 from 'p5'
import { Controls } from '../utils/controls2.ts'

let settings = {
	n: 10,
	circleSize: 0.8,
}

let step, m

function setup() {
	createCanvas(500, 500)
	m = width * 0.9
	step = m / settings.n

	makeControls()
}

function draw() {
	background(0)

	translate((width - m) / 2, (height - m) / 2)
	stroke(255)
	noFill()

	for (let y = 0; y < settings.n; y++) {
		for (let x = 0; x < settings.n; x++) {
			push()
			translate(x * step, y * step)
			circle(step / 2, step / 2, step * settings.circleSize)
			pop()
		}
	}
}

function makeControls() {
	let c = new Controls()

	// c.createSlider(settings, 'n')
}

window.setup = setup
window.draw = draw
