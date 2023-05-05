function setup() {
	createCanvas(400, 400)

	noLoop()
}

function draw() {
	background(200)

	let osc = new p5.Oscillator()
	osc.freq(600)
	osc.setType('sawtooth')
	osc.start()
}

window.setup = setup
window.draw = draw
