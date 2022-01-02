import lerpColorByHue from '../utils/lerpColorHue.js'

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	colorMode(HSB)
	noLoop()
}

function draw() {
	let c1 = color(29, 100, 100)
	let c2 = color(250, 10, 100)
	let size = width / 100
	strokeWeight(size + 5)
	noFill()
	for (let i = 0; i < 100; i++) {
		let col = lerpColorByHue(c1, c2, i, false)
		stroke(col)
		line(size * i, 0, size * i, height)
	}

	noStroke()
	fill(c1)
	rect(0, 0, 100, 50)

	fill(c2)
	rect(width - 100, 0, width, 50)
}

window.setup = setup
window.draw = draw
