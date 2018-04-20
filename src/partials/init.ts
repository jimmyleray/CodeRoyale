import { Site, splitToNumber } from '../specific/index'
import { Circle, Point } from '../geometry/index'

// Tricky declarations to avoid
// TypeScript compilation errors
// on global Coding Game variables
declare const readline: () => string
declare const print: (res: string) => void
declare const printErr: (err: any) => void

export const init = (): Site[] => {
	const sites = new Array<Site>()
	const numSites: number = Number(readline())

	for (let i = 0; i < numSites; i++) {
		const [id, x, y, radius]: number[] = splitToNumber(readline())
		sites.push(new Site(id, new Circle(new Point(x, y), radius)))
	}

	printErr(`numSites = ${sites.length}`)
	return sites
}
