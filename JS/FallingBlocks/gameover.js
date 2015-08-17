function GameOver(game, width, height) {
    this.game = game
    this.restartButton = new Entity(new Polygon([[-100, 100], [100, 0], [-100, -100]], new Vector2d(width/2, height/2), new Vector2d(100, 100), green))
    this.state = Screens.OVER
    var that = this
    this.restartButton.on('click', function (event) {
        that.state = Screens.GAME
    })
    this.display = function (stage) {
        stage.addChild(this.restartButton)
        this.state = Screens.OVER
    }
    this.hide = function (stage) {
        stage.removeChild(this.restartButton)
    }

}