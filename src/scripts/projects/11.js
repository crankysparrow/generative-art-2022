let palette = ['#0d5c63', '#fc60a8', '#ff8c42', '#93032e', '#4CB5AE']
let palette2 = ['#3DCCC7', '#9649CB', '#0D1B1E', '#F2CEE6']

let vectors = []

let vx1, vx2, vy1, vy2

function particlesRandom(n) {
	for (let i = 0; i < n; i++) {
		vectors.push(new Particle(random(width), random(height)))
	}
}

function particlesX(n) {
	for (let x = 0; x < n; x++) {
		vectors.push(new Particle((width / n) * x, (height / n) * x))
		vectors.push(new Particle((width / n) * x, height - (height / n) * x))
	}
}

function particlesGrid(n) {
	for (let x = 0; x < n; x++) {
		for (let y = 0; y < n; y++) {
			vectors.push(new Particle((width / n) * x, (height / n) * y))
		}
	}
}

function particlesCirclePack(r) {
	console.log('starting circle pack function')
	let points = []
	let keepGoing = true
	let attempts = 0
	let c = 0

	while (keepGoing) {
		c++
		let newPoint = createVector(random(r / 2, width - r), random(r / 2, height - r))
		let validPoint = true

		for (let i = 0; i < points.length; i++) {
			if (newPoint.dist(points[i]) < r) {
				validPoint = false
				break
			}
		}

		if (validPoint) {
			points.push(newPoint)
			attempts = 0
		} else {
			attempts++
		}

		if (attempts > 100) {
			keepGoing = false
		}
	}

	console.log(`took ${c} attempts to make ${points.length} points`)
	return points
}

let possibles = [
	{ vx1: 0.031, vx2: 0.042, vy1: 0.0978, vy2: 0.58 },
	{ vx1: 0.0529, vx2: 0.044986, vy1: 0.0686, vy2: 1.121 },
	{ vx1: 0.038, vx2: 0.07, vy1: 0.021, vy2: 1.44 },
	{ vx1: 0.08, vx2: 0.02, vy1: 0.05, vy2: 1.24 },
]

function makeVectorCurves(startAt = 0) {
	console.log('starting make curves function')
	let count = 0
	let meetThreshold = 5

	while (count < 50) {
		for (let i = startAt; i < vectors.length; i++) {
			if (vectors[i].done) {
				continue
			}

			let newPoint = vectors[i].addPoint()
			let intersects = false

			for (let j = 0; j < vectors.length; j++) {
				if (i == j) {
					continue
				}
				for (let pi = 0; pi < vectors[j].points.length; pi++) {
					if (
						(abs(floor(newPoint.x) - floor(vectors[j].points[pi].x)) < meetThreshold &&
							abs(floor(newPoint.y) - floor(vectors[j].points[pi].y)) <
								meetThreshold) ||
						newPoint.x > width ||
						newPoint.x < 0 ||
						newPoint.y > height ||
						newPoint.y < 0
					) {
						intersects = true
						break
					}
				}
			}

			if (intersects) {
				vectors[i].done = true
				if (vectors[i].points.length < 10) {
					vectors.splice(i, 1)
					i--
				}
			} else {
				vectors[i].points.push(newPoint)
			}
		}
		count++
	}

	console.log(`started at ${startAt}, finished with ${vectors.length} curvy particles`)
}

function setup() {
	createCanvas(500, 500)
	background('#fffffa')

	palette = shuffle(palette)

	vx1 = random(0.1, 1)
	vx2 = random(0.01, 0.08)
	vy1 = random(0.01, 0.08)
	vy2 = random(0.5, 1.5)

	console.log({ vx1, vx2, vy1, vy2 })

	let btn = createButton('add curves')
	btn.mousePressed(drawSomeStuff)

	noLoop()
}

