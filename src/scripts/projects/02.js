let m, bg, c1, c2, step
let xmult, ymult, noisemult

let colors = [
	['#fd492d', '#501f37'],
	['#524cb3', '#83e0dc'],
	['#19224e', '#0a848a'],
	['#ff1904', '#c3dc35'],
	['#10a8aa', '#e8ff52'],
]

function getVars() {
	let cs = shuffle(random(colors))
	c1 = color(cs[0])
	c2 = color(cs[1])
	let stepm = random([0.1, 0.125, 0.05, 0.04, 0.0625])
	step = m * stepm
	noisemult = random(0.0001, 0.0004)
	xmult = stepm >= 0.1 ? random(0.0005, 0.01) : random(0.0001, 0.01)
	ymult = stepm >= 0.1 ? random(0.0005, 0.01) : random(0.0001, 0.01)
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	m = floor(min(width, height) * 0.9)
	getVars()
}

function draw() {
	background(c1)
	translate((width - m) / 2, (height - m) / 2)
	strokeWeight(1)

	for (let y = step / 2, yi = 0; y <= m; y += step, yi++) {
		for (let x = step / 2, xi = 0; x <= m; x += step, xi++) {
			let n = noise(x * xmult, y * ymult, millis() * noisemult)
			let d = n * step * 1.3

			noFill()
			c2.setAlpha(150)
			stroke(c2)
			circle(x, y, d + d * (1 - n) * (1 - n) * 2)

			c2.setAlpha(255)
			fill(c2)
			noStroke()
			circle(x, y, d)
		}
	}
}

window.setup = setup
window.draw = draw

window.addEventListener('keypress', (e) => {
	if (e.code == 'Space') {
		e.preventDefault()
		getVars()
		redraw()
	}
})
