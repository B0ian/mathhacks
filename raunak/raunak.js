'use strict';

function controlGravity(){
    // add effect of gravity onto the y velocity
    velocityY += gravity;
}

/**
 * detect if it hits the floor make the ball bounce the other direction
 */
function floorCollisionDetection(){
    if (shooting == true){
        // Check if the ball hits or goes past the floor
        if (ballY > InitialBallY) {
            // Stop the ball if its bouncing speed is too low
            if (Math.abs(velocityY) < 5) { 
                velocityY = 0;
                ballY = InitialBallY;
                velocityX = velocityX * 0.8;
                gameStop = true;
            } 
            // Otherwise, bounce the ball back up
            else if (velocityY > 5) {
                // make the ball bounce the opposite direction
                velocityY = velocityY * -0.6;
                ballY = InitialBallY;
                velocityX = velocityX * 0.8;
            }
        }
        //check if the ball is above the highest point in the CANVAS
        else if (ballY < 0){
            velocityY = -velocityY;
        }
        //check if the ball is further than the right-most side in the CANVAS
        if (ballX > WIDTH){
            velocityX = -velocityX;
        }
        //check if the ball is further than the left-most side in the CANVAS
        else if (ballX < 0){
            velocityX = -velocityX;
        }
    }
}

/** implement the velocity onto the ball position for the trajectory */
function updateBallTrajectory(){
    if (aiming == false && shooting == true){
        ballX += velocityX;
        ballY += velocityY;
        console.log('Ball is moving');
    }
}

/**Calculates velocity based on Ian's calculations */
function calcVelocity(){
    /** Finds overall displacement */
    displacement = ((displacementX/50)**2 + (displacementY/50)**2) ** (1/2);
    console.log(`X = ${displacementX} Y = ${displacementY}`);
    /** Finds overall velocity */
    velocity = Math.sqrt((AvgStiffness * (displacement) ** 2)/ ballMass);
    // Assigns different x and y values depending on the overall velocity
    velocityX = velocity * Math.cos(mouseAngle);
    velocityY = velocity * Math.sin(mouseAngle);
    vi.push(velocity);
    vf.push(-velocity);
    findKin();
    findEpe();
}

function drawBall(){
    if (aiming == false && shooting == true){
        // gives the ball a cartoonic animation when moving.
        BRUSH.save();
        BRUSH.translate(ballX + ballWidth/2, ballY + ballHeight/2);
        BRUSH.rotate(mouseAngle);
        BRUSH.drawImage(ballImg, -ballWidth/2, -ballHeight/2, ballWidth, ballHeight);
        BRUSH.restore();

        // fills in a transparent blackish colour for the trajectory equation
        BRUSH.fillStyle = "rgba(0, 0, 0, 0.5)";
        BRUSH.fillRect(640, 670, 300, 50); 

        BRUSH.font = "20px 'Segoe UI', Arial, sans-serif"
        BRUSH.fillStyle = "white"; 
        BRUSH.textBaseline = "middle";
        
        // Calculates the first coefficient
        let valA = (-gravity / (2 * (velocityX ** 2))).toFixed(5);
        // Calculates the second coefficient
        let valB = Math.tan(mouseAngle).toFixed(5);

        // Writes a quadratic equation from the trajectory formula
        BRUSH.fillText(`f(x) = (${valA})x² + ${valB}x`, 650, 690); 
        console.log('Drawn with background');
    }
}