function drawSomeStuff() {
	noFill()
	strokeCap(SQUARE)
	strokeWeight(5)
	stroke(100, 10, 250)

	let startAt = vectors.length

	let ps = particlesCirclePack(15)
	ps.forEach((p) => {
		vectors.push(new Particle(p.x, p.y))
	})

	makeVectorCurves(startAt)

	for (let i = startAt; i < vectors.length; i++) {
		let len = vectors[i].points.length
		beginShape()
		// stroke(100, 10, 250, map(len, 10, 80, 150, 255))
		stroke(palette[vectors[i].col])

		curveVertex(vectors[i].points[0].x, vectors[i].points[0].y)
		vectors[i].points.forEach((p) => {
			curveVertex(p.x, p.y)
		})
		curveVertex(vectors[i].points[len - 1].x, vectors[i].points[len - 1].y)

		endShape()
	}
}

function draw() {
	drawSomeStuff()
}

function findForceX(x, y) {
	// return (sin(x * vx1) + sin(y * vx2)) * -5
	// return sin(x * vx1) - cos(y * vx2)
	return sin(x * (1 / (width * vx1))) - cos(y * vx2)
}

function findForceY(x, y) {
	// return sin((x + y) * vy1) * -5
	return cos(y * (1 / (height * vy2))) + sin(x * vy1)
}

class Particle {
	constructor(x, y) {
		this.x = x
		this.y = y
		this.done = false
		this.nPoints = 0
		this.points = [createVector(this.x, this.y)]
		this.col = false
	}

	addPoint() {
		let prev = this.points[this.points.length - 1]

		let forceX = findForceX(prev.x, prev.y)
		let forceY = findForceY(prev.x, prev.y)

		if (!this.col) {
			if (forceX > 0 && forceY > 0) {
				this.col = 0
			} else if (forceX < 0 && forceY < 0) {
				this.col = 2
			} else {
				this.col = 3
			}
		}

		if (forceX < 1 && forceY < 1) {
			return createVector(prev.x + forceX * 2, prev.y + forceY * 2)
		} else if (forceX < 0.8 && forceY < 0.8) {
			return createVector(prev.x + forceX * 1.2, prev.y + forceY * 1.2)
		} else {
			return createVector(prev.x + forceX, prev.y + forceY)
		}
	}

	update() {
		if (this.done) {
			return
		}
		let prevX = this.x
		let prevY = this.y

		let x = this.x
		let y = this.y

		let forceX = (sin(x * 0.04) + sin(y * 0.03)) * -3
		let forceY = sin((x + y) * 0.02) * -3

		this.x += forceX
		this.y += forceY

		this.checkPixels(prevX, prevY)
	}

	checkPixels(prevX, prevY) {
		stroke(0, 100, 150)
		strokeWeight(5)

		if (floor(this.x) == floor(prevX) || floor(this.y) == floor.prevY) {
			this.nPoints++
			line(prevX, prevY, this.x, this.y)
		} else {
			let pixel = get(floor(this.x), floor(this.y))
			if (pixel[3] > 100) {
				this.findNewPos()
				this.nPoints = 0
			} else {
				this.nPoints++
				line(prevX, prevY, this.x, this.y)
			}
		}
	}

	findNewPos() {
		let found = false
		let i = 0
		let x = random(width)
		let y = random(height)

		while (!found && i < 100) {
			let pix = get(x, y)
			if (pix[3] < 100) {
				found = true
			} else {
				i++
				x = random(width)
				y = random(height)
			}
		}

		if (found) {
			this.x = x
			this.y = y
		} else {
			this.done = true
		}
	}
}

function findVertex(type, x, y, z) {
	if (type == 'noise2d') {
		let angle = noise(x, y) * TWO_PI
		let v = p5.Vector.fromAngle(angle)
		return v
	} else if (type == 'noise3d') {
		let angle = noise(x, y, z) * TWO_PI
		return p5.Vector.fromAngle(angle)
	} else if (type == 'curve') {
		let vx = sin(x)
		let vy = cos(y)
		return createVector(vx, vy)
	}
}

window.setup = setup
window.draw = draw
