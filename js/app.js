var bgMusic = new Audio('sounds/wah.mp3');
bgMusic.loop = true;
bgMusic.play();

var splat = new Audio('sounds/collide1.mp3');

var Hero = function() {
    // start position
    this.x = 200;
    this.y = -15;
    // Movement
    this.top = function() {return this.y + 84;};
    this.right = function() {return this.x + 84;};
    this.bottom = function() {return this.y + 138;};
    this.left = function() {return this.x + 17;};
    this.sprite = 'images/char-horn-girl.png';
};

Hero.prototype.restart = function() {
    this.x = 200;
    this.y = -15;
    splat.play();
};

var Enemy = function(speed, row) {
    // eRow=Enemy Rows 
    this.eRow = [60, 140, 220, 300];
    this.x = -300;
    if (row > 2) {
        this.y = this.eRow[Math.floor(Math.random()*this.eRow.length)];
    } else {
        this.y = this.eRow[row];
    };
    this.top = function() {return this.y + 80;};
    this.right = function() {return this.x + 100;};
    this.bottom = function() {return this.y + 125;};
    this.left = function() {return this.x + 5;};
    this.sprite = 'images/enemy-bug.png';
    //Enemy Speed
    this.speed = speed;
};

Enemy.prototype.update = function(dt) {
    // multiply movement by the dt parameter ensures the game runs at the same speed for all computers.
    this.x = this.x + this.speed * dt;
    // when an enemy moves out of the field assign it different speed and line. and move it back to the left of the field.
    if(this.x > 520) {
        this.x = -60;
        this.speed = Math.round(Math.random() * 500);
        while (this.speed < 80) {
            this.speed = Math.round(Math.random() * 1200);
        }
        this.y = this.eRow[Math.floor(Math.random()*this.eRow.length)];
    };
    // collision using hero's location
    if(!(this.top() > hero.bottom() || this.left() > hero.right() || this.bottom() < hero.top() || this.right() < hero.left())) {
    hero.restart();
    };
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Hero.prototype.handleInput = function(dirInput) {
    // move hero & define game board
    switch(dirInput) {
    case 'left':
        if(this.x > 0) {this.x = this.x - 100;}
	    break;
    case 'up':
        if(this.y > 0) {this.y = this.y - 84;}
        break;
        break;
    case 'right':
        if(this.x < 400) {this.x = this.x + 100;}
        break;
    case 'down':
        if(this.bottom() < 505) {this.y = this.y + 84;}
        break;
  }
};

Hero.prototype.update = function () {};

Hero.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var allEnemies = (function (numEnemies) {
    var myArray = [];
    // create enemy objects
    for (var i = 0; i < numEnemies; i++) {
        var myVelocity = 0;
    //  random speed
        while (myVelocity < 50) {
            var myVelocity = Math.round(Math.random() * 100);
      }
        myArray.push(new Enemy(myVelocity, i));
    }
    return myArray;
//number of enemies on screen
})(8);


var hero = new Hero();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    hero.handleInput(allowedKeys[e.keyCode]);
});
