//Donkey Mong (totally not ripoff)

var x = 50;
var y = canvas.height - 60;
var charSpeed: number = 2;
var speedMultiplier = 1.004;
var brakeMultiplier = 1.03;
var leftOngoingMove: boolean;
var rightOngoingMove: boolean;
var right: number = 0;
var left: number = 0;
var spriteLeft: number = 0;
var spriteRight: number = 1;
var spacePress: boolean = false;
var jumpHeight: number = 10;
var jumpUpDecrease: number = 0.004;
var jumpDownIncrease: number = 1.4;
var inAir: boolean;
var jump: boolean = false;
var falling: boolean = false;

class Player {
    public x: number;
    public y: number;
    public char: Spritesheet;
    public speed: number;
    public playerHB: Hitbox;


}

var charMoveLeft = new Spritesheet("sick-spritesheet - leftv2.png", 39.7, 40);
var charMoveRight = new Spritesheet("sick-spritesheet - right.png", 38, 40);

var moveLeft = new Animation(charMoveLeft, 9, 0, 7);
var moveRight = new Animation(charMoveRight, 9, 0, 7);

update = function () {
    clear();

    rectangle(0, canvas.height - 20, canvas.width, 20, "black");

    var n: string = charSpeed.toString();
    var o: string = right.toString();
    var p: string = left.toString();
    var q: string = jumpHeight.toString();
    var r: string = jumpUpDecrease.toString();

    text("CharSpeed: " + n, 0, 30, 40, "black");
    text("right: " + o, 0, 70, 40);
    text("left: " + p, 0, 110, 40);
    text("holdSpace = " + spacePress, 0, 150, 40);
    text("jumpHeight: " + q, 0, 190, 40);
    text("jumpMultiplier: " + r, 0, 230, 40);
    text("Jump: " + jump, 0, 280, 40);
    text("Y:" + y, 0, 330, 40);

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
            if (jumpHeight > 0) {
                y -= jumpHeight;
                jumpHeight = jumpHeight * jumpUpDecrease;
                moveRight.updateFrame();
            }
        }
        if (jumpHeight <= 0.01) {
            falling = true;
        }

        if (falling == true) {
            //jumpHeight = 0.01;
            y += jumpHeight;
            moveRight.updateFrame();
            jumpHeight = jumpHeight * jumpDownIncrease;
        }

        if (y >= (canvas.height - 60)) {
            jump = false;
            falling = false;
            jumpHeight = 10;
        }
    }

    if (keyboard.right || keyboard.left || keyboard.up || keyboard.down) {
        if (x > canvas.width - 40) {
            
        }
        else {
            if (keyboard.right) {
                x += charSpeed;
                charSpeed = charSpeed * speedMultiplier;
                moveRight.updateFrame();
                left = 0;
                right++;
                spriteLeft = 0;
                spriteRight = 1;
            }
        }

        if (x > 0) {
            if (keyboard.left) {
                x -= charSpeed;
                charSpeed = charSpeed * speedMultiplier;
                moveLeft.updateFrame();
                right = 0;
                left++;
                spriteRight = 0;
                spriteLeft = 1;
            }
        }

        //if (keyboard.up) {
        //    y -= charSpeed;
        //    charSpeed = charSpeed * speedMultiplier;
        //    moveRight.updateFrame();
        //}

        //if (keyboard.down) {
        //    y += charSpeed;
        //    charSpeed = charSpeed * speedMultiplier;
        //    moveRight.updateFrame();
        //}
    }
    else {
        if (charSpeed > 2) {
            charSpeed = charSpeed / brakeMultiplier;

            if (charSpeed < 2) {
                charSpeed = 2;
            }

            
            if (x > canvas.width - 40) {
                
            }
            else {
                if (right > 0) {
                    x += charSpeed;
                    if (charSpeed == 2) {
                        right = 0;
                    }
                }
            }

            if (x > 0) {
                if (left > 0) {
                    right = 0;
                    x -= charSpeed;
                    if (charSpeed == 2) {
                        left = 0;
                    }
                }
            }
        }
    }
}