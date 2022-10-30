import lerpColorByHue from '../utils/lerpColorByHue.js'

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	colorMode(HSB)
	noLoop()
}

function draw() {
	// let c1 = color(29, 100, 100)
	let c1 = color('#ffa200')
	let c2 = color('#f2029a')
	// let c2 = color(250, 10, 100)
	let step = 10
	let size = width / step
	strokeWeight(size + 5)
	noFill()

	for (let i = 0; i < step; i++) {
		let col = lerpColorByHue(c1, c2, i / step, false)
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
