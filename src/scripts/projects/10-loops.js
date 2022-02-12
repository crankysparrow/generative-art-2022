import { Controls } from '../utils/Controls.js'

// let opts = [1, 2, 3, 4, 5, 6, 7, 8]
let opts = [one, two, three, four, five, six, seven, eight]
let currentFunction = one
let duration = 6

function setup() {
	createCanvas(min(window.innerWidth, 500), min(window.innerHeight, 500))
	createLoop({ duration: 6 })

	makeControls()
}

function doSetup() {
	createLoop({ duration: duration })
}

function draw() {
	currentFunction()
}

function eight() {
	background(0)
	noFill()
	stroke(255)

	// let pEdge1 = 0.75
	let pEdge1 = 0
	let pEdge2 = 1
	let sizeMult = 0.9

	let m = width * 0.65

	let n = 5
	let step = m / n

	let size = (m / n) * sizeMult
	translate(width / 2, height / 2)
	rotate(PI / 4)
	translate(-m / 2, -m / 2)

	let p1 = size * pEdge1
	let p2 = size * pEdge2

	for (let x = 0; x < n; x++) {
		for (let y = 0; y < n; y++) {
			push()
			translate(x * step, y * step)
			translate((step - size) / 2, (step - size) / 2)

			fill(100, 200, 240)
			noStroke()
			circle(size / 2, size / 2, 5)

			let t, currentSize
			if ((x % 2 == 0 && y % 2 == 1) || (x % 2 == 1 && y % 2 == 0)) {
				t = easeInOutSine(animLoop.progress * 2)
				stroke(75, 10, 255)
				strokeWeight(2)
				currentSize = size * 1.5
				translate((size - currentSize) / 2, (size - currentSize) / 2)
				noFill()
				let p = map(t, 0, 1, p1, p2)
				shapeShape(p, currentSize)
			} else {
				t = sin(animLoop.theta + (y + x) / n)
				stroke(200, 100, 10)
				strokeWeight(2)
				currentSize = size
				noFill()
				let pa = map(t, -1, 1, 0, p2)
				circle(currentSize / 2, currentSize / 2, pa)
			}

			pop()
		}
	}
}

function seven() {
	background(0)
	noFill()
	stroke(255)

	// let pEdge1 = 0.75
	let pEdge1 = 0
	let pEdge2 = 1
	let sizeMult = 0.9

	let m = width * 0.65

	let n = 5
	let step = m / n

	let size = (m / n) * sizeMult
	translate(width / 2, height / 2)
	rotate(PI / 4)
	translate(-m / 2, -m / 2)

	let p1 = size * pEdge1
	let p2 = size * pEdge2

	for (let x = 0; x < n; x++) {
		for (let y = 0; y < n; y++) {
			push()
			translate(x * step, y * step)
			translate((step - size) / 2, (step - size) / 2)

			fill(100, 200, 240)
			noStroke()
			circle(size / 2, size / 2, 5)

			let t, currentSize
			if ((x % 2 == 0 && y % 2 == 1) || (x % 2 == 1 && y % 2 == 0)) {
				t = easeInOutSine(animLoop.progress * 2)
				// t = sin(animLoop.theta)
				stroke(t * 255, 180 - t * 180, 240)
				strokeWeight(2)
				currentSize = size * 1.5
				translate((size - currentSize) / 2, (size - currentSize) / 2)
			} else {
				t = easeInOutSine(animLoop.progress * 2 - 0.5)
				// t = sin(animLoop.theta - PI * x)
				stroke(250 * t, 100, 200 - t * 200)
				strokeWeight(2)
				currentSize = size
				translate(currentSize / 2, currentSize / 2)
				rotate(PI / 4)
				translate(-currentSize / 2, -currentSize / 2)
			}
			// t = sin(animLoop.theta - PI * ((x + y) / (n * n)))

			noFill()

			let p = map(t, 0, 1, p1, p2)

			shapeShape(p, currentSize)
			pop()
		}
	}
}

