let tiles = []
let m, step

function setup() {
	createCanvas(min(window.innerWidth, 500), min(window.innerHeight, 500))
	// createCanvas(window.innerWidth, window.innerHeight)
	createLoop({ duration: 2 })

	m = min(width, height) * 0.6
	step = m * 0.2
}

function draw() {
	blendMode(BLEND)
	background(0)
	let t = animLoop.progress

	noFill()
	strokeWeight(2)
	stroke(0, 200, 100)

	rectMode(CENTER)
	strokeCap(SQUARE)

	let centerSqSize = (0.5 - t) * width
	let c = createVector(width * 0.5, height * 0.5)

	c.mult(0.5)
	rect(c.x, c.y, centerSqSize * 0.5)

	let smallSqSize = t * width * 2

	// let px = max(2 * t - 1.25, 0.25)
	let px = max(t - 0.25, 0.25)
	let py = 0.75
	let x1 = px * width
	let x2 = 0.25 * width
	let y1 = height * py
	mirrorLines(x1 * 0.5, x2 * 0.5, y1 * 0.5)

	let pxx = 0.25
	// let pyy = min(2 * t + 0.25, 0.75)
	let pyy = min(t + 0.25, 0.75)
	let yy1 = height * pyy
	let yy2 = height * 0.25
	let xx = width * pxx
	mirrorLines(yy1 * 0.5, yy2 * 0.5, xx * 0.5)

	rect(width * 0.75, height * 0.75, centerSqSize * 0.5)
	rect(width * 0.75, height * 0.25, centerSqSize * 0.5)
	rect(width * 0.25, height * 0.75, centerSqSize * 0.5)

	rect(width * 0.5, height, smallSqSize * 0.5)
	rect(width, height * 0.5, smallSqSize * 0.5)
	rect(width * 0.5, 0, smallSqSize * 0.5)
	rect(0, height * 0.5, smallSqSize * 0.5)

	// blendMode(DIFFERENCE)
	// fill(0, 200, 100)
	// noStroke()

	rect(width * 0.5, height, smallSqSize * 0.5 + width)
	rect(width, height * 0.5, smallSqSize * 0.5 + width)
	rect(width * 0.5, 0, smallSqSize * 0.5 + width)
	rect(0, height * 0.5, smallSqSize * 0.5 + width)

	stroke(0, 100, 200)
	let diagCorner = width * 0.5 - t * width

	let diagCenter = width * 0.5 - t * width * 0.5
	diagCenter *= 2
	diagCenter = min(width / 2, diagCenter)

	line(diagCenter, diagCenter, diagCorner, diagCorner)
	line(width - diagCenter, width - diagCenter, width - diagCorner, height - diagCorner)
	line(diagCenter, width - diagCenter, diagCorner, width - diagCorner)
	line(width - diagCenter, diagCenter, width - diagCorner, diagCorner)

	// strokeWeight(10)
	// point(diagCenter, diagCenter)
}

function mirrorLines(x1, x2, y) {
	line(x1, y, x2, y)
	line(width - x1, height - y, width - x2, height - y)

	line(y, x1, y, x2)
	line(height - y, width - x1, height - y, width - x2)

	line(width - x1, y, width - x2, y)
	line(y, width - x1, y, width - x2)

	line(height - y, x1, height - y, x2)
	line(x1, height - y, x2, height - y)
}

window.setup = setup
window.draw = draw
