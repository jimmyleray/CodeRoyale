// Import functionnal library Ramda
import * as R from 'ramda'
import { Entity } from '../class/Entity'
import { distance } from './maths'

export const isHero = entity => entity.isHero()

export const isNotHero = entity => !entity.isHero()

export const isAlly = entity => entity.isAlly()

export const isEnemy = entity => !entity.isAlly() && entity.unitType !== 'GROOT'

export const isNeutral = entity => entity.unitType === 'GROOT'

export const isTower = entity => entity.isTower()

export const getHeroes = EntityList => R.filter(isHero, EntityList)

export const getAllies = EntityList => R.filter(isAlly, EntityList)

export const getEnemies = R.filter(isEnemy)

export const getEnemiesHero = R.compose(getEnemies, getHeroes)

export const getMyHeroes = R.compose(getAllies, getHeroes)

export const getTowers = EntityList => R.filter(isTower, EntityList)

export const getEnemyTower = R.compose(getEnemies, getTowers)

export const getNearest = focusEntity => EntityList => {
	const distOf = distance(focusEntity.position)

	return R.reduce(
		(nearest, actual) =>
			distOf(actual.position) < distOf(nearest.position) ? actual : nearest,
		EntityList[0],
		EntityList
	)
}

export const getNearestEnemyHero = focusEntity =>
	R.compose(getNearest(focusEntity), getEnemiesHero)

export const addEntity = myTeam => () =>
	new Entity(myTeam, ...readline().split(' '))
