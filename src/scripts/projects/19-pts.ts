import { CanvasSpace, Rectangle, Bound, Create, Group, Polygon, Num, Pt, Line } from 'pts'

var space = new CanvasSpace('#pt').setup({ bgcolor: '#99eeff', retina: true, resize: true })
var form = space.getForm()

let pts = new Group()

space.add((time, ftime) => {
	pts.push(new Pt(Math.random() * space.size.x, Math.random() * space.size.y))

	pts.forEach((pt) => {
		form.fillOnly('#f0f').point(pt, 5, 'circle')
	})
})

space.bindMouse().bindTouch().play()
