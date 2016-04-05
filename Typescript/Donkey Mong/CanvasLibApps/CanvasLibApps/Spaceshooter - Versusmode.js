var x = 20;
var y = 200;
var dy = 5;
var dx = 5;
var holdSpace;
var gameOver = false;
var Score = 0;
var bulletCounter = 0;
var shotsPerHit = 0;
var resSum = canvas.height;
var resDividedbySpeed = canvas.height / dy;
var resFix = 0;
var Collision = false;
var numOfEnemies = 5;
var menuGone = false;
var preferenceMenu = false;
var moveUp = keyboard.up;
var moveDown = keyboard.down;
//Calculates the correct value rocketStopTop needs to be compatible with the speed of the rocket. 
for (i = 0; i < resDividedbySpeed; i++) {
    resSum -= dy;
    if (resSum == 0) {
        break;
    }
    else if (resSum < 5 && resSum > 0) {
        resFix = resSum;
        break;
    }
}
var rocketStopTop = canvas.height - (canvas.height - 110);
var rocketStopBottom = canvas.height - 60 - resFix;
var Player = (function () {
    function Player() {
        this.x = x;
        this.y = y;
        this.width = 70;
        this.height = 60;
    }
    Player.prototype.update = function () {
        image("rocket.png", x, y, this.width, this.height);
        this.hb = new Hitbox(x + 30, y + 20, 40, 20);
        this.hb2 = new Hitbox(x, y, 30, 60);
        this.hb.drawOutline("red");
        this.hb2.drawOutline("green");
    };
    return Player;
})();
var Enemy = (function () {
    function Enemy() {
        this.x = canvas.width;
        this.y = Math.floor(Math.random() * (canvas.height - 300)) + 205;
        this.speed = 2 + random(4);
        this.size = 8 + random(20);
        this.hb = new Hitbox(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
    }
    Enemy.prototype.update = function () {
        this.x -= this.speed;
        circle(this.x, this.y, this.size, "black");
        this.hb = new Hitbox(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
        this.hb.drawOutline("red");
    };
    return Enemy;
})();
var Lazor = (function () {
    function Lazor() {
        this.bulletX = x + 10;
        this.bulletY = y + 24;
        this.hitboxX = x + 52;
        this.hitboxY = y + 30;
        this.speed = 7;
        this.size = 3;
        this.hb = new Hitbox(this.bulletX, this.bulletY, 45, 12);
    }
    Lazor.prototype.update = function () {
        this.bulletX += this.speed;
        this.hb = new Hitbox(this.bulletX, this.bulletY, 45, 12);
        this.hb.drawOutline("blue");
        image("bullet.png", this.bulletX, this.bulletY, 45, 12);
    };
    return Lazor;
})();
var enemies = [];
var bullets = [];
var Rocket = new Player();
for (var i = 0; i < numOfEnemies; i++) {
    var e = new Enemy();
    enemies.push(e);
}
update = function () {
    clear();
    if (menuGone == true) {
        text("Score: " + Score, 20, 30, 30, "black");
        text("|", 200, 35, 50, "black");
        text("Amount of shots fired: " + bulletCounter, 245, 30, 30, "black");
        if (Score == numOfEnemies) {
            text("You Win!", (canvas.width / 2) - 200, 200, 80, "green");
        }
        if (gameOver == true) {
            text("Game over", (canvas.width / 2) - 200, 200, 80, "red");
            if (bulletCounter == 0) {
                text("You didn't fire any shots :(", 20, 70, 30, "black");
            }
            else {
                shotsPerHit = (Score / bulletCounter) * 100;
                text("You hit " + shotsPerHit + "% of the shots you fired!", 20, 70, 30, "black");
            }
            text("Press F5 to play again", 20, 110, 30, "black");
        }
        //Endgame text.
        if (enemies.length == 0) {
            if (bulletCounter == 0) {
                text("You didn't fire any shots :(", 20, 70, 30, "black");
            }
            else {
                shotsPerHit = (Score / bulletCounter) * 100;
                text("You hit " + shotsPerHit + "% of the shots you fired!", 20, 70, 30, "black");
            }
            text("Press F5 to play again", 20, 110, 30, "black");
        }
        if (Collision == false) {
            Rocket.update();
        }
        //Kollar efter kollision mellan fiende och spelare, om sant kör gameOver.
        for (i = 0; i < enemies.length; i++) {
            if ((enemies[i].hb.collidesWith(Rocket.hb)) || (enemies[i].hb.collidesWith(Rocket.hb2))) {
                gameOver = true;
                enemies.splice(i, 1);
                Collision = true;
            }
        }
        //Styr rörelse av spelare
        if (gameOver == false) {
            //Förhindrar att raketen far ovanför skärmen
            if (keyboard.up) {
                if (y == rocketStopTop) {
                }
                else {
                    y -= dy;
                }
            }
            //Förhindrar att raketen far nedanför skärmen
            if (keyboard.down) {
                if (y == rocketStopBottom) {
                }
                else {
                    y += dy;
                }
            }
            //X-Axis movement
            //if (keyboard.left) {
            //    x -= dy;
            //}
            //if (keyboard.right) {
            //    x += dy;
            //}
            //Stoppar input av space om den hålls ned
            if (keyboard.space == false) {
                holdSpace = false;
            }
            //Avfyrar endast ett skott när space trycks ned
            if (keyboard.space) {
                if (holdSpace == false) {
                    bullets.push(new Lazor());
                    bulletCounter += 1;
                    holdSpace = true;
                }
            }
        }
        //Tar bort skott&fiender när dom träffar varandra.
        for (var i = 0; i < enemies.length; i++) {
            for (var j = 0; j < bullets.length; j++) {
                if (bullets[j].hb.collidesWith(enemies[i].hb)) {
                    bullets.splice(j, 1);
                    enemies.splice(i, 1);
                    Score += 1;
                }
            }
        }
        //Tar bort skott när dom far utanför skärmen.
        for (var i = bullets.length - 1; i >= 0; i--) {
            if (bullets[i].hitboxX > canvas.width + 50) {
                bullets.splice(i, 1);
            }
            else {
                bullets[i].update();
            }
        }
        console.log(bullets.length);
        //Tar bort fiender när de far utanför skärmen. 
        for (var i = 0; i < enemies.length; i++) {
            if (enemies[i].x < canvas.width - canvas.width - 50) {
                enemies.splice(i, 1);
                gameOver = true;
            }
            else {
                enemies[i].update();
            }
        }
    }
    else {
        if (preferenceMenu == false) {
            text("Spelets namn", (canvas.width / 2) - 270, 200, 80, "yellow");
            text("Tryck enter för att börja spela", (canvas.width / 2) - 265, 300, 30, "black");
            text("Tryck P för att ändra inställningar", (canvas.width / 2) - 268, 400, 27);
            if (keyboard.enter) {
                menuGone = true;
            }
            if (keyboard.p) {
                preferenceMenu = true;
            }
        }
        else {
            text("Raketens kontroller: ", 0, 40, 40, "black");
            text("Åka upp: ", 0, 80, 30, "black");
            text("Åka ner: ", 0, 120, 30, "black");
            text("Skjuta: ", 0, 160, 30, "black");
        }
    }
};
//# sourceMappingURL=Spaceshooter - Versusmode.js.map