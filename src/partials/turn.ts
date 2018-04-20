import * as R from 'ramda'
import {
	Site,
	splitToNumber,
	Unit,
	nearestPositionFrom,
	intersectBetweenCircleAndLine,
	distance
} from '../specific/index'
import { Circle, Point, Line } from '../geometry/index'

// Tricky declarations to avoid
// TypeScript compilation errors
// on global Coding Game variables
declare const readline: () => string
declare const print: (res: string) => void
declare const printErr: (err: any) => void

export const turn = (sites: Site[]): void => {
	const [gold, touchedSite] = splitToNumber(readline())
	printErr(`gold = ${gold}, touchedSite = ${touchedSite}`)

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

	// First line: A valid queen action
	if (touchedSite > -1 && sites[touchedSite].owner === 'None') {
		print(`BUILD ${touchedSite} BARRACKS-KNIGHT`)
	} else {
		if (sites.filter(site => site.owner === 'None').length > 0) {
			const nearestSite: Point = nearestPositionFrom(myQueen.position)(
				sites.filter(site => site.structure === 'None').map(site => site.circle.center)
			)
			print(`MOVE ${Math.round(nearestSite.x)} ${Math.round(nearestSite.y)}`)
		} else {
			print('WAIT')
		}
	}

	// Second line: A set of training instructions
	let totalCost = 0
	const trainList: Site[] = new Array<Site>()
	sites.filter(site => site.owner === 'Friendly' && site.turns === 0).forEach(site => {
		if (totalCost + site.cost <= gold) {
			totalCost += site.cost
			trainList.push(site)
		}
	})

	if (trainList.length > 0) {
		print(`TRAIN ${trainList.map(site => site.id.toString()).join(' ')}`)
	} else {
		print(`TRAIN`)
	}
}
