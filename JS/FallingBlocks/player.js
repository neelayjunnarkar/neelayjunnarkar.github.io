
var KeyCodes = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
}

function Player(polygon, initlives, ground) {
    MobileEntity.call(this, polygon);

    this.ground = ground
    this.lives = initlives
    this.invinciblec = 0

    var currpressed = {
        UP: false,
        DOWN: false,
        LEFT: false,
        RIGHT: false
    }

    //Keyboard controls; sets bool to avoid OS key delay
    document.onkeydown = function (event) {
        if (event.keyCode === KeyCodes.UP) {
            currpressed.UP = true;
        }
        if (event.keyCode === KeyCodes.DOWN)
            currpressed.DOWN = true;
        if (event.keyCode === KeyCodes.LEFT)
            currpressed.LEFT = true;
        if (event.keyCode === KeyCodes.RIGHT)
            currpressed.RIGHT = true;
    }
    document.onkeyup = function (event) {
        if (event.keyCode === KeyCodes.UP) {
            currpressed.UP = false
        }
        if (event.keyCode === KeyCodes.DOWN)
            currpressed.DOWN = false;
        if (event.keyCode === KeyCodes.LEFT)
            currpressed.LEFT = false;
        if (event.keyCode === KeyCodes.RIGHT)
            currpressed.RIGHT = false;

    }

    this.update = function () {
        if (this.invinciblec > 0)
            --this.invinciblec

        var onground = this.bbintersects(this.ground);

        //Update velocity
        var jumpaccel = -10;
        if (currpressed.UP && onground)
            this.velocity = Vector2d.add(this.velocity, new Vector2d(0, jumpaccel))

        var groundaccel = 12
        var airaccel = .2
        if (currpressed.LEFT && onground)
            this.velocity = Vector2d.add(this.velocity, new Vector2d(-groundaccel, 0))
        if (currpressed.LEFT && !onground)
            this.velocity = Vector2d.add(this.velocity, new Vector2d(-airaccel, 0))
        if (currpressed.RIGHT && onground)
            this.velocity = Vector2d.add(this.velocity, new Vector2d(groundaccel, 0))
        if (currpressed.RIGHT && !onground)
            this.velocity = Vector2d.add(this.velocity, new Vector2d(airaccel, 0))

        var friction = function (val) {
            return val / 2; //more responsive but limits speed; accel 12
            //return .8 * Math.cbrt(val); //fluider w/ accel 3
        }
        //Friction and Gravity
        if (onground)
            this.velocity = Vector2d.subtract(this.velocity, new Vector2d(friction(this.velocity.x), 0))
        else
            this.velocity = Vector2d.subtract(this.velocity, new Vector2d(0, -.5))


        //Update position
        this.translate(this.velocity)
        
        //wraparound movement
        if (this.x - this.dim.x/2 < 0) {
            this.x = this.ground.x + this.ground.dim.x / 2 - this.dim.x / 2;
        } else if (this.x + this.dim.x / 2 > this.ground.x + this.ground.dim.x / 2) {
            this.x = 0 + this.dim.x / 2;
        }
        

        if (this.bbintersects(this.ground)) {
            this.velocity = new Vector2d(this.velocity.x, 0)
            this.y = this.ground.y - this.ground.origindisp.y - this.origindisp.y
        }

    }
}

Player.prototype = Object.create(MobileEntity.prototype);
Player.prototype.constructor = Player;