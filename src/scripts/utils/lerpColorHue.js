export default function lerpColorByHue(col1, col2, i, clockwise = true) {
	colorMode(HSB)
	let h1 = hue(col1)
	let h2 = hue(col2)

	let hueDist, currentHue
	if (clockwise) {
		hueDist = h2 > h1 ? h2 - h1 : 360 - h1 + h2
		currentHue = h1 + (hueDist / 100) * i
		if (currentHue > 360) {
			currentHue = currentHue - 360
		}
	} else {
		hueDist = h2 > h1 ? h1 + (360 - h2) : h1 - h2
		currentHue = h1 - (hueDist / 100) * i
		if (currentHue <= 0) {
			currentHue = 360 + currentHue
		}
	}

	let s1 = saturation(col1)
	let s2 = saturation(col2)
	let sDist = s2 - s1
	let currentSaturation = s1 + (sDist / 100) * i

	let b1 = brightness(col1)
	let b2 = brightness(col2)
	let bDist = b2 - b1
	let currentBrightness = b1 + (bDist / 100) * i

	return color(currentHue, currentSaturation, currentBrightness)
}
