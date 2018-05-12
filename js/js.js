import "js/phaser";
$(document).ready(loadDoc());

function loadDoc() {
    const socket = io('https://myteamforcebot.herokuapp.com');
        socket.on('join', (user) => {
            console.log(user);
            spawnPlayerSingle(1);
            switch (user.team) {
                case 'Bulgaria':
                    UpdateBulgariaAvatar(user.avatar);
                    break;
                case 'Spain':
                    UpdateSpainAvatar();
                    break;
            }
        });
    /*var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {

        }
    };
    xhttp.open("GET", "https://myteamforcebot.herokuapp.com/", true);
<<<<<<< HEAD
    xhttp.send();*/
}


function UpdateBulgariaAvatar (userAvatarUrl) {
    console.log(userAvatarUrl);
    $('#team1').css("background-image", `url(${userAvatarUrl})`);
}

function UpdateSpainAvatar () {
    $('team2').css("background-image", userAvatarUrl);
=======
    xhttp.send();
}

var game = new Phaser.Game(window.innerWidth * 1.1, window.innerHeight * 1.1, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var background;
var balls;
var ballsNumber = 80;
var gameHasStarted = false;
var team1, team2;

function preload() {
    
    // game.load.image('team1', 'assets/team1.png');
    // game.load.image('team2', 'assets/team2.png');

    // var bmd = game.add.bitmapData(128,128);
    // // draw to the canvas context like normal
    // bmd.ctx.beginPath();
    // bmd.ctx.rect(0,0,128,128);
    // bmd.ctx.fillStyle = '#ff0000';
    // bmd.ctx.fill();

    team1 = game.add.bitmapData(300, 300);
    team1.circle(150, 150, 150, config.team1color);
    team2 = game.add.bitmapData(300, 300);
    team2.circle(150, 150, 150, config.team2color);

    // SHOW FPS
    game.time.advancedTiming = true;

}

function create() {
    game.stage.backgroundColor = config.backgroundColor;
    // 592986
    // FFDA00
    game.physics.startSystem(Phaser.Physics.BOX2D);
    game.physics.box2d.restitution = 0;
    game.physics.box2d.friction = 2;
    game.world.setBounds(window.innerWidth * .05, window.innerHeight * .05,window.innerWidth * 1.1,window.innerHeight * 1.1);
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

    console.log(balls.children[1].body.velocity.x)
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
            team1);
        sprite.scale.setTo(size,size)
        sprite.body.setCircle(20); // fix me
    } else {
        sprite = balls.create(
            getRandomFloat(0, game.world.width * .1),
            getRandomFloat(game.world.height * .3, game.world.height * .7), team2);
        sprite.scale.setTo(size,size)
        sprite.body.setCircle(17); // fix me
    }

    if (balls.children.length < ballsNumber) {
        spawnPlayerInitial(balls.children.length);
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
            gameHasStarted = true;
        },1000);

    }
}

function spawnPlayerSingle (team) {
    var size = getRandomFloat(.1,.2);
    var sprite;

    if (team % 2 == 0) {
        sprite = balls.create(
            getRandomFloat(game.world.width * .9, game.world.width * 1),
            getRandomFloat(game.world.height * .3, game.world.height * .7),
            team1);
        sprite.scale.setTo(size,size)
        sprite.body.setCircle(20); // fix me
        sprite.body.velocity.x = Math.random()*-1000;
    } else {
        sprite = balls.create(
            getRandomFloat(0, game.world.width * .1),
            getRandomFloat(game.world.height * .3, game.world.height * .7), team2);
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
>>>>>>> 6114a590b5dc24b733d4e45fa437ec18880cff0a
}