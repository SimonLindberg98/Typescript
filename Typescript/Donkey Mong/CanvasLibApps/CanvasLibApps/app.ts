//Donkey Mong (totally not ripoff)

var x = 50;
var y = 160;
var charSpeed: number = 2;
var speedMultiplier = 1.005;
var brakeMultiplier = 1.03;
var leftOngoingMove: boolean;
var rightOngoingMove: boolean;
var right: number = 0;
var left: number = 0;

class Player {
    public x: number;
    public y: number;
    public char: Spritesheet;
    public speed: number;
    public playerHB: Hitbox;


}

var charMove = new Spritesheet("sick-spritesheet - right.png", 38, 50);

//var moveLeft = new Animation(charMove, 9, 0, 7);
var moveRight = new Animation(charMove, 9, 0, 7);

update = function () {
    clear();

    var n: string = charSpeed.toString();
    var o: string = right.toString();
    var p: string = left.toString();

    text("CharSpeed: " + n, 0, 30, 40, "black");
    text("right: " + o, 0, 70, 40);
    text("left: " + p, 0, 110, 40);

    
    moveRight.drawFrame(x, y);
    

    if (keyboard.right || keyboard.left || keyboard.up || keyboard.down) {
        if (keyboard.right) {
            x += charSpeed;
            charSpeed = charSpeed * speedMultiplier;
            moveRight.updateFrame();
            left = 0;
            right++;
        }

        if (keyboard.left) {
            x -= charSpeed;
            charSpeed = charSpeed * speedMultiplier;
            //moveLeft.updateFrame();right = 0;
            moveRight.updateFrame();
            left++;
        }

        if (keyboard.up) {
            y -= charSpeed;
            charSpeed = charSpeed * speedMultiplier;
            moveRight.updateFrame();
        }

        if (keyboard.down) {
            y += charSpeed;
            charSpeed = charSpeed * speedMultiplier;
            moveRight.updateFrame();
        }
    }
    else {
        if (charSpeed > 2) {
            charSpeed = charSpeed / brakeMultiplier;

            if (charSpeed < 2) {
                charSpeed = 2;
            }

            if (right > 0) {
                x += charSpeed;
                if (charSpeed == 2) {
                    right = 0;
                }
            }

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