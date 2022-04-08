let c1 = '#600aa6'
let c2 = '#a483eb'
let points

let p

function setup() {
	createCanvas(500, 500)
	createLoop({ duration: 4 })

	points = dots(20)
	console.log(points.length)
	p = createP('')
}

function draw() {
	// p.html(animLoop.progress)
	background(0)
	fill('#fff')
	noStroke()
	// drawDots(points, 2)

	noFill()
	stroke(c1)
	strokeWeight(2)
	noFill()

	for (let xi = 2; xi < points.length; xi += 4) {
		for (let yi = 2; yi < points.length; yi += 4) {
			let x = points[xi][yi].x
			let y = points[xi][yi].y

			push()
			translate(x, y)
			let a = map(sin(animLoop.theta), -1, 1, 10, 30)
			let b = map(cos(animLoop.theta), -1, 1, -30, 30)
			otherShape(a, b)
			pop()
		}
	}

	stroke(c2)
	for (let xi = 4; xi < points.length - 2; xi += 4) {
		for (let yi = 4; yi < points.length - 2; yi += 4) {
			let x = points[xi][yi].x
			let y = points[xi][yi].y

			push()
			translate(x, y)

			let nr = xi / points.length + yi / points.length
			let rotation = animLoop.theta + nr

			if ((xi % 8 == 0 && yi % 8 == 0) || (xi % 8 !== 0 && yi % 8 !== 0)) {
				let a = map(sin(animLoop.theta), -1, 1, 5, 20)
				let b = map(sin(animLoop.theta), -1, 1, -40, 20)
				otherShape(a, b)
			} else {
				let a = map(sin(animLoop.theta), -1, 1, 10, 20)
				let b = map(sin(animLoop.theta), -1, 1, 0, 30)
				otherShape(a, b)
			}

			// rotate(rotation)
			// let a = 20
			// let b = map(sin(animLoop.theta), -1, 1, 0, 40)
			// let b = map(animLoop.theta, 0, TWO_PI, -40, 40)

			pop()
		}
	}
}

function otherShape(a, b) {
	beginShape()

	vertex(-a, -a)
	vertex(-b, -a)
	vertex(-b, a)
	vertex(-a, a)
	vertex(-a, b)
	vertex(a, b)
	vertex(a, a)
	vertex(b, a)
	vertex(b, -a)
	vertex(a, -a)
	vertex(a, -b)
	vertex(-a, -b)
	vertex(-a, -a)

	endShape()
}

function plusShape() {
	beginShape()

	vertex(200, 200)
	vertex(250, 200)
	vertex(250, 250)
	vertex(300, 250)
	vertex(300, 300)
	vertex(250, 300)
	vertex(250, 350)
	vertex(200, 350)
	vertex(200, 300)
	vertex(150, 300)
	vertex(150, 250)
	vertex(200, 250)
	vertex(200, 200)

	endShape()
}

function dots(steps, { offset = false, w = width, h = height } = {}) {
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
		}

		pointsArr.push(pointsRow)
	}
	noFill()

	return pointsArr
}

function drawDots(points, radius = 5) {
	for (let x = 0; x < points.length; x++) {
		for (let y = 0; y < points.length; y++) {
			circle(points[x][y].x, points[x][y].y, radius)
		}
	}
}

window.setup = setup
window.draw = draw
