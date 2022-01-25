let spaceship

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)

	spaceship = new Spaceship()
}

function draw() {
	background(100)

	if (keyIsDown(LEFT_ARROW)) {
		spaceship.turn(-0.07)
	}
	if (keyIsDown(RIGHT_ARROW)) {
		spaceship.turn(0.07)
	}

	if (keyIsDown(90)) {
		spaceship.thrust()
	}

	spaceship.update()
	spaceship.edges()
	spaceship.show()

	text(`vel: ${spaceship.vel.x}, ${spaceship.vel.y}`, 10, 10)
}

class Spaceship {
	constructor() {
		this.position = createVector(width / 2, height / 2)
		this.angle = 0
		this.vel = createVector(0, 0)
		this.acc = createVector(0, 0)
		this.thrusting = false
	}

	thrust() {
		this.thrusting = true
		let t = createVector(cos(this.angle), sin(this.angle))
		t.mult(0.1)
		this.acc.add(t)
	}

	turn(amount) {
		this.angle += amount
	}

	update() {
		this.vel.add(this.acc)
		this.position.add(this.vel)
		this.acc.mult(0)

		this.vel.mult(0.99)
	}

	show() {
		push()
		translate(this.position.x, this.position.y)
		rotate(this.angle)
		triangle(0, -15, 0, 15, 30, 0)

		if (this.thrusting) {
			fill(255, 100, 10)
		}

		rect(-5, -13, 5, 10)
		rect(-5, 3, 5, 10)
		pop()

		this.thrusting = false
	}

	edges() {
		if (this.position.x < 0) {
			this.position.x = width
		} else if (this.position.x > width) {
			this.position.x = 0
		}

		if (this.position.y < 0) {
			this.position.y = height
		} else if (this.position.y > height) {
			this.position.y = 0
		}
	}
}

window.setup = setup
window.draw = draw
