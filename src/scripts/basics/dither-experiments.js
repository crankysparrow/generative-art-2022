let img
const imgUrl = new URL('../../images/doggo.jpg?width=500&height=500', import.meta.url)
let imgEl
let res = 500

// prettier-ignore
let map4_1 = [
	[  15, 135,  45, 165 ],
	[ 195,  75, 225, 105 ],
	[  60, 180,  30, 150 ],
	[ 240, 120, 210,  90 ],
]
// via: https://github.com/antiboredom/p5.riso/blob/master/lib/p5.riso.js

// prettier-ignore
let map4_2 = [
	[   8, 120,  40, 168 ],
	[ 200,  72, 232, 104 ],
	[  56, 184,  24, 152 ],
	[ 248, 120, 216,  88 ],
]
// via: https://observablehq.com/@jobleonard/ordered-error-diffusion-dithering

let currentMap = map4_1
let threshold = 128
let seed

function preload() {
	// img = loadImage(imgUrl.href)
	// img = loadImage(`https://picsum.photos/seed/${seed}/${res}`)
	// imgEl = createImg(`https://picsum.photos/seed/${seed}/400`)
	img = loadImage('https://picsum.photos/id/1011/500')
	// imgEl = createImg('https://picsum.photos/id/1011/300')
}

function setup() {
	createCanvas(res, res)
	pixelDensity(1)
	noSmooth()

	noLoop()
}

function gradient() {
	let steps = 100
	let stepSize = height / steps

	for (let i = 0; i < steps; i++) {
		fill((i / 100) * 255)
		noStroke()
		rect(0, stepSize * i, width, stepSize * i + stepSize)
	}
}

// prettier-ignore
function draw() {

	clear()
	resizeCanvas(res, res)
	image(img, 0, 0)

	ditherOne()

	// let c = get()
	// clear()
	// resizeCanvas(window.innerWidth, window.innerHeight)
	// background(240)
	// let m = floor(min(width, height) * 0.9)
	// m -= m % 4
	// translate((width - m) / 2, (height - m ) / 2)
	// image(c, 0, 0, m, m)

}

function ditherOne(threshold = 128, thresholdMap) {
	loadPixels()
	thresholdMap = thresholdMap ?? [
		[32, 224],
		[160, 96],
	]

	for (let y = 0; y < height * pixelDensity(); y++) {
		for (let x = 0; x < width * pixelDensity(); x++) {
			let t = thresholdMap[y % thresholdMap.length][x % thresholdMap.length]
			let i = (y * width * pixelDensity() + x) * 4

			let currentPixel = pixels[i]
			let val
			let mapped = (currentPixel + t) / 2
			if (mapped < threshold) {
				val = 0
			} else {
				val = 255
			}

			pixels[i] = val
			pixels[i + 1] = val
			pixels[i + 2] = val
		}
	}

	updatePixels()
}

window.preload = preload
window.setup = setup
window.draw = draw

window.keyPressed = () => {
	if (key == '1') {
		currentMap = map4_1
	} else if (key == '2') {
		currentMap = map4_2
	}
}

// window.mouseClicked = () => {
// 	seed = random()
// 	img = loadImage(`https://picsum.photos/seed/${seed}/400`)
// 	imgEl.attribute('src', `https://picsum.photos/seed/${seed}/400`)
// }
