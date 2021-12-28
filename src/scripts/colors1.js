let stepX, stepY

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)

	noStroke()
	colorMode(HSB, width, height, 100)
}

function draw() {
	stepX = map(mouseX, 0, width, width / 9, width / 100)
	stepY = map(mouseY, 0, height, height / 9, height / 50)

	for (let gridY = 0; gridY < height; gridY += stepY) {
		for (let gridX = 0; gridX < width; gridX += stepX) {
			fill(gridX, gridY + 50, 100)
			rect(gridX, gridY, stepX, stepY)
		}
	}
}

window.setup = setup
window.draw = draw
