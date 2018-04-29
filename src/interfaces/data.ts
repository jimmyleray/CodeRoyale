import { Site } from '../classes/Site'
import { Unit } from '../classes/Unit'

export interface Data {
  sites: Site[]
  units: Unit[]
  touchedSite: number
  gold: number
}
