let player;
let fruits = [];
const gridHeight = 400;

function setup() {
    createCanvas(600,gridHeight);
    initialize();
}

function initialize() {
    fruits = [];
    player = new Player();
    fruits.push(new Fruit());
}

function draw() {
    background(255);
    
    for(var i = fruits.length - 1; i >= 0; i--) {
        fruits[i].show();
        fruits[i].update();

        if (player.hits(fruits[i])) {
            console.log("You lose");
            initialize();
            return false;
        }
  
        if (fruits[i].outOfScreen()) {
            fruits.splice(i, 1);
            player.score ++;
        }
    }

    // display and update player's movement
    player.update();
    player.show();

    if (frameCount % 60 == 0) {
        fruits.push(new Fruit());
      }

    
  }

function keyPressed() {
    if (((keyCode === UP_ARROW) || (keyCode === 87)) && player.onBottom()) {
        player.jump();
    } 
    
    if ((keyCode === DOWN_ARROW) || (keyCode === (83))) {
        player.dodge();
    } else {
        player.unDodge();
    }
}


class Player {
    constructor() {
        this.playerHeight = 150; // toddler:50, teen:100, adult:150
        this.playerWidth = 50;
        this.y = height;
        this.x = 40;

        this.gravity = 0.98;
        this.velocity = 0;
        this.jump_height = 20;
        this.score = 0;

        this.show = function () {
            // draw player
            fill(0);
            rect(this.x, this.y, this.playerWidth, this.playerHeight);

            // draw player score
            textSize(14);
            text("SCORE: " + this.score, 20, 30);
        };

        this.update = function () {
            // update player's frame after jump or dodge
            this.velocity += this.gravity;
            this.y += this.velocity;

            if ((this.y + this.playerHeight) > height) {
                this.y = height - this.playerHeight;
                this.velocity = 0;
            }
        };

        // this.grow = function() {
        //     this.playerHeight += 50;
        // }
        this.onBottom = function () {
            return this.y == (height - this.playerHeight);
        };

        this.jump = function () {
            this.velocity -= this.jump_height;
        };

        this.dodge = function () {
            if (this.playerHeight == 150) {
                this.playerHeight = this.playerHeight / 2;
            }
        };

        this.unDodge = function () {
            if (this.playerHeight == 75) {
                this.playerHeight = 150;
            }
        };

        this.hits = function (fruit) {
            // return collideRectRect(this.x,this.y,this.r,this.r,obs.x,obs.y,obs.w,obs.h)
            return collideRectRect(this.x, this.y, this.playerWidth, this.playerHeight, fruit.x, fruit.y, fruit.size, fruit.size);
        };

    }
} 

class Fruit {
    constructor() {
        this.x = width;
        this.size = 30;
        this.y = random(200, gridHeight - this.size);
        this.speed = 6;

        this.show = function () {
            fill(0);
            rect(this.x, this.y, this.size, this.size);
        };

        this.update = function () {
            this.x -= this.speed;
        };

        this.outOfScreen = function () {
            return (this.x < -this.size ? true : false);
        };
    }
}