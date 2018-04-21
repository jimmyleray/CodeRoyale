import { Point } from '../geometry/Point'

export class Unit {
	constructor(
		public position: Point,
		public owner: number,
		public type: number,
		public health: number
	) {}
}
