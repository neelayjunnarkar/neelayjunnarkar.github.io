"use strict";

function Follower(poly, mousepos) {
    MobileEntity.call(this, poly);

    this.mouse = new Vector2d(mousepos.x, mousepos.y)
    this.logbase = Math.random() * 2 + 1.8; //randomized speeds

    this.update = function () {

        var epsilon = 10
        var squish = .6
        var ang = Math.atan2(this.mouse.y - this.y, this.mouse.x - this.x);
        if (isNaN(ang))
            ang = 0;
        var dist = Math.sqrt(Math.pow(this.mouse.y - this.y, 2) + Math.pow(this.mouse.x - this.x, 2))
        var mag = logbase(this.logbase, dist * squish);
        this.velocity.x = mag * Math.cos(ang)
        this.velocity.y = mag * Math.sin(ang);
        this.rotation = ang * 180 / Math.PI;

        
        if (Math.abs(this.x - this.mouse.x) > epsilon && !isNaN(this.velocity.x))
            this.x += this.velocity.x;
        if (Math.abs(this.y - this.mouse.y) > epsilon && !isNaN(this.velocity.y))
            this.y += this.velocity.y;
    }

    this.setMousePos = function (x, y) {
        this.mouse.x = x
        this.mouse.y = y
    }
}

Follower.prototype = Object.create(MobileEntity.prototype);
Follower.prototype.constructor = Follower;


var followers_displayed = false;

function toggleFollowersDisplayed() {
    followers_displayed = !followers_displayed;
}
function follow_init() {
    
    var canvas = document.getElementById("Followers Canvas");
    canvas.width = document.getElementById('Followers').clientWidth-48;
    canvas.height = 640;

    var stage = new createjs.Stage('Followers Canvas');

    var followers = new Array();
    for (var i = 0; i < 10; ++i) {
        var dim = randDim(40, 60)
        var pos = randPos(canvas.width, canvas.height, dim)
        var follower = new Follower(new Rect(pos, dim, randColor()), new Vector2d(0, 0))
        followers.push(follower)
        stage.addChild(follower)
    }

    createjs.Ticker.framerate = 48
    createjs.Ticker.addEventListener("tick", handleTick);
    function handleTick(event) {
        if (followers_displayed) {
            for (var i = 0; i < followers.length; ++i) {
                followers[i].update();
            }
            stage.update();
        }
    }

    stage.on('stagemousemove', function (event) {
        for (var i = 0; i < followers.length; ++i) {
            followers[i].setMousePos(event.stageX, event.stageY)
        }
    })
    stage.update();
}

var logbase = function (base, n) {
    return Math.log(n) / Math.log(base);
}

var randDim = function (min, max) {
    return new Vector2d(Math.random() * (max - min) + min, Math.random() * (max - min) + min);
}

var randPos = function (width, height, dim) {
    var xmax = width - dim.x
    var ymax = height - dim.y
    return new Vector2d(Math.random() * xmax, Math.random() * ymax);
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