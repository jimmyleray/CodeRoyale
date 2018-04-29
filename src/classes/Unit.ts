import { Point } from './Point'

export class Unit {
  constructor(
    public position: Point,
    public owner: number,
    public type: number,
    public health: number
  ) {}

  isFriendly(): boolean {
    return this.owner === 0
  }

  isEnemy(): boolean {
    return this.owner === 1
  }

  isQueen(): boolean {
    return this.type === -1
  }

  isKnight(): boolean {
    return this.type === 0
  }

  isArcher(): boolean {
    return this.type === 1
  }

  isGiant(): boolean {
    return this.type === 2
  }
}
