let tiles = []
let m, step

function setup() {
	createCanvas(min(window.innerWidth, 500), min(window.innerHeight, 500))
	// createCanvas(window.innerWidth, window.innerHeight)
	createLoop({ duration: 5 })

	m = min(width, height) * 0.6
	step = m * 0.2
}

function draw() {
	background(0)
	patternTwo(m, step)
}

function patternThree(m, step) {
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

function patternOne(m, step) {
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

function patternTwo(m, step) {
	noFill()
	strokeWeight(3)

	// translate((width - m) / 2, (height - m) / 2)
	translate(width / 2, height / 2)
	rotate(PI * 0.25)
	translate(-m / 2, -m / 2)

	let t = 1

	let linesN = 6

	for (let x = 0, xi = 0; x <= m; x += step, xi++) {
		for (let y = 0, yi = 0; y <= m; y += step, yi++) {
			push()
			translate(x, y)

			let tx = map(sin(animLoop.theta), -1, 1, 0, 1)
			let ty = sin(animLoop.theta + (yi % 2) * PI)

			let px = tx * step
			let py = ty * step

			stroke(0, 255, 220)
			strokeWeight(1)
			let i = 0
			line(px, 0, 0, py)

			let xStep = px / linesN
			let yStep = py / linesN
			while (i < linesN) {
				let nx = xStep * i
				let ny = yStep * i
				line(nx, 0, 0, ny)
				i++
			}

			if (yi % 2 == 1 && xi % 2 == 1) {
				stroke(200, 0, 100)
				let p = (animLoop.progress + xi * 0.25 + yi * 0.25) % 1
				let s = max(p * 2 * step, step) - step
				let e = min(p * 2 * step, step)
				line(s, s, e, e)
				line(step - s, s, step - e, e)
			}

			if (yi % 2 == 1 && xi % 2 == 1) {
				fill(255, 200, 10)
				noStroke()
				circle(step / 2, step / 2, 10)

				let p = (animLoop.progress * 2 + xi * 0.4) % 1
				noFill()
				stroke(255, 200, 10, 255 - 255 * p)
				strokeWeight(2)
				circle(step / 2, step / 2, p * 50)
			}

			pop()
		}
	}

	fill(0)
	noStroke()
	rect(m - 1, -m, m, m * 2)
	rect(0, -m, -m, m * 2)
	rect(0, 0, m, -m)
	rect(-1, m, m * 2, m)

	stroke(255, 200, 255)
	noFill()
	strokeWeight(1)
	for (let p = 0; p <= m; p += step) {
		line(0, p, m, p)
	}
}

window.setup = setup
window.draw = draw
