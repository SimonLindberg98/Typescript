//Donkey Mong (totally not ripoff)
var x = 50;
var y = canvas.height - 60;
var orgCharSpeed = 4;
var altCharSpeed = 4;
var speedMultiplier = 1.002;
var brakeMultiplier = 1.03;
var leftOngoingMove;
var rightOngoingMove;
var right = false;
var left = false;
var spriteLeft = 0;
var spriteRight = 1;
var spacePress = false;
var altJumpHeight = 40;
var orgJumpHeight = 40;
var jumpUpDecrease = 0.6;
var jumpDownIncrease = 1.5;
var inAir;
var jump = false;
var falling = false;
var upCounter = 0;
var downCounter = 0;
var Player = (function () {
    function Player() {
    }
    return Player;
})();
var charMoveLeft = new Spritesheet("sick-spritesheet - leftv2.png", 39.7, 40);
var charMoveRight = new Spritesheet("sick-spritesheet - right.png", 38, 40);
var moveLeft = new Animation(charMoveLeft, 8, 0, 7);
var moveRight = new Animation(charMoveRight, 8, 0, 7);
update = function () {
    clear();
    rectangle(0, canvas.height - 20, canvas.width, 20, "black");
    var n = altCharSpeed.toString();
    var o = right.toString();
    var p = left.toString();
    var q = altJumpHeight.toString();
    var r = jumpUpDecrease.toString();
    text("CharSpeed: " + n, 0, 30, 40, "black");
    text("right: " + o, 0, 70, 40);
    text("left: " + p, 0, 110, 40);
    text("holdSpace = " + spacePress, 0, 150, 40);
    text("jumpHeight: " + q, 0, 190, 40);
    text("jumpMultiplier: " + r, 0, 230, 40);
    text("Jump: " + jump, 0, 280, 40);
    text("Y:" + y, 0, 330, 40);
    text("# of cycles going up: " + upCounter, 0, 380, 40);
    text("# of cycles going down: " + downCounter, 0, 430, 40);
    //Movement of character
    if (spriteLeft == 1) {
        moveLeft.drawFrame(x, y);
    }
    else if (spriteRight == 1) {
        moveRight.drawFrame(x, y);
    }
    if (y >= canvas.height - 60) {
        jump = false;
    }
    if (keyboard.space == false) {
        spacePress = false;
    }
    if (spacePress == false) {
        if (keyboard.space) {
            jump = true;
        }
    }
    if (jump == true) {
        if (falling == false) {
            if (altJumpHeight > 0) {
                y -= altJumpHeight;
                upCounter++;
                altJumpHeight = altJumpHeight * jumpUpDecrease;
            }
        }
        if (altJumpHeight <= 0.01) {
            falling = true;
        }
        if (falling == true) {
            //jumpHeight = 0.01;
            y += altJumpHeight;
            downCounter++;
            //moveRight.updateFrame();
            altJumpHeight = altJumpHeight * jumpDownIncrease;
        }
        if (y >= (canvas.height - 60)) {
            jump = false;
            falling = false;
            altJumpHeight = orgJumpHeight;
            y = (canvas.height - 60);
        }
    }
    if (keyboard.right || keyboard.left || keyboard.up || keyboard.down) {
        if (x > canvas.width - 40) {
        }
        else {
            if (keyboard.right) {
                x += altCharSpeed;
                altCharSpeed = altCharSpeed * speedMultiplier;
                moveRight.updateFrame();
                left = false;
                right = true;
                spriteLeft = 0;
                spriteRight = 1;
            }
        }
        if (x > 0) {
            if (keyboard.left) {
                x -= altCharSpeed;
                altCharSpeed = altCharSpeed * speedMultiplier;
                moveLeft.updateFrame();
                right = false;
                left = true;
                spriteRight = 0;
                spriteLeft = 1;
            }
        }
    }
    else {
        if (altCharSpeed > orgCharSpeed) {
            altCharSpeed = altCharSpeed / brakeMultiplier;
            if (altCharSpeed < orgCharSpeed) {
                altCharSpeed = orgCharSpeed;
            }
            if (x > canvas.width - 40) {
            }
            else {
                if (right == true) {
                    x += altCharSpeed;
                    if (altCharSpeed == orgCharSpeed) {
                        right = false;
                    }
                }
            }
            if (x > 0) {
                if (left == true) {
                    right = false;
                    x -= altCharSpeed;
                    if (altCharSpeed == orgCharSpeed) {
                        left = false;
                    }
                }
            }
        }
    }
};
//# sourceMappingURL=app.js.map