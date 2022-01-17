import Spiral from './spiralclass.js'

export function oneSpiralSetup() {
	let m = min(width, height)
	let spiral = new Spiral({
		r: m * 0.4,
	})
	return spiral
}

export function oneSpiralDraw(spiral) {
	background(50)

	if (spiral.faded) {
		spiral.reset()
	}
	spiral.update()
	spiral.show()
}
