// canavslib.ts
// Version 1.0

//
// Variables
//

var canvas = <HTMLCanvasElement>document.getElementById('canvas');
var context = canvas.getContext('2d');

var updatesPerSecond = 60;

var keyboard = {
    "up": false,
    "down": false,
    "left": false,
    "right": false,
    "space": false,
    "shift": false,
    "alt": false,
    "ctrl": false,
    "enter": false,
    "zero": false,
    "one": false,
    "two": false,
    "three": false,
    "four": false,
    "five": false,
    "six": false,
    "seven": false,
    "eight": false,
    "nine": false,
    "a": false,
    "b": false,
    "c": false,
    "d": false,
    "e": false,
    "f": false,
    "g": false,
    "h": false,
    "i": false,
    "j": false,
    "k": false,
    "l": false,
    "m": false,
    "n": false,
    "o": false,
    "p": false,
    "q": false,
    "r": false,
    "s": false,
    "t": false,
    "u": false,
    "v": false,
    "w": false,
    "x": false,
    "y": false,
    "z": false
};

var mouse = {
    x: 0,
    y: 0,
    over: false,
    left: false,
    right: false,
    middle: false
};

var touches: { x: number, y: number }[] = [];

//
// Update functions
//

var update = function () { };
var stopUpdate = function () { };

window.addEventListener('load', function () {  
    var intervalID = setInterval(update, 1000 / updatesPerSecond); 

    stopUpdate = function () {
        clearInterval(intervalID);
    };
});

// 
// Draw functions
// 

function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function fill(color?: string) {
    if (color)
        context.strokeStyle = color;

    context.fillRect(0, 0, canvas.width, canvas.height);
}

function line(x1: number, y1: number, x2: number, y2: number, width?: number, color?: string) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);

    if (width)
        context.lineWidth = width;

    if (color)
        context.strokeStyle = color;

    context.stroke();
}

function arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise: boolean = false, width?: number, color?: string) {
    context.beginPath();
    context.arc(x, y, radius, startAngle, endAngle, anticlockwise);

    if (width)
        context.lineWidth = width;

    if (color)
        context.strokeStyle = color;

    context.stroke();
}

function ring(x: number, y: number, radius: number, width?: number, color?: string) {
    arc(x, y, radius, 0, 2 * Math.PI, false, width, color);
}

function circle(x: number, y: number, radius: number, color?: string) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);

    if (color)
        context.fillStyle = color;

    context.fill();
}

function rectangle(x: number, y: number, width: number, height: number, color?: string) {
    if (color)
        context.fillStyle = color;

    context.fillRect(x, y, width, height);
}

function triangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, color?: string) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(x3, y3);

    if (color)
        context.fillStyle = color;

    context.fill();
}

function text(s: string, x: number, y: number, fontSize?: number, color?: string) {
    if (fontSize) 
        context.font = fontSize + "px monospace";

    if (color)
        context.fillStyle = color;

    context.fillText(s, x, y);
}

var _images: HTMLImageElement[] = [];

function image(path: string, x: number, y: number, width?: number, height?: number) {
    var draw = function () {
        if (width && height) {
            context.drawImage(_images[path], x, y, width, height);
        }
        else {
            context.drawImage(_images[path], x, y);
        }
    }

    if (_images[path] === undefined) {
        _images[path] = new Image();
        _images[path].src = path;
        _images[path].addEventListener('load', draw);
    }
    else if (_images[path].complete) {
        draw();
    }
    else {
        _images[path].addEventListener('load', draw);
    }
}

// 
// Sound functions
//

var _sounds: HTMLAudioElement[] = [];

function playSound(path: string, volume: number = 1, loop: boolean = false) {
    var play = function () {
        _sounds[path].loop = loop;
        _sounds[path].currentTime = 0;
        _sounds[path].volume = volume;
        _sounds[path].play();
    };

    if (_sounds[path] === undefined) {
        _sounds[path] = new Audio(path);

        _sounds[path].addEventListener('canplaythrough', function () {
            play();
        });
    }
    else {
        play();
    }
}

function loopSound(path: string, volume: number = 1) {
    playSound(path, volume, true);
}

function stopSound(path: string) {
    if (_sounds[path] instanceof HTMLAudioElement) {
        _sounds[path].pause();
    }
}

