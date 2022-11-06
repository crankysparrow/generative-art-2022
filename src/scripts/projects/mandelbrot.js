import lerpColorByHue from '../utils/lerpColorByHue.js'

let xbounds, ybounds, xrange, yrange, xradius, yradius, scaleVal, mx, my, img
let colors, colMath, colSet, colsHSB
let info, canvas
let s = {
	cx: -1.15,
	cy: 0.21,
	zoom: 1,
	iterations: 300,
}
const W = 700
const H = 550
const D = 2
const bw = false

let calculated = false
let calculating = false

function setup() {
	canvas = createCanvas(W * D, H * D)
	drawingContext.willReadFrequently = true
	noSmooth()

	info = document.createElement('pre')
	info.setAttribute('style', 'margin-left: 20px')
	document.body.appendChild(info)

	xradius = 1.8
	scaleVal = xradius / width
	yradius = height * scaleVal

	colors = [
		[30, 11, 138],
		[138, 11, 43],
		[5, 215, 252],
	]
	colsHSB = [
		[249, 92, 54], // purple
		[189, 98, 99], // light blue
		[345, 92, 54], // red
	]
	colsHSB = [
		[random(0, 360), 92, 54],
		[random(0, 360), 98, 99],
		[random(0, 360), 92, 54],
	]
	colMath = [
		[colors[0][0] - colors[1][0], colors[1][0]],
		[colors[0][1] - colors[1][1], colors[1][1]],
		[colors[0][2] - colors[1][2], colors[1][2]],
	]

	makeFractals()
}

function makeColSet() {
	colorMode(HSB)
	let res = []
	let i = 0
	let mid = s.iterations / 4

	while (i < mid) {
		let col = lerpColorByHue(color(colsHSB[0]), color(colsHSB[1]), i / mid)
		// let col = color(
		// 	map(i, 0, mid, colsHSB[0][0], colsHSB[1][0]),
		// 	map(i, 0, mid, colsHSB[0][1], colsHSB[1][1]),
		// 	map(i, 0, mid, colsHSB[0][2], colsHSB[1][2])
		// )
		res.push([red(col), green(col), blue(col)])
		i++
	}
	while (i <= s.iterations) {
		let col = lerpColorByHue(
			color(colsHSB[1]),
			color(colsHSB[2]),
			map(i, mid, s.iterations, 0, 1)
		)

		// let col = color(
		// 	map(i, mid, s.iterations, colsHSB[1][0], colsHSB[2][0]),
		// 	map(i, mid, s.iterations, colsHSB[1][1], colsHSB[2][1]),
		// 	map(i, mid, s.iterations, colsHSB[1][2], colsHSB[2][2])
		// )
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
	xrange = xbounds[1] - xbounds[0]
	ybounds = [-yradius * (1 / s.zoom) + s.cy, yradius * (1 / s.zoom) + s.cy]
	yrange = ybounds[1] - ybounds[0]

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
				// pixels[px] = col * colMath[0][0] + colMath[0][1]
				// pixels[px + 1] = col * colMath[1][0] + colMath[1][1]
				// pixels[px + 2] = col * colMath[2][0] + colMath[2][1]
				// pixels[px + 3] = 255
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
	info.innerHTML = `center: ${s.cx}, ${s.cy} | zoom: ${s.zoom} <br/>iterations: ${s.iterations}`
}

function draw() {
	if (calculated && !calculating && img) {
		image(img, 0, 0, W, H)

		fill(255, 0, 255)
		// circle(width / 2, height / 2, 5)
		circle(mouseX, mouseY, 5)
		mx = round(map(mouseX, 0, width, xbounds[0], xbounds[1]), 5)
		my = round(map(mouseY, 0, height, ybounds[0], ybounds[1]), 5)
	} else if (!calculated && !calculating) {
		makeFractals()
	}
}

function mousePressed() {
	if (mouseX > width || mouseY > height || calculating) return
	if (calculating) return
	s.cx = mx
	s.cy = my
	calculated = false
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
	}
}

window.setup = setup
window.draw = draw
window.mousePressed = mousePressed
window.keyTyped = keyTyped
window.keyPressed = keyPressed
