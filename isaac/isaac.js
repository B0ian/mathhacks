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
    callVariables();
    addMouseEvents();
    addKeyEvent();
    draw();
    startGameLoop();
    gamephysics();
    document.body.addEventListener('keydown', checkKeyDown);
}

function gamephysics(){
    updateBallTrajectory();
    ballSpin();
    floorCollisionDetection();
    controlGravity();
}

function drawline(){
    if (aiming){
        BRUSH.draw
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

function checkKeyDown(keyDownEvent){
    if (keyDownEvent.key == 'r'){
        callVariables();
    }
}
