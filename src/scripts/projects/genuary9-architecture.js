import { paletteOptions } from './genuary9-palettes'
let palette
// let accentColors = ['#fabc2a', '#4c1e4f', '#293399']
// let houseColors = ['#fffaff', '#7a0c00', '#d4f5f5']
// let houseColors = ['#fffaff', '#66170e', '#d4f5f5']

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	noLoop()
}

function draw() {
	palette = paletteOptions()
	console.log(palette)
	if (palette.bg) {
		background(palette.bg)
	} else {
		background(230, 225, 214)
	}
	let h
	let yPos = random(height * 0.2) * -1
	while (yPos < height * 1.25) {
		h = random(height * 0.1, height * 0.25)
		yPos += h * 1.2
		let w = h / 1.8
		let housesToBuild = []
		let x = random(w) * -1
		let i = 0
		while (x < width + w) {
			housesToBuild.push({ x: x, y: yPos, hw: w, hh: random(h * 0.97, h * 1.03) })
			x += w
			i++
		}

		housesToBuild = shuffle(housesToBuild)
		push()
		rotate(random(-PI * 0.01, PI * 0.01))
		housesToBuild.forEach((h) => {
			buildHouse(h)
		})
		pop()
	}
}

let sizeOptions = [
	(hh) => {
		return {
			floor1: hh * 0.34,
			floor2: hh * 0.3,
			floor3: hh * 0.26,
			basement: hh * 0.04,
			roof: hh * 0.06,
		}
	},
	(hh) => {
		return {
			floor1: hh * 0.32,
			floor2: hh * 0.29,
			floor3: hh * 0.29,
			basement: hh * 0.04,
			roof: hh * 0.06,
		}
	},
	(hh) => {
		return {
			floor1: hh * 0.33,
			floor2: hh * 0.29,
			floor3: hh * 0.26,
			basement: hh * 0.06,
			roof: hh * 0.06,
		}
	},
]

function buildHouse({ x, y, hw, hh }) {
	let sizes = random(sizeOptions)(hh)
	let { floor1, floor2, floor3, basement, roof } = sizes

	let windowStyle = random([1, 2, 3])
	let cs = random(palette.palettes)()
	cs.house2 = color(red(cs.house) * 0.7, green(cs.house) * 0.7, blue(cs.house) * 0.7)
	cs.house3 = color(red(cs.house) * 0.5, green(cs.house) * 0.5, blue(cs.house) * 0.5)
	cs.accent2 = color(red(cs.accent) * 0.8, green(cs.accent) * 0.8, blue(cs.accent) * 0.8)
	cs.out2 = lerpColor(cs.out, cs.house3, 0.5)

	push()
	translate(x, y - hh)
	stroke(cs.lines)
	strokeWeight(1)
	fill(cs.house)
	rect(0, 0, hw, hh)

	firstFloor({
		houseWidth: hw,
		floorHeight: floor1,
		basement,
		x: 0,
		y: floor3 + floor2 + roof,
		cs,
		windowStyle,
	})
	upperFloor({
		x: 0,
		y: floor3 + roof,
		houseWidth: hw,
		floorHeight: floor2,
		cs,
		windowStyle,
	})
	upperFloor({
		x: 0,
		y: roof,
		houseWidth: hw,
		floorHeight: floor3,
		cs,
		windowStyle,
	})
	makeRoof({ x: 0, y: 0, w: hw, h: roof, cs })
	pop()
}

function steps({ x, y, doorW, stepH, floorHeight, cs }) {
	push()
	translate(x, y)
	fill(cs.out)
	stroke(cs.out2)
	strokeWeight(1)
	let yPos = 0
	let stepSize = floorHeight * 0.05
	while (yPos < stepH) {
		push()
		translate(0, yPos)
		rect(0, 0, doorW, stepSize)
		yPos += stepSize
		pop()
	}
	pop()
}