function setVolume(path: string, volume: number) {
    if (_sounds[path] instanceof HTMLAudioElement) {
        _sounds[path].volume = volume;
    }
}

//
// Keyboard functions
//

var _key = {
    38: "up",
    40: "down",
    37: "left",
    39: "right",
    32: "space",
    16: "shift",
    18: "alt",
    17: "ctrl",
    13: "enter",
    48: "zero",
    49: "one",
    50: "two",
    51: "three",
    52: "four",
    53: "five",
    54: "six",
    55: "seven",
    56: "eight",
    57: "nine",
    65: "a",
    66: "b",
    67: "c",
    68: "d",
    69: "e",
    70: "f",
    71: "g",
    72: "h",
    73: "i",
    74: "j",
    75: "k",
    76: "l",
    77: "m",
    78: "n",
    79: "o",
    80: "p",
    81: "q",
    82: "r",
    83: "s",
    84: "t",
    85: "u",
    86: "v",
    87: "w",
    88: "x",
    89: "y",
    90: "z"
};

document.addEventListener('keydown', function (event) {
    keyboard[event.keyCode] = true;

    if (_key[event.keyCode] !== undefined) {
        keyboard[_key[event.keyCode]] = true;
    }
});

document.addEventListener('keyup', function (event) {

    keyboard[event.keyCode] = false;

    if (_key[event.keyCode] !== undefined) {
        keyboard[_key[event.keyCode]] = false;
    }
});

// 
// Mouse functions
//

function hideMouse() {
    canvas.style.cursor = 'none';
}

function showMouse() {
    canvas.style.cursor = 'default';
}

window.addEventListener('mousedown', function (event) {    
    if (event.button === 0) {
        mouse.left = true;
    }
    else if (event.button === 1) {
        mouse.middle = true;
    }
    else if (event.button === 2) {
        mouse.right = true;
    }
});

window.addEventListener('mouseup', function (event) {    
    if (event.button === 0) {
        mouse.left = false;
    }
    else if (event.button === 1) {
        mouse.middle = false;
    }
    else if (event.button == 2) {
        mouse.right = false;
    }
});

canvas.addEventListener('mousemove', function (event) {
    var rect = canvas.getBoundingClientRect();
    
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
    mouse.over = true;
});

canvas.addEventListener('mouseout', function (event) {
    mouse.over = false;
});

canvas.addEventListener('contextmenu', function (event) { 
    event.preventDefault();
});

//
// Touch functions
//

canvas.ontouchstart = touchHandler;
canvas.ontouchend = touchHandler;
canvas.ontouchmove = touchHandler;

function touchHandler(event) {
    event.preventDefault();

    touches = event.touches;

    var rect = canvas.getBoundingClientRect();

    for (let i = 0; i < event.touches.length; i++) {
        touches[i].x = event.touches[i].clientX - rect.left;
        touches[i].y = event.touches[i].clientY - rect.top;
    }
}

//
// Spritesheet animation
//

class Spritesheet {
    public image = new Image();
    public framesPerRow: number;

    constructor(path: string, public frameWidth: number, public frameHeight: number) {
        this.image.src = path;

        this.image.onload = () => {
            this.framesPerRow = Math.floor(this.image.width / this.frameWidth);
        };
    }
}

class Animation {
    public sequence: number[] = [];
    public currentFrame = 0;
    public counter = 0;

    constructor(public spritesheet: Spritesheet, public frameSpeed: number, startFrame: number, endFrame: number) {
        for (let i = startFrame; i <= endFrame; i++) {
            this.sequence.push(i);
        }
    }

    updateFrame() {
        if (this.counter == (this.frameSpeed - 1)) {
            this.currentFrame = (this.currentFrame + 1) % this.sequence.length;
        }

        this.counter = (this.counter + 1) % this.frameSpeed;
    }

    drawFrame(x: number, y: number) {
        var row = Math.floor(this.currentFrame / this.spritesheet.framesPerRow);
        var col = Math.floor(this.currentFrame % this.spritesheet.framesPerRow);

        context.drawImage(this.spritesheet.image,
            col * this.spritesheet.frameWidth, row * this.spritesheet.frameHeight,
            this.spritesheet.frameWidth, this.spritesheet.frameHeight,
            x, y, this.spritesheet.frameWidth, this.spritesheet.frameHeight);
    }
}

