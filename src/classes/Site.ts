import { Circle } from './Circle'

export class Site {
	public structure: string // None, Barracks, Tower
	public owner: string // None, Friendly or Enemy

	// For Mines
	public gold: number
	public maxMineRate: number
	public mineRate: number

	// If is Barracks
	public turns: number
	public unit: string
	public cost: number

	// If is Tower
	public range: number
	public health: number

	private structures: string[] = ['Mine', 'Tower', 'Barracks']
	private units: string[] = ['Knight', 'Archer', 'Giant']
	private costs: number[] = [80, 100, 140]

	constructor(public id: number, public circle: Circle) {}

	set _owner(value: number) {
		this.owner = value < 0 ? 'None' : value === 0 ? 'Friendly' : 'Enemy'
	}

	set _structure(value: number) {
		this.structure = value < 0 ? 'None' : this.structures[value]
	}

	set _param1(value: number) {
		if (this.structure === 'Barracks') {
			this.turns = value
		} else if (this.structure === 'Tower') {
			this.health = value
		} else if (this.structure === 'Mine') {
			this.mineRate = value
		}
	}

	set _param2(value: number) {
		if (this.structure === 'Barracks') {
			this.unit = this.units[value]
			this.cost = this.costs[value]
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

	isMine(): boolean {
		return this.structure === 'Mine'
	}

	isBarracks(): boolean {
		return this.structure === 'Barracks'
	}

	isKnightBarracks(): boolean {
		return this.isBarracks() && this.unit === 'Knight'
	}

	isArcherBarracks(): boolean {
		return this.isBarracks() && this.unit === 'Archer'
	}

	isGiantBarracks(): boolean {
		return this.isBarracks() && this.unit === 'Giant'
	}

	isTower(): boolean {
		return this.structure === 'Tower'
	}

	canTrain(): boolean {
		return this.isFriendly() && this.isBarracks() && this.turns === 0
	}
}
