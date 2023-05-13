import * as p5 from 'p5'
import { getColor } from './getcolors'

function findForceX(x, y, { vx1, vx2 }) {
	// return (sin(x * vx1) + sin(y * vx2)) * -5
	// return sin(x * vx1) - cos(y * vx2)
	// return sin(x * (1 / (width * vx1))) - cos(y * vx2)
	return sin(x * (1 / (width * vx1))) + cos(y * vx2)
}

function findForceY(x, y, { vy1, vy2 }) {
	// return sin((x + y) * vy1) * -5
	return cos(y * (1 / (height * vy2))) + sin(x * vy1)
}

export type ForceVals = { vx1: number; vx2: number; vy1: number; vy2: number }

export class Curve {
	x: number
	y: number
	done: boolean = false
	nPoints: number = 0
	points: p5.Vector[]
	color: p5.Color = color(0, 100)
	weight: number = 10
	forceVals: ForceVals
	precision: number

	constructor(x, y, forceVals: ForceVals, weight?, precision = 4) {
		this.x = x
		this.y = y
		this.done = false
		this.nPoints = 0
		this.points = [createVector(this.x, this.y)]
		this.weight = weight
		this.forceVals = forceVals
		this.precision = +precision
	}

	getColor(colorDirection: number, palette: string[], alphaVal: number) {
		let prev = this.points[this.points.length - 1]

		let forceX = findForceX(prev.x, prev.y, this.forceVals)
		let forceY = findForceY(prev.x, prev.y, this.forceVals)

		let colIndex = getColor(forceX, forceY, colorDirection)
		let c = color(palette[colIndex])
		c.setAlpha(alphaVal)
		this.color = c
	}

	setAlpha(newAlpha: number) {
		this.color.setAlpha(newAlpha)
	}

	addPoint() {
		let prev = this.points[this.points.length - 1]
		let forceX = findForceX(prev.x, prev.y, this.forceVals)
		let forceY = findForceY(prev.x, prev.y, this.forceVals)

		if (forceX < 1 && forceY < 1) {
			return createVector(prev.x + forceX * 2, prev.y + forceY * 2)
		} else if (forceX < 0.8 && forceY < 0.8) {
			return createVector(prev.x + forceX * 1.2, prev.y + forceY * 1.2)
		} else {
			return createVector(prev.x + forceX, prev.y + forceY)
		}
	}

	checkIntersects(point: p5.Vector, curves: Curve[], threshold: number) {
		let intersects = false

		const pointsMeet = (p1: p5.Vector, p2: p5.Vector) => {
			return abs(p1.x - p2.x) < threshold && abs(p1.y - p2.y) < threshold
		}

		for (let i = 0; i < curves.length; i++) {
			if (curves[i] == this) continue

			for (let j = 0; j < curves[i].points.length; j += 100 - this.precision) {
				if (
					pointsMeet(point, curves[i].points[j]) ||
					point.x < 0 + this.weight / 2 ||
					point.x > width - this.weight / 2 ||
					point.y < 0 + this.weight / 2 ||
					point.y > height - this.weight / 2
				) {
					intersects = true
					break
				}
			}
		}

		return intersects
	}

	draw() {
		stroke(this.color)
		strokeWeight(this.weight)
		beginShape()

		curveVertex(this.points[0].x, this.points[0].y)
		this.points.forEach((p) => curveVertex(p.x, p.y))
		curveVertex(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y)

		endShape()
	}
}
