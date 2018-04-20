// Import functionnal library Ramda
import * as R from 'ramda'

export class Line {
	constructor(A, B) {
		this.a = R.divide(R.subtract(B.y, A.y), R.subtract(B.x, A.x))
		this.b = R.subtract(A.y, this.a * A.x)
	}
}
