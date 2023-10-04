import { Tooltip } from '../utils/Tooltip.js'
import lerpColorByHue from '../utils/lerpColorByHue.js'

let diag, g, p, tip

let settings = {
	alphaVal: 1,
	strokeRange: 3,
	alphaToggle: true,
	hueVal1: 0,
	hueVal2: 0,
	steps: 40,
	hueClockwise: true,
	tileSize: 100,
	reflection: 'xy',
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	colorMode(HSB)

	settings.hueVal1 = floor(random(360))
	settings.hueVal2 = floor(random(360))

	p = createVector(random(), random())
	noLoop()

	tip = new Tooltip({
		titleString: 'keyboard shortcuts',
		btnName: 'keys',
		tipContent: [
			['s', 'save'],
			['ArrowUp', 'alphaVal+'],
			['ArrowDown', 'alphaVal-'],
			['ArrowRight', 'tileSize+'],
			['ArrowLeft', 'tileSize-'],
			['c', 'strokeRange+'],
			['x', 'strokeRange-'],
			['a', 'alpha toggle'],
			['j', 'hueVal1+'],
			['h', 'hueVal1-'],
			['m', 'hueVal2+'],
			['n', 'hueVal2-'],
			['b', 'toggle hueRotateClockwise'],
			['1-0', 'steps * 10'],
			['w', 'new pattern'],
		],
		note: 'open console to view vals on change',
	})

	requestAnimationFrame(checkForKeys)
}

function patternLine(x, y, cur, g) {
	let d = dist(x, y, cur.x, cur.y)
	let col1 = color(settings.hueVal1, random(50, 100), 50)
	let col2 = color(settings.hueVal2, random(50, 100), 50)
	let col = lerpColorByHue(col1, col2, map(d, 0, diag, 0, 1), settings.hueClockwise)
	if (settings.alphaToggle) {
		col.setAlpha(map(d, 0, diag, 0, settings.alphaVal))
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
	let px = p.x * settings.tileSize
	let py = p.y * settings.tileSize
	diag = dist(0, 0, settings.tileSize, settings.tileSize)

	let g = createGraphics(settings.tileSize, settings.tileSize)
	let cur = createVector(px, py)
	let i = 0
	for (let pos = 0; pos < settings.tileSize; pos += settings.tileSize / settings.steps) {
		patternLine(pos, 0, cur, g)
		patternLine(pos, settings.tileSize, cur, g)
		patternLine(0, pos, cur, g)
		patternLine(settings.tileSize, pos, cur, g)
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
	for (let y = 0; y < height; y += settings.tileSize) {
		let i = 0
		for (let x = 0; x < width; x += settings.tileSize) {
			push()
			translate(x, y)
			if ((settings.reflection == 'xy' || settings.reflection == 'y') && i % 2 == 0) {
				scale(-1, 1)
				translate(-settings.tileSize, 0)
			}
			if ((settings.reflection == 'xy' || settings.reflection == 'x') && j % 2 == 0) {
				scale(1, -1)
				translate(0, -settings.tileSize)
			}
			image(g, 0, 0, settings.tileSize)
			pop()
			i++
		}
		j++
	}
}

window.setup = setup
window.draw = draw

window.keyReleased = () => {
	if (key === 's') {
		saveCanvas('gridpatterns')
		return
	}

	if (key === 'w') {
		p = createVector(random(), random())
	} else if (key === 'b') {
		settings.hueClockwise = !settings.hueClockwise
	} else if (key === '1') {
		settings.steps = 10
	} else if (key == '2') {
		settings.steps = 20
	} else if (key == '3') {
		settings.steps = 30
	} else if (key == '4') {
		settings.steps = 40
	} else if (key == '5') {
		settings.steps = 50
	} else if (key == '6') {
		settings.steps = 60
	} else if (key == '7') {
		settings.steps = 70
	} else if (key == '8') {
		settings.steps = 80
	} else if (key == '9') {
		settings.steps = 90
	} else if (key == '0') {
		settings.steps = 100
	} else if (key == 'a') {
		settings.alphaToggle = !settings.alphaToggle
		settings.alphaVal = 1
	}

	console.log(settings)

	redraw()
}

function keyPressActions() {
	let doRedraw = true
	if (key == 'ArrowDown') {
		if (settings.alphaVal > 0) settings.alphaVal -= 0.01
	} else if (key == 'ArrowUp') {
		if (settings.alphaVal < 1) settings.alphaVal += 0.01
	} else if (key == 'ArrowRight') {
		settings.tileSize += 1
	} else if (key == 'ArrowLeft') {
		if (settings.tileSize > 0) settings.tileSize -= 1
	} else if (key === 'c') {
		settings.strokeRange += 0.01
	} else if (key === 'x') {
		if (settings.strokeRange > 1.01) settings.strokeRange -= 0.01
	} else if (key === 'j') {
		settings.hueVal1 += 1
		settings.hueVal1 %= 365
	} else if (key === 'm') {
		settings.hueVal2 += 1
		settings.hueVal2 %= 365
	} else if (key === 'h') {
		settings.hueVal1 = settings.hueVal1 < 5 ? 360 : settings.hueVal1 - 1
	} else if (key === 'n') {
		settings.hueVal2 = settings.hueVal2 < 5 ? 360 : settings.hueVal2 - 1
	} else {
		doRedraw = false
	}

	return doRedraw
}

function checkForKeys() {
	if (keyIsPressed) {
		if (keyPressActions()) redraw()
	}

	requestAnimationFrame(checkForKeys)
}
