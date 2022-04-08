let angleSize
let points = []
let colf = { h: 215, s: 100, b: 70 }
let colb = { h: 225, s: 50, b: 30 }
let cols = { h: 180, s: 90, b: 100 }

function setup() {
	createCanvas(500, 500)
	angleMode(RADIANS)
	colorMode(HSB)
	angleSize = TWO_PI / 6
	getPoints()
	createLoop({ duration: 5 })
}

function draw() {
	background(0)
	one()
}

function one() {
	hexPattern(250, 250, 100, animLoop.progress)
}

function two() {
	let steps = 2
	let yStep = height / steps
	let radius = yStep * 0.5
	let xStep = sqrt(sq(radius) - sq(radius / 2)) * 2
	let nx = ceil(width / xStep)

	translate((width - nx * xStep) / 2 + xStep / 2, yStep / 2)

	for (let xi = 0; xi < nx; xi++) {
		for (let yi = 0; yi <= steps; yi++) {
			push()
			hexPattern(
				xi * xStep,
				yi * yStep,
				radius,
				(xi + yi) % 2 == 0 ? animLoop.progress : (animLoop.progress + 0.5) % 1
			)
			pop()
		}
	}
}

function three() {
	let steps = 5
	let yStep = floor(height / steps)
	let radius = yStep * 0.45
	let xStep = yStep
	let nx = floor(width / xStep)

	translate((width - nx * xStep) / 2 + xStep / 2, yStep / 2)

	for (let xi = 0; xi < nx; xi++) {
		for (let yi = 0; yi < steps; yi++) {
			push()
			let p = (animLoop.progress + (xi / nx) * 0.2) % 1
			hexPattern(xi * xStep, yi * yStep, radius, p, 2)
			pop()
		}
	}
}

function four() {
	hexPattern(250, 180, 150, animLoop.progress, 3)
}

function linesBack(start, end, ns, foreground = true, p, radius) {
	let amt = 1 - cp(p, start, end)
	if (amt <= 0 || p < start) {
		return
	}

	if (foreground) {
		stroke(colf.h, colf.s, colf.b)
	} else {
		stroke(colb.h, colb.s, colb.b)
	}

	ns.forEach((n, i) => {
		push()
		rotate(points[n].heading())
		line(0, 0, radius * amt, 0)
		pop()
	})
}

function linesOut(start, end, stayUntil, ns, foreground = true, p, radius) {
	if (p < start || p > stayUntil) return
	let int = (end - start) / 2
	foreground ? stroke(colf.h, colf.s, colf.b) : stroke(colb.h, colb.s, colb.b)
	ns.forEach((n, i) => {
		let amt = cp(p, start + int * i, start + int * (i + 1))
		push()
		rotate(points[n].heading())
		line(0, 0, radius * amt, 0)
		pop()
	})
}

//outer lines
function outerLines(start, end, stayUntil, p, radius) {
	if (p > stayUntil) return
	stroke(colf.h, colf.s, colf.b)
	let int = (end - start) / 6

	points.forEach((point, i) => {
		if (p < start + int * i) return
		push()
		translate(point.x, point.y)
		rotate(angleSize * -2 + angleSize * i)
		line(0, 0, radius * cp(p, start + int * i, start + int * (i + 1)), 0)
		pop()
	})
}

function embiggen(start, end, startSize, endSize, p) {
	if (p < start) return
	let amt = cp(p, start, end)
	stroke(colf.h, colf.s, colf.b, 1 - amt)

	amt = map(amt, 0, 1, startSize, endSize)

	beginShape()
	let f = points[0].copy().setMag(amt)
	vertex(f.x, f.y)
	for (let i = 1; i < points.length; i++) {
		let newPoint = points[i].copy().setMag(amt)
		vertex(newPoint.x, newPoint.y)
	}
	vertex(f.x, f.y)
	endShape()
}

function fadeSquare(start, end, p, side = 'left', alphaS = 0, alphaE = 0.5) {
	if (p < start) return
	let amt = cp(p, start, end)
	amt = map(amt, 0, 1, alphaS, alphaE)
	push()
	fill(cols.h, cols.s, cols.b, amt)
	noStroke()

	beginShape()
	vertex(0, 0)
	vertex(points[1].x, points[1].y)
	if (side == 'left') {
		vertex(points[2].x, points[2].y)
		vertex(points[3].x, points[3].y)
	} else {
		vertex(points[0].x, points[0].y)
		vertex(points[5].x, points[5].y)
	}
	vertex(0, 0)
	endShape()

	pop()
}

function hexPattern(x, y, radius = 100, p, pattern = 1) {
	points.forEach((point) => {
		point.setMag(radius)
	})
	translate(x, y)

	function pattern1() {
		rotate(angleSize / 2)
		strokeWeight(3)
		noFill()
		linesOut(0.15, 0.25, 0.75, [0, 2, 4], false, p, radius)
		linesBack(0.75, 0.8, [0, 2, 4], false, p, radius)

		// fadeSquare(0.3, 0.35, p, 'left')
		// fadeSquare(0.35, 0.5, p, 'right')
		linesOut(0.25, 0.35, 0.8, [1, 3, 5], true, p, radius)
		linesBack(0.8, 0.85, [1, 3, 5], true, p, radius)

		outerLines(0, 0.3, 0.7, p, radius)

		embiggen(0.7, 0.8, radius, radius * 1.5, p)
	}

	function pattern2() {
		rotate(angleSize / 2)
		strokeWeight(2)
		noFill()

		linesOut(0.2, 0.45, 0.6, [0, 2, 4], false, p, radius)
		linesBack(0.6, 0.8, [0, 2, 4], false, p, radius)
		linesOut(0.25, 0.5, 0.7, [1, 3, 5], true, p, radius)
		linesBack(0.7, 0.9, [1, 3, 5], true, p, radius)

		outerLines(0, 0.5, 0.7, p, radius)
		embiggen(0.7, 1, radius, radius * 1.5, p)
	}

	function pattern3() {
		rotate(angleSize / 2)
		strokeWeight(3)
		noFill()

		linesOut(0.15, 0.25, 0.75, [0, 2, 4], false, p, radius)
		linesBack(0.75, 0.8, [0, 2, 4], false, p, radius)
		fadeSquare(0.3, 0.35, p, 'left')
		fadeSquare(0.35, 0.5, p, 'right')
		linesOut(0.25, 0.35, 0.8, [1, 3, 5], true, p, radius)
		linesBack(0.8, 0.85, [1, 3, 5], true, p, radius)

		outerLines(0, 0.3, 1, p, radius)
		// embiggen(0.7, 0.8, radius, radius * 1.5, p)
	}

	if (pattern == 1) {
		pattern1()
	} else if (pattern == 2) {
		pattern2()
	} else if (pattern == 3) {
		pattern3()
	}
}

function getPoints() {
	let angle = 0
	let i = 0
	while (i < 6) {
		let curX = cos(angle)
		let curY = sin(angle)
		points.push(createVector(curX, curY))
		angle += angleSize
		i++
	}
}

function cp(p, start, end) {
	return map(constrain(p, start, end), start, end, 0, 1)
}

function easeInOutSine(x) {
	return -(cos(Math.PI * x) - 1) / 2
}

window.setup = setup
window.draw = draw
