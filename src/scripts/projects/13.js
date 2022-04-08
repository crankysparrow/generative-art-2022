let cblue = '#2d7dd2'
// let cred = '#ff1053'
let csea = '#36f1cd'
let cgr = '#e4ff1a'
let cdr = '#090c9b'

let points

function setup() {
	createCanvas(500, 500)
	createLoop({ duration: 3, gif: true })
}

function draw() {
	background(0)

	translate(50, 50)
	points = dots(10, { w: 400, h: 400, dotColor: 'rgba(255,255,255,0.2)' })

	theShapes(points)
}

function testing(points) {
	squares(points)

	push()
	translate(400, 0)
	scale(-1, 1)
	squares(points)
	pop()

	push()
	translate(0, 400)
	scale(1, -1)
	squares(points)
	pop()

	push()
	translate(400, 400)
	scale(-1, -1)
	squares(points)
	pop()
	function squares() {
		fill('#f0f')
		rect(points[1][1].x, points[1][1].y, 40, 40)
		fill('#0ff')
		rect(points[2][2].x, points[2][2].y, 40, 40)
		fill('#ff0')
		rect(points[3][3].x, points[3][3].y, 40, 40)
	}
}

function theShapes(points) {
	darkerLines(points, PI / 2)
	drawSquares(points)

	push()
	translate(400, 0)
	scale(-1, 1)
	darkerLines(points)
	drawSquares(points)
	pop()

	push()
	translate(0, 400)
	scale(1, -1)
	darkerLines(points)
	drawSquares(points)
	pop()

	push()
	translate(400, 400)
	scale(-1, -1)
	darkerLines(points, PI / 2)
	drawSquares(points)
	pop()

	middleLines()

	stroke(cblue)
	for (let ix = 1; ix < points.length; ix += 2) {
		for (let iy = 0; iy < points.length; iy += 2) {
			let p = ix / points.length
			let d = max(4 - dist(5, 5, ix, iy), 0)
			circleGrow(ix, iy, d * 10, p + PI / 2)
		}
	}
}

function middleLines() {
	stroke(cdr)
	simpleLinePts(3, 5, 6, 5)
	simpleLinePts(7, 5, 4, 5, PI)

	simpleLinePts(5, 3, 5, 6)
	simpleLinePts(5, 7, 5, 4, PI)

	simpleLinePts(5, 3, 3, 3)
	simpleLinePts(5, 3, 7, 3, PI)

	simpleLinePts(5, 7, 3, 7, PI)
	simpleLinePts(5, 7, 7, 7)

	simpleLinePts(3, 5, 3, 3)
	simpleLinePts(3, 5, 3, 7, PI)

	simpleLinePts(7, 5, 7, 3, PI)
	simpleLinePts(7, 5, 7, 7)
}

function simpleLinePts(ax, ay, bx, by, plus = 0) {
	let a = points[ax][ay]
	let b = points[bx][by]

	let p = sin(animLoop.theta + plus) * 1

	let pbx = map(p, -1, 1, a.x, b.x)
	let x = a.x > b.x ? constrain(pbx, b.x, a.x) : constrain(pbx, a.x, b.x)
	let pby = map(p, -1, 1, a.y, b.y)
	let y = a.y > b.y ? constrain(pby, b.y, a.y) : constrain(pby, a.y, b.y)
	line(a.x, a.y, x, y)
}

function darkerLines(points, plus = 0) {
	stroke(cdr)

	lineP(3, 0, 1, 2, 0, 3, 2, 1)
	lineP(2, 2, 0, 4, 4, 0, 0, 4)
	lineP(0, 5, 4, 1, 5, 0, 1, 4)
	lineP(3, 3, 6, 0, 0, 6, 6, 0)

	function lineP(ax, ay, bx, by, a2x, a2y, b2x, b2y) {
		let p = sin(animLoop.theta + plus)

		let a = points[ax][ay]
		let a2 = points[a2x][a2y]

		let point1 = p5.Vector.lerp(a, a2, map(p, -1, 1, 0, 1))

		let b = points[bx][by]
		let b2 = points[b2x][b2y]
		let point2 = p5.Vector.lerp(b, b2, map(p, -1, 1, 0, 1))

		let p2 = cos(animLoop.theta)
		let x2 = map(p2, -1, 1, point1.x, point2.x)
		let y2 = map(p2, -1, 1, point1.y, point2.y)

		line(point1.x, point1.y, x2, y2)
		line(point1.y, point1.x, y2, x2)
	}
}

function drawSquares(points) {
	strokeWeight(2)

	stroke(cblue)
	linePts(1, 1, 1, 3, PI / 4)
	linePts(1, 1, 3, 1, PI / 4)

	linePts(3, 3, 3, 1, PI / 4)
	linePts(3, 3, 1, 3, PI / 4)

	stroke(csea)
	linePts(2, 2, 4, 2)
	linePts(2, 2, 2, 4)

	linePts(4, 4, 4, 2)
	linePts(4, 4, 2, 4)

	function linePts(ax, ay, bx, by, plus = 0) {
		let a = points[ax][ay]
		let b = points[bx][by]

		let p = sin(animLoop.theta + plus)
		let px = sin(animLoop.theta + plus + 0.5)

		let pbx
		if (a.x < b.x) {
			pbx = min(map(px, -1, 0.5, a.x, b.x), b.x)
		} else {
			pbx = max(map(px, -1, 0.5, a.x, b.x), b.x)
		}
		let pby = map(p, -1, 1, a.y, b.y)
		line(a.x, a.y, pbx, pby)
	}
}

function circleGrow(x, y, r, plus = 0) {
	let p = cos(animLoop.theta + plus)
	let pr = map(p, -1, 1, 0, r)

	circle(points[x][y].x, points[x][y].y, pr)
}

function dots(
	steps,
	{ dotColor = '#fff', radius = 5, offset = false, w = width, h = height } = {}
) {
	fill(dotColor)
	noStroke()

	let stepSize = w / steps
	let stepSizeY = h / steps

	let pointsArr = []

	for (let xi = 0; xi <= steps; xi++) {
		let pointsRow = []
		for (let yi = 0; yi <= steps; yi++) {
			let x = xi * stepSize
			let y = yi * stepSizeY
			if (offset) {
				x += yi % 2 == 0 ? stepSize / 2 : 0
			}

			pointsRow.push(createVector(x, y))
			// circle(x, y, radius)
		}

		pointsArr.push(pointsRow)
	}
	noFill()

	return pointsArr
}

window.setup = setup
window.draw = draw
