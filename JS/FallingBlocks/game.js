var green = '#BEF202'
var red = '#F03C02'
function Game(width, height, stage) {
    this.ground = new Entity(new Rect(new Vector2d(width / 2  + 15 , height), new Vector2d(width, 30), 'DeepSkyBlue'))

    this.player = new Player(new Rect(new Vector2d(width / 2, height/2), new Vector2d(24, 24), green), 5, this.ground)
    this.enemymaster = new EnemyMaster(5/152*width, 1, this.player, this.ground)
    
    this.killer = null //enemy that kills player
    stage.addChild(this.player);
    stage.addChild(this.ground);

    this.textlives = new createjs.Text('Lives: ' + this.player.lives, '20px Calibri', red)
    this.textlives.x = 20
    this.textlives.y = 20
    this.textlives.textBaseline = 'alphabetic'
    stage.addChild(this.textlives)

    this.initms = Date.now()
    this.textscore = new createjs.Text('Score: ' + '0', '20px Calibri', red)
    this.textscore.x = 20
    this.textscore.y = 40
    this.textscore.textBaseline = 'alphabetic'
    stage.addChild(this.textscore)

    this.highscore = 0
    this.texthighscore = new createjs.Text('HighScore: '+this.highscore, '20px Calibri', red)
    this.texthighscore.x = 20
    this.texthighscore.y = 60
    this.texthighscore.textBaseline = 'alphabetic'
    stage.addChild(this.texthighscore)
    
    var prevlives = this.player.lives
    this.update = function (stage) {
        this.enemymaster.update(stage)
        this.player.update();

        if (prevlives !== this.player.lives) 
            this.textlives.text = 'Lives: '+this.player.lives
            
        var currscore = Date.now()-this.initms
        this.textscore.text = 'Score: '+(currscore)
        
        if (currscore > this.highscore) {
            this.highscore = currscore
            this.texthighscore.text = 'HighScore: '+this.highscore;            
        }
            
        if (this.player.lives <= 0)
            return Screens.OVER
        
        return Screens.GAME
    }

    this.end = function () {
        var kpos = this.enemymaster.killerpos
        var kdim = this.enemymaster.killerdim
        this.killer = new Entity(new Rect(kpos, kdim, red)) 
        stage.addChild(this.killer)
        this.enemymaster.removeAll(stage)
    }
    this.start = function () {
        stage.removeChild(this.player)
        stage.removeChild(this.killer)
        this.player.x = width / 2
        this.player.y = height / 2
        this.player.lives = 5
        this.player.velocity = new Vector2d(0, 0)
        this.textlives.text = 'Lives: ' + this.player.lives
        this.initms = Date.now()

        stage.addChild(this.player)
        stage.addChild(this.ground)
    }
}
