var game = new Phaser.Game(window.innerWidth * 1.1, window.innerHeight * 1.1, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var background;
var balls;
var ballsNumber = 50;
var gameHasStarted = false;
var team1, team2;

function preload() {
    
    game.load.image('you', 'assets/maybeyoutoo.png');
    team1 = game.add.bitmapData(300, 300);
    team1.circle(150, 150, 150, config.team1color);
    team2 = game.add.bitmapData(300, 300);
    team2.circle(150, 150, 150, config.team2color);
    
    // SHOW FPS
    //game.time.advancedTiming = true;
    
}

function create() {
    game.stage.backgroundColor = config.backgroundColor;
    // 592986
    // FFDA00
    game.physics.startSystem(Phaser.Physics.BOX2D);
    game.physics.box2d.restitution = 0;
    game.physics.box2d.friction = 0.5;
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
    
}

function render() {
    
    //game.debug.box2dWorld();
    //game.debug.text(game.time.fps, 2, 14, "#00ff00");
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
                getRandomFloat(game.world.height * .35, game.world.height * .75), team2);
                sprite.scale.setTo(size,size)
                sprite.body.setCircle(17); // fix me
            }
            
            if (balls.children.length < ballsNumber) {
                spawnPlayerInitial(balls.children.length);
            } 
        }        
        
        function startGame() {       
            
            $('#startscreen').hide();

            balls.children[balls.children.length -2].addChild(game.make.sprite(-800, -80, 'you'));
            balls.children[balls.children.length -2].scale.setTo(.2,.2);
            
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
                
                // setTimeout(function() {
                //      game.physics.box2d.gravity.y = -200;
                //     // game.physics.box2d.gravity.x = 250;
                // },5000);
                
            },100);
            
            setTimeout(function() {
                GameOver();
            }, 5000)
        }
        
        function GameOver() {
            $('#endscreen').show();
            game.time.slowMotion = 3;
            
            for (var i = 0; i<balls.children.length; i++) {
                
                //maybeyou.png
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
                    sprite.body.velocity.x = Math.random()*-1400;
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
                }