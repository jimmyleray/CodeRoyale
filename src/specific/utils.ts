import * as R from 'ramda'
import { Point } from '../geometry/Point'
import { Circle } from '../geometry/Circle'
import { Line } from '../geometry/Line'

export const splitToNumber = (str: string): number[] => str.split(' ').map(Number)

export const square = (x: number) => Math.pow(x, 2)

export const addBy = (key: string) => (a: number, b: any): number => R.add(a, b[key])

export const countBy = (key: string) => R.reduce(addBy(key), 0)

export const meanBy = (key: string) => R.converge(R.divide, [countBy(key), R.length])

export const distance = (start: Point) => (end: Point) =>
	Math.sqrt(square(start.x - end.x) + square(start.y - end.y))

export const nearestPosition = (focus: Point) => (positions: Point[]) => {
	const distOf = distance(focus)

	return R.reduce(
		(nearest, actual) => (distOf(actual) < distOf(nearest) ? actual : nearest),
		positions[0],
		positions
	)
}

export const nearestPositionFrom = (focus: Point) => nearestPosition(focus)

export const intersectBetweenCircleAndLine = (circle: Circle, line: Line): Point[] => {
	// circle : (x - xc)** 2 + (y - yc)**2 = r**2 --- line : y = ax + b
	const [a, b, xc, yc, r] = [line.a, line.b, circle.center.x, circle.center.x, circle.radius]
	// x**2 - 2x*xc + xc**2 + y**2 - 2*y*yc + yc**2 - r**2 = 0
	// x**2 -2x*xc + xc**2 + a**2 * x**2 + 2axb + b**2 - 2*ax*yc - 2*b*yc + yc**2 - r**2 = 0
	// (1 + a**2) * x**2 + (-2*xc + 2ab - 2*a*yc) * x + xc**2 + a**2 + b**2 - 2*b*yc + yc**2 - r**2 = 0
	// AX**2 + BX + C = 0
	const A = 1 + square(a)
	const B = 2 * a * b - 2 * xc - 2 * a * yc
	const C = square(xc) + square(yc) + square(a) + square(b) - square(r) - 2 * b * yc
	return trinome(A, B, C).map(x => new Point(x, a * x + b))
}

export const trinome = (a: number, b: number, c: number): number[] => {
	const disc = square(b) - 4 * a * c
	return disc > 0
		? [(-b + Math.sqrt(disc)) / (2 * a), (-b - Math.sqrt(disc)) / (2 * a)]
		: disc === 0
			? [-b / (2 * a)]
			: []
}
