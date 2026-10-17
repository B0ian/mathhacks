'use strict';

// store the information for the physics of the ball
let gravity = 0.5;
let velocityY = 0; 
let velocityX = 0
// to display the velocity
let velocity = ((velocityX ** 2) + (velocityY ** 2)) ** (1/2)
let acceleration = 0;

let ballMass = 0.43;
let ballX = 500;
let ballY = 500;
let ballWidth = 80;
let ballHeight = 80;
let ballRotation = 0;

let timeStamp;

// stiffness of the ball
let AvgStiffness = 40;

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

/** implement the velocity onto the ball position for the trajectory */
function updateBallTrajectory(){
    ballX += velocityX;
    ballY += velocityY;
}