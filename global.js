"use strict";

// get the canvas from the HTML page
const CANVAS = document.getElementById('game-canvas');

// get the graphics context which has the canvas's drawing functions
const BRUSH = CANVAS.getContext('2d');

// get the canvas' dimensions
const WIDTH = CANVAS.clientWidth;
const HEIGHT = CANVAS.clientHeight;
CANVAS.width = WIDTH;
CANVAS.height = HEIGHT;

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

//Variables to get the status of the player
let shooting = false;

// store the information for the physics of the ball
let gravity = 0.15;
let velocityY; 
let velocityX;
// to display the velocity
let velocity;
let acceleration = 0;
let ballMass = 0.43;

// the ball's position when the game initially begins
let ballWidth = 80;
let ballHeight = 80;
let ballRotation = 0;
let InitialBallX = 50;
let InitialBallY = HEIGHT*(4/5); 
let ballX = InitialBallX;
let ballY = InitialBallY;

//Get the displacement of the mouse
let displacement;

// stiffness of the ball
let AvgStiffness = 40;

let ballImg = new Image();
ballImg.src = './raunak/ball.png';

let background = new Image();
background.src = './isaac/background3.jpg';


let ground = new Image();
ground.src = './isaac/ground.avif';
let groundWidth = 250;


let floorYAxis = 140;
let floorXAxis = 0;
let gameLoopTimer = null;
let aiming = false;

//Variables to create a trail for the ball
let trailCount = 0;
let trailsX = new Array();
let trailsY = new Array();

//Variable to stop the game / simulation
let gameStop = false;

//Variables to show information to user
let vi = [];
let vf = [];
let ki = [];
let theta = [];
let epe = [];

//finds the highest Y value
let highest = HEIGHT;