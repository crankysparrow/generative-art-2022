export class Circle {
	x: number
	y: number
	dia: number
	index: number
	rad: number

	constructor(x, y, dia, index) {
		this.x = x
		this.y = y
		this.dia = dia
		this.rad = dia / 2
		this.index = index
	}

	overlapEdges(w, h, space) {
		return (
			this.x > w - space - this.rad ||
			this.x < space + this.rad ||
			this.y > h - space - this.rad ||
			this.y < space + this.rad
		)
	}

	overlapOther(circle: Circle, space) {
		let d = dist(this.x, this.y, circle.x, circle.y)
		return d < this.rad + circle.rad + space
	}

	overlaps(circles: Circles) {
		if (this.overlapEdges(circles.width, circles.height, circles.space)) return true
		for (let i = 0; i < circles.length; i++) {
			if (this.overlapOther(circles[i], circles.space)) return true
		}
		return false
	}

	distanceTo(circle: Circle) {
		return dist(this.x, this.y, circle.x, circle.y)
	}

	draw() {
		circle(this.x, this.y, this.dia)
	}
}

export class Circles extends Array<Circle> {
	width: number
	height: number
	space: number
	stats = { attempts: 0 }

	constructor({ width, height, space }) {
		super()
		this.width = width
		this.height = height
		this.space = space
	}

	createRandomCircle(size) {
		return new Circle(floor(random(this.width)), floor(random(this.height)), size, this.length)
	}

	draw(i: number) {
		this[i].draw()
	}

	pack(size, maxAttempts = 500, idealCount = Infinity) {
		let attempts = 0
		let count = 0

		while (attempts < maxAttempts && count < idealCount) {
			let circle = this.createRandomCircle(size)
			if (circle.overlaps(this)) {
				attempts++
			} else {
				attempts = 0
				count++
				this.push(circle)
			}
		}

		this.stats.attempts += attempts
	}
}
