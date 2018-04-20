import { BushOrSpawn } from '../class/BushOrSpawn'

export const isBush = item => item.isBush()

export const isSpawn = item => item.isSpawn()

export const addBushOrSpawn = () => new BushOrSpawn(...readline().split(' '))
