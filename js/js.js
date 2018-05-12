$(document).ready(loadDoc());

function loadDoc() {
    const socket = io('https://myteamforcebot.herokuapp.com');
        socket.on('join', (user) => {
            console.log(user);
            spawnPlayerSingle(1);
        });
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {

        }
    };
    xhttp.open("GET", "https://myteamforcebot.herokuapp.com/", true);
    xhttp.send();
}

var game = new Phaser.Game(window.innerWidth * 1.2, window.innerHeight * 1.2, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var background;
var balls;
var ballsNumber = 80;

function preload() {
    
    game.load.image('team1', 'assets/team1.png');
    game.load.image('team2', 'assets/team2.png');

    // SHOW FPS
    game.time.advancedTiming = true;

}



function create() {
    game.stage.backgroundColor = "#05081b";
    game.physics.startSystem(Phaser.Physics.BOX2D);
    game.physics.box2d.restitution = 0;
    game.physics.box2d.friction = 2;
    game.world.setBounds(window.innerWidth * .1, window.innerHeight * .1,window.innerWidth * 1.2,window.innerHeight * 1.2);
    console.log(game.world.bounds)
    game.physics.box2d.setBoundsToWorld();

    balls = game.add.group();
    balls.enableBody = true;
    balls.physicsBodyType = Phaser.Physics.BOX2D;

    spawnPlayerInitial(0);

}

function update() {

    //ship.body.setZeroVelocity();

    key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    key1.onDown.add(spawnPlayerSingle);

    key2 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    key2.onDown.add(spawnPlayerSingle);

}

function render() {

    //game.debug.box2dWorld();
    game.debug.text(game.time.fps, 2, 14, "#00ff00");
}

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function spawnPlayerInitial (playerCount) {
    var size = getRandomFloat(.1,.2);
    var sprite;

    if (playerCount % 2 == 0) {
        sprite = balls.create(
            getRandomFloat(game.world.width * .9, game.world.width * 1),
            getRandomFloat(game.world.height * .3, game.world.height * .7),
            'team1');
        sprite.scale.setTo(size,size)
        sprite.body.setCircle(20); // fix me
    } else {
        sprite = balls.create(
            getRandomFloat(0, game.world.width * .1),
            getRandomFloat(game.world.height * .3, game.world.height * .7), 'team2');
        sprite.scale.setTo(size,size)
        sprite.body.setCircle(17); // fix me
    }

    if (balls.children.length < ballsNumber) {
        //setTimeout(function() {
        spawnPlayerInitial(balls.children.length);
        // },1);
    } else {
        setTimeout(function() {
            for (var i = 0; i < balls.children.length; i++) {
                if ( i % 2 == 0) {
                    balls.children[i].body.velocity.x = Math.random()*-1000;
                } else {
                    // balls.children[i].body.velocity.x = Math.random()*1000;
                    balls.children[i].body.velocity.x = 500;
                }
            }
            spawnPlayerSingle(1)
        },1000);

    }
}

function spawnPlayerSingle (team) {
    var size = getRandomFloat(.1,.2);
    var sprite;

    if (team % 2 == 0) {
        sprite = balls.create(
            getRandomFloat(game.world.width * .85, game.world.width * .95),
            getRandomFloat(game.world.height * .3, game.world.height * .7),
            'team1');
        sprite.scale.setTo(size,size)
        sprite.body.setCircle(20); // fix me
        sprite.body.velocity.x = Math.random()*-1000;
    } else {
        sprite = balls.create(
            getRandomFloat(game.world.width * .05, game.world.width * .15),
            getRandomFloat(game.world.height * .3, game.world.height * .7), 'team2');
        sprite.scale.setTo(size,size)
        sprite.body.setCircle(17); // fix me
        sprite.body.velocity.x = 500;
    }

    if (balls.children.length < ballsNumber * 1.8) {
        setTimeout(function() {
            if (team % 2 == 0) {
                spawnPlayerSingle(1);
            } else {
                spawnPlayerSingle(2);
            }
        },50);
    }
}