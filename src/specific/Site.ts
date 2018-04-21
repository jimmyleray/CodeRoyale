import { Circle } from '../geometry/Circle'

export class Site {
	public _ignore1: any // used in future leagues
	public _ignore2: any // used in future leagues
	public structure: string // None, Barracks, Tower
	public owner: string // None, Friendly or Enemy

	// If is Barracks
	public turns: number
	public units: string
	public cost: number

	// If is Tower
	public range: number
	public health: number

	constructor(public id: number, public circle: Circle) {}

	set _owner(value: number) {
		this.owner = value === -1 ? 'None' : value === 0 ? 'Friendly' : 'Enemy'
	}

	set _structure(value: number) {
		this.structure = value === -1 ? 'None' : value === 1 ? 'Tower' : 'Barracks'
	}

	set _param1(value: number) {
		if (this.structure === 'Barracks') {
			this.turns = value
		} else if (this.structure === 'Tower') {
			this.health = value
		}
	}

	set _param2(value: number) {
		if (this.structure === 'Barracks') {
			this.units = value === 0 ? 'Knight' : value === 1 ? 'Archer' : 'Giant'
			this.cost = this.units === 'Knight' ? 80 : this.units === 'Archer' ? 100 : 140
		} else if (this.structure === 'Tower') {
			this.range = value
		}
	}

	isBuilt(): boolean {
		return this.owner !== 'None'
	}

	isFriendly(): boolean {
		return this.owner === 'Friendly'
	}

	isEnemy(): boolean {
		return this.owner === 'Enemy'
	}

	isBarracks(): boolean {
		return this.structure === 'Barracks'
	}

	isTower(): boolean {
		return this.structure === 'Tower'
	}

	canTrain(): boolean {
		return this.isFriendly() && this.isBarracks() && this.turns === 0
	}
}
