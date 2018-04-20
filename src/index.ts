import { Site } from './specific/Site'
import { Circle } from './geometry/Circle'
import { Point } from './geometry/Point'

// Tricky declarations to avoid
// TypeScript compilation errors
declare const readline: () => string
declare const print: (res: string) => void

// First Turn
const numSites: number = Number(readline())
const sites: Site[] = new Array<Site>()

// Sites list initialization
for (let i = 0; i < numSites; i++) {
	const inputs: string[] = readline().split(' ')
	sites.push(new Site(+inputs[0], new Circle(new Point(+inputs[1], +inputs[2]), +inputs[3])))
}

// Game Loop
while (true) {
	const inputs: string[] = readline().split(' ')
	const gold: number = Number(inputs[0])
	const touchedSite: number = Number(inputs[1]) // -1 if none
	for (let i = 0; i < numSites; i++) {
		const inputs = readline().split(' ')
		const siteId = parseInt(inputs[0])
		const ignore1 = parseInt(inputs[1]) // used in future leagues
		const ignore2 = parseInt(inputs[2]) // used in future leagues
		const structureType = parseInt(inputs[3]) // -1 = No structure, 2 = Barracks
		const owner = parseInt(inputs[4]) // -1 = No structure, 0 = Friendly, 1 = Enemy
		const param1 = parseInt(inputs[5])
		const param2 = parseInt(inputs[6])
	}
	const numUnits = parseInt(readline())
	for (let i = 0; i < numUnits; i++) {
		const inputs = readline().split(' ')
		const x = parseInt(inputs[0])
		const y = parseInt(inputs[1])
		const owner = parseInt(inputs[2])
		const unitType = parseInt(inputs[3]) // -1 = QUEEN, 0 = KNIGHT, 1 = ARCHER
		const health = parseInt(inputs[4])
	}

	// First line: A valid queen action
	// Second line: A set of training instructions
	print('WAIT')
	print('TRAIN')
}
