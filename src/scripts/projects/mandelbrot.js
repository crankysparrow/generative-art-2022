import lerpColorByHue from '../utils/lerpColorByHue.js'
import { Tooltip } from '../utils/Tooltip.js'

let xbounds, ybounds, xradius, yradius, scaleVal, mx, my, img
let colors, colMath, colSet, colsHSB
let info, canvas
let infoContainer = document.querySelector('.info-container')
let s = {
	cx: -1.15,
	cy: 0.21,
	zoom: 1,
	iterations: 50,
}
const W = 700
const H = 550
const D = 2
const bw = false

let calculated = false
let calculating = false

function makeColors() {
	colsHSB = [
		[random(0, 360), 92, 54],
		[random(0, 360), 98, 99],
		[random(0, 360), 92, 54],
	]
}

function setup() {
	canvas = createCanvas(W * D, H * D)
	canvas.parent('canvas')
	drawingContext.willReadFrequently = true
	noSmooth()

	info = document.createElement('pre')
	infoContainer.appendChild(info)
	info.setAttribute('style', 'margin-left: 20px')

	xradius = 1.8
	scaleVal = xradius / width
	yradius = height * scaleVal
	makeColors()

	let tip = new Tooltip({
		titleString: 'controls',
		btnName: 'keys',
		tipContent: [
			['m', 'iterations+=20'],
			['n', 'iterations-=20'],
			['ArrowUp', 'zoom in'],
			['ArrowDown', 'zoom out'],
			['click', 'choose center'],
			['c', 'new colors'],
			['s', 'save'],
		],
		right: true,
		startOpen: true,
	})

	canvas.mousePressed(() => {
		if (mouseX > width || mouseY > height || calculating) return
		if (calculating) return
		s.cx = map(mouseX, 0, width, xbounds[0], xbounds[1])
		s.cy = map(mouseY, 0, height, ybounds[0], ybounds[1])
		calculated = false
	})

	makeFractals()
}

function makeColSet() {
	colorMode(HSB)
	let res = []
	let i = 0
	let mid = s.iterations / 4

	while (i < mid) {
		let col = lerpColorByHue(color(colsHSB[0]), color(colsHSB[1]), i / mid)
		res.push([red(col), green(col), blue(col)])
		i++
	}
	while (i <= s.iterations) {
		let col = lerpColorByHue(
			color(colsHSB[1]),
			color(colsHSB[2]),
			map(i, mid, s.iterations, 0, 1)
		)
		res.push([red(col), green(col), blue(col)])
		i++
	}
	colSet = res
}

function makeFractals() {
	console.log('start make fractals')
	calculating = true
	console.time('calculating')

	makeColSet()

	xbounds = [-xradius * (1 / s.zoom) + s.cx, xradius * (1 / s.zoom) + s.cx]
	ybounds = [-yradius * (1 / s.zoom) + s.cy, yradius * (1 / s.zoom) + s.cy]

	resizeCanvas(W * D, H * D)
	pixelDensity(1)
	loadPixels()

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			let tx = map(x, 0, width, xbounds[0], xbounds[1])
			let ty = map(y, 0, height, ybounds[0], ybounds[1])
			let c = createVector(tx, ty)
			let cur = createVector(0, 0)
			let i = 0
			while (i < s.iterations) {
				let newx = cur.x * cur.x - cur.y * cur.y + c.x
				let newy = 2 * (cur.x * cur.y) + c.y

				// a^2 + b^2 = c^2
				// color is based on how many iterations it takes to get to a radius of 2
				if (newx * newx + newy * newy > 4) break
				cur.x = newx
				cur.y = newy

				i++
			}

			let px = (x + y * width) * 4
			let col = i / s.iterations
			if (bw) {
				col *= 255
				pixels[px] = col
				pixels[px + 1] = col
				pixels[px + 2] = col
				pixels[px + 3] = 255
			} else {
				pixels[px] = colSet[i][0]
				pixels[px + 1] = colSet[i][1]
				pixels[px + 2] = colSet[i][2]
				pixels[px + 3] = 255
			}
		}
	}

	updatePixels()
	img = get()
	resizeCanvas(W, H)
	pixelDensity(D)
	console.timeEnd('calculating')
	calculated = true
	calculating = false
	info.innerHTML = `center: ${round(s.cx, 5)}, ${round(s.cy, 5)} <br/> zoom: ${
		s.zoom
	} <br/>iterations: ${s.iterations}`
}

function draw() {
	if (calculated && !calculating && img) {
		image(img, 0, 0, W, H)

		fill(255, 0, 255)
		circle(mouseX, mouseY, 5)
		mx = map(mouseX, 0, width, xbounds[0], xbounds[1])
		my = map(mouseY, 0, height, ybounds[0], ybounds[1])
	} else if (!calculated && !calculating) {
		makeFractals()
	}
}

function keyPressed() {
	if (calculating) return
	if (keyCode === UP_ARROW) {
		s.zoom *= s.zoom <= 10 ? 2 : 5
		calculated = false
	} else if (keyCode === DOWN_ARROW) {
		s.zoom /= s.zoom <= 10 ? 2 : 5
		calculated = false
	}
}

function keyTyped() {
	if (calculating) return
	if (key === 'm') {
		s.iterations += 20
		calculated = false
	} else if (key === 'n') {
		s.iterations -= 20
		calculated = false
	} else if (key === 's') {
		saveCanvas('mandelbrot', 'jpg')
	} else if (key === 'c') {
		makeColors()
		calculated = false
	}
}

window.setup = setup
window.draw = draw
// window.mousePressed = mousePressed
window.keyTyped = keyTyped
window.keyPressed = keyPressed
