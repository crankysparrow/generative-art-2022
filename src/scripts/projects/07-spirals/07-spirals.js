import { Controls } from '../../utils/Controls.js'
import { manySpiralsSetup, manySpiralsDraw } from './helpers/manySpiralsFunctions.js'
import { oneSpiralSetup, oneSpiralDraw } from './helpers/oneSpiralFunctions.js'
import Spiral from './helpers/spiralclass.js'

let stuff = {
	options: ['many scaling spirals', 'one spiral', 'swoosh'],
}
window.stuff = stuff
let MODE = stuff.options[2]

function setupExperiment() {
	let m = min(width, height) * 0.45
	let arms = 10
	let spirals = []
	let j = 0
	let repeats = floor(random(3, 8))

	let palette = ['#307351', '#70163c', '#e5d352', '#2e0f15', '#d9e76c']
	let step = TWO_PI / arms
	let innerStep = step / repeats

	while (j < repeats) {
		let i = 0
		while (i < arms) {
			spirals.push(
				new Spiral({
					r: m,
					rInc: 1,
					thetaInc: 0.01,
					theta: i * step + innerStep * j,
					col: palette[j % (palette.length - 1)],
					doFade: false,
				})
			)
			i++
		}

		j++
	}

	return spirals
}

function drawExperiment(spirals) {
	background('#95B2B8')

	for (let i = 0; i < spirals.length; i++) {
		spirals[i].update()
		spirals[i].show()
	}
}

function setupByMode() {
	if (MODE == 'many scaling spirals') {
		let s = manySpiralsSetup()
		stuff.crcls = s.crcls
		stuff.spirals = s.spirals

		let s2 = manySpiralsSetup()
		stuff.crcls2 = s2.crcls
		stuff.spirals2 = s2.spirals
	} else if (MODE == 'one spiral') {
		stuff.spiral = oneSpiralSetup()
	} else if (MODE == stuff.options[2]) {
		stuff.spirals = setupExperiment()
	}
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	makeControls()
	setupByMode()
}

function draw() {
	if (MODE == 'many scaling spirals') {
		background('#DCFFFD')
		manySpiralsDraw(stuff.spirals, stuff.crcls)
		manySpiralsDraw(stuff.spirals2, stuff.crcls2)
	} else if (MODE == 'one spiral') {
		oneSpiralDraw(stuff.spiral)
	} else if (MODE == stuff.options[2]) {
		drawExperiment(stuff.spirals)
	}
}

function makeControls() {
	let controls = new Controls()

	let optionSel = controls.createSelect({
		id: 'options-sel',
		labelString: 'mode',
		options: stuff.options,
		selected: stuff.options[2],
		onChange: (e) => {
			MODE = optionSel.el.value()
			setupByMode()
		},
	})

	stuff.controls = controls
}

window.setup = setup
window.draw = draw
