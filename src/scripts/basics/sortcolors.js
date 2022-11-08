// let img, density
let img
// const imageUrl = new URL('../../images/rio-art.jpg?width=400&height=400', import.meta.url)
// const imageUrl = new URL('../../images/umbrellas-pexels.jpg?width=800&height=800', import.meta.url)
const imageUrl = new URL(
	'../../images/pexels-steve-johnson.jpg?width=400&height=400',
	import.meta.url
)
// const imageUrl = new URL('../../images/balloon.jpg?width=400&height=400', import.meta.url)
// const imageUrl = new URL('../../images/vtiny.png', import.meta.url)

function preload() {
	img = loadImage(imageUrl.href)
	window.img = img
}

function setup() {
	createCanvas(400, 400)
	noStroke()
	noLoop()
	noSmooth()
}

function draw() {
	background(10)
	img.loadPixels()
	textAlign(CENTER)
	textSize(10)

	let colors = []
	let step = 5

	for (let x = 0; x < img.width; x += step) {
		for (let y = 0; y < img.height; y += step) {
			let i = (y * img.width + x) * 4
			let c = color(img.pixels[i], img.pixels[i + 1], img.pixels[i + 2], img.pixels[i + 3])
			colors.push(c)
		}
	}

	image(img, 0, 0)
	colors.sort((a, b) => {
		if (abs(hue(a) - hue(b)) < 10) {
			return lightness(a) - lightness(b)
		} else {
			return hue(a) - hue(b)
		}
	})

	let i = 0
	for (let x = 0; x < width; x += step) {
		for (let y = 0; y < height; y += step) {
			fill(colors[i])
			rect(x, y, step, step)
			i++
		}
	}
}

function doColors() {
	// let tileCount = 300
	img.loadPixels()

	stroke(0)
	rect(0, 0, img.width, img.height)
	noStroke()

	// let rectSize = floor(img.width / tileCount)
	// let rectSizeCeil = ceil(rectSize)
	let colors = []

	for (let y = 0; y < img.width; y++) {
		for (let x = 0; x < img.height; x++) {
			// let px = x * rectSize
			// let py = y * rectSize
			// let i = py * img.width * 4 + px * 4
			let i = (y * img.width * 4 + x * 4) * density

			let c = color(img.pixels[i], img.pixels[i + 1], img.pixels[i + 2], img.pixels[i + 3])
			colors.push(c)
		}
	}

	sortColors(colors, 'brightness')

	let i = 0
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			fill(colors[i])
			rect(x * density, y * density, density)
			i++
		}
	}

	// for (let y = 0; y < tileCount; y++) {
	// 	for (let x = 0; x < tileCount; x++) {
	// 		let py = y * rectSize
	// 		let px = x * rectSize
	// 		fill(colors[i])
	// 		rect(px, py, rectSize, rectSize)
	// 		i++
	// 	}
	// }
}
function sortColors(colors, mode) {
	switch (mode) {
		case 'hue':
			colors.sort((a, b) => hue(a) - hue(b))
			break
		case 'red':
			colors.sort((a, b) => red(a) - red(b))
			break
		case 'green':
			colors.sort((a, b) => green(a) - green(b))
			break
		case 'blue':
			colors.sort((a, b) => blue(a) - blue(b))
			break
		case 'saturation':
			colors.sort((a, b) => saturation(a) - saturation(b))
			break
		case 'brightness':
			colors.sort((a, b) => brightness(a) - brightness(b))
			break
		case 'lightness':
			colors.sort((a, b) => lightness(a) - lightness(b))
			break
		case 'hue-saturation':
			colors.sort((a, b) => {
				if (abs(hue(a) - hue(b)) < 15) {
					return saturation(a) - saturation(b)
				} else {
					return hue(a) - hue(b)
				}
			})
			break
		case 'hue-lightness':
			colors.sort((a, b) => {
				if (abs(hue(a) - hue(b)) < 15) {
					return lightness(a) - lightness(b)
				} else {
					return hue(a) - hue(b)
				}
			})
			break
		default:
			break
	}
}

window.setup = setup
window.draw = draw
window.preload = preload
