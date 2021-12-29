import { paletteFromUrl } from '../utils/utils.js'
import { AllTheCircles } from '../utils/Circles.js'
import { Controls } from '../utils/Controls.js'

// window.addEventListener('unload', console.clear)
// if (module.hot) {
// 	module.hot.dispose(() => {
// 		window.location.reload()
// 	})
// }

let circles, palette, controls, paletteCurrent, m, paletteInput
// let url = 'https://coolors.co/985f99-9684a1-aaacb0-b6c9bb-bfedc1-f2ff49-ff4242'
// let url = 'https://coolors.co/32de8a-5e807f-74226c-4b2142-dee2f7-19191d-252541'
// let url = 'https://coolors.co/32de8a-5e807f-4b2142-19191d-252541'
// let url = 'https://coolors.co/011936-465362-82a3a1'
let url = 'https://coolors.co/f94144-f3722c-f8961e-f9844a-f9c74f-90be6d-43aa8b-4d908e-577590-277da1'

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	buildControls()

	palette = shuffle(paletteFromUrl(url))
	paletteCurrent = shuffle(palette)

	noLoop()
}

// window.addEventListener('unload', console.clear)
// if (module.hot) {
// 	module.hot.dispose(() => {
// 		window.location.reload()
// 	})
// }

function buildControls() {
	controls = new Controls()

	paletteInput = controls.createPaletteInput({
		id: 'paletteinput',
		labelString:
			'for a <strong>custom palette</strong>, enter a url from <a href="http://coolors.co">coolors.co</a>: ',
		onPaletteUpdate: (p) => {
			paletteCurrent = p
			redraw()
		},
	})
}

function makeCircles() {
	m = floor(min(width, height))

	circles = new AllTheCircles({
		size: m,
		width: width,
		height: height,
		overlapEdges: false,
		multMin: 0.04,
		multMax: 0.1,
		space: 5,
		build: false,
		stepSize: 10,
		attemptsEachStep: 200,
	})

	let s = 0.2
	while (s > 0.1) {
		circles.newCircle(Math.floor(m * s))
		s -= 0.02
	}
	while (s > 0.06) {
		circles.newCircle(Math.floor(m * s))
		s -= 0.005
	}
	circles.circleTime()
}

function draw() {
	makeCircles()
	noStroke()

	paletteCurrent = shuffle(palette)

	background(paletteCurrent.splice(0, 1))

	let colorLines = paletteCurrent.splice(0, 1)
	let colorFills = paletteCurrent.splice(0, 1)

	let len = circles.circles.length

	circles.circles.forEach((c, i) => {
		fill(colorFills)
		noStroke()
		circle(c.x, c.y, c.d)

		if (i > len / 2 && random() < 0.5) {
			let c2 = circles.circles[floor(random(len / 2))]
			if (dist(c.x, c.y, c2.x, c2.y) > m * 0.5) {
				return
			}

			fill(colorLines)
			circle(c.x, c.y, c.d * 0.4)
			circle(c2.x, c2.y, c2.d * 0.4)

			strokeWeight(floor(m * 0.005))
			stroke(colorLines)
			noFill()
			line(c.x, c.y, c2.x, c2.y)
		}
	})
}

function windowResized() {
	resizeCanvas(window.innerWidth, window.innerHeight)
	makeCircles()
}

window.setup = setup
window.draw = draw
window.windowResized = windowResized

window.addEventListener('keypress', (e) => {
	if (e.code == 'Space') {
		e.preventDefault()
		// makeCircles()
		redraw()
	}
})
