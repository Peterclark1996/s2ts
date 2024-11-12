type Vector = {
    x: number
    y: number
    z: number
}
const Vector = (x: number, y: number, z: number): Vector => ({ x, y, z })
Vector.zero = { x: 0, y: 0, z: 0 }
Vector.format = (vector: Vector) => `${vector.x} ${vector.y} ${vector.z}`
Vector.add = (a: Vector, b: Vector): Vector => Vector(a.x + b.x, a.y + b.y, a.z + b.z)

export { Vector }
