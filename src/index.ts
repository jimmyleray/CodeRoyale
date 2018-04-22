import { firstTurn } from './scripts/firstTurn'
import { eachTurn } from './scripts/eachTurn'
import { Site } from './classes/Site'

// First turn instructions
// Sites Array Initialization
const sites: Site[] = firstTurn()

// Infinite Game Loop
while (true) eachTurn(sites)
