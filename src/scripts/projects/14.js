let c1 = '#600aa6'
let c2 = '#a483eb'
let colors = ['#a483eb', '#5203d2', '#f6fb5f', '#827ec9', '#a7f4f4', '#7404ba', '#f65229']
let points
let p

let vars = {}

function setVars() {
	colors = shuffle(colors)
	c1 = colors[0]
	c2 = colors[1]

	let steps = random([20, 24, 28, 16])
	points = dots(steps)

	vars.a1 = random(10, 15)
	vars.a2 = random(15, 35)

	vars.b1 = random(-35, -10)
	vars.b2 = vars.b1 * -1

	vars.c1 = random(2, 25)
	vars.c2 = random(10, 25)

	vars.e1 = random(10, 25)
	vars.e2 = random(-25, -5)
}

function setup() {
	createCanvas(500, 500)
	createLoop({ duration: 4 })
	setVars()
}

function draw() {
	background(0)

	noFill()
	strokeWeight(2)

	stroke(c1)

	for (let xi = 2; xi < points.length; xi += 4) {
		for (let yi = 2; yi < points.length; yi += 4) {
			let x = points[xi][yi].x
			let y = points[xi][yi].y

			push()
			translate(x, y)
			let a = map(sin(animLoop.theta), -1, 1, vars.a1, vars.a2)
			// let b = map(cos(animLoop.theta), -1, 1, -30, 30)
			let b = map(cos(animLoop.theta), -1, 1, vars.b1, vars.b2)
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

			if ((xi % 8 == 0 && yi % 8 == 0) || (xi % 8 !== 0 && yi % 8 !== 0)) {
				// let a = map(sin(animLoop.theta), -1, 1, 5, 20)
				let a = map(sin(animLoop.theta), -1, 1, vars.c1, vars.c2)
				let b = map(sin(animLoop.theta), -1, 1, -40, 20)
				otherShape(a, b)
			} else {
				// let a = map(sin(animLoop.theta), -1, 1, 10, 20)
				let a = map(sin(animLoop.theta), -1, 1, vars.e1, vars.e1 + 10)
				// let b = map(sin(animLoop.theta), -1, 1, 0, 30)
				let b = map(sin(animLoop.theta), -1, 1, vars.e2, vars.e2 + 30)
				otherShape(a, b)
			}

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

window.mouseClicked = () => {
	setVars()
}
