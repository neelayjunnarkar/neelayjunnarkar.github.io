
function Rect(pos, dim, color) {
    Polygon.call(this, [[-dim.x/2, dim.y/2], [dim.x/2, dim.y/2], [dim.x/2, -dim.y/2], [-dim.x/2, -dim.y/2]], pos, new Vector2d(dim.x / 2, dim.y / 2), color);
}

Rect.prototype = Object.create(Polygon.prototype)
Rect.prototype.constructor = Rect