//
// Hit test
//

function getPixel(x: number, y: number) {
    var data = context.getImageData(x, y, 1, 1).data;

    return { red: data[0], green: data[1], blue: data[2] };
}

class Hitbox {
    constructor(public x: number, public y: number, public width: number, public height: number) {
    }

    collidesWith(other: Hitbox): boolean {
        return this.x + this.width > other.x &&
            this.x < other.x + other.width &&
            this.y + this.height > other.y &&
            this.y < other.y + other.height;
    }

    contains(x: number, y: number): boolean {
        return this.x + this.width >= x && this.x <= x &&
            this.y + this.height >= y && this.y <= y;
    }

    drawOutline(color?: string) {
        if (color)
            context.strokeStyle = color;

        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.stroke();
    }
}

// 
// Turtle graphics
//

interface TurtleState {
    x: number;
    y: number;
    direction: number;
    isPenDown: boolean;
    lineWidth: number;
    strokeStyle: string | CanvasGradient | CanvasPattern;    
}

class Turtle {
    public stateStack: TurtleState[] = [];

    public actions = {
        'F': (angleDeg, length) => { this.penDown(); this.goForward(length); },
        'G': (angleDeg, length) => { this.penDown(); this.goForward(length); },
        'f': (angleDeg, length) => { this.penUp(); this.goForward(length); },
        'g': (angleDeg, length) => { this.penUp(); this.goForward(length); },
        '+': (angleDeg, length) => { this.turnLeft(angleDeg); },
        '-': (angleDeg, length) => { this.turnRight(angleDeg); },
        '[': (angleDeg, length) => { this.pushState(); },
        ']': (angleDeg, length) => { this.popState(); },
        'x': (angleDeg, length) => { },
        'y': (angleDeg, length) => { }
    };

    public rules = { };

    constructor(public x = canvas.width / 2, public y = canvas.height / 2,
        public direction = 0, public isPenDown = true) {
    }

    setPenWidth(width: number) {
        context.lineWidth = width;
    }

    setPenColor(color: string) {
        context.strokeStyle = color;        
    }

    goForward(length: number) {        
        var nextX = this.x + Math.cos(-this.direction * Math.PI / 180) * length;
        var nextY = this.y + Math.sin(-this.direction * Math.PI / 180) * length;

        if (this.isPenDown) {
            line(this.x, this.y, nextX, nextY);
        }

        this.x = nextX;
        this.y = nextY;
    }

    goBackward(length: number) {
        this.goForward(-length);
    }

    goTo(x: number, y: number) {
        if (this.isPenDown) {
            line(this.x, this.y, x, y);
        }

        this.x = x;
        this.y = y;
    }

    turnRight(angleDeg: number = 90) {
        this.direction -= angleDeg;
    }

    turnLeft(angleDeg: number = 90) {
        this.direction += angleDeg;
    }

    penUp() {
        this.isPenDown = false;
    }

    penDown() {
        this.isPenDown = true;
    }

    pushState() {
        this.stateStack.push({
            x: this.x,
            y: this.y,
            direction: this.direction,
            isPenDown: this.isPenDown,
            lineWidth: context.lineWidth,
            strokeStyle: context.strokeStyle
        });
    }

    popState() {
        var state = this.stateStack.pop();

        this.x = state.x;
        this.y = state.y;
        this.direction = state.direction;
        this.isPenDown = state.isPenDown;
        context.lineWidth = state.lineWidth;
        context.strokeStyle = state.strokeStyle;
    }

    static createLSystem(axiom: string, rules: Object, iterations: number): string {
        var system = axiom;              

        for (let i = 0; i < iterations; i++) {
            let nextSystem = "";

            for (let j = 0; j < system.length; j++) {
                if (rules.hasOwnProperty(system[j])) {
                    nextSystem += rules[system[j]];
                }
                else {
                    nextSystem += system[j];
                }                    
            }

            system = nextSystem;
        }

        return system;
    }

    runLSystem(system: string, length: number, angleDeg = 90) {
        for (let i = 0; i < system.length; i++) {
            this.actions[system[i]](angleDeg, length);
        }
    }    
}