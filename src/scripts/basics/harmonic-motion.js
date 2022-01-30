import { Controls } from '../utils/Controls.js'

let wave
let options = ['wiggle', 'fronds', 'line', 'paint', 'additive']
let settings = {}
let current

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	ellipseMode(CENTER)

	current = random(options)
	makeControls()

	let m = min(width, height)

	settings = {
		fronds: {
			options: {
				start: width * 0.1,
				end: width * 0.9,
			},
			constructor: WaveFronds,
		},
		wiggle: {
			options: {
				start: m * 0.1 + (width - m) / 2,
				end: m * 0.9 + (width - m) / 2,
				amplitude: m * 0.3,
			},
			constructor: WaveWiggle,
		},
		line: {
			options: {},
			constructor: WaveLine,
		},
		paint: {
			options: {
				start: m * 0.1 + (width - m) / 2,
				end: m * 0.9 + (width - m) / 2,
				amplitude: m * 0.2 + (height - m) / 2,
				step: m * 0.02,
				velocity: 0.2,
			},
			constructor: WavePaint,
		},
		additive: {
			options: {},
			constructor: WaveAdditive,
		},
	}

	let s = settings[current]
	wave = new s.constructor(s.options)
	background(255)
}

function draw() {
	wave.update()
	wave.draw()
}

function makeControls() {
	let controls = new Controls()

	let optionsSel = controls.createSelect({
		id: 'options-sel',
		labelString: 'mode',
		options: options,
		selected: current,
		onChange: (e) => {
			let mode = optionsSel.el.value()
			let s = settings[mode]
			wave = new s.constructor(s.options)
		},
	})

	let randomize = controls.createBtn({
		labelString: 'randomize',
		onClick: () => {
			let mode = optionsSel.el.value()
			let s = settings[mode]
			wave = new s.constructor(s.options)
		},
	})
}

class WaveFronds {
	constructor({ velocity, amplitude, start, end, step, yMid, frameVelocity }) {
		this.angle = 0
		this.velocity = velocity ?? random(0.1, 0.4)
		this.frameVelocity = frameVelocity ?? 0.01
		this.amplitude = amplitude ?? random(height * 0.2, height * 0.4)
		this.start = start ?? 0
		this.end = end ?? width
		this.step = step ?? floor(random(3, 40))
		this.yMid = yMid ?? height / 2
		this.width = this.step * random(3, 8)
	}

	update() {
		this.angle += this.frameVelocity
	}

	draw() {
		background(255)
		noStroke()
		let a = this.angle

		push()
		translate(0, this.yMid)
		for (let x = this.start; x <= this.end; x += this.step) {
			let y = sin(a) * this.amplitude
			let y2 = sin(a + this.velocity) * this.amplitude
			let redVal = map(sin(a), -1, 1, 0, 255)
			let blueVal = map(cos(a), -1, 1, 0, 255)
			fill(redVal, 200, blueVal, 150)

			triangle(x, y, x - this.width * 0.25, y, x + this.width * 0.75, 0)
			a += this.velocity
		}
		pop()
	}
}

class WaveWiggle {
	constructor({ velocity, amplitude, start, end, step, yMid, frameVelocity }) {
		this.angle = 0
		// this.velocity = velocity ?? 0.2
		this.velocity = velocity ?? random(0.1, 0.4)
		this.frameVelocity = frameVelocity ?? this.velocity / 10
		// this.frameVelocity = frameVelocity ?? random(0, 0.03)
		this.amplitude = amplitude ?? 100
		this.start = start ?? 0
		this.end = end ?? width
		this.step = step ?? 10
		this.yMid = yMid ?? height / 2
		background(255)
	}

	update() {
		this.angle += this.frameVelocity
	}

	draw() {
		let redVal = map(sin(this.angle), -1, 1, 0, 255)
		let blueVal = map(cos(this.angle), -1, 1, 0, 255)
		stroke(redVal, 200, blueVal, 100)
		let a = this.angle
		let start = this.start + map(sin(frameCount * 0.1), -1, 1, -this.step, this.step)

		push()
		translate(0, this.yMid)
		for (let x = start; x <= this.end; x += this.step) {
			let y = sin(a) * this.amplitude
			line(x, 0, x, y)
			a += this.velocity
		}
		pop()
	}
}

