import { paletteFromUrl } from '../utils/utils.js'

let color1, color2

let paletteUrls = [
	'https://coolors.co/fb8b24-d90368-820263-291720-04a777',
	'https://coolors.co/b5ffe1-93e5ab-65b891-4e878c-00241b',
	'https://coolors.co/eaf0ce-c0c5c1-7d8491-574b60-3f334d',
	'https://coolors.co/7776bc-cdc7e5-fffbdb-ffec51-ff674d',
	'https://coolors.co/e3b505-95190c-610345-107e7d',
]
// let palettes = paletteUrls.map((p) => paletteFromUrl(p))
// console.log(palettes)
let palettes = [
	['#fb8b24', '#d90368', '#820263', '#291720', '#04a777'],
	['#b5ffe1', '#93e5ab', '#65b891', '#4e878c', '#00241b'],
	['#eaf0ce', '#c0c5c1', '#7d8491', '#574b60', '#3f334d'],
	['#7776bc', '#cdc7e5', '#fffbdb', '#ffec51', '#ff674d'],
	['#e3b505', '#95190c', '#610345', '#107e7d'],
]

let palettesOrg = [
	{
		light: ['#ffec51'],
		dark: ['#ff674d'],
		all: [('#7776bc', '#cdc7e5', '#fffbdb', '#ff674d')],
	},
	{
		dark: ['#95190c', '#610345'],
		all: ['#e3b505', '#95190c', '#610345', '#107e7d'],
	},
]

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	colorMode(HSB)

	generateColors()
	noLoop()
}

const phi = (1 + Math.sqrt(5)) / 2

function generateColors() {
	// let palette = random(palettes)
	// color1 = random(palette)
	// let b1 = brightness(color1)
	// color2 = random(palette.filter((p) => p !== color1))
	// if (!color2) color2 = '#0a0a0a'

	let h = random()
	color1 = color(h * 360, random(20, 35), random(90, 100))

	// h += (1 / phi) * random(0.8, 1)
	// h %= 1

	h += 1 / phi
	h %= 1

	color2 = color(h * 360, 70, 25)
}

function mouseClicked() {
	generateColors()
	redraw()
}

function draw() {
	noLoop()
	drawPatterns()
}

class Shape {
	constructor(ptnWdth, col) {
		this.ptnWdth = ptnWdth
		this.col = col

		this.stepY, this.sizeY, this.stepN, this.multX, this.sizeX, this.off

		this.setStepY(random([40, 50, 60, 70]))
		this.setSizeY(this.stepY * random(0.4, 0.8))

		this.setX(random(0.25, 0.45))
		this.setOff(random() < 0.5)
		this.outline = random() < 0.5
		this.dots = false
		this.opposite = true

		this.dotPosY = (this.stepY - this.sizeY) * -0.5
		this.dotPosX = this.ptnWdth * (this.off ? 0.25 : 0.5)
	}

	makeDots(n = 1, [multMin, multMax] = [0.1, 0.4]) {
		let dots = new Array(n)
		if (n === 2) {
			let mid = (multMax - multMin) / 2 + multMin
			dots[0] = random() < 0.5 ? new Dots(this.ptnWdth, [multMin, mid * 0.9]) : false
			dots[1] = random() < 0.5 ? new Dots(this.ptnWdth, [mid * 1.1, multMax]) : false
		} else {
			let i = 0
			while (i < n) {
				dots[i] = new Dots(this.ptnWdth, [multMin, multMax])
				i++
			}
		}

		this.dots = dots
	}

	drawDot(i) {
		let index = i % this.dots.length
		let current = this.dots[index]
		if (!current) return

		if (this.off) {
			current.dot(this.dotPosX, this.dotPosY, this.col)
			current.dot(this.ptnWdth - this.dotPosX, this.dotPosY + this.stepY * 0.5, this.col)
		} else {
			current.dot(this.dotPosX, this.dotPosY, this.col)
		}
	}

	setSizeY(sizeY) {
		this.sizeY = sizeY
		this.dotPosY = (this.stepY - this.sizeY) * -0.5
	}

	setStepY(stepY) {
		this.stepY = stepY
		this.stepN = ceil(height / this.stepY)
		this.dotPosY = (this.stepY - this.sizeY) * -0.5
	}

	setX(multX) {
		this.multX = multX
		this.sizeX = this.ptnWdth * this.multX
	}

