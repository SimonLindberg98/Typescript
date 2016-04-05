// helperlib.ts
// Version 1.0
function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
function mixColor(red, green, blue) {
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}
function random(n) {
    return Math.floor(Math.random() * n);
}
function randomAlternative() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    return args[random(args.length)];
}
function toRadians(angleDeg) {
    return angleDeg / 180 * Math.PI;
}
//# sourceMappingURL=helperlib.js.map