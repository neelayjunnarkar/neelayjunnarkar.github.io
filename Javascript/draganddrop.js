"use strict";

class Vector2f {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

class PlayerDD extends createjs.Shape {
    constructor(graphics, pos, dim) {
        super(graphics);
        this.x = pos.x
        this.y = pos.y
    }
    update() {

    }

}


function dragdrop_init() {
    var canvas = document.getElementById("DragDropCanvas");
    canvas.width = document.getElementById('dragdrop').clientWidth-48;
    canvas.height = document.getElementById('html').clientHeight;
    canvas.height -= document.getElementById('header').clientHeight;
    canvas.height -= document.getElementById('nav').clientHeight;
    canvas.height -= document.getElementById('title').clientHeight;
    // canvas.height -= document.getElementById('sub').clientHeight;
    canvas.height -= document.getElementById('info').clientHeight;

    var stage = new createjs.Stage('DragDropCanvas');

    var players = new Array();

    for (var i = 0; i < 10; ++i) {
        var dim = randDim(40, 60)
        var pos = randPos(canvas.width, canvas.height, dim)
        var player = new PlayerDD(new createjs.Graphics().beginFill(randColor()).drawRect(0, 0, dim.x, dim.y), pos, dim)
        players.push(player)
        stage.addChild(player)
        var offset = { x: 0, y: 0 }
        var is_set = false
        player.on('pressmove', function (event) {
            if (!is_set) {
                offset.x = event.stageX - event.currentTarget.x;
                offset.y = event.stageY - event.currentTarget.y
                is_set = true;
            }

            event.currentTarget.x = event.stageX - offset.x;
            event.currentTarget.y = event.stageY - offset.y;
            stage.update();
        })
        player.on('pressup', function (event) {
            is_set = false;
        })
    }

    stage.update();
}

var randDim = function (min, max) {
    return new Vector2f(Math.random() * (max - min) + min, Math.random() * (max - min) + min);
}

var randPos = function (width, height, dim) {
    var xmax = width - dim.x
    var ymax = height - dim.y
    return new Vector2f(Math.random() * xmax, Math.random() * ymax);
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