function six() {
	background(0)
	noFill()
	stroke(255)

	// let pEdge1 = 0.75
	let pEdge1 = 0
	let pEdge2 = 1
	let sizeMult = 1

	let m = width * 0.65

	let n = 5
	let step = m / n

	let size = (m / n) * sizeMult
	// translate((width - m) / 2, (height - m) / 2)
	translate(width / 2, height / 2)
	rotate(PI / 4)
	translate(-m / 2, -m / 2)

	let p1 = size * pEdge1
	let p2 = size * pEdge2

	for (let x = 0; x < n; x++) {
		for (let y = 0; y < n; y++) {
			push()
			translate(x * step, y * step)
			translate((step - size) / 2, (step - size) / 2)

			fill(100, 200, 240)
			noStroke()
			circle(size / 2, size / 2, 5)

			let t
			if ((x % 2 == 0 && y % 2 == 1) || (x % 2 == 1 && y % 2 == 0)) {
				t = sin(animLoop.theta)
				stroke(100, 180, 240)
				strokeWeight(2)
			} else {
				t = sin(animLoop.theta - PI * x)
				stroke(50, 200, 200)
				strokeWeight(1)
			}
			t = sin(animLoop.theta - PI * ((x + y) / (n * n)))

			noFill()

			let p = map(t, -1, 1, p1, p2)

			shapeShape(p, size)
			pop()
		}
	}
}

function five() {
	background(0)
	noFill()
	stroke(255)

	// let pEdge1 = 0.75
	let pEdge1 = 0
	let pEdge2 = 1
	let sizeMult = 1.5

	let n = 3
	let step = width / n

	let size = (width / n) * sizeMult

	let p1 = size * pEdge1
	let p2 = size * pEdge2

	for (let x = 0; x < n; x++) {
		for (let y = 0; y < n; y++) {
			push()
			translate(x * step, y * step)
			translate((step - size) / 2, (step - size) / 2)

			fill(100, 200, 240)
			noStroke()

			let t
			if ((x % 2 == 0 && y % 2 == 1) || (x % 2 == 1 && y % 2 == 0)) {
				t = easeInOutSine(animLoop.progress * 2)
				stroke(100, 180, 240)
				strokeWeight(2)
			} else {
				t = easeInOutSine(animLoop.progress * 2 - 0.5)
				stroke(50, 200, 200)
				strokeWeight(1)
			}

			noFill()

			let p = map(t, 0, 1, p1, p2)

			shapeShape(p, size)
			pop()
		}
	}
}

function four(second) {
	blendMode(BLEND)
	let pEdge1 = 0.75
	let pEdge2 = -0.25
	let sizeMult = 1.5

	if (second) {
		blendMode(BLEND)
		stroke(0)
		strokeWeight(5)
		noFill()
	} else {
		background(0)
		// blendMode(LIGHTEST)
		fill(200, 10, 100)
		noStroke()
	}

	let n = 3
	let step = width / n

	let size = (width / n) * sizeMult

	let p1 = size * pEdge1
	let p2 = size * pEdge2

	for (let x = 0; x < n; x++) {
		for (let y = 0; y < n; y++) {
			push()
			if (!second) {
				fill(200 - 50 * y, 10, 50 * x)
			}

			let t
			if ((x % 2 == 0 && y % 2 == 1) || (x % 2 == 1 && y % 2 == 0)) {
				// t = sin(animLoop.theta)
				t = easeInOutSine(animLoop.progress * 2)
			} else {
				// t = cos(animLoop.theta)
				t = easeInOutSine(animLoop.progress * 2 - 0.5)
			}

			translate(x * step, y * step)
			translate((step - size) / 2, (step - size) / 2)

			let p = map(t, -1, 1, p1, p2)

			shapeShape(p, size)
			pop()
		}
	}

	if (!second) {
		four(true)
	}
}

