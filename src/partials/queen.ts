import { Data } from '../interfaces/data'
import { Point } from '../geometry/Point'
import { WAIT, BUILD, MOVE } from './actions'
import { nearestPositionFrom } from '../specific/utils'
import { Site } from '../specific/Site'

declare const printErr: (err: any) => void

export const queen = (data: Data) => {
	const nearestFromMyQueen = nearestPositionFrom(data.myQueen.position)
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
