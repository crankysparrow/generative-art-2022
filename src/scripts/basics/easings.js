function setup() {
	createCanvas(500, 500)

	createLoop({ duration: 4 })
}

function draw() {
	background(0)

	fill(255)
	let p = easeInOutSine(map(animLoop.progress, 0, 1, 0, 2)) * width
	circle(animLoop.progress * width, p, 10, 10)
}

function easeOutCirc(x) {
	return sqrt(1 - pow(x - 1, 2))
}

function easeInOutSine(x) {
	return -(cos(Math.PI * x) - 1) / 2
}

window.setup = setup
window.draw = draw
