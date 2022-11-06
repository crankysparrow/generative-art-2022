import { Controls } from '../utils/controls2.ts'

let settings = {
	count: 4,
	color: [200, 255, 100],
	rotated: false,
}

function setup() {
	let m = min(window.innerWidth, window.innerHeight)
	createCanvas(m, m)
	background(0)
	fill(255)

	makeControls()
}

function draw() {
	let outerSize = width * 0.6
	let step = outerSize / (settings.count - 1)

	if (settings.rotated) {
		translate(width / 2, height / 2)
		rotate(PI / 4)
		translate(-outerSize / 2, -outerSize / 2)
	} else {
		translate((width - outerSize) / 2, (height - outerSize) / 2)
	}

	for (let x = 0; x < settings.count; x++) {
		for (let y = 0; y < settings.count; y++) {
			push()

			translate(x * step, y * step)
			fill(settings.color)
			noStroke()
			circle(0, 0, step * 0.5)

			pop()
		}
	}
}

function makeControls() {
	let c = new Controls()

	// c.createSlider(settings, 'count', {
	// 	min: 1,
	// 	max: 30,
	// 	step: 1,
	// })
}

window.setup = setup
window.draw = draw
