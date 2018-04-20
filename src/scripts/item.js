// Import functionnal library Ramda
import * as R from 'ramda'
import { Item } from '../class/Item'

export const getBest = stat => items => {
	const fakeItem = {}
	fakeItem[stat] = 0
	const best = R.reduce(
		(best, actual) => (actual[stat] > best[stat] ? actual : best),
		fakeItem,
		items
	)
	return best[stat] > 0 ? best : undefined
}

export const getWorst = stat => items => {
	return R.reduce(
		(best, actual) => (actual[stat] < best[stat] ? actual : best),
		items[0],
		items
	)
}

export const getPotions = items => R.filter(item => item.isPotion, items)

export const getItems = items => R.filter(item => !item.isPotion, items)

export const getBestItem = stat => R.compose(getBest(stat), getItems)

export const getBestPotion = R.compose(getBest('health'), getPotions)

export const addItem = () => new Item(...readline().split(' '))
