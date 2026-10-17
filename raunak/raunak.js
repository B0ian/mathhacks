'use strict';

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
    ballRotation += velocityX ;
}

/** implement the velocity onto the ball position for the trajectory */
function updateBallTrajectory(){
    if (shooting == false && ballMoving == true){
    ballX += velocityX;
    ballY += velocityY;
    }
}


function calcVelocity(){
    let displacement = ((displacementX)**2 + (displacementY)**2) ** (1/2);
    velocity = Math.sqrt((AvgStiffness * (displacement) ** 2)/ ballMass);
    velocityX = velocity * Math.cos(mouseAngle);
    velocityY = velocity * Math.sin(mouseAngle);
}

function drawBall(){
    if (shooting == false && ballMoving == true){
        BRUSH.save();
        BRUSH.translate(ballX + ballWidth/2, ballY + ballHeight/2);
        BRUSH.rotate(mouseAngle);
        BRUSH.drawImage(ballImg, -ballWidth/2, -ballHeight/2, ballWidth, ballHeight);
        BRUSH.restore();
    }
}