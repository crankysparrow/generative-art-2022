import { paletteFromUrl } from '../utils/utils.js'
import { Tooltip } from '../utils/Tooltip.js'

let m, tileSize, hueBase
let numTiles = 15
let rSeed = 1
let shape = 3
let shapeSize = 1
let alphaVal = 100
let url = 'https://coolors.co/0b2027-40798c-70a9a1-cfd7c7-f6f1d1'
let paletteVals = paletteFromUrl(url)
let b = paletteVals.splice(0, 1)
let c1, c2, c3
let tip

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)

	colorMode(HSB, 100, 100, 100, 100)
	rectMode(CENTER)

	m = min(width, height) * 0.8
	tileSize = m / numTiles

	c1 = color(paletteVals[0])
	c2 = color(paletteVals[1])
	c3 = color(paletteVals[2])

	let content = createDiv()
	createP('<strong>s</strong>: save').parent(content)
	createP('<strong>[ 1, 2, 3 ]</strong>: shape style').parent(content)
	createP('<strong>arrow right/left</strong>: shape size').parent(content)
	createP('<strong>arrow up/down</strong>: alpha').parent(content)
	tip = new Tooltip({ tipContent: content, titleString: 'controls' })
}

function palette() {
	return color(random(hueBase, hueBase + 10), random(50, 100), random(0, 100))
}

function draw() {
	blendMode(BLEND)
	hueBase = floor(random(90))
	background(b)
	// background(color(random(hueBase, hueBase + 10), random(30, 50), random(0, 15)))
	noFill()
	noStroke()
	randomSeed(rSeed)
	translate(width / 2, height / 2)

	let mousePointX = map(mouseX - (width - m) / 2, 0, m, -m / 2, m / 2)
	let mousePointY = map(mouseY - (height - m) / 2, 0, m, -m / 2, m / 2)
	// constrain keeps the mouse point within range -m/2 to m/2
	// mousePointX = constrain(mousePointX, -m / 2, m / 2)
	// mousePointY = constrain(mousePointY, -m / 2, m / 2)

	for (let yStep = -numTiles / 2; yStep <= numTiles / 2; yStep++) {
		for (let xStep = -numTiles / 2; xStep <= numTiles / 2; xStep++) {
			let x = tileSize * xStep
			let y = tileSize * yStep
			let d = dist(mousePointX, mousePointY, x, y)
			let dx = mousePointX - x
			let dy = mousePointY - y
			let xOff = (dx / m) * tileSize
			let yOff = (dy / m) * tileSize
			let s = map(d, 0, m, tileSize * 0.5, tileSize * 1.1) * shapeSize

			push()
			translate(x, y)
			switch (shape) {
				case 1:
					c2.setAlpha(alphaVal * 0.5)
					c3.setAlpha(alphaVal * 0.6)
					c1.setAlpha(alphaVal)
					rotate(map(d, -m / 2, m / 2, 0, random([0, 1]) == 0 ? TWO_PI : -TWO_PI))
					translate(xOff, yOff)
					fill(c1)
					circle(0, 0, random(s * 0.8, s * 1.5))
					fill(c2)
					translate(xOff, yOff)
					circle(0, 0, random(s * 1.5, s * 1.8))
					translate(xOff, yOff)
					fill(c3)
					circle(0, 0, random(s, s * 1.2))
					break
				case 2:
					s = map(d, 0, m, tileSize, tileSize * 0.5) * shapeSize
					rotate(map(d, -m / 2, m / 2, 0, PI))
					translate(xOff, yOff)
					var col = lerpColor(c3, c1, d / m)
					col.setAlpha(alphaVal)
					fill(col)
					triangle(0, 0, 0, s, s, 0)
					rotate(map(d, 0, m, 0, PI))
					triangle(0, 0, 0, s, s, 0)
					break
				case 3:
					s = map(d, 0, m, tileSize * 1.5, tileSize * 0.5) * shapeSize
					rotate(map(d, -m / 2, m / 2, 0, PI))
					translate(xOff, yOff)
					var col = lerpColor(c3, c1, d / m)
					col.setAlpha(alphaVal)
					noFill()
					stroke(col)
					strokeWeight(3)
					rect(0, 0, s, s)
					break
				default:
					break
			}
			pop()
		}
	}
}

window.mouseClicked = () => rSeed++
window.setup = setup
window.draw = draw

window.keyPressed = () => {
	switch (key) {
		case 's':
			saveCanvas()
			break
		case 'ArrowRight':
			shapeSize += 0.1
			break
		case 'ArrowLeft':
			shapeSize -= 0.1
			break
		case 'ArrowDown':
			alphaVal -= 1
			break
		case 'ArrowUp':
			alphaVal += 1
			break
		case '1':
			shape = 1
			break
		case '2':
			shape = 2
			break
		case '3':
			shape = 3
			break
		default:
			break
	}
}

window.windowResized = () => {
	resizeCanvas(window.innerWidth, window.innerHeight)
	m = min(width, height) * 0.8
	tileSize = m / numTiles
}
