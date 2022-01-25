let angle, aVelocity, amplitude, aAcceleration

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)

	angle = createVector(0, 0)
	aVelocity = createVector(random(-0.05, 0.05), random(-0.05, 0.05))
	amplitude = createVector(random(width / 2), random(height / 2))
	aAcceleration = createVector(random(-0.05, 0.05), random(-0.05, 0.05))

	ellipseMode(CENTER)

	background(230)
}

function draw() {
	aAcceleration = createVector(random(-0.001, 0.001), random(-0.001, 0.001))

	let x = amplitude.x * cos(angle.x)
	let y = amplitude.y * sin(angle.y)

	aVelocity.add(aAcceleration)
	angle.add(aVelocity)

	noStroke()
	fill(105, 50)
	translate(width / 2, height / 2)
	translate(x, y)
	ellipse(0, 0, 10, 10)
}

window.setup = setup
window.draw = draw
