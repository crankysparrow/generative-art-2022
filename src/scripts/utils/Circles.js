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
		spaceFromEdge = 20,
		build = true,
		attemptsEachStep = 1000,
		steps = 10,
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
		this.steps = steps
		this.spaceFromEdge = spaceFromEdge

		if (build) {
			this.circleTime()
		}
	}

	circleTime() {
		let timesTried = 0
		let step = 0

		while (step < this.steps) {
			let i = 0
			// ease out to subtract larger amounts first, then less as we get closer to the min
			let multiplier = this.multMax - this.diff * easeOutCubic(step / this.steps)
			let currentSize = floor(this.size * multiplier)

			let timesThisStep = 0
			let addedThisStep = 0
			while (i < this.attemptsEachStep) {
				timesTried++
				timesThisStep++
				let c = new Circle(
					Math.floor(random(this.width)),
					Math.floor(random(this.height)),
					currentSize,
					this.circles.length
				)
				if (this.checkOverlap(c)) {
					i++
				} else {
					addedThisStep++
					this.circles.push(c)
					i = 0
				}
			}

			step += 1
			console.log({ step, timesThisStep, addedThisStep })
		}
		console.log({ timesTried, length: this.circles.length })
	}

	circleTimeOne(index) {
		let timesTried = 0
		let sub = 0
		while (sub < 1) {
			let i = 0
			let multiplier = this.multMax - this.diff * easeOutCubic(sub)
			let currentSize = floor(this.size * multiplier)

			while (i < this.attemptsEachStep) {
				timesTried++
				let c = new Circle(
					Math.floor(random(this.width)),
					Math.floor(random(this.height)),
					currentSize,
					index ? index : this.circles.length
				)

				if (this.checkOverlap(c)) {
					i++
				} else {
					this.circles.push(c)
					return c
				}
			}

			sub += this.stepSize
		}
	}

	remove(circleToRemove) {
		let index = circleToRemove.index
		this.circles.splice(index, 1)
		this.updateIndex()
	}

	updateIndex() {
		for (let i = 0; i < this.circles.length; i++) {
			this.circles[i].index = i
		}
	}

	newCircle(size, maxAttempts = 10, log = true, attempts = 0, index) {
		if (attempts > maxAttempts) {
			if (log) {
				console.log('size: ' + size + ' give up')
			}
			return
		}
		let c = new Circle(
			Math.floor(random(this.width)),
			Math.floor(random(this.height)),
			size,
			index ? index : this.circles.length
		)
		if (this.checkOverlap(c)) {
			attempts++
			this.newCircle(size, maxAttempts, log, attempts)
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

		if (
			this.overlapEdges &&
			(newCircle.x < this.spaceFromEdge ||
				newCircle.x > this.width - this.spaceFromEdge ||
				newCircle.y < this.spaceFromEdge ||
				newCircle.y > this.height - this.spaceFromEdge)
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
	constructor(x, y, d, index) {
		this.x = x
		this.y = y
		this.d = d
		this.index = index
	}
}
