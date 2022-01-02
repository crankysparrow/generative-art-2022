import { Tooltip } from '../utils/Tooltip.js'

let diag, g, tileSize, p, tip

let settings = {
	alphaVal: 1,
	strokeRange: 4,
	alphaToggle: true,
	hueVal1: 70,
	hueVal2: 100,
	steps: 30,
	saturationToggle: true,
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	colorMode(HSB, 100)

	tileSize = 100
	p = createVector(random(), random())
	noLoop()

	tip = new Tooltip({
		titleString: 'keyboard shortcuts',
		btnName: 'keys',
		tipContent: [
			['q', 'save'],
			['ArrowUp', 'alphaMax+'],
			['ArrowDown', 'alphaMax-'],
			['ArrowRight', 'strokeRange+'],
			['ArrowLeft', 'strokeRange-'],
			['a', 'alpha toggle'],
			['h', 'hueVal1 cycle'],
			['j', 'hueVal2 cycle'],
			['s', 'saturationToggle'],
			['1-4', 'steps * 10'],
			['r', 'new pattern'],
		],
		note: 'open console to view vals on change',
	})
}

function patternLine(x, y, cur, g) {
	let d = dist(x, y, cur.x, cur.y)
	let col1 = color(settings.hueVal1, settings.saturationToggle ? 70 : map(d, 0, diag, 30, 60), 50)
	let col2 = color(settings.hueVal2, settings.saturationToggle ? 70 : map(d, 0, diag, 30, 60), 50)
	let col = lerpColor(col1, col2, map(d, 0, diag, 0, 1))
	// let col = color(map(d, 0, diag, hueVal, hueVal + hueRange), saturationToggle ? 70 : map(d, 0, diag, 30, 60), 50)
	if (settings.alphaToggle) {
		col.setAlpha(map(d, 0, diag, 0, 100 * settings.alphaVal))
	} else {
		col.setAlpha(100 * settings.alphaVal)
	}

	if (g) {
		g.stroke(col)
		g.strokeWeight(floor(map(d, 0, diag, settings.strokeRange, 1)))
		g.line(x, y, cur.x, cur.y)
	} else {
		stroke(col)
		strokeWeight(floor(map(d, 0, diag, settings.strokeRange, 1)))
		line(x, y, cur.x, cur.y)
	}
}

function createTile() {
	let px = p.x * tileSize
	let py = p.y * tileSize
	diag = dist(0, 0, tileSize, tileSize)

	let g = createGraphics(tileSize, tileSize)
	let cur = createVector(px, py)
	let i = 0
	for (let pos = 0; pos < tileSize; pos += tileSize / settings.steps) {
		patternLine(pos, 0, cur, g)
		patternLine(pos, tileSize, cur, g)
		patternLine(0, pos, cur, g)
		patternLine(tileSize, pos, cur, g)
		i++
	}

	return g
}

function draw() {
	background(255)
	stroke(0, 100)
	noFill()

	g = createTile()
	let j = 0
	for (let y = 0; y < height; y += tileSize) {
		let i = 0
		for (let x = 0; x < width; x += tileSize) {
			push()
			translate(x, y)
			if (i % 2 == 0) {
				scale(-1, 1)
				translate(-tileSize, 0)
			}
			if (j % 2 == 0) {
				scale(1, -1)
				translate(0, -tileSize)
			}
			image(g, 0, 0, tileSize)
			pop()
			i++
		}
		j++
	}
}

window.setup = setup
window.draw = draw

window.keyPressed = () => {
	if (key === 'q') {
		saveCanvas('gridpatterns')
		return
	} else if (key === 'r') {
		p = createVector(random(), random())
		redraw()
		return
	}
	if (key == 'ArrowDown') {
		settings.alphaMax -= 0.05
	} else if (key == 'ArrowUp') {
		settings.alphaMax += 0.05
	} else if (key == 'ArrowRight') {
		settings.strokeRange += 1
	} else if (key == 'ArrowLeft') {
		settings.strokeRange -= 1
	} else if (key === 'a') {
		settings.alphaToggle = !settings.alphaToggle
		settings.alphaMax = 1
	} else if (key === 'h') {
		settings.hueVal1 += 5
		settings.hueVal1 %= 100
	} else if (key === 'j') {
		settings.hueVal2 += 5
		settings.hueVal2 %= 100
	} else if (key === 'n') {
		settings.hueVal1 = settings.hueVal1 < 5 ? 100 : settings.hueVal1 - 5
	} else if (key === 'm') {
		settings.hueVal2 = settings.hueVal2 < 5 ? 100 : settings.hueVal2 - 5
	} else if (key == 's') {
		settings.saturationToggle = !settings.saturationToggle
	} else if (key === '1') {
		settings.steps = 10
	} else if (key == '2') {
		settings.steps = 20
	} else if (key == '3') {
		settings.steps = 30
	} else if (key == '4') {
		settings.steps = 40
	}

	redraw()

	console.log(settings)
}
