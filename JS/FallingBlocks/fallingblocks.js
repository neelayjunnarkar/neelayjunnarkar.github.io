
var Screens = {
    MAIN: 'MAIN',
    GAME: 'GAME',
    OVER: 'OVER'
}

var fallingblocks_displayed = false;
var restart = false;
function toggleFallingBlocksDisplay() {
    fallingblocks_displayed = !fallingblocks_displayed;
    if (!fallingblocks_displayed) {
        restart = true;
        console.log('togglefbdisp')
    }
}


function fallingblocks_init() {
    var canvas = document.getElementById("Falling Blocks Canvas");
    canvas.width = document.getElementById('Falling Blocks').clientWidth - 48;
    canvas.height = 640;

    var stage = new createjs.Stage('Falling Blocks Canvas');

    var width = canvas.width - 30;
    var height = canvas.height - 30;

    game = new Game(width, height, stage)
    gameover = new GameOver(game, width, height)

    var state = Screens.OVER
    gameover.display(stage)

    createjs.Ticker.framerate = 45
    createjs.Ticker.on("tick", function (event) {
        if (restart && state === Screens.GAME) {
            game.end();
            state = Screens.OVER;
            gameover.display(stage);
            restart = false;
        } else if (restart && state === Screens.OVER) {
            restart = false;
        }
        if (fallingblocks_displayed) {
            if (state === Screens.GAME) {
                state = game.update(stage)
                if (state === Screens.OVER) {
                    game.end();
                    gameover.display(stage)
                }
            } else if (state === Screens.OVER) {
                state = gameover.state
                if (state === Screens.GAME) {
                    console.log('hi')
                    game.start()
                    gameover.hide(stage)
                }
            }

        }
        stage.update();
    })


    stage.update();
}