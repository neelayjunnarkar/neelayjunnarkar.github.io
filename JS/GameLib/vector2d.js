
function Vector2d(x, y) {
    this.x = x
    this.y = y

    this.magnitude = function () {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
    }

    this.normalize = function () {
        var r = this.magnitude();
        this.x /= r
        this.y /= r
    }

    this.normal = function () {
        return new Vector2d(-this.y, this.x)
    }

    this.scale = function (scalar) {
        this.x *= scalar
        this.y *= scalar
    }

    this.project_onto = function (vector) {
        if (vector.magnitude() === 0.0) return vector.clone();
        var c = dot(this, vector) / dot(vector, vector)
        var projection = vector.clone();
        return projection.scale(c);
    }

    this.rejection_off = function (vector) {
        return subtract(this, this.project_onto(vector))
    }

    this.clone = function () {
        return new Vector2d(this.x, this.y)
    }
}

Vector2d.add = function (v1, v2) {
    return new Vector2d(v1.x + v2.x, v1.y + v2.y);
}

Vector2d.subtract = function (v1, v2) {
    return new Vector2d(v1.x - v2.x, v1.y - v2.y);
}

Vector2d.dot = function (v1, v2) {
    return v1.x * v2.x + v1.y * v2.y
}
