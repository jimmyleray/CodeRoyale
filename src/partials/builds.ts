import { Data } from '../interfaces/data'
import { Site } from '../specific/Site'
import { TRAIN } from './actions'

declare const printErr: (err: any) => void

export const builds = (data: Data) => {
	let totalCost = 0
	const list: Site[] = new Array<Site>()

	data.sites.filter(site => site.canTrain()).forEach(site => {
		if (totalCost + site.cost <= data.gold) {
			totalCost += site.cost
			list.push(site)
		}
	})

	TRAIN(list)
}
