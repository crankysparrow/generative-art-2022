let palette = ['#0d5c63', '#fc60a8', '#ff8c42', '#93032e', '#4CB5AE']
let directionToDuplicateColor = 0
let vectors = []
let vx1, vx2, vy1, vy2

let possibles = [
	{ vx1: 0.031, vx2: 0.042, vy1: 0.0978, vy2: 0.58 },
	{ vx1: 0.0529, vx2: 0.044986, vy1: 0.0686, vy2: 1.121 },
	{ vx1: 0.038, vx2: 0.07, vy1: 0.021, vy2: 1.44 },
	{ vx1: 0.08, vx2: 0.02, vy1: 0.05, vy2: 1.24 },
	{ vx1: 0.58, vx2: 0.01, vy1: 0.015, vy2: 1.2 },
	{ vx1: 0.654, vx2: 0.043, vy1: -0.077, vy2: 0.552 },
	{ vx1: 0.75, vx2: -0.015, vy1: 0.018, vy2: -0.535 },
	{ vx1: 0.22, vx2: 0.0164, vy1: -0.014, vy2: -1.337 },
]

let minLength = 100
let idealLength = 300
let meetThreshold = 3
let circlePackRadius = 50
let circlePackingAttempts = 20
let lineThickness = 10
let timesAdded = 0
let alphaVal = 230

function makeVectorCurves(startAt = 0) {
	console.log('starting make curves function')
	let longest = 0
	let shortest = idealLength + 1

	for (let i = startAt; i < vectors.length; i++) {
		let count = 0
		while (count < idealLength) {
			if (vectors[i].done) {
				break
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
						newPoint.x > width - lineThickness / 2 ||
						newPoint.x < 0 ||
						newPoint.y > height - lineThickness / 2 ||
						newPoint.y < 0
					) {
						intersects = true
						break
					}
				}
			}

			if (intersects) {
				vectors[i].done = true
			} else {
				vectors[i].points.push(newPoint)
			}
			count++
		}
	}

	vectors = vectors.filter((v, i) => {
		if (i < startAt) {
			return true
		} else {
			let len = v.points.length
			if (len < minLength) {
				return false
			}

			if (len > longest) {
				longest = len
			} else if (len < shortest) {
				shortest = len
			}
		}

		return true
	})

	console.log(vectors)
	console.log(
		`started at ${startAt}, finished with ${vectors.length} curvy particles. The longest is ${longest}. The shortest is ${shortest}`
	)
}

function setup() {
	createCanvas(700, 500)
	// background('#faf1f8')

	let bgs = [color(255, 255, 250, 150), color(236, 222, 212, 150), color(252, 244, 237, 150)]
	strokeWeight(200)
	for (let i = 0; i < 5; i++) {
		stroke(random(bgs))
		line(0 - random(width), 0 - random(height), width + random(width), height + random(height))
		line(width + random(width), height + random(height), 0 - random(width), 0 - random(height))
		line(0 - random(width), height + random(height), width + random(width), 0 - random(height))
		line(width + random(width), 0 - random(height), 0 - random(width), height + random(height))
	}
	palette = shuffle(palette)
	directionToDuplicateColor = random([1, 2, 3, 4, 5, 6, 7])

	vx1 = random(0.1, 1.2)
	vx2 = random(0.01, 0.08)
	vy1 = random(0.01, 0.08)
	vy2 = random(0.5, 1.5)
	// ;({ vx1, vx2, vy1, vy2 } = possibles[6])

	console.log({ vx1, vx2, vy1, vy2 })
	let btn = createButton('add curves')
	btn.mousePressed(drawSomeStuff)

	noLoop()
}

function drawSomeStuff() {
	timesAdded++

	noFill()
	strokeCap(SQUARE)
	strokeWeight(lineThickness)
	stroke(100, 10, 250)

	let startAt = vectors.length

	let ps = particlesCirclePack(circlePackRadius, circlePackingAttempts * timesAdded)
	ps.forEach((p) => {
		vectors.push(new Particle(p.x, p.y))
	})

	makeVectorCurves(startAt)

	for (let i = startAt; i < vectors.length; i++) {
		let len = vectors[i].points.length
		beginShape()
		// stroke(100, 10, 250, map(len, 10, 80, 150, 255))
		let c = color(palette[vectors[i].col])
		c.setAlpha(alphaVal)
		stroke(c)

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
	// return sin(x * (1 / (width * vx1))) - cos(y * vx2)
	return sin(x * (1 / (width * vx1))) + cos(y * vx2)
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
			this.col = getColor(forceX, forceY)
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

function particlesCirclePack(r, maxAttempts = 100) {
	console.log('starting circle pack function')
	let points = []
	let keepGoing = true
	let attempts = 0
	let c = 0

	while (keepGoing) {
		c++
		let newPoint = createVector(random(r / 2, width - r / 2), random(r / 2, height - r / 2))
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

		if (attempts > maxAttempts) {
			keepGoing = false
		}
	}

	console.log(`took ${c} attempts to make ${points.length} points`)
	return points
}

function getColor(forceX, forceY) {
	if (directionToDuplicateColor == 1) {
		// toward top2: y down, either x
		if (forceX < 0 && forceY > 0) {
			return 1
		} else if (forceX > 0 && forceY > 0) {
			return 2
		} else {
			return 3
		}
	} else if (directionToDuplicateColor == 2) {
		// toward bottom2: y up, either x
		if (forceX < 0 && forceY < 0) {
			return 1
		} else if (forceX > 0 && forceY < 0) {
			return 2
		} else {
			return 3
		}
	} else if (directionToDuplicateColor == 3) {
		// topright corner, botleft corner: y down & x up // yup & x down
		if (forceX < 0 && forceY > 0) {
			return 1
		} else if (forceX > 0 && forceY < 0) {
			return 2
		} else {
			return 3
		}
	} else if (directionToDuplicateColor == 4) {
		// topleft, botright: y down & x down, y up & x up
		if (forceX > 0 && forceY > 0) {
			return 1
		} else if (forceX < 0 && forceY < 0) {
			return 2
		} else {
			return 3
		}
	} else if (directionToDuplicateColor == 5) {
		// toward right2: x up, y either
		if (forceX < 0 && forceY > 0) {
			return 1
		} else if (forceX < 0 && forceY < 0) {
			return 2
		} else {
			return 3
		}
	} else if (directionToDuplicateColor == 6) {
		if (forceX > 0 && forceY > 0) {
			return 1
		} else if (forceX > 0 && forceY < 0) {
			return 2
		} else {
			return 3
		}
	} else {
		if (forceX > 0 && forceY > 0) {
			return 1
		} else if (forceX > 0 && forceY < 0) {
			return 2
		} else if (forceX < 0 && forceY > 0) {
			return 3
		} else if (forceX < 0 && forceY > 0) {
			return 4
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
