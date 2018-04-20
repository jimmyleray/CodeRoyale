import { init } from './partials/init'
import { turn } from './partials/turn'
import { Site } from './specific/Site'

// First turn instructions
// Sites Array Initialization
const sites: Site[] = init()

// Infinite Game Loop
while (true) turn(sites)
