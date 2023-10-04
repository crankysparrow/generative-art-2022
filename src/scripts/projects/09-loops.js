let tiles = []
let m, step

function setup() {
	createCanvas(min(window.innerWidth, 500), min(window.innerHeight, 500))
	// createCanvas(window.innerWidth, window.innerHeight)
	createLoop({ duration: 2 })

	m = min(width, height) * 0.6
	step = m * 0.2

	rectMode(CENTER)
	strokeCap(SQUARE)
}

function drawing(t, w, h, x = 0, y = 0) {
	push()
	translate(x, y)
	noFill()
	strokeWeight(2)
	stroke(0, 200, 100)

	let centerSqSize = (0.5 - t) * w
	let smallSqSize = t * w * 2

	// let px = max(2 * t - 1.25, 0.25)
	let px = max(t - 0.25, 0.25)
	let py = 0.75
	let x1 = px * w
	let x2 = 0.25 * w
	let y1 = h * py
	mirrorLines(x1 * 0.5, x2 * 0.5, y1 * 0.5, w, h)

	let pxx = 0.25
	// let pyy = min(2 * t + 0.25, 0.75)
	let pyy = min(t + 0.25, 0.75)
	let yy1 = h * pyy
	let yy2 = h * 0.25
	let xx = w * pxx
	mirrorLines(yy1 * 0.5, yy2 * 0.5, xx * 0.5, w, h)

	rect(w * 0.25, h * 0.25, centerSqSize * 0.5)
	rect(w * 0.75, h * 0.75, centerSqSize * 0.5)
	rect(w * 0.75, h * 0.25, centerSqSize * 0.5)
	rect(w * 0.25, h * 0.75, centerSqSize * 0.5)

	rect(w * 0.5, h, smallSqSize * 0.5)
	rect(w, h * 0.5, smallSqSize * 0.5)
	rect(w * 0.5, 0, smallSqSize * 0.5)
	rect(0, h * 0.5, smallSqSize * 0.5)

	stroke(0, 100, 200)
	let diagCorner = w * 0.5 - t * w
	let diagCenter = w * 0.5 - t * w * 0.5
	diagCenter *= 2
	diagCenter = min(w / 2, diagCenter)

	line(diagCenter, diagCenter, diagCorner, diagCorner)
	line(w - diagCenter, w - diagCenter, w - diagCorner, h - diagCorner)
	line(diagCenter, w - diagCenter, diagCorner, w - diagCorner)
	line(w - diagCenter, diagCenter, w - diagCorner, diagCorner)

	pop()
}

function draw() {
	background(0)
	let t = animLoop.progress
	drawing(t, width, height)

	// drawing(t, width * 0.5, height * 0.5, 0, 0)
	// drawing(t, width * 0.5, height * 0.5, width * 0.5, 0)
	// drawing(t, width * 0.5, height * 0.5, 0, height * 0.5)
	// drawing(t, width * 0.5, height * 0.5, width * 0.5, height * 0.5)
}

function mirrorLines(x1, x2, y, w = width, h = height) {
	line(x1, y, x2, y)
	line(w - x1, h - y, w - x2, h - y)

	line(y, x1, y, x2)
	line(h - y, w - x1, h - y, w - x2)

	line(w - x1, y, w - x2, y)
	line(y, w - x1, y, w - x2)

	line(h - y, x1, h - y, x2)
	line(x1, h - y, x2, h - y)
}

window.setup = setup
window.draw = draw
