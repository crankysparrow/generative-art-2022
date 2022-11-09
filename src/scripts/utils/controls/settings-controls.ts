export class SettingsControls {
	shown: boolean
	hasControls: boolean
	container: {}
	count: number

	constructor(hasControls: boolean) {
		this.hasControls = hasControls
		this.count = 0
	}
}