	setOff(off) {
		this.off = off
		this.dotPosX = this.ptnWdth * (this.off ? 0.25 : 0.5)
	}

	loop() {
		let i = 0
		translate(0, -this.stepY)
		while (i <= this.stepN) {
			push()
			translate(0, this.stepY * i)

			this.setColors()

			this.shapeLeft()
			if (this.opposite) this.shapeRight()

			if (this.stepExtras) this.stepExtras()
			if (this.dots) this.drawDot(i)
			pop()
			i++
		}
	}

	setColors() {
		if (this.outline) {
			noFill()
			stroke(this.col)
			strokeWeight(3)
		} else {
			noStroke()
			fill(this.col)
		}
	}

	drawShape(x, y, w, h) {
		rect(x, y, w, h, 0, 4, 4, 0)
	}

	shapeLeft() {
		this.drawShape(0, 0, this.sizeX, this.sizeY)
	}

	shapeRight() {
		this.drawShape(this.ptnWdth, this.off ? this.stepY / 2 : 0, -this.sizeX, this.sizeY)
	}
}

class ShapeRects extends Shape {
	constructor(ptnWdth, col) {
		super(ptnWdth, col)
	}
}

class ShapeTri extends Shape {
	constructor(ptnWdth, col, off) {
		super(ptnWdth, col)

		this.setOff(off !== undefined ? off : random() < 0.5)
		if (this.off) {
			let stepY = random([50, 60, 70, 70, 80])
			this.setStepY(stepY)
			let sizeY = this.stepY * random(0.5, 1.25)
			this.setSizeY(sizeY)
			this.setX(random(0.4, 0.6))
		} else {
			this.setSizeY(this.stepY * random(0.4, 1.15))
			this.setX(random(0.35, 0.55))
		}
		this.outline = this.multX <= 0.5 && this.sizeY <= this.stepY ? random() < 0.5 : false

		this.midX = this.sizeX * 0.35
		this.midY = this.sizeY * 0.3

		if (!this.off && random() < 0.5) this.makeDots(random([1, 2]))
	}

	drawShape(x, y, w, h) {
		triangle(x, y, x + w, y + h * 0.5, x, y + h)
	}

	stepExtras() {
		if (this.outline) {
			fill(this.col)
			noStroke()
			triangle(0, this.midY, this.midX, this.sizeY * 0.5, 0, this.sizeY - this.midY)
			let y1 = this.midY
			let y2 = this.sizeY * 0.5
			let y3 = this.sizeY - this.midY
			let yHalf = this.stepY * 0.5
			if (this.off) {
				triangle(
					this.ptnWdth,
					yHalf + y1,
					this.ptnWdth - this.midX,
					yHalf + y2,
					this.ptnWdth,
					yHalf + y3
				)
			} else {
				triangle(this.ptnWdth, y1, this.ptnWdth - this.midX, y2, this.ptnWdth, y3)
			}
		}
	}
}

class ShapeBumps extends Shape {
	constructor(ptnWdth, col) {
		super(ptnWdth, col)
		this.setStepY(random([60, 70, 80, 90]))
		this.setSizeY(this.stepY * random(0.4, 0.85))

		this.setX(random([0.25, 0.3, 0.35]))
		if (this.sizeX < this.sizeY / 2) this.sizeX = this.sizeY * 0.6

		this.setOff(random() < 0.5)
		this.outline = random() < 0.5

		this.r = this.sizeY / 2
		this.x2 = this.sizeX - this.r
		if (!this.off) this.makeDots(random([1, 2]))
	}

	shapeLeft() {
		if (this.outline) {
			line(0, 0, this.x2, 0)
			line(0, this.sizeY, this.x2, this.sizeY)
		} else {
			rect(0, 0, this.x2 + 1, this.sizeY)
		}
		arc(this.x2, this.r, this.sizeY, this.sizeY, -PI / 2, PI / 2, OPEN)
	}

	shapeRight() {
		let ypos = this.off ? this.stepY * 0.5 : 0
		if (this.outline) {
			line(this.ptnWdth, ypos, this.ptnWdth - this.x2, ypos)
			line(this.ptnWdth, ypos + this.sizeY, this.ptnWdth - this.x2, ypos + this.sizeY)
		} else {
			rect(this.ptnWdth, ypos, -this.x2 - 1, this.sizeY)
		}
		arc(this.ptnWdth - this.x2, ypos + this.r, this.sizeY, this.sizeY, PI / 2, -PI / 2, OPEN)
	}
}

