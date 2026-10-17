'use strict';

// get the canvas from the HTML page
const CANVAS = document.getElementById('game-canvas');

// get the graphics context which has the canvas's drawing functions
const BRUSH = CANVAS.getContext('2d');

// get the canvas' dimensions
const WIDTH = CANVAS.clientWidth;
const HEIGHT = CANVAS.clientHeight;
CANVAS.width = WIDTH;
CANVAS.height = HEIGHT;

// image
let ballImg = new Image();
ballImg.src = 'ball.png';

let background = new Image();
background,src = 'background.webp'

let floorYAxis;

function draw(){
    BRUSH.clearRect(0, 0, WIDTH, HEIGHT);
    BRUSH.drawImage(ballImg, ballX, ballY, ballWidth, ballHeight);
}

function start(){
    addMouseEvents();
    draw();
    startGameLoop();

}

function startGameLoop(){
    if (gameLoopTimer == null){
        gameLoopTimer = setInterval(runGameLoop, 10);
    }
}
function runGameLoop(){
    draw();
}

start();