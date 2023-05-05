import * as p5 from 'p5'
import { transform } from 'typescript'

// https://mathcurve.com/courbes2d.gb/lame/lame.shtml
// https://en.wikipedia.org/wiki/Superellipse
// (abs(x/a))^n + (abs(y/b))^n = 1
// (abs(y/b))^n = 1 - (abs(x/a))^n
// abs(y/b) = pow(1 - (abs(x/a))^n, 1 / n)

function setup() {
	// let m = min(window.innerWidth, window.innerHeight)
	createCanvas(400, 400)
	angleMode(DEGREES)
	noLoop()
}

function draw() {
	background(0)
	strokeWeight(1)
	stroke(255)
	noFill()

	let sizex = 60
	let sizey = width / 4
	let stepx = sizey

	stroke('#fff')
	strokeWeight(3)
	noFill()

	let i = 0
	for (let x = stepx * -0.5; x < width; x += stepx) {
		i++
		let odd = i % 2 === 0
		squareStar(x, 200, sizex, sizey, odd)
		squareStar(x, 0, sizex, sizey, !odd)
		squareStar(x, 400, sizex, sizey, !odd)
	}

	// squareStar(200, 200, sizex, sizey)
	// push()
	// translate(posx, posy)
	// rotate(90)
	// // translate(-sizex / 2, 0)
	// let i = 0
	// while (i < 3) {
	// 	rotate(120)
	// 	rect(-sizex / 2, 0, sizex, sizey)
	// 	i++
	// }
	// pop()
}

function squareStar(x, y, sizex, sizey, odd = false) {
	push()
	translate(x, y)
	rotate(odd ? 90 : -90)
	let i = 0
	while (i < 3) {
		rotate(120)
		rect(-sizex / 2, 0, sizex, sizey)
		i++
	}
	pop()
}

// @ts-ignore
window.setup = setup
// @ts-ignore
window.draw = draw
window.mousePressed = () => redraw()
