// helperlib.ts
// Version 1.0

function distance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function mixColor(red: number, green: number, blue: number) {
    return `rgb(${red}, ${green}, ${blue})`;
}

function random(n: number) {
    return Math.floor(Math.random() * n);
}

function randomAlternative(...args: any[]) {
    return args[random(args.length)];
}

function toRadians(angleDeg: number) {
    return angleDeg / 180 * Math.PI;
}