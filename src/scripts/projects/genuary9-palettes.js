let darkLight = function () {
	return {
		house: random(['#66170e', '#783225']),
		accent: random(['#4c244f', '#f5c447', '#3c4399']),
		win: color(163, 170, 157),
		win2: color(170, 180, 170),
		lines: color(59, 33, 30),
		out: color(176, 156, 129),
	}
}

let lightDark = function () {
	return {
		house: color(220, 215, 194),
		accent: random([color(137, 167, 167), color(44, 58, 73), color(136, 47, 37)]),
		win: color(163, 170, 157),
		win2: color(170, 180, 170),
		lines: color(59, 33, 30),
		out: color(176, 156, 129),
	}
}

let darkDark = function () {
	return {
		house: random([color(85, 34, 19), color(129, 69, 51)]),
		accent: random([color(137, 167, 167), color(44, 58, 73), color(136, 47, 37)]),
		win: color(181, 171, 161),
		win2: color(166, 159, 151),
		lines: color(59, 33, 30),
		out: color(235, 215, 190),
	}
}

let midDark = function () {
	return {
		house: random(['#ab806a', '#cd8865']),
		accent: random([color(137, 167, 167), color(44, 58, 73), color(136, 47, 37)]),
		win: color(163, 170, 157),
		win2: color(170, 180, 170),
		lines: color(59, 33, 30),
		out: color(176, 156, 129),
	}
}

let brightStuff = function () {
	return {
		accent: random(['#fabc2a', '#4c1e4f', '#293399']),
		house: random(['#66170e', '#783225']),
		win: color(163, 170, 157),
		win2: color(170, 180, 170),
		lines: color(59, 33, 30),
		out: color(206, 210, 219),
	}
}

let purpley = function () {
	return {
		accent: random(['#86BBBD', '#5F506B']),
		house: random(['#533747', '#483D51']),
		win: color(163, 170, 157),
		win2: color(170, 180, 170),
		lines: color(59, 33, 30),
		out: color(206, 210, 219),
		// bg: '#CAE1E2',
	}
}

let greenBlue = function () {
	return {
		accent: random(['#CBDF90', '#1B4079']),
		house: random(['#4D7C8A', '#7F9C96']),
		win2: color('#C7D1CF'),
		win: color('#DDE3E2'),
		lines: color(59, 33, 30),
		out: color(206, 210, 219),
	}
}

let anotherOne = function () {
	return {
		accent: random(['#acfcd9', '#f06449', '#571F4E']),
		house: random(['#27A58C', '#97230C']),
		win2: color(240, 167, 102),
		win: color(240, 187, 132),
		// lines: color(59, 33, 30),
		lines: color('#581620'),
		out: color('#E4B363'),
	}
}

// export const paletteOptions = [darkLight, midDark, lightDark, lightDark]

export const paletteOptions = () => {
	// return random([[brightStuff], [darkLight, lightDark], [midDark, darkDark]])
	return random([
		// {
		// 	palettes: [greenBlue],
		// 	bg: '#E8F2CF',
		// },
		{
			palettes: [anotherOne],
			bg: '#190933',
		},
		// {
		// 	palettes: [brightStuff],
		// },
		// {
		// 	palettes: [darkLight, lightDark],
		// },
		// {
		// 	palettes: [midDark, darkDark],
		// },
		// {
		// 	palettes: [purpley],
		// 	bg: '#CAE1E2',
		// },
	])
}
