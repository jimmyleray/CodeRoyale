import { Data } from '../interfaces/data'
import { distance } from '../specific/utils'
import { Site } from '../specific/Site'
import { TRAIN } from './actions'

declare const printErr: (err: any) => void

export const builds = (data: Data) => {
	let totalCost = 0
	const list: Site[] = new Array<Site>()
	const distanceFromEnemyQueen = distance(data.enemyQueen.position)

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
