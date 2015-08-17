
//maxgenpt = maximum enemies created per turn. Creates variation
function EnemyMaster(n_enemies, maxgenpt, player, ground) {
    this.n_cap = n_enemies
    this.gen_cap = maxgenpt

    this.entities = []
    this.player = player
    this.ground = ground

    this.killerpos = new Vector2d(0, 0)
    this.killerdim = new Vector2d(0,0)

    this.update = function (stage) {

        for (var i = this.entities.length-1; i >= 0; --i) {
            var state = this.entities[i].update();
            if (state === State.DEAD) {
                stage.removeChild(this.entities[i])
                this.entities.splice(i, 1)
            } else if (state === State.THEKILLER) {
                this.killerpos = new Vector2d(this.entities[i].x, this.entities[i].y)
                this.killerdim = new Vector2d(this.entities[i].dim.x, this.entities[i].dim.y)
                stage.removeChild(this.entities[i])
                this.entities.splice(i,1)
            }
        }

        var n_gend = 0
        while (this.entities.length < this.n_cap && n_gend <= this.gen_cap) {
            var dim = randDim(16, 64)
            var pos = randPos(ground.dim.x, 60, dim)
            this.entities.push(new Enemy(new Rect(pos, dim, randColor()), randAccel(.1, .4), this.player, this.ground))
            stage.addChild(this.entities[this.entities.length-1])
            ++n_gend
        }
    }

    this.removeAll = function (stage) {
        for (var i = this.entities.length - 1; i >= 0; --i) {
            stage.removeChild(this.entities[i])
            this.entities.splice(i, 1)
        }
    }
}

var randDim = function (min, max) {
    return new Vector2d(Math.random() * (max - min) + min, Math.random() * (max - min) + min);
}

var randPos = function (width, height, dim) {
    return new Vector2d(Math.random()*width, Math.random()*height)
}

//various blues
var colors = ['#005F6B', '#008C9E', '#00B4CC', '#00DFFC',
    '#0E3E66', '#187891', '#56AFCD',
    '#0696DD', '#61BDEE',
    '#09A0A3', '#08486C', '#304E63'
]
var added = 1 / colors.length;
var randColor = function () {
        
    var rand = Math.random();
    for (var i = added; i <= 1; i += added) {
        if (rand < i) {
            return colors[Math.round(i /added) - 1];
        }
    }
}

var randAccel = function (min, max) {
    return Math.random()*(max-min) + min
}