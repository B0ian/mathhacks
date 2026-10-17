'use strict';

/**
 * Draw all the images for the game
 */
function draw(){
    BRUSH.clearRect(0, 0, WIDTH, HEIGHT);
    BRUSH.drawImage(background, 0, 0, WIDTH, HEIGHT);
    BRUSH.drawImage(ballImg, ballX, ballY, ballWidth, ballHeight);
    BRUSH.drawImage(ground, 0, 650, WIDTH, 200)
}

/**
 * Run all functions on start of page
 */
function start(){
    addEvent();
    addMouseEvents();
    draw();
    startGameLoop();
    gamephysics();
}

function gamephysics(){
    ballSpin();
    floorCollisionDetection();
    controlGravity();
}

function drawline(){
    if (aiming){
    }
}

function startGameLoop(){
    if (gameLoopTimer == null){
        gameLoopTimer = setInterval(runGameLoop, 10);
    }
}
function runGameLoop(){
    draw();
}

function addEvent(){
    document.body.addEventListener('keydown', checkKeyDown);
}
function checkKeyDown(keyDownEvent){
    if (keyDownEvent.key == 'r'){
        reset();
    }
}

function reset(){
    let ballWidth = 80;
    let ballHeight = 80;
    let ballRotation = 0;
    let InitialBallX = 0;
    let InitialBallY = HEIGHT - 200; 
    let ballX = InitialBallX;
    let ballY = InitialBallY;
    let AvgStiffness = 40;
    let ballColliding = false;

}
