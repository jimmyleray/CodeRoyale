import { Circle } from '../geometry/index'

export class Site {
	public _ignore1: any // used in future leagues
	public _ignore2: any // used in future leagues
	public structure: string // None, Barracks
	public owner: string // None, Friendly or Enemy
	public turns: number // Number of turns before
	public units: string // Type of units
	public cost: number // if is Barracks
	public range: number // if is Tower
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
}
