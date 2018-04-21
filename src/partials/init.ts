import { Site } from '../specific/Site'
import { Circle } from '../geometry/Circle'
import { Point } from '../geometry/Point'
import { splitToNumber } from '../specific/utils'

declare const readline: () => string

export const init = (): Site[] => {
	const sites = new Array<Site>()
	const numSites: number = Number(readline())

	for (let i = 0; i < numSites; i++) {
		const [id, x, y, radius]: number[] = splitToNumber(readline())
		sites.push(new Site(id, new Circle(new Point(x, y), radius)))
	}

	return sites
}
