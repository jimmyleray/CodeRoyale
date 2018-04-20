// Import functionnal library Ramda
import * as R from 'ramda'

export const square = x => Math.pow(x, 2)

export const addBy = key => (a, b) => R.add(a, b[key])

export const countBy = key => R.reduce(addBy(key), 0)

export const meanBy = key => R.converge(R.divide, [countBy(key), R.length])

export const massCenter = R.converge((x, y) => ({ x, y }), [
	meanBy('x'),
	meanBy('y')
])

export const distance = start => end =>
	Math.sqrt(square(start.x - end.x) + square(start.y - end.y))

export const nearestPosition = focus => positions => {
	const distOf = distance(focus)

	return R.reduce(
		(nearest, actual) => (distOf(actual) < distOf(nearest) ? actual : nearest),
		positions[0],
		positions
	)
}

export const nearestPositionFrom = focus => nearestPosition(focus)

export const intersectBetweenCircleAndLine = (circle, line) => {
	// circle : (x - xc)** 2 + (y - yc)**2 = r**2
	// line : y = ax + b
	const a = line.a
	const b = line.b
	const xc = circle.center.x
	const yc = circle.center.y
	const r = circle.radius
	// x**2 - 2x*xc + xc**2 + y**2 - 2*y*yc + yc**2 - r**2 = 0
	// x**2 -2x*xc + xc**2 + a**2 * x**2 + 2axb + b**2 - 2*ax*yc - 2*b*yc + yc**2 - r**2 = 0
	// (1 + a**2) * x**2 + (-2*xc + 2ab - 2*a*yc) * x + xc**2 + a**2 + b**2 - 2*b*yc + yc**2 - r**2 = 0
	// AX**2 + BX + C = 0
	const A = 1 + square(a)
	const B = 2 * a * b - 2 * xc - 2 * a * yc
	const C =
		square(xc) + square(yc) + square(a) + square(b) - square(r) - 2 * b * yc
	const D = square(B) - 4 * A * C
	const x1 = R.divide(-B + Math.sqrt(D), 2 * A)
	const x2 = R.divide(-B - Math.sqrt(D), 2 * A)
	const y1 = a * x1 + b
	const y2 = a * x2 + b
	return [{ x: x1, y: y1 }, { x: x2, y: y2 }]
}
