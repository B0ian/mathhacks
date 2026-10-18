"use strict";
/**
 * Finds the X and Y position of the mouse
 * @param {MouseEvent} mouseMoveEvent The event of the mouse movement
 */
function mouseMoveListener(mouseMoveEvent){
    mouseX =  mouseMoveEvent.clientX;
    mouseY = mouseMoveEvent.clientY;
}

/**
 * Finds the position of the mouse at the start of the pull
 */
function mouseDownListener(){
    startX = mouseX;
    startY = mouseY;
    checkBallCollision();
    //check if the ball is colliding with the mouse
    if (ballColliding){
        aiming = true;
    }
    else {
        false;
    }
}

/**
 * Finds the position of the mouse at the end of the pull
 */
function mouseUpListener(){
    endX = mouseX;
    endY = mouseY;
    //check if the mouse is aiming where to fire the ball
    if (aiming){
        findAngle();
        shooting = true;
        ballColliding = false;
        aiming = false;
        calcVelocity();
    }
}

/**
 * Adds the mouse event listeners
 */
function addMouseEvents(){
    addEventListener("mousemove", mouseMoveListener);
    addEventListener("mousedown", mouseDownListener);
    addEventListener("mouseup", mouseUpListener);
}

/**
 * Checks if the ball is colliding with the mouse
 */
function checkBallCollision(){
    //if the mouse is inside the ball
    if (mouseX >= ballX && mouseX <= ballX + ballWidth && mouseY >= ballY && mouseY <= ballY + ballHeight){
        ballColliding = true;
        console.log("Colliding!");
    }
    else {
        ballColliding = false;
    }
}

/**
 * Finds the angle from the mouse with the ball as the origin
 */
function findAngle(){
    displacementX = Math.abs(endX - startX);
    displacementY = Math.abs(endY - startY);
    mouseAngle = Math.atan(displacementY/displacementX);
    console.log(mouseAngle);
    theta.push((mouseAngle*180)/Math.PI);
}

/**
 * Pops the first element of an array
 * @param {Array} arr an array for the first element to pop
 */
function popFirst(arr){
    //traverse through the array
    for (let i = 0; i < arr.length-1; i++){
        arr[i] = arr[i+1];
    }
    arr.pop();
}