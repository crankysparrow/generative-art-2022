import * as p5 from 'p5'

// https://mathcurve.com/courbes2d.gb/lame/lame.shtml
// https://en.wikipedia.org/wiki/Superellipse
// (abs(x/a))^n + (abs(y/b))^n = 1
// (abs(y/b))^n = 1 - (abs(x/a))^n
// abs(y/b) = pow(1 - (abs(x/a))^n, 1 / n)

function setup() {
	// let m = min(window.innerWidth, window.innerHeight)
	createCanvas(400, 400)
	rectMode(CENTER)
	noLoop()
}

function draw() {
	background(0)
	strokeWeight(1)
	stroke(255)
	noFill()

	let squares = 2
	let step = width / squares

	for (let x = 0; x < squares; x++) {
		for (let y = 0; y < squares; y++) {
			push()
			translate(x * step, y * step)
			translate(step / 2, step / 2)
			curves(step * 0.9, step * 0.9)
			pop()
		}
	}
}

function lamé(w, h) {
	let n = 5
	let x = -2
	let vals = []
	let a = 1
	let b = 0.7

	beginShape()
	while (x <= 2) {
		let y = pow(1 - pow(abs(x / a), n), 1 / n) * b
		let px = x * w * 0.45
		// let px = map(x, -2, 2, -w / 2, w / 2)
		// --> this is the same as x * w * scaleX if scaleX = 0.25

		// let py = y * h * map(1 - (n - 1) / 6, 0, 1, scaleY_min, scaleY_max)
		let py = y * h * 0.45
		vals.unshift([px, -py])
		vertex(px, py)
		x += 0.01
		x = round(x, 2) // JS precision issues, we need the point at exactly x = 2
	}

	vals.forEach(([x, y]) => vertex(x, y))
	endShape()
}

function curves(w, h) {
	let scaleX_min = random(0.13, 0.16)
	let scaleX_max = random(0.17, 0.22)
	let scaleY_min = random(0.3, 0.4)
	let scaleY_max = random(0.41, 0.49)
	let n_max = round(random(7, 15), 1)
	let n_min = round(random(1.5, 5), 1)
	let steps = 20

	let c = 0
	while (c <= 1) {
		let n = map(easeInCubic(c), 0, 1, n_min, n_max)
		let x = -2
		let vals = []

		beginShape()
		while (x <= 2) {
			let y = pow(1 - pow(abs(x / 2), n), 1 / n)
			let px = x * w * map((n - 1) / 6, 0, 1, scaleX_min, scaleX_max)
			// i have no memory of how i arrived at this (n-1) / 6 thing
			// it is driving me nuts lol

			let py = y * h * map(1 - (n - 1) / 6, 0, 1, scaleY_min, scaleY_max)
			vals.unshift([px, -py])
			vertex(px, py)
			x += 0.01
			x = round(x, 2) // JS precision issues, we need the point at exactly x = 2
		}

		vals.forEach(([x, y]) => vertex(x, y))
		endShape()

		c += 1 / steps
	}
}

function easeInCubic(x: number): number {
	return x * x * x
}

// @ts-ignore
window.setup = setup
// @ts-ignore
window.draw = draw
window.mousePressed = () => redraw()
