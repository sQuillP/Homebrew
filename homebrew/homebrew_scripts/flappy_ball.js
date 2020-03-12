//Author: sQuill
//canvas selector
var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');
//position variables
var x = canvas.width/2;
var y = canvas.height/2;
var dy = .5;
var dx = 1;
var fx = canvas.width-20;
var fy = canvas.height-20;
var bx1 = canvas.width-40;
var by1 = 40;
var bx2 =canvas.width/4-40;
var by2 =20;
var bx3 = canvas.width/4;
var by3 = canvas.height/2;
var mx1 = canvas.width;
var my1 = canvas.height/3 
var hx = null;
var hy = null;
var rad = 4;
var pressed = false;
var rx = canvas.width - 20;
var ry = canvas.height - 60;
var rHeight = 60;
var rWidth = 20;
var rx2 = canvas.width - 20;
var ry2 = canvas.height - 60;
//flux and scale variables
var scale = 40;
var health = 100;
var healthColor = 'green';
var message = '';
var s1 = -1;
var s2 = -1;
var score = 0;
//importing sprite images and backgrounds.
var cloud1 = new Image();
var mountain = new Image();
var cloud2 = new Image();
var cloud3 = new Image();
var flower = new Image();
var missle = new Image();
var explosion = new Image();
var healthPack = new Image();
healthPack.src = '../../sprites/Health.png';
explosion.src = '../../sprites/blast.png';
missle.src = '../../sprites/missle.png';
flower.src = '../../sprites/yellowFlower.png';
cloud3.src = '../../sprites/cloud.png'
cloud2.src = '../../sprites/cloud.png';
mountain.src = '../../sprites/Mountain.png';
cloud1.src = '../../sprites/cloud.png';
//varaibles for the obstacles.
var varianceOne = 0;
var varianceTwo = 0;
var colorOne = '';
var colorTwo = '';
var randomOne = Math.random()*scale;
var randomTwo = Math.random()*scale;
var generateColorOne = colorChanger();
var generateColorTwo = colorChanger();
//------------------------------------
//event listeners and other selectors
document.addEventListener('keydown', flap);
document.addEventListener('keyup', fall);

var scoreboard =document.querySelector('#score');
scoreboard.textContent = 0;
//------------------------OBSTACLE RESOURCES--------------------------------------------------------



function missles(){
ctx.drawImage(missle,mx1,my1, 20, 20);
mx1-=2;
if(mx1===-20){
mx1=canvas.width+20;
my1 = canvas.height/3 + Math.round(Math.random()*50);
}
}

function userBall(){
ctx.beginPath();
ctx.arc(x,y,rad,0,Math.PI*2);
ctx.fillStyle = 'black';
ctx.fill();
ctx.closePath();
}

function healthBar(){
ctx.beginPath();
ctx.rect(3,3,101,5);
ctx.filllStyle = 'black';
ctx.stroke();
ctx.closePath();	
ctx.beginPath();
ctx.rect(4,4,health,3);
ctx.fillStyle = healthColor;
ctx.fill();
ctx.closePath();
}

function gameText(){
ctx.font = '10px Arial';
ctx.fillStyle = 'black';
ctx.fillText(message, canvas.width/2, 10);
ctx.font = '50px, Verdana';
ctx.fillStyle = 'white';
ctx.fillText('Beta_v2.0.0', canvas.width*5/6-10, 8);
}

function coin(){
ctx.beginPath();
ctx.arc();
ctx.fillStyle = 'yellow';
ctx.fill();
ctx.endPath();
}

function healthPack(){
ctx.drawImage(healthPack);
}

//clouds
function backDrop(){
bx1 -=.1;
bx2 -=.1;
bx3 -=.1;
fx -=1;
fx<-80?fx=canvas.width:null;
bx1<-40?bx1=canvas.width:null;
bx2<-40?bx2=canvas.width:null;
bx3<-40?bx3= canvas.width:null;
ctx.drawImage(cloud1,bx1,by1,40,20);
ctx.drawImage(cloud2, bx2, by2, 40, 20);
ctx.drawImage(cloud3, bx3,by3,40,20);
ctx.drawImage(mountain,0,canvas.height-50,50,50);
ctx.drawImage(flower,fx,fy,10,15);
}

 function navBar(){
 ctx.beginPath();
 ctx.rect(0,0,canvas.width, 12);
 ctx.fillStyle = '#ABB2BA';
 ctx.fill();
 ctx.closePath();
 healthBar();
 ctx.beginPath();
 ctx.moveTo(0,12);
 ctx.lineTo(canvas.width,12);
 ctx.lineWidth = 1;
 ctx.strokeStyle = 'black';
 ctx.stroke();
 ctx.closePath();
 gameText();
 }

