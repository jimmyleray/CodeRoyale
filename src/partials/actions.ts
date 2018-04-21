import { Site } from '../specific/Site'

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

export const TRAIN = (trainList: Site[]) => {
	const list = trainList.map(site => site.id.toString()).join(' ')
	print(list.length > 0 ? `TRAIN ${list}` : 'TRAIN')
}