class WavePaint {
	constructor({ velocity, amplitude, start, end, step, yMid, frameVelocity }) {
		this.angle = 0
		this.velocity = velocity ?? 0.2
		this.frameVelocity = frameVelocity ?? 0.02
		this.amplitude = amplitude ?? 100
		this.start = start ?? 0
		this.end = end ?? width
		this.step = step ?? 10
		this.yMid = yMid ?? height / 2
		background(255)
	}

	update() {
		this.angle += this.frameVelocity
	}

	draw() {
		let redVal = map(sin(this.angle), -1, 1, 0, 255)
		let blueVal = map(cos(this.angle), -1, 1, 0, 255)
		stroke(redVal, 200, blueVal, 200)
		strokeWeight(1)
		noFill()
		let a = this.angle

		push()
		translate(0, this.yMid)
		beginShape()
		curveVertex(this.start, sin(a) * this.amplitude)
		for (let x = this.start; x <= this.end; x += this.step) {
			let y = sin(a) * this.amplitude
			curveVertex(x, y)
			a += this.velocity
		}
		curveVertex(this.end, sin(a) * this.amplitude)
		endShape()
		pop()
	}
}

class WaveLine {
	constructor({
		velocity,
		amplitude,
		start,
		end,
		step,
		yMid,
		frameVelocity,
		transparent = false,
	}) {
		this.angle = 0
		this.velocity = velocity ?? random(0.03, 0.5)
		this.frameVelocity = frameVelocity ?? this.velocity / random(8, 12)
		this.amplitude = amplitude ?? random(height * 0.15, height * 0.45)
		this.start = start ?? 0
		this.end = end ?? width
		this.step = step ?? 10
		this.yMid = yMid ?? height / 2
		this.transparent = transparent
		this.vals = []
		this.c
		background(255)
	}

	update() {
		this.angle += this.frameVelocity
		this.vals = []
		let a = this.angle

		let redVal = map(sin(this.angle), -1, 1, 0, 255)
		let blueVal = map(cos(this.angle), -1, 1, 0, 255)
		this.c = color(redVal, 200, blueVal, 255)

		for (let x = this.start; x <= this.end; x += this.step) {
			let y = sin(a) * this.amplitude
			this.vals.push([x, y])
			a += this.velocity
		}
	}

	draw() {
		if (!this.transparent) {
			background(255)
		}
		stroke(this.c)
		strokeWeight(2)
		noFill()

		push()
		translate(0, this.yMid)
		beginShape()
		this.vals.forEach(([x, y]) => {
			curveVertex(x, y)
		})
		endShape()
		pop()
	}
}

class WaveAdditive {
	constructor({ v1, v2, v3, a1, a2, a3, step } = {}) {
		this.angle1 = 0
		this.angle2 = 0
		this.angle3 = 0
		// this.v1 = v1 ?? 0.15
		// this.v2 = v2 ?? 1
		// this.v3 = v3 ?? 0.4
		this.v1 = v1 ?? random(0, 1)
		this.v2 = v2 ?? random(0, 1)
		this.v3 = v3 ?? random(0, 1)
		// this.a1 = a1 ?? 120
		// this.a2 = a2 ?? 20
		// this.a3 = a3 ?? 50

		this.a1 = a1 ?? random(0, 130)
		this.a2 = a2 ?? random(0, 130)
		this.a3 = a3 ?? random(0, 130)
		this.c = color(random(100, 255), random(0, 120), random(100, 255))
		this.step = step ?? 10
		this.start = 0
		this.end = width
		background(255)
	}

	update() {
		this.angle1 += 0.02
		this.angle2 += 0.02
		this.angle3 += 0.02
	}

	draw() {
		background(255)
		stroke(this.c)
		strokeWeight(2)
		noFill()
		let a1 = this.angle1
		let a2 = this.angle2
		let a3 = this.angle3

		push()
		translate(0, height / 2)
		beginShape()

		for (let x = this.start; x <= this.end; x += this.step) {
			let y1 = sin(a1) * this.a1
			let y2 = sin(a2) * this.a2
			let y3 = sin(a3) * this.a3
			curveVertex(x, y1 + y2 + y3)
			a1 += this.v1
			a2 += this.v2
			a3 += this.v3
		}

		endShape()
		pop()
	}
}

window.setup = setup
window.draw = draw
