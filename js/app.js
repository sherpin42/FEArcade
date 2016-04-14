'use strict';

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = -75;
    this.y = 1;
    this.height = 70;
    this.width = 85;
    this.speed = 20;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = (this.x + this.speed * dt);

    // Checking to see if an enemy has reached the edge of the game board, and if so, resetting them to the start position

    for (var i = 0; i < 3; i++) {

        if (allEnemies[i].x > 505) {
            allEnemies[i].x = -75;
        }
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our players, this uses
    // a helper we've provided to easily load images
    this.x = 200;
    this.y = 420;
    this.height = 50;
    this.width = 85;
    // How far a user moves with each key stroke
    this.step = 30;
    this.sprite = 'images/char-cat-girl.png';
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {

    // Checking to see if the player has reached the water (player won) with a cheesy alert message to verify the winning state for the user
    if (this.y < 0) {
    	alert("You won!");
        this.reset();
    }

    // Making sure the user doesn't drop off the bottom of the board
    if (this.y > 420) {
        this.y = 420;
    }

    // Making sure the user doesn't go off the board to the left or the right
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 400) {
        this.x = 400;
    }

    // Checking to see if any collisions have taken place (player lost)

    for (var i = 0; i < 3; i++) {

        if (this.x < allEnemies[i].x + allEnemies[i].width &&
            this.x + this.width > allEnemies[i].x &&
            this.y < allEnemies[i].y + allEnemies[i].height &&
            this.height + this.y > allEnemies[i].y) {

            // Send the player back to the start position with a cheesy alert message to verify the losing state for the user
            alert("You lost");
            this.reset();
        }
    }

};

// Restarting the game by refreshing the window
Player.prototype.reset = function() {
    location.reload();
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Handle input from the user to move the player
Player.prototype.handleInput = function(keys) {

    switch (keys) {

        case "left":
            this.x = this.x - this.step;
            break;

        case "right":
            this.x = this.x + this.step;
            break;

        case "up":
            this.y = this.y - this.step;
            break;

        case "down":
            this.y = this.y + this.step;
            break;
    }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies = [];

for (var i = 0; i < 3; i++) {
    allEnemies.push(new Enemy());
    allEnemies[i].y = (i + 1) * 75;
    allEnemies[i].x = (i + 1) * -100;

    // Setting the inital speed randomly

    var testSpeed = (i + 100) * Math.random();

    // Checking to make sure the enemies are not moving too slow, and if they are, bumping them up a bit
    if (testSpeed < 50) {
        testSpeed += 45;
    }

    // Setting the final speed
    allEnemies[i].speed = testSpeed;

}

// Place the player object in a variable called player

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});