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
 * Draw the table to store all of the information
 */
function drawTable(){
    // Draw the background
    BRUSH.fillStyle = "rgba(0, 0, 0, 0.5)";
    BRUSH.fillRect(WIDTH*4/5, 100, 250, 250); 
    BRUSH.font = "20px Arial";
    BRUSH.fillStyle = "white"; 
    BRUSH.textBaseline = "middle";
    // Heading for the tables
    BRUSH.fillText('VI    VF   θ    KI  EPE', WIDTH*4/5, 120 );

    // Remove the first element of all arrays when length exceeds the box
    if (vi.length >= 8){
        popFirst(vi);
        popFirst(vf);
        popFirst(theta);
        popFirst(ki);
        popFirst(epe);
    }
    // Loop through and print out all of the data
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
    addKeyEvent();
    addMouseEvents();
    draw();
    startGameLoop();
    gamephysics();
}

/**
 * Constantly run all the physics for the game
 */
function gamephysics(){
    updateBallTrajectory();
    drawBall();
    floorCollisionDetection();
    controlGravity();
    jumps();
    playergrav();
}

/**
 * Start the game loop
 */
function startGameLoop(){
    if (gameLoopTimer == null){
        gameLoopTimer = setInterval(runGameLoop, 10);
    }
}
/**
 * Constantly run all moving parts of the game
 */
function runGameLoop(){
    // Start screen for the game
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
        // Game is running
        if (!gameStop){
            draw();
            checkAlive();
            gamephysics();
            playerMovement();
            playerCollision()
            trailCount+=1;
            // Push coordinates for the ball each 10 frames
            if (trailCount % 10 == 0 && shooting){
                trailsX.push(ballX);
                trailsY.push(ballY);
            }
        }
        else {
            // Draw the ball for each saved frame after done
            for (let i = 0; i < trailsX.length; i++){
                BRUSH.drawImage(ballImg, trailsX[i], trailsY[i], ballWidth, ballHeight);
            }
            // Reset screen
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
/**
 * Add key events
 */
function addKeyEvent(){
    document.body.addEventListener('keydown', checkKeyDown);
    document.body.addEventListener('keyup', checkKeyUp);
}
/**
 * Check when the keys are pressed down
 * @param {*} keyDownEvent Check which key is pressed down
 */
function checkKeyDown(keyDownEvent){
    // When user presses 'r' reset
    if (keyDownEvent.key == 'r'){
        reset();
    }
    // when alive allow user to move
    if (alive == true){
        // let user move using arrow and was
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

// Allow for player movement
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

// Allow the user to jump using velocity & stop then from multi pressing
function jumps(){
    if (jumping == true && firstPress == true){
        console.log('Jumping');
        charY -= jumpVelo;
        firstPress = false;
    }
}
// Add gravity to the player to bring them back down
function playergrav(){
    charVelo += gravity;
    charY += charVelo;
    if (charY >= InitialBallY) {
        charY = InitialBallY;
        charVelo = 0;
        firstPress = true;
    }
}


// Find kinetic energy
function findKin(){
    ki.push((1/2)*ballMass*velocity**2);
}

/**
 * Find elastic potential energy
 */
function findEpe(){
    epe.push((1/2)*AvgStiffness*displacement**2);
}

/**
 * Reset all parts of the game
 */
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
    alive = true;
    charX = randomInt();
    charY = initalCharY;
    charImg.src = './isaac/charA.png'
}

/**
 * Check the collisions for two different items
 * @param {*} x First item x
 * @param {*} y First item y
 * @param {*} itemLeft Second item X
 * @param {*} itemTop Second item Y
 * @param {*} itemWidth Second item Width
 * @param {*} itemHeight Second item height
 */
function checkCollision(x, y, itemLeft, itemTop, itemWidth, itemHeight){


   // calculate the location of the image's right and bottom sides
   let ballRight = itemLeft + itemWidth;
   let ballBottom = itemTop + itemHeight;


   // check if the point (x, y) is within the ball boundaries
   if ( x >= itemLeft && x <= ballRight && y >= itemTop && y <= ballBottom){
        if (shooting){
            alive = false;
        }
   }
}
/**
 * Check intercepts of two items
 * @param {*} x first item x
 * @param {*} y first item y
 * @param {*} itemX second item x
 * @param {*} itemY second item y
 * @param {*} xH first item height
 * @param {*} itemWidth second item width
 */
function checkInterception(x, y, itemX, itemY, xH, itemWidth){
    // Find first item Bottom
    let xB = y + xH;
    // find second item right
    let itemRight = itemX + itemWidth;

    // Check if intersecting
    if (x <= itemRight && x >= itemX && itemY < xB && itemY >= y){
        if (shooting){
            alive = false;
        }
    }
}

/**
 * Check if the user is currently alive
 */
function checkAlive(){
    // Variables for doing collisions
    let charRight = charX + charWidth;
    let charBottom = charY + charHeight;
    let ballRight = ballX + ballWidth;
    let ballBottom = ballY + ballHeight;

    // Check if the bal and player are colidding
    checkCollision(charX, charY, ballX, ballY, ballWidth, ballHeight);
    checkCollision(charRight, charY, ballX, ballY, ballWidth, ballHeight);
    checkCollision(charX, charBottom, ballX, ballY, ballWidth, ballHeight);
    checkCollision(charRight, charBottom, ballX, ballY, ballWidth, ballHeight);

    checkCollision(ballX, ballY, charX, charY, charWidth, charHeight)
    checkCollision(ballRight, ballY, charX, charY, charWidth, charHeight)
    checkCollision(ballX, ballBottom, charX, charY, charWidth, charHeight)
    checkCollision(ballRight, ballBottom, charX, charY, charWidth, charHeight)

    checkInterception(charX, charY, ballX, ballY, charHeight, ballWidth);

    // When alive = false, change character image to dead
   if (alive == false){
       charImg.src = './isaac/redA.png';
   }
}

// Stop user from going outside of the boundaries
function playerCollision(){
    // Stop them from escaping the left side
    if (charX <= 0){
        charX = 0;
    }
    // stop them from escaping the right side
    else if (charX + charWidth >= WIDTH){
        charX = WIDTH - charWidth;
    }
}