function firstFloor({ houseWidth, floorHeight, basement, x, y, windowStyle, cs }) {
	let doorW = houseWidth * 0.22
	let doorH = floorHeight * 0.9
	let spaceX = int(houseWidth * 0.05)
	let spaceY = int(floorHeight * 0.1)
	let windowH = floorHeight * 0.7
	let windowW = int(houseWidth * 0.21)
	let dSide = random(['left', 'right'])
	let sp = (houseWidth - doorW - spaceX - windowW * 2) / 4

	push()
	if (dSide == 'left') {
		translate(x + spaceX, y)
		door({ x: 0, y: spaceY, doorW, doorH, cs })
		steps({ x: 0, y: floorHeight, doorW, stepH: basement, floorHeight, cs })
		translate(doorW + sp, 0)
		makeWindow({
			x: 0,
			y: spaceY,
			w: windowW,
			h: windowH,
			cs,
			style: windowStyle,
		})

		translate(windowW + sp * 2, 0)
		makeWindow({
			x: 0,
			y: spaceY,
			w: windowW,
			h: windowH,
			cs,
			style: windowStyle,
		})
	} else {
		translate(x + sp, y)
		makeWindow({
			x: 0,
			y: spaceY,
			w: windowW,
			h: windowH,
			cs,
			style: windowStyle,
		})

		translate(windowW + sp * 2, 0)
		makeWindow({
			x: 0,
			y: spaceY,
			w: windowW,
			h: windowH,
			cs,
			style: windowStyle,
		})

		translate(windowW + sp, 0)
		door({ x: 0, y: spaceY, doorW, doorH, cs })
		steps({ x: 0, y: floorHeight, doorW, stepH: basement, floorHeight, cs })
	}
	pop()
}

function upperFloor({ x, y, houseWidth, floorHeight, windowStyle, cs }) {
	let spaceX = houseWidth * 0.1
	let spaceY = floorHeight * 0.1

	push()
	translate(x, y)
	fill(0, 0, 255, 150)

	let windowWidth = int(spaceX * 2)
	let sp = int((houseWidth - windowWidth * 2) / 3)

	makeWindow({
		x: sp,
		y: spaceY,
		w: windowWidth,
		h: spaceY * 7.5,
		cs,
		style: windowStyle,
	})
	makeWindow({
		x: sp * 2 + windowWidth,
		y: spaceY,
		w: windowWidth,
		h: spaceY * 7.5,
		cs,
		style: windowStyle,
	})

	pop()
}

function door({ x, y, doorW, doorH, cs }) {
	let topY = int(doorH * 0.18)
	let bY = doorH - topY
	let sp = doorW * 0.1
	let spY = bY * 0.1

	push()
	translate(x, y)

	let topS = random([1, 2, 3])
	if (topS == 1) {
		stroke(cs.out)
		strokeWeight(sp)
		fill(cs.win2)
		arc(doorW / 2, topY, sp * 9, topY * 2, PI, 0)

		stroke(cs.out2)
		strokeWeight(sp * 1.5)
		strokeCap(SQUARE)
		noFill()
		arc(doorW / 2, topY, sp * 9, topY * 2, PI, PI * 1.2)
		arc(doorW / 2, topY, sp * 9, topY * 2, PI * 1.4, PI * 1.6)
		arc(doorW / 2, topY, sp * 9, topY * 2, PI * 1.8, PI * 2)
	} else if (topS == 2) {
		fill(cs.out)
		noStroke()
		rect(0, 0, doorW, topY)
		let littleWindowW = (doorW - sp * 2) / 2 - sp / 2
		fill(cs.win)
		stroke(cs.out2)
		strokeWeight(1)
		rect(sp, sp, littleWindowW, topY - sp * 2)
		rect(littleWindowW + sp * 2, sp, littleWindowW, topY - sp * 2)
	} else if (topS == 3) {
		let newTopY = int(topY + spY)
		push()
		translate(0, topY - newTopY)
		let half = newTopY / 2
		fill(cs.out)
		stroke(cs.out2)
		strokeWeight(1)
		triangle(doorW / 2, 0, doorW, half, 0, half)
		rect(0, half, doorW, newTopY - half)
		pop()
	}

	fill(cs.accent)
	stroke(cs.lines)
	strokeWeight(1)
	rect(0, topY, doorW, bY)

	let styl = random([1, 2])
	if (styl == 1) {
		stroke(cs.accent2)
		noFill()
		strokeWeight(3)
		rect(sp * 2, topY + spY, doorW - sp * 4, bY / 2)
		strokeWeight(2)
		rect(sp * 4, topY + spY * 2, doorW - sp * 8, bY / 2 - spY * 2)
	} else if (styl == 2) {
		push()
		fill(cs.accent2)
		noStroke()
		rectMode(CENTER)
		rect(doorW / 2, topY + sp * 7, sp * 6, sp * 12, sp * 3)
		stroke(cs.accent)
		strokeWeight(3)
		rect(doorW / 2, topY + sp * 7, sp * 4, sp * 10, sp * 2)
		pop()
	}

	fill(cs.out)
	stroke(cs.out2)
	strokeWeight(1)
	rect(0, topY, sp, bY)
	rect(doorW - sp, topY, sp, bY)

	pop()
}

