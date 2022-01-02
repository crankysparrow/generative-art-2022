let centerX, centerY, diameter

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
}

function draw() {
	centerX = width / 2
	centerY = height / 2
	diameter = min(width, height) * 0.9
	colorMode(HSB)
	angleMode(DEGREES)
	background(100)
	noStroke()

	for (let i = 0; i < 360; i += 10) {
		fill(i, 100, 100)
		arc(centerX, centerY, diameter, diameter, i, i + 10)
	}
}

window.setup = setup
window.draw = draw
