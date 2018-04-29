import { Point } from './Point'
import { Circle } from './Circle'
import { Line } from './Line'

export class Maths {
  static splitToNumber = (str: string): number[] => str.split(' ').map(Number)

  static addBy = (key: string) => (a: number, b: any): number => a + b[key]

  static countBy = (key: string) => (array: any[]) => array.reduce(Maths.addBy(key), 0)

  static meanBy = (key: string) => (array: any[]) => Maths.countBy(key)(array) / array.length

  static distance = (start: Point) => (end: Point) => Math.hypot(start.x - end.x, start.y - end.y)

  static nearestPosition = (focus: Point) => (positions: Point[]) => {
    const distOf = Maths.distance(focus)

    return positions.reduce(
      (nearest, actual) => (distOf(actual) < distOf(nearest) ? actual : nearest),
      positions[0]
    )
  }

  static nearestPositionFrom = (focus: Point) => Maths.nearestPosition(focus)

  static intersectBetweenCircleAndLine = (circle: Circle, line: Line): Point[] => {
    const [a, b, xc, yc, r] = [line.a, line.b, circle.center.x, circle.center.x, circle.radius]
    const A = 1 + a ** 2
    const B = 2 * a * b - 2 * xc - 2 * a * yc
    const C = xc ** 2 + yc ** 2 + a ** 2 + b ** 2 - r ** 2 - 2 * b * yc
    return Maths.trinome(A, B, C).map(x => new Point(x, a * x + b))
  }

  static trinome = (a: number, b: number, c: number): number[] => {
    const disc = b ** 2 - 4 * a * c
    return disc > 0
      ? [(-b + Math.sqrt(disc)) / (2 * a), (-b - Math.sqrt(disc)) / (2 * a)]
      : disc === 0
        ? [-b / (2 * a)]
        : []
  }
}
