var game = new Phaser.Game(1300, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'http://i.imgur.com/Ka28eun.png');
    game.load.image('ground', 'http://i.imgur.com/vljwiva.png');
    game.load.image('star', 'http://imgur.com/IGPlaoC ');
    game.load.image('mushroom', 'http://i.imgur.com/Ka28eun.png');
	game.load.image('moln', 'http://i.imgur.com/hYt2SP7.png');
    game.load.spritesheet('dude', 'http://i.imgur.com/rCysIVB.png', 32, 48);
   

}

var player;
var platforms;
var cursors;

var stars;
var score = 0;
var scoreText;


function create() {

       game.physics.startSystem(Phaser.Physics.ARCADE);

   
    game.add.sprite(0, 0, 'sky');

 	game.add.sprite(500, 50, 'moln');
    
    var test = game.add.sprite(900, 265, 'mushroom');
   


    platforms = game.add.group();

    platforms.enableBody = true;

    
    var ground = platforms.create(0, game.world.height - 64, 'ground');


    ground.scale.setTo(4, 2);

  
    ground.body.immovable = true;


    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

   
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    
    game.physics.arcade.enable(player);


    player.body.bounce.y = 0.3;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

  
    stars = game.add.group();
	stars.enableBody = true;


    for (var i = 0; i < 20; i++)
    {
       
        var star = stars.create(i * 70, 0, 'star');

       
        star.body.gravity.y = 200;
        star.body.bounce.y = 0.3 + Math.random() * 0.5;
    }

    //  The score
    scoreText = game.add.text(16, 16, 'Morötter: 0', { fontSize: '32px', fill: '#FF8C00' });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
    
}

function update() {

    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }

}

function collectStar (player, star) {
    
    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    score += 1;
    scoreText.text = 'Samlade morötter: ' + score;

}
