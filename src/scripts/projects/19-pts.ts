import { CanvasSpace, Rectangle, Bound, Create, Group, Polygon, Num, Pt, Line } from 'pts'

var space = new CanvasSpace('#pt').setup({ bgcolor: '#99eeff', retina: true, resize: true })
var form = space.getForm()

let pts = new Group()

// https://ptsjs.org/demo/?name=canvasspace.action
space.add({
	animate: (time, ftime) => {
		// pts.push(new Pt(Math.random() * space.size.x, Math.random() * space.size.y))

		if (pts.length > 10) pts.shift()
		form.strokeOnly('#d0a', 3).line(pts)
		form.fillOnly('#123').point(space.pointer, 10, 'circle')
	},

	action: (type, px, py) => {
		if (type === 'move') pts.push(new Pt(px, py))
	},
})

space.bindMouse().bindTouch().play()