function easeInOutSine(x) {
	return -(cos(Math.PI * x) - 1) / 2
}

function three() {
	let pEdge1 = 0.75
	let pEdge2 = 0.25
	let sizeMult = 1.5

	background(0)
	stroke(255)

	let n = 3
	let step = width / n

	let size = (width / n) * sizeMult

	let p1 = size * pEdge1
	let p2 = size * pEdge2

	for (let x = 0; x < n; x++) {
		for (let y = 0; y < n; y++) {
			push()

			// let toMove = map(t, -1, 1, 0, step)
			// if (x % 2 == 0) {
			// 	translate(x * step, y * step + toMove)
			// } else {
			// 	translate(x * step, y * step - toMove)
			// }

			// let t
			// if ((x % 2 == 0 && y % 2 == 1) || (x % 2 == 1 && y % 2 == 0)) {
			// 	t = sin(animLoop.theta + x)
			// } else {
			// 	t = cos(animLoop.theta + x)
			// }

			// let t = sin(animLoop.theta + x * 0.5)
			let t = fract(animLoop.progress + (x + y) / (n * n))

			translate(x * step, y * step)
			translate((step - size) / 2, (step - size) / 2)

			let p = map(t, 0, 1, p1, p2)
			// let p
			// if (y % 2 == 0 && x % 2 == 1) {
			// 	p = map(t, 0, 1, p1, p2)
			// } else {
			// 	p = map(1 - t, 0, 1, p1, p2)
			// }

			shapeShape(p, size)
			pop()
		}
	}
}

function two() {
	background(0)
	let pEdge1 = 1
	let pEdge2 = -1
	let sizeMult = 1

	let t = animLoop.progress

	let n = 3
	let step = width / n
	let size = (width / n) * sizeMult

	stroke(255)
	noFill()
	let p1 = size * pEdge1
	let p2 = size * pEdge2

	for (let x = -1; x < n + 1; x++) {
		for (let y = -1; y < n + 1; y++) {
			push()
			translate(x * step, y * step)
			translate((step - size) / 2, (step - size) / 2)
			let p = map(t, 0, 1, p1, p2)
			strokeWeight(1)
			shapeShape(p, size)
			pop()
		}
	}
}

function one() {
	let sizeMult = 0.5
	let pEdge1 = 2
	let pEdge2 = -2

	background(0)
	let t = animLoop.progress

	let n = 3
	let step = width / n
	let size = (width / n) * sizeMult

	stroke(255)
	noFill()
	let p1 = size * pEdge1
	let p2 = size * pEdge2

	for (let x = -1; x < n + 1; x++) {
		for (let y = -1; y < n + 1; y++) {
			push()

			translate(x * step, y * step)
			translate((step - size) / 2, (step - size) / 2)
			let p = map(t, 0, 1, p1, p2)

			strokeWeight(1)
			shapeShape(p, size)

			pop()
		}
	}
}

function shapeShape(p, size) {
	let pi = size - p
	let a = size * 0.25
	let b = size * 0.75

	beginShape()

	vertex(p, b)
	vertex(p, a)
	vertex(a, a)
	vertex(a, p)
	vertex(b, p)
	vertex(b, a)
	vertex(pi, a)
	vertex(pi, b)
	vertex(b, b)
	vertex(b, pi)
	vertex(a, pi)
	vertex(a, b)
	vertex(p, b)

	endShape()
}

function makeControls() {
	let c = new Controls(true)

	let whichFunction = c.createSelect({
		labelString: 'animation',
		options: opts,
		useOptionsIndex: true,
		onChange: () => {
			let w = whichFunction.el.value()
			currentFunction = opts[w]
		},
	})

	let durationSlider = c.createSlider({
		labelString: 'duration',
		min: 1,
		max: 8,
		step: 0.5,
		val: 6,
		onChange: () => {
			duration = durationSlider.value()
			doSetup()
		},
	})
}

window.setup = setup
window.draw = draw
