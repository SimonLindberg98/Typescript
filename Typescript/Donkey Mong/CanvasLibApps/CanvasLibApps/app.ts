//Donkey Mong (totally not ripoff)

class Player {
    public x: number;
    public y: number;
    public speed: number;
    public playerHB: Hitbox;


}

var runChar = new Spritesheet("sick-spritesheet.png", 38, 50);

var runChar2 = new Animation(runChar, 5, 1, 8);

update = function () {
    runChar2.drawFrame(50, 50);
    runChar2.updateFrame();
}