function obstacleBot(){
ctx.beginPath();
ctx.rect(rx,ry-(s1*varianceOne),rWidth,rHeight+(s1*varianceOne));
ctx.fillStyle = colorOne;
ctx.fill();
ctx.closePath();
}

function ground(){
ctx.beginPath();
ctx.rect(0, canvas.height-10, canvas.width, 10);
ctx.fillStyle = 'green';
ctx.fill();
ctx.closePath();
}

function obstacleTop(){
ctx.beginPath();
ctx.rect(rx,ry- 90, rWidth, rHeight-(s1*varianceOne));
ctx.fillStyle = colorOne;
ctx.fill();
ctx.closePath();
}

function obstacleBot2(){
ctx.beginPath();
ctx.rect(rx2 + canvas.width/2, ry2-(s2*varianceTwo), rWidth,rHeight+(s2*varianceTwo));
ctx.fillStyle = colorTwo;
ctx.fill();
ctx.closePath();
}

function obstacleTop2(){
ctx.beginPath();
ctx.rect(rx2 + canvas.width/2, ry2 - 90, rWidth, rHeight-(s2*varianceTwo));
ctx.fillStyle = colorTwo;
ctx.fill();
ctx.closePath();
}
//-----------------------------------------------------------------------------------------------
//padding was added for the top obstacles since the touch did not register at the radius. (rHeight+8)
//this made it more precise when the ball touched the top columns.

function gameOp(){
message = '';
if((x+rad)>=rx&&(x+rad)<=(rx+rWidth)&&(y)>=(ry-s1*varianceOne-6)){
	health--;
	message = 'oOf';
}
if((x+rad-canvas.width/2)>=rx2&&(x+rad-canvas.width/2)<=(rx2+rWidth)&&(y)>=(ry2-s2*varianceTwo-6)){
	health--;
	message = 'oOf';
}
if((x+rad)>=rx&&(x+rad)<=(rx+rWidth)&&(y)<=(rHeight+8-s1*varianceOne)){
	health--;
	message = 'oOf';
}
if((x+rad-canvas.width/2)>=rx2&&(x+rad-canvas.width/2)<=(rx2+rWidth)&&(y)<=(rHeight+8-s2*varianceTwo)){
	health--;
	message = 'oOf';
}
if(y + rad >= canvas.height-10 || health <= 0){
	health = 0;
	score = 0;
	clearInterval(run);
	alert('Game!');
}
if(y+rad<=my1+15&&y+rad>=my1+10&&x+2===mx1){
	health -= 30;
	mx1 = canvas.width+20;
}
if(rx === canvas.width/2||rx2 === -20){
	score++;
	scoreboard.textContent = score;
}
health>70?healthColor='green':health<=70&&health>40?healthColor='yellow':health<=40&&health>30?healthColor='orange':health<=30?healthColor='red':null;
}

console.log(rx2);
function colorChanger(){
var r = Math.round(Math.random()*255);
var g = Math.round(Math.random()*255);
var b = Math.round(Math.random()*255);
return 'rgb(' + r + ', ' + g + ', ' + b +')';
}

function flap(up){
up.which === 38 ? pressed = true : null;
}

function fall(down){
	down.which === 38 ? pressed = false : null;
}

function movement(){
variance = randomOne;
varianceTwo = randomTwo;
colorOne = generateColorOne;
colorTwo = generateColorTwo;
rx -= dx;
rx2 -= dx;
if(rx - dx < -20){
 rx = canvas.width;
 randomOne = Math.random()*scale;
 generateColorOne = colorChanger();
 s1 *= -1;
}
if(rx2 - dx < -170){
 rx2 = canvas.width - canvas.width/2;
 randomTwo = Math.random()*scale;
 generateColorTwo = colorChanger();
 s2 *= -1;
}
}
//method execution
function run(){
ctx.clearRect(0,0,canvas.width, canvas.height);
backDrop();
userBall();
obstacleBot();
obstacleTop();
obstacleTop2();
obstacleBot2();
gameOp();
movement();
ground();
navBar();
missles();
pressed ? y-= dy : y+=dy;
y - dy > canvas.height - 10  ? y = canvas.height/2 : null;
}

//Game runner::
var run = setInterval(run, 10);