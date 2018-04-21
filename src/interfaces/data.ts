import { Site } from '../specific/Site'
import { Unit } from '../specific/Unit'

export interface Data {
	sites: Site[]
	units: Unit[]
	touchedSite: number
	gold: number
	myQueen: Unit
	enemyQueen: Unit
}
