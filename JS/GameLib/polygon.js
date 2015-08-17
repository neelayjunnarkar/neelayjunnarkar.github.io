
//origin at 0,0
//pos will translate polygon
//origindisp is displacement of origin from topleft corner of bounding box
function Polygon(vertices, pos, origindisp, color) {
    this.origin = new Vector2d(0, 0)
    this.pos = pos
    this.vertices = vertices
    this.origindisp = origindisp
    this.color = color

    var minx = vertices[0][0]
    var maxx = vertices[0][0]
    var miny = vertices[0][1]
    var maxy = vertices[0][1]

    this.g = new createjs.Graphics().beginFill(color).moveTo(vertices[0][0], vertices[0][1] )

    for (var v = 1; v < vertices.length; ++v) {

        this.g.lineTo(vertices[v][0] , vertices[v][1] )

        if (vertices[v][0] < minx)
            minx = vertices[v][0]
        if (vertices[v][0] > maxx) 
            maxx = vertices[v][0]
        if (vertices[v][1] < miny)
            miny = vertices[v][1]
        if (vertices[v][1] > maxy)
            maxy = vertices[v][1]
    }

    this.boundingbox = new Vector2d(maxx - minx, maxy - miny);

    
    this.exec = function () { return this.g }
}