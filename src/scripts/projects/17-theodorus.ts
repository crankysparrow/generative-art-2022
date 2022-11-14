//https://fractalkitty.com/2019/06/12/week-2-spiral-of-theodorus/
import * as p5 from 'p5'

let n = 1
let angle = 0
let scl = 40
function setup() {
	createCanvas(800, 700)
}

function draw() {
	background(0, 0, 0)
	translate(400, 350)
	stroke(255)
	noFill()
	let n = 18

	for (let i = 1; i < n; i++) {
		let x = sqrt(i) * scl
		let y = 1 * scl

		stroke(i * 12, 250 - i * (200 / n), 0)

		line(0, 0, x, 0)
		line(0, 0, x, y)
		line(x, 0, x, y)

		let angle = atan2(y, x)
		rotate(angle)
	}
}

window.setup = setup
window.draw = draw
