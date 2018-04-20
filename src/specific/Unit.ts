import { Point } from '../geometry/index'

export class Unit {
	constructor(
		public position: Point,
		public owner: number,
		public type: number,
		public health: number
	) {}
}
