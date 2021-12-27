import { paletteFromUrl } from './utils/utils.js'
import { AllTheCircles } from './utils/Circles.js'
import { Controls } from './utils/Controls.js'

window.addEventListener('unload', console.clear)
if (module.hot) {
	module.hot.dispose(() => {
		window.location.reload()
	})
}

let circles, palette, controls, urlInput
let url = 'https://coolors.co/985f99-9684a1-aaacb0-b6c9bb-bfedc1-f2ff49-ff4242'

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	makeCircles()

	controls = new Controls()

	paletteInput = controls.createPaletteInput({
		id: 'paletteinput',
		labelString:
			'for a <strong>custom palette</strong>, enter a url from <a href="http://coolors.co">coolors.co</a>: ',
		onPaletteUpdate: (p) => {
			palette = p
			makeCircles()
			redraw()
		},
	})

	palette = shuffle(paletteFromUrl(url))
	noLoop()
}

function makeCircles() {
	let m = min(width, height)

	circles = new AllTheCircles({ size: m, width, height, overlapEdges: true })
}

function draw() {
	background(palette.splice(0, 1))
	noStroke()

	circles.circles.forEach((c) => {
		fill(random(palette))
		circle(c.x, c.y, c.d)
	})
}

function windowResized() {
	resizeCanvas(window.innerWidth, window.innerHeight)
	makeCircles()
}

window.setup = setup
window.draw = draw
window.windowResized = windowResized
