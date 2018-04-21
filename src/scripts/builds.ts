import * as R from 'ramda'
import { Data } from '../interfaces/data'
import { Maths } from '../classes/Maths'
import { Site } from '../classes/Site'
import { TRAIN } from './actions'

declare const printErr: (err: any) => void

export const builds = (data: Data) => {
	let totalCost = 0
	const list: Site[] = new Array<Site>()
	const enemyQueen = R.find(unit => unit.isEnemy() && unit.isQueen(), data.units)
	const distanceFromEnemyQueen = Maths.distance(enemyQueen.position)

	data.sites
		.filter(site => site.canTrain())
		.sort((a: Site, b: Site) =>
			// To build near than the enemy queen
			Number(distanceFromEnemyQueen(a.circle.center) > distanceFromEnemyQueen(b.circle.center))
		)
		.forEach(site => {
			// Just keep builds that we can buy
			if (totalCost + site.cost <= data.gold) {
				totalCost += site.cost
				list.push(site)
			}
		})

	TRAIN(list)
}
