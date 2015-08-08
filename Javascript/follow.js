"use strict";

class Vector2f {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

class PlayerF extends createjs.Shape {
    constructor(graphics, velocity, pos, dim) {
        super(graphics);
        this.velocity = velocity;
        this.x = pos.x
        this.y = pos.y
        this.mouse = new Vector2f(pos.x, pos.y)
        this.setBounds(pos.x, pos.y, dim.x, dim.y)
        this.regX = dim.x / 2
        this.regY = dim.y / 2
        this.logbase = Math.random()*2 + 1.8; //randomized speeds
        
    }
    update() {
        //follow code
        
        var epsilon = 10
        var squish = .6
        var ang = Math.atan2(this.mouse.y - this.y, this.mouse.x - this.x);
        var dist = Math.sqrt(Math.pow(this.mouse.y - this.y, 2) + Math.pow(this.mouse.x - this.x, 2))
        var mag = logbase(this.logbase, dist*squish);
        this.velocity.x = mag * Math.cos(ang)
        this.velocity.y = mag * Math.sin(ang);
        this.rotation = ang * 180 / Math.PI;

        if (Math.abs(this.x - this.mouse.x) > epsilon)
            this.x += this.velocity.x;
        if (Math.abs(this.y - this.mouse.y) > epsilon)
            this.y += this.velocity.y;
           
    }
    setMousePos(x, y) {
        this.mouse.x = x
        
        this.mouse.y = y
    }
}


function follow_init() {
    
    var canvas = document.getElementById("FollowCanvas");
    canvas.width = document.getElementById('followers').clientWidth-48;
    canvas.height = document.getElementById('html').clientHeight;
    canvas.height -= document.getElementById('header').clientHeight;
    canvas.height -= document.getElementById('nav').clientHeight;
    canvas.height -= document.getElementById('title').clientHeight;
    // canvas.height -= document.getElementById('sub').clientHeight;
    canvas.height -= document.getElementById('info').clientHeight;

    var stage = new createjs.Stage('FollowCanvas');

    var players = new Array();
    for (var i = 0; i < 10; ++i) {
        var dim = randDim(40, 60)
        var pos = randPos(canvas.width, canvas.height, dim)
        var player = new PlayerF(new createjs.Graphics().beginFill(randColor()).drawRect(0, 0, dim.x, dim.y), new Vector2f(0, 0), pos, dim)
        players.push(player)
        stage.addChild(player)
    }

    createjs.Ticker.framerate = 48
    createjs.Ticker.addEventListener("tick", handleTick);
    function handleTick(event) {
        for (var i = 0; i < players.length; ++i) {
            players[i].update();
        }
        stage.update();
    }

    stage.on('stagemousemove', function (event) {
        for (var i = 0; i < players.length; ++i) {
            players[i].setMousePos(event.stageX, event.stageY)
        }
    })
    stage.update();
}

var logbase = function (base, n) {
    return Math.log(n) / Math.log(base);
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