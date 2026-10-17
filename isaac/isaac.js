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
    updateBallTrajectory();
    drawBall();
    floorCollisionDetection();
    controlGravity();
}

function drawline(){
    if (aiming){
        BRUSH.arc(ballX, ballY, 50, 0, Math.PI * 2); 
    }
}

function startGameLoop(){
    if (gameLoopTimer == null){
        gameLoopTimer = setInterval(runGameLoop, 10);
    }
}
function runGameLoop(){
    draw();
    gamephysics();
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
    aiming = false;
    ballWidth = 80;
    ballHeight = 80;
    ballRotation = 0;
    InitialBallX = 50;
    InitialBallY = HEIGHT - 140; 
    ballX = InitialBallX;
    ballY = InitialBallY;
    AvgStiffness = 40;
    ballColliding = false;

}
