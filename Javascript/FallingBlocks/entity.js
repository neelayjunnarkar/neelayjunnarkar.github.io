
function Entity(poly) {
    this.color = poly.color
    createjs.Shape.call(this,poly.exec())
    this.vertices = poly.vertices;
    this.x = poly.pos.x;
    this.y = poly.pos.y;
    this.setBounds(this.x, this.y, poly.boundingbox.x, poly.boundingbox.y)
    this.dim = poly.boundingbox
    this.origindisp = poly.origindisp; //displacement from top left corner of bounding box

    //Optimizes for not intersecting
    //Uses bounding box--will return true even if in rounded-off space
    this.bbintersects = function (entity) {
        if (this.x-this.origindisp.x > entity.x - entity.origindisp.x + entity.dim.x || this.y - this.origindisp.y > entity.y - entity.origindisp.y + entity.dim.y
            || this.x -this.origindisp.x + this.dim.x < entity.x -entity.origindisp.x|| this.y -this.origindisp.y + this.dim.y < entity.y-entity.origindisp.y) return false;
        return true;
    }

    this.bbcontains = function (point) {
        if (point.x > this.x - this.origindisp.x + this.dim.x || point.x < this.x - this.origindisp.x ||
            point.y > this.y - this.origindisp.y + this.dim.y || point.y < this.y - this.origindisp.y) return false;
        return true;
    }
}

Entity.prototype = Object.create(createjs.Shape.prototype);
Entity.prototype.constructor = Entity;