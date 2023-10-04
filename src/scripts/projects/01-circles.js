import { paletteFromUrl } from '../utils/utils.js'
import { Circles } from './01-CirclePack.ts'

let info = document.querySelector('.info')
let circles, m, p
let colors = [
	'#0ab03c',
	'#2756fe',
	'#31379e',
	'#41faeb',
	'#6333f5',
	'#8bfc1a',
	'#c850f1',
	'#dd2525',
	'#ee73dd',
	'#fab97c',
	'#fe2e8b',
	'#ff831e',
]

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	noLoop()

	p = createP('')
	p.parent(info)
}

function makeCircles() {
	m = floor(min(width, height))
	circles = new Circles({
		width,
		height,
		space: 2,
	})

	circles.pack(170, 5, 2)
	circles.pack(120, 3, 3)
	circles.pack(80, 10, 10)
	circles.pack(50, 30)
	circles.pack(30, 100)
	circles.pack(20, 1000)
	circles.pack(15, 2000)
}

function draw() {
	makeCircles()
	noStroke()

	let palette = shuffle(colors)

	background(palette.pop())
	let colorLines = palette.pop()
	let colorFills = palette.pop()

	fill(colorFills)
	noStroke()
	circles.forEach((c) => c.draw())

	let lines = 0
	while (lines < 10) {
		let [c1, c2] = [random(circles), random(circles)]
		if (c1.distanceTo(c2) > m / 2) continue

		fill(colorLines)
		circle(c1.x, c1.y, c1.dia * 0.4)
		circle(c2.x, c2.y, c2.dia * 0.4)

		strokeWeight(3)
		stroke(colorLines)
		noFill()
		line(c1.x, c1.y, c2.x, c2.y)

		lines++
	}

	p.html(`generated ${circles.length} circles in ${circles.stats.attempts} attempts`)
}

function windowResized() {
	resizeCanvas(window.innerWidth, window.innerHeight)
	makeCircles()
}

window.setup = setup
window.draw = draw
window.windowResized = windowResized

window.addEventListener('keypress', (e) => {
	if (e.code == 'Space') {
		e.preventDefault()
		redraw()
	}
})
