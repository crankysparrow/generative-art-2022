function setup() {
	createCanvas(500, 500)

	createLoop({ duration: 4 })
}

function draw() {
	background(0)

	fill(255)
	let p = idkWaveThing(animLoop.progress) * width
	circle(animLoop.progress * width, p, 10, 10)
}

function easeOutCirc(x) {
	return sqrt(1 - pow(x - 1, 2))
}

function easeInOutSine(x) {
	return -(cos(Math.PI * x) - 1) / 2
}

function idkWaveThing(x) {
	let f1 = fract(x) * fract(x)
	let f2 = fract(-x) * fract(-x)

	return (f1 + f2) * 2 - 1
}

window.setup = setup
window.draw = draw
