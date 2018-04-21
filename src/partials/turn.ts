import * as R from 'ramda'
import { splitToNumber } from '../specific/utils'
import { Site } from '../specific/Site'
import { Unit } from '../specific/Unit'
import { Point } from '../geometry/Point'
import { Data } from '../interfaces/data'
import { queen } from './queen'
import { builds } from './builds'

declare const readline: () => string

export const turn = (sites: Site[]): void => {
	const [gold, touchedSite] = splitToNumber(readline())

	// Sites params update
	sites.forEach(site => {
		return ([
			site._ignore1,
			site._ignore2,
			site._structure,
			site._owner,
			site._param1,
			site._param2
		] = R.tail(splitToNumber(readline())))
	})

	const units = new Array<Unit>()
	const numUnits = Number(readline())

	for (let i = 0; i < numUnits; i++) {
		const [x, y, owner, type, health]: number[] = splitToNumber(readline())
		units.push(new Unit(new Point(x, y), owner, type, health))
	}

	const myQueen = R.find(unit => unit.type === -1 && unit.owner === 0, units)

	// Dataset of the turn situation
	const data: Data = { sites, units, touchedSite, gold, myQueen }

	// A valid queen
	// instruction
	queen(data)

	// A set of training
	// instructions
	builds(data)
}
