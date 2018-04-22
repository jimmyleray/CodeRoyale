import { Site } from '../classes/Site'
import { Circle } from '../classes/Circle'
import { Point } from '../classes/Point'
import { Maths } from '../classes/Maths'

declare const readline: () => string

export const firstTurn = (): Site[] => {
	const sites = new Array<Site>()
	const numSites: number = Number(readline())

	for (let i = 0; i < numSites; i++) {
		const [id, x, y, radius]: number[] = Maths.splitToNumber(readline())
		sites.push(new Site(id, new Circle(new Point(x, y), radius)))
	}

	return sites
}
