import * as R from 'ramda'
import { WAIT, BUILD, MOVE } from './actions'
import { Site } from '../classes/Site'
import { Maths } from '../classes/Maths'
import { Data } from '../interfaces/data'
import { Point } from '../classes/Point'

declare const printErr: (err: any) => void

export const queen = (data: Data) => {
	const myQueen = R.find(unit => unit.isFriendly() && unit.isQueen(), data.units)
	const nearestFromMyQueen = Maths.nearestPositionFrom(myQueen.position)
	if (data.touchedSite > -1 && !data.sites[data.touchedSite].isBuilt()) {
		if (data.sites.filter(site => site.isBuilt() && site.isFriendly()).length >= 1) {
			BUILD(data.touchedSite, 'TOWER')
		} else {
			BUILD(data.touchedSite, 'BARRACKS-KNIGHT')
		}
	} else if (data.sites.filter(site => !site.isBuilt()).length > 0) {
		const availableSites: Site[] = data.sites.filter(site => !site.isBuilt())
		const nearestSite: Point = nearestFromMyQueen(availableSites.map(site => site.circle.center))
		MOVE(nearestSite.x, nearestSite.y)
	} else {
		WAIT()
	}
}
