import { WAIT, BUILD, MOVE, TRAIN } from './actions'
import { Site } from '../classes/Site'
import { Maths } from '../classes/Maths'
import { Data } from '../interfaces/data'
import { Point } from '../classes/Point'

declare const printErr: (err: any) => void

enum Strategies {
	'Attack', // we train knight and giant to kill enemy queen
	'Defense' // we play eco, build tower and archer to defend
}

export const heuristic = (data: Data) => {
	const myQueen = data.units.find(unit => unit.isFriendly() && unit.isQueen())
	const nearestFromMyQueen = Maths.nearestPositionFrom(myQueen.position)
	const nearestSiteFromMyQueen = (sites: Site[]): Site =>
		sites.find(
			site => site.circle.center === nearestFromMyQueen(sites.map(site => site.circle.center))
		)

	const unbuildSites = data.sites.filter(site => !site.isBuilt())
	const nearestUnbuildSite = nearestSiteFromMyQueen(unbuildSites)

	const nearestUnbuildSiteWithGold = nearestSiteFromMyQueen(
		unbuildSites.filter(site => site.gold > 0)
	)

	const enemyMines = data.sites.filter(site => site.isMine() && site.isEnemy())
	const enemyMineRate = enemyMines.reduce((sum, mine) => sum + mine.mineRate, 0)

	const myMines = data.sites.filter(site => site.isMine() && site.isFriendly())
	const myMineRate = myMines.reduce((sum, mine) => sum + mine.mineRate, 0)
	const myMinesWithoutOptimalMineRate = myMines.filter(mine => mine.mineRate < mine.maxMineRate)

	const totalKnowGoldOnMap = data.sites.reduce((sum, site) => sum + Math.abs(site.gold), 0)

	printErr(`Total Know Gold On Map : ${totalKnowGoldOnMap}`)
	printErr(`Mine Rate : Albard ${myMineRate} vs ${enemyMineRate} Enemy`)

	const enemyKnights = data.units.filter(unit => unit.isEnemy() && unit.isKnight())

	const myArcherBarracks = data.sites.filter(site => site.isArcherBarracks() && site.isFriendly())
	const myKnightBarracks = data.sites.filter(site => site.isKnightBarracks() && site.isFriendly())

	const currentStrategy = () => {
		if (enemyMines.length > myMines.length) {
			// Enemy has probably a better economy
			// I need to attack him now
			// to try to come back
			return Strategies.Attack
		} else {
			// I probably have a better
			// economy than my enemy
			if (data.gold < 80 * 5) {
				// If i dont have enougth
				// to train a great army
				// i continue to play
				// defensive and eco
				return Strategies.Defense
			} else {
				// If i have enougth
				// to train a finish-game army
				// i return to attack
				return Strategies.Attack
			}
		}
	}

	/**
	 * QUEEN INSTRUCTIONS
	 */

	if (currentStrategy() === Strategies.Defense) {
		if (enemyKnights.length > 2) {
			// Enemy can attack my Queen
			// I need to defend her
			if (myArcherBarracks.length > 0) {
				// I already have a building
				// to train archer
				// I will build a tower
				// to defend myself
				BUILD(nearestUnbuildSite.id, 'TOWER')
			} else {
				// I dont have archerBarracks
				// I need to build one
				// to train archers
				BUILD(nearestUnbuildSite.id, 'BARRACKS-ARCHER')
			}
		} else {
			// Enemy cant attack my Queen
			// I can play economy
			if (myMinesWithoutOptimalMineRate.length > 0) {
				// If i can upgrade a mine
				BUILD(nearestSiteFromMyQueen(myMinesWithoutOptimalMineRate).id, 'MINE')
			} else {
				// Else i build another one
				BUILD(nearestUnbuildSiteWithGold.id, 'MINE')
			}
		}
	} else if (currentStrategy() === Strategies.Attack) {
		if (myKnightBarracks.length > 0) {
			// if i already have barracks
			// i can build tower to
			// protect my knights
			// from enemies archers
			BUILD(nearestUnbuildSite.id, 'TOWER')
		} else {
			// i dont have barracks
			// but i need to attack
			// so i build one now
			BUILD(nearestUnbuildSite.id, 'BARRACKS-KNIGHT')
		}
	} else {
		WAIT()
	}

	/**
	 * BUILDINGS INSTRUCTIONS
	 */

	let totalCost = 0
	const list: Site[] = new Array<Site>()
	const enemyQueen = data.units.find(unit => unit.isEnemy() && unit.isQueen())
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
