"use strict";
function callVariables(){
    //variables to get the the position of the mouse 
    let mouseX;
    let mouseY;

    //variables to get the starting position of the mouse
    let startX;
    let startY;

    //variables to get the ending position of the mouse
    let endX;
    let endY;

    //variable to check if the mouse is colliding with the ball
    let ballColliding = false;

    //variable to get the angle from the ball
    let mouseAngle;

    //Variable to get the displacement of the mouse from start to end
    let displacementX;
    let displacementY;

    // get the canvas from the HTML page
    const CANVAS = document.getElementById('game-canvas');

    // get the graphics context which has the canvas's drawing functions
    const BRUSH = CANVAS.getContext('2d');

    // get the canvas' dimensions
    const WIDTH = CANVAS.clientWidth;
    const HEIGHT = CANVAS.clientHeight;
    CANVAS.width = WIDTH;
    CANVAS.height = HEIGHT;

    let ballImg = new Image();
    ballImg.src = './raunak/ball.png';

    let background = new Image();
    background.src = './isaac/background.jpg';


    let ground = new Image();
    ground.src = './isaac/ground.avif';
    let groundWidth = 250;


    let floorYAxis = 0;
    let floorXAxis = 0;
    let gameLoopTimer = null;

    let shooting = false;
}