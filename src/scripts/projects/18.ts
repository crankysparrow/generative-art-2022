import * as p5 from 'p5'

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
}

function draw() {
	noLoop()
	let m = min(width, height) * 0.9

	// let steps = 8
	// let size = floor(m / steps)
	// m = size * steps
	let size = 100

	background(0)
	stroke(255)
	noFill()

	translate((width - m) / 2, (height - m) / 2)
	translate(m / 2, m / 2)

	let sides = 6
	let angle = 0
	for (let i = 0; i < sides; i++) {
		let x = cos(angle) * size
		let y = sin(angle) * size
		circle(x, y, size * 2)
		angle += TWO_PI / sides
	}

	// circle(0, 0, size * 2) // x^2 + y^2 = size^2
	// circle(-size, 0, size * 2) // (x + size/2)^2 + y^2 = size^2
	// circle(size, 0, size * 2) // (x - size/2)^2 + y^2 = size^2

	// let x = pow(-size, 2) / (size * 2)
	// let y = sqrt(pow(size, 2) - pow(x, 2))
	// console.log({ x, y })
	// circle(x, y, size * 2)
	// circle(x, -y, size * 2)
	// circle(-x, -y, size * 2)
	// circle(-x, y, size * 2)
}

// @ts-ignore
window.setup = setup
// @ts-ignore
window.draw = draw
