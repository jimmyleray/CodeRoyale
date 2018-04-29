import { Site } from '../classes/Site'

declare const print: (res: string) => void

export const WAIT = () => {
  print('WAIT')
}

export const BUILD = (siteID: number, buildType: string) => {
  print(`BUILD ${siteID} ${buildType}`)
}

export const MOVE = (x: number, y: number) => {
  print(`MOVE ${Math.round(x)} ${Math.round(y)}`)
}

export const TRAIN = (list: Site[]) => {
  print(`TRAIN ${list.map(site => site.id).join(' ')}`.trim())
}
