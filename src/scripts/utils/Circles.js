function easeOutCubic(x) {
	return 1 - Math.pow(1 - x, 3)
}

export class AllTheCircles {
	constructor({
		size,
		multMin = 0.1,
		multMax = 0.3,
		width,
		height,
		space,
		overlapEdges = false,
		build = true,
		attemptsEachStep = 1000,
		stepSize = 2,
	}) {
		this.circles = []
		this.size = size
		this.multMin = multMin
		this.multMax = multMax
		this.diff = multMax - multMin
		this.width = width
		this.height = height
		this.space = space ?? this.width * 0.01
		this.overlapEdges = overlapEdges
		this.attemptsEachStep = attemptsEachStep
		this.stepSize = stepSize / 100

		if (build) {
			this.circleTime()
		}
	}

	circleTime() {
		let timesTried = 0
		let sub = 0

		while (sub < 1) {
			let i = 0
			// ease out to subtract larger amounts first, then less as we get closer to the min
			let multiplier = this.multMax - this.diff * easeOutCubic(sub)
			let currentSize = floor(this.size * multiplier)

			while (i < this.attemptsEachStep) {
				timesTried++
				let c = new Circle(
					Math.floor(random(this.width)),
					Math.floor(random(this.height)),
					currentSize
				)
				if (this.checkOverlap(c)) {
					i++
				} else {
					this.circles.push(c)
					i = 0
				}
			}

			sub += this.stepSize
		}
		console.log({ timesTried, length: this.circles.length })
	}

	newCircle(size, attempts = 0, log = false) {
		if (attempts > 10) {
			if (log) {
				console.log('size: ' + size + ' give up')
			}
			return
		}
		let c = new Circle(Math.floor(random(this.width)), Math.floor(random(this.height)), size)
		if (this.checkOverlap(c)) {
			attempts++
			this.newCircle(size, attempts)
		} else {
			this.circles.push(c)
			if (log) {
				console.log({ size, attempts })
			}
		}
	}

	checkOverlap(newCircle) {
		if (
			!this.overlapEdges &&
			(newCircle.x - newCircle.d / 2 < this.space ||
				newCircle.x + newCircle.d / 2 > this.width - this.space ||
				newCircle.y - newCircle.d / 2 < this.space ||
				newCircle.y + newCircle.d / 2 > this.height - this.space)
		) {
			return true
		}
		for (let i = 0; i < this.circles.length; i++) {
			let c = this.circles[i]
			let d = dist(newCircle.x, newCircle.y, c.x, c.y)
			if (d - this.space < newCircle.d / 2 + c.d / 2) {
				return true
			}
		}
		return false
	}
}

class Circle {
	constructor(x, y, d) {
		this.x = x
		this.y = y
		this.d = d
	}
}
