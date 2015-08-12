
function MobileEntity(polygon) {
    Entity.call(this, polygon);

    this.velocity = new Vector2d(0, 0);

    this.translate = function (vector) {
        this.x += vector.x
        this.y += vector.y
    }

    this.update = function () {
        this.translate(this.velocity)
    }
}

MobileEntity.prototype = Object.create(Entity.prototype);
MobileEntity.prototype.constructor = MobileEntity;
