import { paletteOptions } from './palettes'
let palette

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	noLoop()
}

function draw() {
	palette = paletteOptions()
	background(palette.bg)

	let panels = random([1, 2, 3])
	panels = 2

	if (panels == 2) {
		let h = random(width * 0.333, width * 0.666)
		let one = setupHouses(h)
		fill(palette.bg)
		stroke(palette.palettes[0]().lines)
		strokeWeight(2)
		rect(0, 0, h, height)
		image(one, 0, 0)

		translate(h, 0)
		fill(palette.bg)
		stroke(palette.palettes[0]().lines)
		strokeWeight(2)
		rect(0, 0, width - h, height)
		let two = setupHouses(width - h)
		image(two, 0, 0)
	}
	// for (let i = 0; i < width; i++) {
	// 	push()

	// 	let p = setupHouses(width / panels)
	// 	translate(i * (width / panels), 0)
	// 	fill(palette.bg)
	// 	stroke(palette.palettes[0]().lines)
	// 	strokeWeight(2)
	// 	rect(0, 0, width / panels, height)
	// 	image(p, 0, 0)

	// 	pop()
	// }
}

function setupHouses(sizeX) {
	let g = createGraphics(sizeX, height)
	let sizes = random([0.06, 0.2, 0.3])
	let spacing = random([1.2, 1.1])
	let yPos = random(height * 0.2) * -1

	while (yPos < height * 1.25) {
		let floors = random([3, 3, 2])
		let h = random(height * sizes, height * (sizes + 0.08))
		yPos += h * spacing
		let w = floors == 2 ? h / random(1.6, 1.8) : h / random(1.9, 2.1)
		let housesToBuild = []
		let x = random(w) * -1.2
		while (x < sizeX + w) {
			housesToBuild.push({ x: x, y: yPos, hw: w, hh: random(h * 0.97, h * 1.03), g })
			x += w
		}

		housesToBuild = shuffle(housesToBuild)
		g.push()
		g.rotate(random(-PI * 0.01, PI * 0.01))
		housesToBuild.forEach((h) => {
			buildHouse(h, floors)
		})
		g.pop()
	}

	return g
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

let sizeOptions2 = [
	(hh) => {
		return {
			floor1: hh * 0.47,
			floor2: hh * 0.43,
			basement: hh * 0.04,
			roof: hh * 0.06,
		}
	},
]

function buildHouse({ x, y, hw, hh, g }, floors) {
	let sizes = floors == 2 ? sizeOptions2[0](hh) : random(sizeOptions)(hh)
	let { floor1, floor2, floor3, basement, roof } = sizes

	let windowStyle = random([1, 2, 3])
	let hLines = random([1, 2])
	let vLines = random([1, 2])

	let cs = random(palette.palettes)()
	cs.house2 = color(red(cs.house) * 0.7, green(cs.house) * 0.7, blue(cs.house) * 0.7)
	cs.house3 = color(red(cs.house) * 0.5, green(cs.house) * 0.5, blue(cs.house) * 0.5)
	cs.accent2 = color(red(cs.accent) * 0.8, green(cs.accent) * 0.8, blue(cs.accent) * 0.8)
	cs.out2 = lerpColor(cs.out, cs.house3, 0.5)
	cs.lineFade = color(red(cs.house) * 0.7, green(cs.house) * 0.7, blue(cs.house) * 0.7)
	cs.lineFade.setAlpha(50)
	cs.lineFade2 = color(red(cs.house) * 0.7, green(cs.house) * 0.7, blue(cs.house) * 0.7)
	cs.lineFade2.setAlpha(120)

	g.push()
	g.translate(x, y - hh)
	g.stroke(cs.lines)
	g.strokeWeight(1)
	g.fill(cs.house)
	g.rect(0, 0, hw, hh)

	if (hLines == 1) {
		let step = hh / floor(random(18, 30))
		g.stroke(cs.lineFade)
		g.strokeWeight(2)
		for (let yi = step / 2; yi < hh; yi += step) {
			g.line(0, yi, hw, yi)
		}
	}

	firstFloor({
		vLines,
		houseWidth: hw,
		floorHeight: floor1,
		basement,
		x: 0,
		y: floors == 3 ? floor3 + floor2 + roof : floor2 + roof,
		cs,
		windowStyle,
		windowP: floors == 2 ? 0.6 : 0.7,
		g,
	})
	upperFloor({
		vLines,
		x: 0,
		y: floors == 3 ? floor3 + roof : roof,
		houseWidth: hw,
		floorHeight: floor2,
		cs,
		windowStyle,
		g,
	})
	if (floors == 3) {
		upperFloor({
			vLines,
			x: 0,
			y: roof,
			houseWidth: hw,
			floorHeight: floor3,
			cs,
			windowStyle,
			g,
		})
	}
	makeRoof({ x: 0, y: 0, w: hw, h: roof, cs, g })
	g.pop()
}

function steps({ x, y, doorW, stepH, floorHeight, cs, g }) {
	g.push()
	g.translate(x, y)
	g.fill(cs.out)
	g.stroke(cs.out2)
	g.strokeWeight(1)
	let yPos = 0
	let stepSize = floorHeight * 0.05
	while (yPos < stepH) {
		g.push()
		g.translate(0, yPos)
		g.rect(0, 0, doorW, stepSize)
		yPos += stepSize
		g.pop()
	}
	g.pop()
}

function firstFloor({
	houseWidth,
	floorHeight,
	basement,
	x,
	y,
	windowStyle,
	windowP,
	vLines,
	cs,
	g,
}) {
	let doorW = houseWidth * 0.22
	let doorH = floorHeight * 0.9
	let spaceX = int(houseWidth * 0.05)
	let spaceY = int(floorHeight * 0.1)
	let windowH = floorHeight * windowP
	let windowW = int(houseWidth * 0.21)
	let dSide = random(['left', 'right'])
	let sp = (houseWidth - doorW - spaceX - windowW * 2) / 4

	g.push()
	if (dSide == 'left') {
		g.translate(x + spaceX, y)
		door({ x: 0, y: spaceY, doorW, doorH, cs, g })
		steps({ x: 0, y: floorHeight, doorW, stepH: basement, floorHeight, cs, g })
		g.translate(doorW + sp, 0)

		if (vLines == 1) {
			g.stroke(cs.lineFade2)
			g.strokeWeight(2)
			g.line(windowW / 2, floorHeight / 2, windowW / 2, floorHeight + basement)
			g.line(
				windowW + sp * 2 + windowW / 2,
				floorHeight / 2,
				windowW + sp * 2 + windowW / 2,
				floorHeight + basement - 2
			)
		}
		makeWindow({
			x: 0,
			y: windowP < 0.7 ? spaceY * 2 : spaceY,
			w: windowW,
			h: windowH,
			cs,
			style: windowStyle,
			g,
		})

		g.translate(windowW + sp * 2, 0)
		makeWindow({
			x: 0,
			y: windowP < 0.7 ? spaceY * 2 : spaceY,
			w: windowW,
			h: windowH,
			cs,
			style: windowStyle,
			g,
		})
	} else {
		g.translate(x + sp, y)

		if (vLines == 1) {
			g.stroke(cs.lineFade2)
			g.strokeWeight(2)
			g.line(windowW / 2, floorHeight / 2, windowW / 2, floorHeight + basement)
			g.line(
				windowW + sp * 2 + windowW / 2,
				floorHeight / 2,
				windowW + sp * 2 + windowW / 2,
				floorHeight + basement - 2
			)
		}
		makeWindow({
			x: 0,
			y: windowP < 0.7 ? spaceY * 2 : spaceY,
			w: windowW,
			h: windowH,
			cs,
			style: windowStyle,
			g,
		})

		g.translate(windowW + sp * 2, 0)
		makeWindow({
			x: 0,
			y: windowP < 0.7 ? spaceY * 2 : spaceY,
			w: windowW,
			h: windowH,
			cs,
			style: windowStyle,
			g,
		})

		g.translate(windowW + sp, 0)
		door({ x: 0, y: spaceY, doorW, doorH, cs, g })
		steps({ x: 0, y: floorHeight, doorW, stepH: basement, floorHeight, cs, g })
	}
	g.pop()
}

function upperFloor({ x, y, houseWidth, floorHeight, windowStyle, cs, vLines, g }) {
	let spaceX = houseWidth * 0.1
	let spaceY = floorHeight * 0.1

	g.push()
	g.translate(x, y)
	g.fill(0, 0, 255, 150)

	let windowWidth = int(spaceX * 2)
	let sp = int((houseWidth - windowWidth * 2) / 3)

	if (vLines == 1) {
		g.push()
		g.rectMode(CENTER)
		g.fill(cs.lineFade2)
		g.noStroke()
		g.rect(sp + windowWidth / 2, spaceY * 8, spaceX, spaceY * 2)
		g.rect(sp * 2 + windowWidth + windowWidth / 2, spaceY * 8, spaceX, spaceY * 2)
		g.pop()
	}
	makeWindow({
		x: sp,
		y: spaceY,
		w: windowWidth,
		h: spaceY * 7.5,
		cs,
		style: windowStyle,
		g,
	})
	makeWindow({
		x: sp * 2 + windowWidth,
		y: spaceY,
		w: windowWidth,
		h: spaceY * 7.5,
		cs,
		style: windowStyle,
		g,
	})

	g.pop()
}

function door({ x, y, doorW, doorH, cs, g }) {
	let topY = int(doorH * 0.18)
	let bY = doorH - topY
	let sp = doorW * 0.1
	let spY = bY * 0.1

	g.push()
	g.translate(x, y)

	let topS = random([1, 2, 3])
	if (topS == 1) {
		g.stroke(cs.out)
		g.strokeWeight(sp)
		g.fill(cs.win2)
		g.arc(doorW / 2, topY, sp * 8, topY * 2, PI, 0)
		g.stroke(cs.out2)
		g.strokeWeight(sp * 1.5)
		g.strokeCap(SQUARE)
		g.noFill()
		g.arc(doorW / 2, topY, sp * 8, topY * 2, PI, PI * 1.2)
		g.arc(doorW / 2, topY, sp * 8, topY * 2, PI * 1.4, PI * 1.6)
		g.arc(doorW / 2, topY, sp * 8, topY * 2, PI * 1.8, PI * 2)
	} else if (topS == 2) {
		g.fill(cs.out)
		g.noStroke()
		g.rect(0, 0, doorW, topY)
		let littleWindowW = (doorW - sp * 2) / 2 - sp / 2
		g.fill(cs.win)
		g.stroke(cs.out2)
		g.strokeWeight(1)
		g.rect(sp, sp, littleWindowW, topY - sp * 2)
		g.rect(littleWindowW + sp * 2, sp, littleWindowW, topY - sp * 2)
	} else if (topS == 3) {
		let newTopY = int(topY + spY)
		g.push()
		g.translate(0, topY - newTopY)
		let half = newTopY / 2
		g.fill(cs.out)
		g.stroke(cs.out2)
		g.strokeWeight(1)
		g.triangle(doorW / 2, 0, doorW, half, 0, half)
		g.rect(0, half, doorW, newTopY - half)
		g.pop()
	}

	g.fill(cs.accent)
	g.stroke(cs.lines)
	g.strokeWeight(1)
	g.rect(0, topY, doorW, bY)

	let styl = random([1, 2])
	if (styl == 1) {
		g.stroke(cs.accent2)
		g.noFill()
		g.strokeWeight(3)
		g.rect(sp * 2, topY + spY, doorW - sp * 4, bY / 2)
		g.strokeWeight(2)
		g.rect(sp * 4, topY + spY * 2, doorW - sp * 8, bY / 2 - spY * 2)
	} else if (styl == 2) {
		g.push()
		g.fill(cs.accent2)
		g.noStroke()
		g.rectMode(CENTER)
		g.rect(doorW / 2, topY + sp * 7, sp * 6, sp * 12, sp * 3)
		g.stroke(cs.accent)
		g.strokeWeight(3)
		g.rect(doorW / 2, topY + sp * 7, sp * 4, sp * 10, sp * 2)
		g.pop()
	}

	g.fill(cs.out)
	g.stroke(cs.out2)
	g.strokeWeight(1)
	g.rect(0, topY, sp, bY)
	g.rect(doorW - sp, topY, sp, bY)

	g.pop()
}

function makeWindow({ x, y, w, h, cs, style, g }) {
	let spaceX = w * 0.1

	g.push()
	g.translate(x, y)
	g.noStroke()

	g.fill(cs.win)
	g.rect(0, 0, w, h - 1)
	g.fill(cs.win2)
	g.rect(0, h / 2, w, h / 2)

	g.fill(cs.house3)
	g.rect(0, h * 0.48, w, h * 0.04)

	if (style == 1) {
		g.fill(cs.house2)
		g.noStroke()
		let step = w / 4
		for (let i = 0; i < 4; i++) {
			g.rect(i * step, -1, step, h * 0.15)
		}
		g.fill(cs.house3)
		for (let i = -1; i < 4; i++) {
			g.rect(i * step + step * 0.75, -1, step * 0.5, h * 0.15)
		}
		g.rect(0, h * 0.9, w, h * 0.1 + 1)
	} else if (style == 2) {
		g.fill(cs.out)
		g.rect(-spaceX, 0, w + spaceX * 2, h * 0.1)
		g.rect(-spaceX, h * 0.9, w + spaceX * 2, h * 0.1)
	} else if (style == 3) {
		g.stroke(cs.out)
		g.strokeWeight(spaceX * 2.5)
		g.strokeCap(SQUARE)
		g.noFill()
		g.arc(w / 2, h * 0.05, w * 2, h * 0.2, PI * 1.09, PI * 1.91)
		g.fill(cs.out)
		g.noStroke()
		g.quad(0, h * 0.87, w, h * 0.87, w * 1.1, h, w * -0.1, h)
		g.fill(cs.out2)
		g.quad(w * -0.05, h * 0.94, w * 1.05, h * 0.94, w * 1.1, h * 1.01, w * -0.1, h * 1.01)
	} else if (style == 'shutters') {
		g.fill(cs.accent)
		g.rect(0, 0, spaceX * 2, h)
		g.rect(w - spaceX * 2, 0, spaceX * 2, h)
	}

	g.pop()
}

function makeRoof({ x, y, w, h, cs, g }) {
	let style = random([1, 2])
	let c = random([cs.accent2, cs.house2])
	g.stroke(cs.lines)
	g.strokeWeight(1)
	g.push()
	if (style == 1) {
		let offset = w * 0.03
		g.translate(x, y)
		g.fill(c)
		g.quad(-offset, 0, w + offset, 0, w, h, 0, h)
		let darkerColor = color(red(c) * 0.7, green(c) * 0.7, blue(c) * 0.7)
		g.noStroke()
		let c2 = cs.house3
		c2.setAlpha(80)
		g.rectMode(CENTER)
		g.fill(c2)
		let step = w / 14
		for (let i = 0; i < 14; i++) {
			g.rect(i * step + step * 0.5, h * 0.4, step * 0.5, h * 0.8)
			g.rect(i * step + step * 0.5, h * 0.2, step * 0.7, h * 0.4)
		}
	} else if (style == 2) {
		g.translate(x, y)
		g.fill(c)
		g.rect(0, 0, w, h)
		let darkerColor = color(red(c) * 0.4, green(c) * 0.4, blue(c) * 0.4)
		g.noStroke()
		darkerColor.setAlpha(150)
		g.fill(darkerColor)
		g.rect(0, h * 0.6, w, h * 0.4)
		g.rect(0, h * 0.8, w, h * 0.2)
	}
	g.pop()
}

window.setup = setup
window.draw = draw
window.mouseClicked = () => redraw()
