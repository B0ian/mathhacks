'use strict';

/**
 * Draw all the images for the game
 */
function draw(){
    BRUSH.clearRect(0, 0, WIDTH, HEIGHT);
    BRUSH.drawImage(background, 0, 0, WIDTH + 140, HEIGHT + 140);
    // uses a for loop to draw out the blocks individually each time instead of having to stretch the block
    for (let x = 0; x < WIDTH; x += groundWidth){
        BRUSH.drawImage(ground, x, 650, groundWidth + 1, HEIGHT*(1/5))
    }
    drawChar();
    BRUSH.drawImage(ballImg, ballX, ballY, ballWidth, ballHeight);

}
function drawChar(){
   BRUSH.drawImage(charImg, charX, charY, charWidth, charHeight);
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
    BRUSH.fillText('VI    VF   θ    KI  EPE', WIDTH*4/5, 120 );

    if (vi.length >= 8){
        popFirst(vi);
        popFirst(vf);
        popFirst(theta);
        popFirst(ki);
        popFirst(epe);
    }
    for (let i = 0; i < vi.length; i++){
        BRUSH.fillText(Math.floor(vi[i]), WIDTH*4/5, 150 + 25*i);
        BRUSH.fillText(Math.trunc(vf[i]), WIDTH*4/5 + 40, 150 + 25*i);
        BRUSH.fillText(Math.floor(theta[i]), WIDTH*4/5 + 80, 150 + 25*i);
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
    jumps();
    playergrav();
}

function startGameLoop(){
    if (gameLoopTimer == null){
        gameLoopTimer = setInterval(runGameLoop, 10);
    }
}
function runGameLoop(){
    if (!gameStart){
        BRUSH.drawImage(startBg, 0, 0, WIDTH, HEIGHT);
        BRUSH.fillStyle = "rgba(0, 0, 0, 0.5)";
        BRUSH.fillRect(WIDTH/2 - 125, HEIGHT/2 - 50, 250, 100); 
        BRUSH.font = "20px Arial";
        BRUSH.fillStyle = "white"; 
        BRUSH.textBaseline = "middle";
        BRUSH.fillText(`Press to Start`, WIDTH/2 - 60, HEIGHT/2);
    }
    else {
        if (!gameStop){
            draw();
            checkAlive();
            gamephysics();
            playerMovement();
            playerCollision()
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
            BRUSH.fillText(`Press R to Reset`, WIDTH/2 - 60, HEIGHT/2);
            drawTable();
        }
    }
}
function addEvent(){
    document.body.addEventListener('keydown', checkKeyDown);
    document.body.addEventListener('keyup', checkKeyUp);
}
function checkKeyDown(keyDownEvent){
    if (keyDownEvent.key == 'r'){
        reset();
    }
    if (alive == true){
        if (keyDownEvent.key == 'ArrowUp' || keyDownEvent.key == 'w'){
            jumping = true;
        }
        if (keyDownEvent.key == 'ArrowLeft' || keyDownEvent.key == 'a'){
        playerRight = true;
        }
        if (keyDownEvent.key == 'ArrowRight' || keyDownEvent.key == 'd'){
        playerLeft = true;
        }
    }
}

function playerMovement(){
    if (playerRight == true){
        charX -= 25;
    }
    if (playerLeft == true){
        charX += 25;
    }
}

/**
 * Checks whenever a key is no longer pressed
 * @param {KeyboardEvent} keyUpEvent The keyboard event listener
 */
function checkKeyUp(keyUpEvent){
    if(keyUpEvent.key == 'ArrowUp' || keyUpEvent.key == 'w'){
        jumping = false;
    }
    if (keyUpEvent.key == 'ArrowLeft' || keyUpEvent.key == 'a'){
        playerRight = false;
    }
    if (keyUpEvent.key == 'ArrowRight' || keyUpEvent.key == 'd'){
       playerLeft = false;
    }
}

function jumps(){
    if (jumping == true && firstPress == true){
        console.log('Jumping');
        charY -= jumpVelo;
        firstPress = false;
    }
}

function playergrav(){
    charVelo += gravity;
    charY += charVelo;
    if (charY >= InitialBallY) {
        charY = InitialBallY;
        charVelo = 0;
        firstPress = true;
    }
}

function findKin(){
    ki.push((1/2)*ballMass*velocity**2);
}

function findEpe(){
    epe.push((1/2)*AvgStiffness*displacement**2);
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
    highest = HEIGHT;
    alive = true;
    charX = randomInt();
    charY = initalCharY;
    charImg.src = './isaac/charA.png'
}

function checkCollision(x, y, itemLeft, itemTop, itemWidth, itemHeight){


   // calculate the location of the image's right and bottom sides
   let ballRight = itemLeft + itemWidth;
   let ballBottom = itemTop + itemHeight;


   // check if the point (x, y) is within the ball boundaries
   if ( x >= itemLeft && x <= ballRight && y >= itemTop && y <= ballBottom){
       alive = false;
   }
}
function checkInterception(x, y, itemX, itemY, xH, itemWidth){
    let xB = y + xH;
    let itemRight = itemX + itemWidth;

    if (x <= itemRight && x >= itemX && itemY < xB && itemY >= y){
        alive = false;
    }
}

function checkAlive(){
    let charRight = charX + charWidth;
    let charBottom = charY + charHeight;
    let ballRight = ballX + ballWidth;
    let ballBottom = ballY + ballHeight;
    checkCollision(charX, charY, ballX, ballY, ballWidth, ballHeight);
    checkCollision(charRight, charY, ballX, ballY, ballWidth, ballHeight);
    checkCollision(charX, charBottom, ballX, ballY, ballWidth, ballHeight);
    checkCollision(charRight, charBottom, ballX, ballY, ballWidth, ballHeight);

    checkCollision(ballX, ballY, charX, charY, charWidth, charHeight)
    checkCollision(ballRight, ballY, charX, charY, charWidth, charHeight)
    checkCollision(ballX, ballBottom, charX, charY, charWidth, charHeight)
    checkCollision(ballRight, ballBottom, charX, charY, charWidth, charHeight)

    checkInterception(charX, charY, ballX, ballY, charHeight, ballWidth);
   if (alive == false){
       charImg.src = './isaac/redA.png';
   }
}

function playerCollision(){
    if (charX <= 0){
        charX = 0;
    }
    else if (charX + charWidth >= WIDTH){
        charX = WIDTH - charWidth;
    }
}
