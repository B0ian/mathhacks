'use strict';

// store the physics information
let gravity = 0.5;
let velocityY = 0; 
let velocityX = 0
let acceleration = 0;

let ballX;
let ballY;
let ballWidth = 80;
let ballHeight = 80;
let ballRotation = 0;

let powerX = displaceX - startX
let powerY = displaceY - startY

function controlGravity(){
    // add effect of gravity onto the y velocity
    velocityY += gravity;
}

/**
 * detect if it hits the floor make the ball bounce the other direction
 */
function floorCollisionDetection(){
    // Check if the ball hits or goes past the floor
    if (ballY > floorYAxis) {
        // Stop the ball if its bouncing speed is too low
        if (Math.abs(velocityY) < 5) { 
            velocityY = 0;
            ballY = floorYAxis; 
        } 
        // Otherwise, bounce the ball back up
        else if (velocityY > 5) {
            // make the ball bounce the opposite direction
            velocityY = velocityY * -0.6;
            ballY = floorYAxis;
        }
    }
}

/** Gives the ball a spinning animation */
function ballSpin(){
    /** Spins the ball depending on the velocity */
    ballRotation += velocityX 
}
