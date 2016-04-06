//Donkey Mong (totally not ripoff)
var Player = (function () {
    function Player() {
    }
    return Player;
})();
var runChar = new Spritesheet("sick-spritesheet.png", 38, 50);
var runChar2 = new Animation(runChar, 5, 1, 8);
update = function () {
    runChar2.drawFrame(50, 50);
    runChar2.updateFrame();
};
//# sourceMappingURL=app.js.map