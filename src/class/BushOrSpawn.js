export class BushOrSpawn {
	constructor(type, x, y, radius) {
		this.type = type
		this.x = Number(x)
		this.y = Number(y)
		this.radius = Number(radius)
	}

	isBush() {
		return this.type === 'Bush'
	}

	isSpawn() {
		return this.type === 'Spawn'
	}
}
