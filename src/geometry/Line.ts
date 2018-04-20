import { Point } from '../geometry/index'

export class Line {
	public a: number
	public b: number

	constructor(public A: Point, public B: Point) {
		this.a = (B.y - A.y) / (B.x - A.x)
		this.b = A.y - this.a * A.x
	}
}
