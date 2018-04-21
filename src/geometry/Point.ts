import { meanBy } from '../specific/utils'

export class Point {
	constructor(public x: number, public y: number) {}

	static massCenter(points: Point[]): Point {
		return new Point(meanBy('x')(points), meanBy('y')(points))
	}
}