class ShapeLeaf extends Shape {
	constructor(ptnWdth, col) {
		super(ptnWdth, col)
		this.setOff(random() < 0.5)
		this.outline = random() < 0.5

		if (random() < 0.5) {
			// diamond
			this.c = [0.8, 0.12]
			this.setX(this.off ? random(0.5, 0.6) : random(0.35, 0.5))
			this.setSizeY(this.stepY * random(0.9, 1.1))
			if (this.off && this.outline) {
				this.makeDots(1, [0.1, 0.3])
				this.dotPosY = 0
				this.dotPosX = this.multX * 0.5 * this.ptnWdth
			} else if (!this.off && this.outline) {
				if (random() < 0.7) this.makeDots(random([1, 2, 2]), [0.1, 0.2])
				this.dotPosY = this.stepY / 2
			}
		} else {
			// leaf
			this.c = [0.25, 0.15]
			this.setX(this.off ? random(0.5, this.outline ? 0.9 : 0.7) : random(0.35, 0.5))
			if (!this.off) this.setStepY(random([30, 40, 50]))
			this.setSizeY(this.off ? random([50, 60, 20]) : random([30, 40, 50]))
			if (this.off && this.outline) {
				if (random() < 0.7) this.makeDots(random([1, 2, 2]), [0.1, 0.2])
				this.dotPosX = this.multX * 0.25 * this.ptnWdth
				this.dotPosY = 0
			}
		}

		this.len = this.sizeX
		this.r = this.sizeY / 2
	}

	drawShape(x, y, r, len) {
		let p1 = x + this.c[0] * len
		let p2 = x + this.c[1] * len
		beginShape()
		vertex(x, y)
		bezierVertex(p1, y + r, p2, y + r, x + len, y)
		bezierVertex(p2, y - r, p1, y - r, x, y)
		endShape()
	}

	shapeLeft() {
		this.drawShape(0, 0, this.r, this.len)
	}

	shapeRight() {
		this.drawShape(this.ptnWdth, this.off ? this.stepY / 2 : 0, this.r, -this.len)
	}
}

function drawPatterns() {
	let stepWidth = 100
	let stepN, stepSmall, stepBig

	stepN = ceil(width / stepWidth)
	stepWidth = width / stepN
	stepSmall = stepWidth * 0.35
	stepBig = stepWidth - stepSmall

	background(color1)
	console.log('***********************************')

	noStroke()

	let tx = 0
	let xPos = -stepSmall / 2
	while (tx <= stepN * 2) {
		push()
		if (tx % 2 === 0) {
			stroke(color2)
			strokeWeight(3)

			translate(xPos, 0)
			line(0, 0, 0, height)
			line(stepSmall, 0, stepSmall, height)
			line(stepSmall * 0.2, 0, stepSmall * 0.2, height)
			line(stepSmall * 0.8, 0, stepSmall * 0.8, height)
			strokeWeight(stepSmall * 0.35)
			noFill()
			stroke(color1)

			xPos += stepSmall
		} else {
			translate(xPos, 0)

			let shape = randomShape(stepBig, color2)
			// let shape = new ShapeBumps(stepBig, color2)
			console.log(shape)
			shape.loop()
			xPos += stepBig
		}
		pop()

		tx += 1
	}
}

function randomShape(ptnWdth, col) {
	let choice = random(['tri', 'trizig', 'bumps', 'leaf', 'rects', 'leaf'])
	switch (choice) {
		case 'tri':
			return new ShapeTri(ptnWdth, col, false)
		case 'trizig':
			return new ShapeTri(ptnWdth, col, true)
		case 'bumps':
			return new ShapeBumps(ptnWdth, col)
		case 'leaf':
			return new ShapeLeaf(ptnWdth, col)
		default:
			return new Shape(ptnWdth, col)
	}
}

class Dots {
	constructor(patternWidth, [multMin, multMax] = [0.1, 0.4]) {
		this.mult = random(multMin, multMax)
		this.size = this.mult * patternWidth
		this.style = random() < 0.5 ? 'fill' : 'stroke'
	}
	dot(x, y, col) {
		if (this.style === 'fill') {
			fill(col)
			noStroke()
		} else {
			stroke(col)
			strokeWeight(2)
			noFill()
		}
		circle(x, y, this.size)
	}
}

window.setup = setup
window.draw = draw
window.mouseClicked = mouseClicked
