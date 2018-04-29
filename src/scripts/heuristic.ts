import { WAIT, BUILD, MOVE, TRAIN } from './actions'
import { Site } from '../classes/Site'
import { Maths } from '../classes/Maths'
import { Data } from '../interfaces/data'
import { Point } from '../classes/Point'

declare const printErr: (err: any) => void

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

	/**
	 * QUEEN INSTRUCTIONS
	 */

	if (myKnightBarracks.length > 0) {
		// Enemy can attack my Queen
		// I need to defend her
		// I already have an archer barrack
		if (myMinesWithoutOptimalMineRate.length > 0) {
			// If i can upgrade a mine
			BUILD(nearestSiteFromMyQueen(myMinesWithoutOptimalMineRate).id, 'MINE')
		} else {
			// Else i build another one
			BUILD(nearestUnbuildSiteWithGold.id, 'MINE')
		}
	} else {
		// I dont have archerBarracks
		// I need to build one
		// to train archers
		BUILD(nearestUnbuildSite.id, 'BARRACKS-KNIGHT')
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
