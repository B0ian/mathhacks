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
ballImg.src = './raunak/ball.png';

let background = new Image();
background.src = './isaac/background.jpg';


let ground = new Image();
ground.src = './isaac/ground.avif';
let groundWidth = 250;


let floorYAxis = 0;
let floorXAxis = 0;
let gameLoopTimer = null;


function draw(){
    BRUSH.clearRect(0, 0, WIDTH, HEIGHT);
    BRUSH.drawImage(background, 0, 0, WIDTH, HEIGHT);
    BRUSH.drawImage(ballImg, ballX, ballY, ballWidth, ballHeight);
    BRUSH.drawImage(ground, 0, 650, WIDTH, 200)
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

function moveBall(){
    while (velocity != 0){
        
    }
}