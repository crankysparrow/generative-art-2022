export function getColor(forceX: number, forceY: number, colorDirection: number) {
	if (colorDirection == 1) {
		// toward top2: y down, either x
		if (forceX < 0 && forceY > 0) {
			return 1
		} else if (forceX > 0 && forceY > 0) {
			return 2
		} else {
			return 3
		}
	} else if (colorDirection == 2) {
		// toward bottom2: y up, either x
		if (forceX < 0 && forceY < 0) {
			return 1
		} else if (forceX > 0 && forceY < 0) {
			return 2
		} else {
			return 3
		}
	} else if (colorDirection == 3) {
		// topright corner, botleft corner: y down & x up // yup & x down
		if (forceX < 0 && forceY > 0) {
			return 1
		} else if (forceX > 0 && forceY < 0) {
			return 2
		} else {
			return 3
		}
	} else if (colorDirection == 4) {
		// topleft, botright: y down & x down, y up & x up
		if (forceX > 0 && forceY > 0) {
			return 1
		} else if (forceX < 0 && forceY < 0) {
			return 2
		} else {
			return 3
		}
	} else if (colorDirection == 5) {
		// toward right2: x up, y either
		if (forceX < 0 && forceY > 0) {
			return 1
		} else if (forceX < 0 && forceY < 0) {
			return 2
		} else {
			return 3
		}
	} else if (colorDirection == 6) {
		if (forceX > 0 && forceY > 0) {
			return 1
		} else if (forceX > 0 && forceY < 0) {
			return 2
		} else {
			return 3
		}
	} else {
		if (forceX > 0 && forceY > 0) {
			return 1
		} else if (forceX > 0 && forceY < 0) {
			return 2
		} else if (forceX < 0 && forceY > 0) {
			return 3
		} else {
			return 4
		}
	}
}
