/* All iterative things in the game are here.
 */

// height of the paddles
const H_PADDLE = 100;
// width of the paddles
const W_PADDLE = 10;
// position of the left paddle from the canvas' border
const L_PADDLE = 5;
// position of the right paddle from the canvas' border
const R_PADDLE = 785;
// radius of the ball
const RADIUS = 10;

// object canvas (black rectangle)
var canvas;
// everything inside the block
var canvasContext;
// position of the ball in X-axis
var ballX = 50;
// position of the ball in Y-axis
var ballY = 50;
// speed of the ball in X-axis
var ballSpeedX = 10;
// speed of the ball in Y-axis
var ballSpeedY = 4;
// position of the left paddle in Y-axis
var paddleOneY = 250;
// position of the right paddle in Y-axis
var paddleTwoY = 250;

// run the block code only after all the page has loaded
window.onload = function() {
canvas = document.getElementById('gameCanvas');
canvasContext = canvas.getContext('2d');

// setting 30 frames per second just because is fluid and nice
var framesPerSecond = 30;
// run a block of methods 30 times in a second 
setInterval(function() { move(); draw(); }, 1000/framesPerSecond);

// the listener waits for an event of the type 'mousemove' and call an inline function
canvas.addEventListener('mousemove', function(evt) {
	// object mousePos receives the relative position of the mouse
	var mousePos = calcMousePos(evt);
	// left paddle position is adjusted
	paddleOneY = mousePos.y - (H_PADDLE/2);
});
}

// calculate the mouse position each time its moves
// receive an event that fires every time the mouse moves (evt: event coordinates data)
function calcMousePos(evt) {
// area of the game's canvas
var rect = canvas.getBoundingClientRect();
// handle for the html page
var root = document.documentElement;
// take the absolut position of the mouse, then subtract the borders of the canvas and any possible scroll
var mouseX = evt.clientX - rect.left - root.scrollLeft;
var mouseY = evt.clientY - rect.top - root.scrollTop;
// return the relative position of the mouse
return {
	x:mouseX,
	y:mouseY
};
}

// control all the movimentation of the ball
function move() {
// change its speed
ballX += ballSpeedX;
ballY += ballSpeedY;

// test the borders in the horizontal
if(ballX < 0 || ballX > canvas.width)
	ballSpeedX = -ballSpeedX;

// test the borders in the vertical
if(ballY < 0 || ballY > canvas.height)
	ballSpeedY = -ballSpeedY;
}

// draw all the figures used in the game
function draw() {
// canvas
colorRect(0, 0, canvas.width, canvas.height, 'black');
// left paddle
colorRect(L_PADDLE, paddleOneY, W_PADDLE, H_PADDLE, 'white');
// right paddle
colorRect(R_PADDLE, paddleTwoY, W_PADDLE, H_PADDLE, 'white');
// ball
colorCircle(ballX, ballY, RADIUS, 'white');
}

// construct a rectangle
function colorRect(left, top, width, height, color) {
canvasContext.fillStyle = color;
canvasContext.fillRect(left, top, width, height);
}

// construct a circle
function colorCircle(xAxis, yAxis, radius, color) {
canvasContext.fillStyle = color;
canvasContext.beginPath();
canvasContext.arc(xAxis, yAxis, radius, 0, 2*Math.PI, true);
canvasContext.fill();
}