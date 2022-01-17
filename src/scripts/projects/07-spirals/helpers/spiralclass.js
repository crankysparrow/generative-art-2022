export default class Spiral {
	constructor({
		r,
		ctr,
		col,
		weight = 5,
		rInc = 0.3,
		thetaInc = 0.25,
		startAt = 0,
		scaling = false,
		maxScale = 2,
		theta = 0,
		crcl,
		doFade = true,
	} = {}) {
		this.theta = theta
		this.rMax = r ?? min(width, height)
		this.vertices = []
		this.ctr = ctr ?? createVector(width / 2, height / 2)
		this.r = 0
		this.done = false
		this.col = col ? color(col) : color(20, 20, 20)
		this.weight = weight
		this.rInc = rInc
		this.thetaInc = thetaInc
		this.startAt = startAt
		this.scaling = scaling
		this.scale = 1
		this.maxScale = maxScale
		this.currentFade = 255
		this.faded = false
		this.crcl = crcl ?? null
		this.doFade = doFade
	}

	updateShape() {
		let x = this.r * cos(this.theta)
		let y = this.r * sin(this.theta)

		this.vertices.push([x, y])

		this.r += this.rInc
		this.theta += this.thetaInc

		if (this.r >= this.rMax) {
			this.done = true
		}
	}

	reset() {
		this.currentFade = 255
		this.faded = false
		this.col.setAlpha(this.currentFade)

		this.vertices = []
		this.r = 0
		this.done = false
	}

	update() {
		if (!this.done) {
			this.updateShape()
		}

		if (this.done && this.doFade && !this.faded) {
			this.fade()
		}

		if (this.scaling) {
			this.scale += this.scale < this.maxScale ? 0.001 : 0
		}
	}

	fade() {
		this.currentFade -= 2
		this.col.setAlpha(this.currentFade)
		if (this.currentFade < 0) {
			this.faded = true
		}
	}

	show() {
		push()
		noFill()

		stroke(this.col)
		strokeWeight(this.weight)

		translate(this.ctr.x, this.ctr.y)
		scale(this.scale)

		beginShape()
		this.vertices.forEach((v) => {
			curveVertex(v[0], v[1])
		})

		endShape()

		pop()
	}
}
