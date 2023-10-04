import * as p5 from 'p5'

type LayerOpts = {
	sides?: number
	radius?: number
	alpha?: number
	times?: number
	rStep?: number
	col: p5.Color
	rInit?: number
}

export class ShapesLayer {
	sides: number
	radius: number
	alpha: number
	times: number
	rStep: number
	_color: p5.Color
	rInit: number

	constructor({ sides, radius, alpha, times, rStep, col, rInit }: LayerOpts) {
		let m = min(width, height)
		this.radius = radius || random(m * 0.01, m * 0.48)
		this.sides = sides || random([3, 4, 5, 6, 7])
		this.alpha = alpha || random(50, 150)
		this.times = times || floor(random(10, 200))
		this.rStep = rStep || random(0.005, 0.02)
		this.color = color(col)
		this.rInit = rInit ?? random(PI)
	}

	set color(col: p5.Color) {
		this._color = color(col)
		this._color.setAlpha(this.alpha)
	}

	draw() {
		let angle = TWO_PI / this.sides

		stroke(this._color)

		push()
		rotate(this.rInit - (this.times * this.rStep) / 2)
		let i = 0
		while (i < this.times) {
			rotate(this.rStep)
			beginShape()
			for (let i = 0; i <= this.sides; i++) {
				let x = cos(angle * i) * this.radius
				let y = sin(angle * i) * this.radius
				vertex(x, y)
			}
			endShape(CLOSE)
			i++
		}
		pop()
	}
}

export function generateShapes(palette: p5.Color[]) {
	let m = min(width, height)
	let radius = m * 0.48
	let layers = []

	while (radius > m * 0.03) {
		let sides = radius > m * 0.25 ? random([3, 4, 5]) : random([3, 4, 5])
		let rStep = sides === 3 ? random(0.005, 0.1) : random(0.005, 0.02)
		let times = floor(random(10, (PI * 2) / sides / rStep))
		let alpha = sides === 3 ? random(100, 200) : random(50, 150)
		layers.push(
			new ShapesLayer({
				sides,
				radius,
				rStep,
				times,
				alpha,
				rInit: random([PI * 0.25, PI * 0.5, 0]),
				col: random(palette),
			})
		)
		radius -= random(m * 0.05, m * 0.1)
	}

	return layers
}
