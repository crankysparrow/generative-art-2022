let m, b, c1, c2

// window.addEventListener('unload', console.clear)
// if (module.hot) {
// 	module.hot.dispose(() => {
// 		window.location.reload()
// 	})
// }

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	m = floor(min(width, height) * 0.9)
	b = color('#07004d')
	c1 = color('#42e2b8')
	c2 = color('#2d82b7')

	frameRate(30)
}

function draw() {
	background(b)

	translate((width - m) / 2, (height - m) / 2)

	let step = m * 0.2

	fill(c1)
	noStroke()
	for (let y = step / 2; y <= m; y += step) {
		for (let x = step / 2; x <= m; x += step) {
			let n = noise(x * 0.01, y * 0.01, millis() * 0.0001)
			// circle(x, y, d)
			doCircle(x, y, n, step)
		}
	}
}

function doCircle(x, y, n, step) {
	// let d = map(n, 0, 1, step * 0.5, step * 1.3)
	let d = n * step * 1.3

	noFill()
	stroke(c2)
	circle(x, y, n * step * 2)

	noStroke()
	fill(c1)
	circle(x, y, d)
}

function grid(m, step) {
	stroke(255)
	noFill()
	rect(0, 0, m, m)
	for (let y = 0; y <= m; y += step) {
		line(0, y, m, y)
		if (y == 0) {
			for (let x = 0; x <= m; x += step) {
				line(x, 0, x, m)
			}
		}
	}
}

window.setup = setup
window.draw = draw
