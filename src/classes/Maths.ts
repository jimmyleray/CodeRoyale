import * as R from 'ramda'
import { Point } from './Point'
import { Circle } from './Circle'
import { Line } from './Line'

export class Maths {
	static splitToNumber = (str: string): number[] => str.split(' ').map(Number)

	static square = (x: number) => Math.pow(x, 2)

	static addBy = (key: string) => (a: number, b: any): number => R.add(a, b[key])

	static countBy = (key: string) => R.reduce(Maths.addBy(key), 0)

	static meanBy = (key: string) => R.converge(R.divide, [Maths.countBy(key), R.length])

	static distance = (start: Point) => (end: Point) =>
		Math.sqrt(Maths.square(start.x - end.x) + Maths.square(start.y - end.y))

	static nearestPosition = (focus: Point) => (positions: Point[]) => {
		const distOf = Maths.distance(focus)

		return R.reduce(
			(nearest, actual) => (distOf(actual) < distOf(nearest) ? actual : nearest),
			positions[0],
			positions
		)
	}

	static nearestPositionFrom = (focus: Point) => Maths.nearestPosition(focus)

	static intersectBetweenCircleAndLine = (circle: Circle, line: Line): Point[] => {
		// circle : (x - xc)** 2 + (y - yc)**2 = r**2 --- line : y = ax + b
		const [a, b, xc, yc, r] = [line.a, line.b, circle.center.x, circle.center.x, circle.radius]
		// x**2 - 2x*xc + xc**2 + y**2 - 2*y*yc + yc**2 - r**2 = 0
		// x**2 -2x*xc + xc**2 + a**2 * x**2 + 2axb + b**2 - 2*ax*yc - 2*b*yc + yc**2 - r**2 = 0
		// (1 + a**2) * x**2 + (-2*xc + 2ab - 2*a*yc) * x + xc**2 + a**2 + b**2 - 2*b*yc + yc**2 - r**2 = 0
		// AX**2 + BX + C = 0
		const A = 1 + Maths.square(a)
		const B = 2 * a * b - 2 * xc - 2 * a * yc
		const C =
			Maths.square(xc) +
			Maths.square(yc) +
			Maths.square(a) +
			Maths.square(b) -
			Maths.square(r) -
			2 * b * yc
		return Maths.trinome(A, B, C).map(x => new Point(x, a * x + b))
	}

	static trinome = (a: number, b: number, c: number): number[] => {
		const disc = Maths.square(b) - 4 * a * c
		return disc > 0
			? [(-b + Math.sqrt(disc)) / (2 * a), (-b - Math.sqrt(disc)) / (2 * a)]
			: disc === 0
				? [-b / (2 * a)]
				: []
	}
}
