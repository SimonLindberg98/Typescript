// canavslib.ts
// Version 1.0
//
// Variables
//
var canvas = document.getElementById('canvas');
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
var touches = [];
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
function fill(color) {
    if (color)
        context.strokeStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
}
function line(x1, y1, x2, y2, width, color) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    if (width)
        context.lineWidth = width;
    if (color)
        context.strokeStyle = color;
    context.stroke();
}
function arc(x, y, radius, startAngle, endAngle, anticlockwise, width, color) {
    if (anticlockwise === void 0) { anticlockwise = false; }
    context.beginPath();
    context.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    if (width)
        context.lineWidth = width;
    if (color)
        context.strokeStyle = color;
    context.stroke();
}
function ring(x, y, radius, width, color) {
    arc(x, y, radius, 0, 2 * Math.PI, false, width, color);
}
function circle(x, y, radius, color) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    if (color)
        context.fillStyle = color;
    context.fill();
}
function rectangle(x, y, width, height, color) {
    if (color)
        context.fillStyle = color;
    context.fillRect(x, y, width, height);
}
function triangle(x1, y1, x2, y2, x3, y3, color) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(x3, y3);
    if (color)
        context.fillStyle = color;
    context.fill();
}
function text(s, x, y, fontSize, color) {
    if (fontSize)
        context.font = fontSize + "px monospace";
    if (color)
        context.fillStyle = color;
    context.fillText(s, x, y);
}
var _images = [];
function image(path, x, y, width, height) {
    var draw = function () {
        if (width && height) {
            context.drawImage(_images[path], x, y, width, height);
        }
        else {
            context.drawImage(_images[path], x, y);
        }
    };
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
var _sounds = [];
function playSound(path, volume, loop) {
    if (volume === void 0) { volume = 1; }
    if (loop === void 0) { loop = false; }
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
function loopSound(path, volume) {
    if (volume === void 0) { volume = 1; }
    playSound(path, volume, true);
}
function stopSound(path) {
    if (_sounds[path] instanceof HTMLAudioElement) {
        _sounds[path].pause();
    }
}
function setVolume(path, volume) {
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
    for (var i_1 = 0; i_1 < event.touches.length; i_1++) {
        touches[i_1].x = event.touches[i_1].clientX - rect.left;
        touches[i_1].y = event.touches[i_1].clientY - rect.top;
    }
}
//
// Spritesheet animation
//
var Spritesheet = (function () {
    function Spritesheet(path, frameWidth, frameHeight) {
        var _this = this;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.image = new Image();
        this.image.src = path;
        this.image.onload = function () {
            _this.framesPerRow = Math.floor(_this.image.width / _this.frameWidth);
        };
    }
    return Spritesheet;
})();
var Animation = (function () {
    function Animation(spritesheet, frameSpeed, startFrame, endFrame) {
        this.spritesheet = spritesheet;
        this.frameSpeed = frameSpeed;
        this.sequence = [];
        this.currentFrame = 0;
        this.counter = 0;
        for (var i_2 = startFrame; i_2 <= endFrame; i_2++) {
            this.sequence.push(i_2);
        }
    }
    Animation.prototype.updateFrame = function () {
        if (this.counter == (this.frameSpeed - 1)) {
            this.currentFrame = (this.currentFrame + 1) % this.sequence.length;
        }
        this.counter = (this.counter + 1) % this.frameSpeed;
    };
    Animation.prototype.drawFrame = function (x, y) {
        var row = Math.floor(this.currentFrame / this.spritesheet.framesPerRow);
        var col = Math.floor(this.currentFrame % this.spritesheet.framesPerRow);
        context.drawImage(this.spritesheet.image, col * this.spritesheet.frameWidth, row * this.spritesheet.frameHeight, this.spritesheet.frameWidth, this.spritesheet.frameHeight, x, y, this.spritesheet.frameWidth, this.spritesheet.frameHeight);
    };
    return Animation;
})();
//
// Hit test
//
function getPixel(x, y) {
    var data = context.getImageData(x, y, 1, 1).data;
    return { red: data[0], green: data[1], blue: data[2] };
}
var Hitbox = (function () {
    function Hitbox(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Hitbox.prototype.collidesWith = function (other) {
        return this.x + this.width > other.x &&
            this.x < other.x + other.width &&
            this.y + this.height > other.y &&
            this.y < other.y + other.height;
    };
    Hitbox.prototype.contains = function (x, y) {
        return this.x + this.width >= x && this.x <= x &&
            this.y + this.height >= y && this.y <= y;
    };
    Hitbox.prototype.drawOutline = function (color) {
        if (color)
            context.strokeStyle = color;
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.stroke();
    };
    return Hitbox;
})();
var Turtle = (function () {
    function Turtle(x, y, direction, isPenDown) {
        var _this = this;
        if (x === void 0) { x = canvas.width / 2; }
        if (y === void 0) { y = canvas.height / 2; }
        if (direction === void 0) { direction = 0; }
        if (isPenDown === void 0) { isPenDown = true; }
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.isPenDown = isPenDown;
        this.stateStack = [];
        this.actions = {
            'F': function (angleDeg, length) { _this.penDown(); _this.goForward(length); },
            'G': function (angleDeg, length) { _this.penDown(); _this.goForward(length); },
            'f': function (angleDeg, length) { _this.penUp(); _this.goForward(length); },
            'g': function (angleDeg, length) { _this.penUp(); _this.goForward(length); },
            '+': function (angleDeg, length) { _this.turnLeft(angleDeg); },
            '-': function (angleDeg, length) { _this.turnRight(angleDeg); },
            '[': function (angleDeg, length) { _this.pushState(); },
            ']': function (angleDeg, length) { _this.popState(); },
            'x': function (angleDeg, length) { },
            'y': function (angleDeg, length) { }
        };
        this.rules = {};
    }
    Turtle.prototype.setPenWidth = function (width) {
        context.lineWidth = width;
    };
    Turtle.prototype.setPenColor = function (color) {
        context.strokeStyle = color;
    };
    Turtle.prototype.goForward = function (length) {
        var nextX = this.x + Math.cos(-this.direction * Math.PI / 180) * length;
        var nextY = this.y + Math.sin(-this.direction * Math.PI / 180) * length;
        if (this.isPenDown) {
            line(this.x, this.y, nextX, nextY);
        }
        this.x = nextX;
        this.y = nextY;
    };
    Turtle.prototype.goBackward = function (length) {
        this.goForward(-length);
    };
    Turtle.prototype.goTo = function (x, y) {
        if (this.isPenDown) {
            line(this.x, this.y, x, y);
        }
        this.x = x;
        this.y = y;
    };
    Turtle.prototype.turnRight = function (angleDeg) {
        if (angleDeg === void 0) { angleDeg = 90; }
        this.direction -= angleDeg;
    };
    Turtle.prototype.turnLeft = function (angleDeg) {
        if (angleDeg === void 0) { angleDeg = 90; }
        this.direction += angleDeg;
    };
    Turtle.prototype.penUp = function () {
        this.isPenDown = false;
    };
    Turtle.prototype.penDown = function () {
        this.isPenDown = true;
    };
    Turtle.prototype.pushState = function () {
        this.stateStack.push({
            x: this.x,
            y: this.y,
            direction: this.direction,
            isPenDown: this.isPenDown,
            lineWidth: context.lineWidth,
            strokeStyle: context.strokeStyle
        });
    };
    Turtle.prototype.popState = function () {
        var state = this.stateStack.pop();
        this.x = state.x;
        this.y = state.y;
        this.direction = state.direction;
        this.isPenDown = state.isPenDown;
        context.lineWidth = state.lineWidth;
        context.strokeStyle = state.strokeStyle;
    };
    Turtle.createLSystem = function (axiom, rules, iterations) {
        var system = axiom;
        for (var i_3 = 0; i_3 < iterations; i_3++) {
            var nextSystem = "";
            for (var j = 0; j < system.length; j++) {
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
    };
    Turtle.prototype.runLSystem = function (system, length, angleDeg) {
        if (angleDeg === void 0) { angleDeg = 90; }
        for (var i_4 = 0; i_4 < system.length; i_4++) {
            this.actions[system[i_4]](angleDeg, length);
        }
    };
    return Turtle;
})();
//# sourceMappingURL=canvaslib.js.map