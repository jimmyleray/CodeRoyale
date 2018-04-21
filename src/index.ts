import { init } from './scripts/init'
import { turn } from './scripts/turn'
import { Site } from './classes/Site'

// First turn instructions
// Sites Array Initialization
const sites: Site[] = init()

// Infinite Game Loop
while (true) turn(sites)
