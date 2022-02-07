let tiles = []
let m, step

function setup() {
	createCanvas(min(window.innerWidth, 500), min(window.innerHeight, 500))
	createLoop({ duration: 5 })

	m = min(width, height) * 0.6
	// step = m * 0.125
	step = m * 0.2
}

function draw() {
	background(0)
	patternOne(m, step)
}

function patternOne(m, step) {
	noFill()
	strokeWeight(3)
	translate((width - m) / 2, (height - m) / 2)

	for (let x = 0; x < m; x += step) {
		for (let y = 0, yi = 0; y < m; y += step, yi++) {
			push()
			translate(x, y)

			stroke(255, 10)
			rect(0, 0, step, step)

			stroke(100, 255, 100)
			let xVal = animLoop.progress * step
			line(xVal, 0, xVal, step)
			pop()
		}
	}
}

function patternTwo(m, step) {
	noFill()
	strokeWeight(3)
	translate(width / 2, height / 2)
	rotate(PI * 0.25)
	translate(-m / 2, -m / 2)

	for (let x = 0; x < m; x += step) {
		for (let y = 0; y < m; y += step) {
			push()
			translate(x, y)

			let i = 0
			while (i < 3) {
				let lx = x - (step * i * 2) / m
				let ly = y - (step * i * 2) / m

				let px = map(sin(animLoop.theta + lx * 2), -1, 1, 0, 1) * step
				let py = map(sin(animLoop.theta + ly * 2), -1, 1, 0, 1) * step

				stroke(0, 255, i * 120 + 100, (3 - i) * 100)
				line(px, 0, 0, py)
				i++
			}

			let a = 50 - map(sin(animLoop.theta + ((x * y) / (m * m)) * 3), -1, 1, 0, 50)
			fill(0, 155, 255, a)
			noStroke()
			rect(0, 0, step, step)

			pop()
		}
	}

	stroke(255, 255, 255)
	for (let p = 0; p <= m; p += step) {
		line(p, 0, p, m)
		line(0, p, m, p)
	}
}

window.setup = setup
window.draw = draw
