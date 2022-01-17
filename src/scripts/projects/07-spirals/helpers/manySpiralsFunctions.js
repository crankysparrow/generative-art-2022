import { AllTheCircles } from '../../../utils/Circles.js'
import { paletteFromUrl } from '../../../utils/utils.js'
import Spiral from './spiralclass.js'

let palette = paletteFromUrl('https://coolors.co/52ffee-0c7489-271f30-4fb477-345511')

function sprlSettings(crcl) {
	// let rInc = random(0.3, 0.5)
	// let thetaInc = random(0.1, rInc - 0.05)

	let rInc = 0.6
	let thetaInc = 0.55
	let weight = 2

	return {
		r: crcl.d / 2,
		ctr: createVector(crcl.x, crcl.y),
		startAt: frameCount == 0 ? floor(random(500)) : frameCount + floor(random(500)),
		rInc,
		thetaInc,
		weight,
		scaling: true,
		maxScale: 1.5,
		crcl,
		col: random(palette),
	}
}

export function manySpiralsSetup() {
	let crcls = new AllTheCircles({
		size: 400,
		stepSize: 5,
		attemptsEachStep: 200,
		width,
		height,
		multMax: 1,
		multMin: 0.7,
		overlapEdges: true,
		spaceFromEdge: 50,
		space: -100,
	})

	let spirals = []
	crcls.circles.forEach((c) => {
		spirals.push(new Spiral(sprlSettings(c)))
	})

	return { crcls, spirals }
}

export function manySpiralsDraw(spirals, crcls) {
	for (let i = 0; i < spirals.length; i++) {
		if (!spirals[i]) continue

		if (frameCount > spirals[i].startAt) {
			if (spirals[i].faded) {
				let crcl = spirals[i].crcl
				crcls.remove(crcl)
				let newCircle = crcls.circleTimeOne()

				spirals[i] = null
				if (newCircle) {
					spirals[i] = new Spiral(sprlSettings(newCircle))
				}
			} else {
				spirals[i].update()
				spirals[i].show()
			}
		}
	}

	if (frameCount % 200 == 0) {
		let newCircle = crcls.circleTimeOne()
		console.log(newCircle)
		if (newCircle) {
			spirals.push(newCircle)
		}
	}
}
