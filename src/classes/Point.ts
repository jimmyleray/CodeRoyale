import { Maths } from './Maths'

export class Point {
  constructor(public x: number, public y: number) {}

  static massCenter(points: Point[]): Point {
    return new Point(Maths.meanBy('x')(points), Maths.meanBy('y')(points))
  }
}
