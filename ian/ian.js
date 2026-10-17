//variables to get the the position of the mouse 
let mouseX;
let mouseY;

//variables to get the starting position of the mouse
let startX;
let startY;

//variables to get the ending position of the mouse
let endX;
let endY;

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
    console.log(startX);
    console.log(startY);
}

/**
 * Finds the position of the mouse at the end of the pull
 */
function mouseUpListener(){
    endX = mouseX;
    endY = mouseY;
    console.log(endX);
    console.log(endY);
}

/**
 * Adds the mouse event listeners
 */
export function addMouseEvents(){
    addEventListener("mousemove", mouseMoveListener);
    addEventListener("mousedown", mouseDownListener);
    addEventListener("mouseup", mouseUpListener);
}