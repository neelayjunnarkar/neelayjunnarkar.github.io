
var Screens = {
    MAIN: 'MAIN',
    GAME: 'GAME',
    OVER: 'OVER'
}

function init() {
   var canvas = document.getElementById("Canvas");
    canvas.width = document.getElementById('fallingblocks').clientWidth-48;
    canvas.height = document.getElementById('html').clientHeight;
    canvas.height -= document.getElementById('header').clientHeight;
    canvas.height -= document.getElementById('nav').clientHeight;
    canvas.height -= document.getElementById('title').clientHeight;
    // canvas.height -= document.getElementById('sub').clientHeight;
    canvas.height -= document.getElementById('info').clientHeight;

    var stage = new createjs.Stage('Canvas');

    var width = canvas.width - 30;
    var height = canvas.height - 30;

    game = new Game(width, height, stage)
    gameover = new GameOver(game, width, height)

    var state = Screens.OVER
    gameover.display(stage)

    createjs.Ticker.framerate = 45
    createjs.Ticker.on("tick", function (event) {
        if (state === Screens.GAME) {
            state = game.update(stage)
            if (state === Screens.OVER) {
                game.end();
                gameover.display(stage)
            }
        } else if (state === Screens.OVER) {
            state = gameover.state
            if (state === Screens.GAME) {
                game.start()
                gameover.hide(stage)
            }
        }

        stage.update();
    })


    stage.update();
}