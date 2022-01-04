// prettier-ignore
let map4_1 = [
	[  15, 135,  45, 165 ],
	[ 195,  75, 225, 105 ],
	[  60, 180,  30, 150 ],
	[ 240, 120, 210,  90 ],
]
// via: https://github.com/antiboredom/p5.riso/blob/master/lib/p5.riso.js

// prettier-ignore
let map4_2 = [
	[   8, 120,  40, 168 ],
	[ 200,  72, 232, 104 ],
	[  56, 184,  24, 152 ],
	[ 248, 120, 216,  88 ],
]
// via: https://observablehq.com/@jobleonard/ordered-error-diffusion-dithering

let currentMap = map4_1
let threshold = 128
let res = 128
let shapes = []
let shape
let speed = 0.0005
let graphicSize = 512
let p

//prettier-ignore
let colorVals = [
	[ [ 255, 255, 250 ], [ 13, 92, 99] ],
	[ [ 20, 20, 20 ], [ 132, 220, 207] ],
	[ [ 20, 33, 61 ], [ 192, 188, 181] ],
	[ [ 20, 7, 15 ], [ 144, 153, 192 ] ],
	[ [ 30, 32, 25 ], [ 88, 123, 127 ] ],
	[ [231, 238, 235], [ 8, 99, 117 ] ]
]

// let colors = colorVals[5]
let colors = [colorVals[5][1], colorVals[5][0]]

function setup() {
	createCanvas(res, res)
	pixelDensity(1)
	noSmooth()

	shapes = new Shapes()

	// createLoop({ duration: 12.566, framesPerSecond: 30, gif: true })
	// p = createP('').position(600, 30)
}

function gradient() {
	let steps = 100
	let stepSize = height / steps

	for (let i = 0; i < steps; i++) {
		fill((i / 100) * 255)
		noStroke()
		rect(0, stepSize * i, width, stepSize * i + stepSize)
	}
}

class Shape {
	constructor({ x, y, alpha, n, invert = false }) {
		this.weight = width * 0.5
		this.size = width * 0.5

		this.invert = invert
		this.x = x - this.weight / 2
		this.y = y - this.weight / 2
		this.alpha = alpha ?? random(200)
		this.n = n
	}

	scale() {
		let t = millis() * 0.001
		// let t = animLoop.theta * 2
		let sizeT = sin(t / 2) + 2 * sin(t)
		let sizeW = cos(t / 2) + 2 * cos(t)

		if (this.invert) {
			this.size = map(sizeT, -3, 3, width * 1.5, width * 0.5)
			this.weight = map(sizeW, -2, 2, width * 0.5, width * 0.1)
		} else {
			this.size = map(sizeT, -3, 3, width * 0.5, width * 1.5)
			this.weight = map(sizeW, -2, 2, width * 0.1, width * 0.5)
		}
	}

	showStroke() {
		stroke(0, this.alpha)
		strokeWeight(this.weight)
		noFill()
		rect(this.x, this.y, this.size, this.size)
	}
}

class Shapes {
	constructor() {
		this.shapes = []

		let i = 0
		while (i < 4) {
			this.shapes.push(
				new Shape({
					x: 0,
					y: 0,
					alpha: 50 * i + 50,
					invert: i % 2 == 0 ? true : false,
					n: i % 2 == 0 ? 0 : 0,
				})
			)
			i++
		}
	}

	doLoop() {
		this.shapes.forEach((shape, i) => {
			shape.scale()
			if (i == 1) {
				push()
				scale(-1, 1)
				translate(-width, 0)
				shape.showStroke()
				pop()
			} else if (i == 2) {
				push()
				scale(-1, -1)
				translate(-width, -height)
				shape.showStroke()
				pop()
			} else if (i == 3) {
				push()
				scale(1, -1)
				translate(0, -height)
				shape.showStroke()
				pop()
			} else {
				shape.showStroke()
			}
		})
	}
}

function draw() {
	clear()
	resizeCanvas(res, res)
	background(255)

	shapes.doLoop()

	ditherOne(128, currentMap)
	let c = get()
	clear()
	if (!graphicSize) {
		resizeCanvas(window.innerWidth, window.innerHeight)
		let m = floor(min(width, height) * 0.9)
		m -= m % 4
		translate((width - m) / 2, (height - m) / 2)
		background(255)
		image(c, 0, 0, m, m)
	} else {
		resizeCanvas(graphicSize, graphicSize)
		background(255)
		image(c, 0, 0, graphicSize, graphicSize)
	}
}

function ditherOne(threshold = 128, thresholdMap) {
	loadPixels()
	let density = pixelDensity()
	thresholdMap = thresholdMap ?? [
		[32, 224],
		[160, 96],
	]

	for (let y = 0; y < height * density; y++) {
		for (let x = 0; x < width * density; x++) {
			let t = thresholdMap[y % thresholdMap.length][x % thresholdMap.length]

			let i = (y * width * density + x) * 4
			let currentPixel = pixels[i]
			let mapped = (currentPixel + t) / 2
			if (mapped < threshold) {
				pixels[i] = colors[0][0]
				pixels[i + 1] = colors[0][1]
				pixels[i + 2] = colors[0][2]
			} else {
				pixels[i] = colors[1][0]
				pixels[i + 1] = colors[1][1]
				pixels[i + 2] = colors[1][2]
			}
		}
	}

	updatePixels()
}

window.setup = setup
window.draw = draw

window.keyPressed = () => {
	if (key == 'ArrowLeft') {
		speed -= 0.0001
	} else if (key == 'ArrowRight') {
		speed += 0.0001
	}
}
