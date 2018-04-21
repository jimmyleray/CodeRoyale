import * as R from 'ramda'
import { Site } from '../classes/Site'
import { Unit } from '../classes/Unit'
import { Point } from '../classes/Point'
import { Data } from '../interfaces/data'
import { Maths } from '../classes/Maths'
import { queen } from './queen'
import { builds } from './builds'

declare const readline: () => string

export const turn = (sites: Site[]): void => {
	const [gold, touchedSite]: number[] = Maths.splitToNumber(readline())

	// Sites params update
	sites.forEach(site => {
		return ([
			site.gold,
			site.maxMineRate,
			site._structure,
			site._owner,
			site._param1,
			site._param2
		] = R.tail(Maths.splitToNumber(readline())))
	})

	const units = new Array<Unit>()
	const numUnits = Number(readline())

	for (let i = 0; i < numUnits; i++) {
		const [x, y, owner, type, health]: number[] = Maths.splitToNumber(readline())
		units.push(new Unit(new Point(x, y), owner, type, health))
	}

	// Dataset of the turn situation
	const data: Data = { sites, units, touchedSite, gold }

	// A valid queen
	// instruction
	queen(data)

	// A set of training
	// instructions
	builds(data)
}
