function setup() {
	createCanvas(400, 400)

	let osc = new p5.Oscillator()
	osc.freq(600)
	osc.setType('sawtooth')
	osc.start()
}

function draw() {
	background(200)
}

window.setup = setup
window.draw = draw
