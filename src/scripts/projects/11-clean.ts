import { Curve, type ForceVals } from './11/Curve'
import { makeOverlay, makeControls } from './11/curve-controls'

let palette = ['#0d5c63', '#fc60a8', '#ff8c42', '#93032e', '#4CB5AE']
let colorDirection
let curves: Curve[] = []
let overlay
let forces, curveVals

let possibles: ForceVals[] = [
	{ vx1: 0.031, vx2: 0.042, vy1: 0.0978, vy2: 0.58 },
	{ vx1: 0.0529, vx2: 0.044986, vy1: 0.0686, vy2: 1.121 },
	{ vx1: 0.038, vx2: 0.07, vy1: 0.021, vy2: 1.44 },
	{ vx1: 0.08, vx2: 0.02, vy1: 0.05, vy2: 1.24 },
	{ vx1: 0.58, vx2: 0.01, vy1: 0.015, vy2: 1.2 },
	{ vx1: 0.654, vx2: 0.043, vy1: -0.077, vy2: 0.552 },
	{ vx1: 0.75, vx2: -0.015, vy1: 0.018, vy2: -0.535 },
	{ vx1: 0.22, vx2: 0.0164, vy1: -0.014, vy2: -1.337 },
]

let timesAdded = 0
let circlePackRadius = 50
let circlePackAttempts = 50

let PARAMS = {
	width: Math.min(window.innerWidth, 800),
	height: Math.min(window.innerHeight, 700),
	minLength: 200,
	idealLength: 500,
	meetThreshold: 3,
	thickness: 10,
	alphaVal: 230,
	precision: 4,
}

function makeCurves(points) {
	let origLength = curves.length
	let longest = 0
	let shortest = +curveVals.idealLength + 1

	points.forEach((point, i) => {
		let curve = new Curve(point.x, point.y, forces, curveVals.thickness, curveVals.precision)
		console.log(`attempt curve ${i} of ${points.length}`)

		let good = true
		while (curve.points.length < curveVals.idealLength) {
			let newPoint = curve.addPoint()
			if (curve.checkIntersects(newPoint, curves, curveVals.meetThreshold)) {
				if (curve.points.length < curveVals.minLength) {
					good = false
					break
				} else {
					good = true
					break
				}
			} else {
				curve.points.push(newPoint)
			}
		}

		if (good) {
			curve.getColor(colorDirection, palette, curveVals.alphaVal)
			curves.push(curve)
		}
	})

	for (let i = origLength; i < curves.length; i++) {
		let len = curves[i].points.length
		if (len > longest) {
			longest = len
		} else if (len < shortest) {
			shortest = len
		}
	}

	console.log(curves)
	console.log(
		`started at ${origLength}, finished with ${curves.length} curvy particles.
		The longest is ${longest}. The shortest is ${shortest}`
	)
}

function addCurves() {
	timesAdded++

	noFill()
	strokeCap(SQUARE)
	strokeWeight(curveVals.thickness)
	stroke(100, 10, 250)

	let startAt = curves.length
	let ps = particlesCirclePack(circlePackRadius, circlePackAttempts * timesAdded)

	makeCurves(ps)

	for (let i = startAt; i < curves.length; i++) {
		curves[i].draw()
	}
}

function redrawCurves() {
	clear(0, 0, width, height)
	drawBgs()
	curves.forEach((curve) => {
		curve.weight = curveVals.thickness
		curve.setAlpha(curveVals.alphaVal)
		curve.draw()
	})
}

function particlesCirclePack(r, maxAttempts = 100) {
	console.log('starting circle pack function')
	let points = []
	let attempts = 0
	let c = 0

	while (attempts < maxAttempts) {
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
	}

	console.log(`took ${c} attempts to make ${points.length} points`)
	return points
}

function drawBgs() {
	clear(0, 0, width, height)
	let bgs = [color(255, 255, 250, 150), color(236, 222, 212, 150), color(252, 244, 237, 250)]
	background(bgs[0])
	strokeWeight(width / 3)
	stroke(bgs[2])
	line(width * -0.1, height * -0.5, width, height * 1.75)
	line(width * 1.5, height * 1, width * -0.25, height * -0.15)
	line(width * 0.75, height * -0.25, width * -0.1, height * 1.1)
	line(width * 0.5, height * -0.2, width * 0.35, height * 1.2)
}

function setVars(rForceVals = true, rCurveVals = false) {
	console.log('setvars', rForceVals)
	curves = []
	palette = shuffle(palette)
	colorDirection = random([1, 2, 3, 4, 5, 6, 7])

	if (rForceVals) {
		forces.vx1 = random(0.1, 1.2)
		forces.vx2 = random(0.01, 0.08)
		forces.vy1 = random(0.01, 0.08)
		forces.vy2 = random(0.5, 1.5)
	}

	if (rCurveVals) {
		curveVals.idealLength = floor(random(50, 700))
		curveVals.minLength = floor(random(20, min(150, curveVals.idealLength)))
		curveVals.meetThreshold = floor(random(1, 10))
		curveVals.thickness = floor(random(2, 14))
		curveVals.alphaVal = floor(random(100, 255))
	}
}

function resize() {
	resizeCanvas(curveVals.width, curveVals.height)
	redrawCurves()
}

function doReset(rForceVals = true, rCurveVals = false) {
	setVars(rForceVals, rCurveVals)
	overlay.show()
	setTimeout(() => {
		drawBgs()
		addCurves()
		overlay.hide()
	}, 50)
}

function setup() {
	let controls = makeControls({
		params: PARAMS,
		doReset,
		redrawCurves,
		addCurves: () => {
			overlay.show()
			setTimeout(() => {
				addCurves()
				overlay.hide()
			}, 50)
		},
		initForceVals: {
			vx1: random(0.1, 1.2),
			vx2: random(0.01, 0.08),
			vy1: random(0.01, 0.08),
			vy2: random(0.5, 1.5),
		},
		resize: resize,
		save: () => saveCanvas(`x${forces.vx1}-${forces.vx2}-y${forces.vy1}-${forces.vy2}`, 'png'),
	})

	forces = controls.forces
	curveVals = controls.curveVals
	overlay = makeOverlay()

	createCanvas(curveVals.width, curveVals.height)

	doReset()
	noLoop()
}

// @ts-ignore
window.setup = setup
