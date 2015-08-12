var State = {
    ALIVE: 'ALIVE',
    DEAD: 'DEAD',
    THEKILLER: 'THEKILLER'
}
function Enemy(poly, accel, player, ground) {
    MobileEntity.call(this, poly)
    
    this.accel = accel
    this.player = player
    this.ground = ground

    this.update = function () {

        //velocity update
        this.velocity = Vector2d.subtract(this.velocity, new Vector2d(0, -accel))

        this.translate(this.velocity)

        if (this.bbintersects(this.player) && this.player.invinciblec === 0) {
            this.player.lives -= 1
            this.player.invinciblec = 10
            if (this.player.lives === 0)
                return State.THEKILLER
            return State.DEAD
        }
        if (this.bbintersects(this.ground))
            return State.DEAD


        return State.ALIVE
    }

    this.clone = function () {
        return new Enemy(new Rect(new Vector2d(this.x, this.y), this.dim, this.color), this.player, this.ground)
    }
}

Enemy.prototype = Object.create(MobileEntity.prototype)
Enemy.prototype.constructor = Enemy
