import lerpColorByHue from '../utils/lerpColorByHue.js'

let a, b, c, d, numSteps, prevX, prevY
let prevX1, prevY1, prevX2, prevY2, totalFrames, nSteps, m, diag, c1, c2

let palette = ['#008148', '#EF2917']
let favs = [
	{ a: 1.1, b: 3.09, c: -1.6, d: 3.31 },
	{ a: 1.1, b: 2.08, c: 1.6, d: 3.31 },
]

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	a = Math.round(random(-2, 2) * 1000) / 1000
	b = Math.round(random(-3, 3) * 1000) / 1000
	c = Math.round(random(-4, 4) * 1000) / 1000
	d = Math.round(random(-2, 2) * 1000) / 1000

	nSteps = 1000
	m = min(width, height) * 0.9
	prevX = random(m)
	prevY = random(m)
	prevX1 = random(m)
	prevY1 = random(m)

	text(`a: ${a}`, width - 100, height - 100)
	text(`b: ${b}`, width - 100, height - 80)
	text(`c: ${c}`, width - 100, height - 60)
	text(`d: ${d}`, width - 100, height - 40)

	colorMode(HSB)

	c1 = color(random(360), random(80, 100), random(60, 100))
	c2 = color(random(360), random(80, 100), random(60, 100))
	diag = dist(0, 0, m, m)

	let i = 0
	while (i < 10) {
		let x = sin(a * prevY) - cos(b * prevX)
		let y = sin(c * prevX) - cos(d * prevY)
		prevX2 = prevX1
		prevY2 = prevY1
		prevX1 = prevX
		prevY1 = prevY
		prevX = x
		prevY = y
		i++
	}
}

function drawOne() {
	translate((width - m) / 2, (height - m) / 2)
	translate(m / 2, m / 2)
	noStroke()

	let j = 0
	stroke(55, 200, 20, 20)
	noFill()

	while (j < nSteps) {
		let x = sin(a * prevY) - cos(b * prevX)
		let y = sin(c * prevX) - cos(d * prevY)
		let ds = dist(x, y, prevX, prevY)

		stroke(200, map(ds, 0, 2, 0, 155), 200, 20)
		beginShape()

		curveVertex(prevX2 * m * 0.25, prevY2 * m * 0.25)
		curveVertex(prevX2 * m * 0.25, prevY2 * m * 0.25)
		curveVertex(prevX1 * m * 0.25, prevY1 * m * 0.25)
		curveVertex(prevX * m * 0.25, prevY * m * 0.25)
		// curveVertex(prevX * m * 0.25, prevY * m * 0.25)
		curveVertex(prevX1 * m * 0.25, prevY1 * m * 0.25)
		curveVertex(random(-m / 2, m / 2), random(-m / 2, m / 2))
		curveVertex(prevX2 * m * 0.25, prevY2 * m * 0.25)
		curveVertex(prevX2 * m * 0.25, prevY2 * m * 0.25)
		endShape()

		prevX2 = prevX1
		prevY2 = prevY1
		prevX1 = prevX
		prevY1 = prevY
		prevX = x
		prevY = y

		j++
	}
	if (frameCount % 200 == 0) console.log(nSteps * frameCount)
}

function drawLines() {
	translate((width - m) / 2, (height - m) / 2)
	translate(m / 2, m / 2)
	noFill()
	stroke(10, 10, 10, 200)

	let j = 0
	while (j < nSteps) {
		let x = sin(a * prevY) - cos(b * prevX)
		let y = sin(c * prevX) - cos(d * prevY)

		line(x * m * 0.24, y * m * 0.24, prevX * m * 0.24, prevY * m * 0.24)

		prevX = x
		prevY = y

		j++
	}
}

function drawCircles() {
	translate((width - m) / 2, (height - m) / 2)
	translate(m / 2, m / 2)
	noStroke()
	fill(10, 10, 10, 20)

	let j = 0
	while (j < nSteps) {
		let x = sin(a * prevY) - cos(b * prevX)
		let y = sin(c * prevX) - cos(d * prevY)

		prevX = x
		prevY = y

		circle(x * m * 0.25, y * m * 0.25, 2)
		j++
	}
}

function drawCircles2() {
	translate((width - m) / 2, (height - m) / 2)
	translate(m / 2, m / 2)
	noFill()

	// drawingContext.filter = 'blur(2px)'

	let j = 0
	while (j < nSteps) {
		let x = sin(a * prevY) - cos(b * prevX)
		let y = sin(c * prevX) - cos(d * prevY)

		let xScl = x * m * 0.25
		let yScl = y * m * 0.25
		let dst = dist(xScl, yScl, prevX * m * 0.25, prevY * m * 0.25)
		let col = lerpColorByHue(c1, c2, dst / diag)
		col.setAlpha(0.05)
		stroke(col)

		prevX = x
		prevY = y

		point(xScl, yScl)

		// col.setAlpha(0.1)
		// fill(col)
		// let k = 0
		// while (k < 5) {
		// 	randomNess(xScl, yScl, 1, 3)
		// 	k++
		// }

		j++
	}
}

function randomNess(x, y, size, space) {
	circle(x + sin(random(PI)) * space, y + cos(random(PI)) * space, size)
}

function draw() {
	drawCircles2()
}

window.setup = setup
window.draw = draw
