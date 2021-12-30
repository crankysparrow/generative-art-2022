let img
const imageUrl = new URL('../../images/orange.jpg?width=500&height=500&as=webp', import.meta.url)

function preload() {
	img = loadImage(imageUrl.href)
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	noStroke()
	noLoop()
}

function draw() {
	let tileCount = 200
	img.loadPixels()
	stroke(0)
	rect(0, 0, img.width, img.height)
	noStroke()

	let rectSize = img.width / tileCount
	let rectSizeCeil = ceil(rectSize)
	let colors = []

	for (let y = 0; y < tileCount; y++) {
		for (let x = 0; x < tileCount; x++) {
			let px = floor(x * rectSize)
			let py = floor(y * rectSize)
			let i = py * img.width * 4 + px * 4

			let c = color(img.pixels[i], img.pixels[i + 1], img.pixels[i + 2], img.pixels[i + 3])
			colors.push(c)
		}
	}

	sortColors(colors, 'lightness')

	let i = 0
	for (let y = 0; y < tileCount; y++) {
		for (let x = 0; x < tileCount; x++) {
			let py = y * rectSize
			let px = x * rectSize
			fill(colors[i])
			rect(px, py, rectSizeCeil, rectSizeCeil)
			i++
		}
	}
}

function sortColors(colors, mode) {
	switch (mode) {
		case 'hue':
			colors.sort((a, b) => hue(a) - hue(b))
			break
		case 'red':
			colors.sort((a, b) => a.levels[0] - b.levels[0])
			break
		case 'green':
			colors.sort((a, b) => a.levels[1] - b.levels[1])
			break
		case 'blue':
			colors.sort((a, b) => a.levels[2] - b.levels[2])
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
		default:
			break
	}
}

window.setup = setup
window.draw = draw
window.preload = preload