function makeWindow({ x, y, w, h, cs, style }) {
	let spaceX = w * 0.1
	// windowColor = color(220, 137, 92) // glowy

	push()
	translate(x, y)
	noStroke()

	fill(cs.win)
	rect(0, 0, w, h)

	fill(cs.win2)
	rect(0, h / 2, w, h / 2)

	fill(cs.house3)
	rect(0, h * 0.48, w, h * 0.04)

	if (style == 1) {
		fill(cs.house2)
		noStroke()
		let step = w / 4
		for (let i = 0; i < 4; i++) {
			rect(i * step, -1, step, h * 0.15)
		}
		fill(cs.house3)
		for (let i = -1; i < 4; i++) {
			rect(i * step + step * 0.75, -1, step * 0.5, h * 0.15)
		}
		rect(0, h * 0.9, w, h * 0.1 + 1)
	} else if (style == 2) {
		fill(cs.out)
		rect(-spaceX, 0, w + spaceX * 2, h * 0.1)
		rect(-spaceX, h * 0.9, w + spaceX * 2, h * 0.1)
	} else if (style == 3) {
		stroke(cs.out)
		strokeWeight(spaceX * 2.5)
		strokeCap(SQUARE)
		noFill()
		arc(w / 2, h * 0.05, w * 2, h * 0.2, PI * 1.09, PI * 1.91)
		fill(cs.out)
		noStroke()
		quad(0, h * 0.87, w, h * 0.87, w * 1.1, h, w * -0.1, h)
		fill(cs.out2)
		quad(w * -0.05, h * 0.94, w * 1.05, h * 0.94, w * 1.1, h, w * -0.1, h)
	} else if (style == 'shutters') {
		fill(cs.accent)
		rect(0, 0, spaceX * 2, h)
		rect(w - spaceX * 2, 0, spaceX * 2, h)
	}

	pop()
}

function makeRoof({ x, y, w, h, cs }) {
	let style = random([1, 2])
	let c = random([cs.accent2, cs.house2])

	push()
	if (style == 1) {
		let offset = w * 0.03
		translate(x, y)
		fill(c)
		quad(-offset, 0, w + offset, 0, w, h, 0, h)
	} else if (style == 2) {
		translate(x, y)
		fill(c)
		rect(0, 0, w, h)
		let darkerColor = color(red(c) * 0.4, green(c) * 0.4, blue(c) * 0.4)
		noStroke()
		darkerColor.setAlpha(150)
		fill(darkerColor)
		rect(0, h * 0.6, w, h * 0.4)
		rect(0, h * 0.8, w, h * 0.2)
	}

	pop()
}

window.setup = setup
window.draw = draw
window.mouseClicked = () => redraw()
