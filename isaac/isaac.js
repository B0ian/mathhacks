'use strict';

/**
 * Draw all the images for the game
 */
function draw(){
    BRUSH.clearRect(0, 0, WIDTH, HEIGHT);
    BRUSH.drawImage(background, 0, 0, WIDTH, HEIGHT);
    BRUSH.drawImage(ballImg, ballX, ballY, ballWidth, ballHeight);
    BRUSH.drawImage(ground, 0, 650, WIDTH, HEIGHT*(1/5));
    drawTable();
}

/**
 * Draw the table to store all of the 
 */
function drawTable(){
    BRUSH.fillStyle = "rgba(0, 0, 0, 0.5)";
    BRUSH.fillRect(WIDTH*4/5, 100, 250, 250); 
    BRUSH.font = "20px Arial";
    BRUSH.fillStyle = "white"; 
    BRUSH.textBaseline = "middle";
    BRUSH.fillText('VI  VF  GPE  KI  EPE', WIDTH*4/5, 120 );

    if (vi.length >= 8){
        vi = [];
        vf = [];
        gpe = [];
        ki = [];
        epe = [];
    }
    for (let i = 0; i < vi.length; i++){
        BRUSH.fillText(Math.floor(vi[i]), WIDTH*4/5, 150 + 25*i);
        BRUSH.fillText(Math.floor(vf[i]), WIDTH*4/5 + 40, 150 + 25*i);
        BRUSH.fillText(Math.floor(gpe[i]), WIDTH*4/5 + 80, 150 + 25*i);
        BRUSH.fillText(Math.floor(ki[i]), WIDTH*4/5 + 120, 150 + 25*i);
        BRUSH.fillText(Math.floor(epe[i]), WIDTH*4/5 + 160, 150 + 25*i);

    }

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
    if (!gameStop){
        draw();
        gamephysics();
        trailCount+=1;
        if (trailCount % 10 == 0 && shooting){
            trailsX.push(ballX);
            trailsY.push(ballY);
        }
    }
    else {
        for (let i = 0; i < trailsX.length; i++){
            BRUSH.drawImage(ballImg, trailsX[i], trailsY[i], ballWidth, ballHeight);
        }
        BRUSH.fillStyle = "rgba(0, 0, 0, 0.5)";
        BRUSH.fillRect(WIDTH/2 - 125, HEIGHT/2 - 50, 250, 100); 
        BRUSH.font = "20px Arial";
        BRUSH.fillStyle = "white"; 
        BRUSH.textBaseline = "middle";
        BRUSH.fillText(`Press R to Reset`, WIDTH/2 - 75, HEIGHT/2);
    }
}
function addEvent(){
    document.body.addEventListener('keydown', checkKeyDown);
}
function checkKeyDown(keyDownEvent){
    if (keyDownEvent.key == 'r'){
        reset();
    }
}

function findKin(){
    ki.push((1/2)*ballMass*Math.pow(velocity, 2));
}

function findGpe(){
    gpe.push(ballMass*gravity*ballY)
}
function findEpe(){
    epe.push((1/2)*(AvgStiffness/ballMass)*Math.pow(ballX, 2));
}

function reset(){
    aiming = false;
    ballWidth = 80;
    ballHeight = 80;
    ballRotation = 0;
    InitialBallX = 50;
    InitialBallY = HEIGHT*(4/5); 
    ballX = InitialBallX;
    ballY = InitialBallY;
    AvgStiffness = 40;
    ballColliding = false;
    shooting = false;
    gameStop = false;
    trailsX = [];
    trailsY = [];
}
