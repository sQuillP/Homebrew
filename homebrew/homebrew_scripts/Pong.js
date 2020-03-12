//Not the best data structuring for objects using es6 functions.
//thought I would do it anyway for the practice of using them.
//First release V_1.0
var canvas = document.querySelector('canvas');
var scoreboard = document.querySelector('span');
var opt = document.querySelector('select');
var opt2 = document.querySelector('#opColor');
var background = document.querySelector('#background');
var ctx = canvas.getContext('2d');
var rallies = 0;
var up = false;
var down = false;
var rallies = 0;
document.addEventListener('keydown', boolOne);
document.addEventListener('keyup', boolTwo);
document.addEventListener('keypress',reset);
var me = new User();
var puck = new Puck();
var computer = new User();
computer.color = 'red';
computer.x = canvas.width*5/6;
computer.y = canvas.height/2;
var source = {
initMap:()=> {
	ctx.font = '20px, Arial';
	ctx.fillStyle = 'white';
	ctx.fillText("V_1.0.0 @sQuill",canvas.width-90,11);
	ctx.beginPath();
    ctx.rect(canvas.width/2,0,3,canvas.height);
	ctx.fillStyle = 'white';
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.lineWidth ='2';
	ctx.arc(canvas.width/2+2,canvas.height/2,14,0,Math.PI*2);
	ctx.strokeStyle = 'white';
	ctx.stroke();
	ctx.closePath();
	ctx.beginPath();
	ctx.lineWidth ='5';
	ctx.rect(0,0,canvas.width,canvas.height);
	ctx.strokeStyle = 'white';
	ctx.stroke();
	ctx.closePath();
	},

	updateColors:()=> {
		me.color = opt[opt.selectedIndex].value;
		computer.color = opt2[opt2.selectedIndex].value;
		canvas.style.backgroundColor = background[background.selectedIndex].value;
	}

};

function boolOne(e) {
 e.which === 87 ? up = true : e.which === 83 ? down = true:null;
}
function boolTwo(e) {
 e.which === 87 ? up = false : e.which === 83 ? down = false :null;
}

function stopPuck() {
if(puck.x+puck.rad>=canvas.width||puck.x-puck.rad<=3){
	puck.dx = 0;
	puck.dy = 0;
	rallies = 0;
	scoreboard.textContent = rallies;
}

}

function reset(e) {
if(e.which === 32&&puck.dx===0&&puck.dy===0) {
	puck.y=canvas.height/2;
	puck.x=canvas.width/2;
	puck.dx=1;
	puck.dy=1;
}
}
//returns the y destination position for the AI.
//only calculates the first bounce
function calcX(posx,posy,dx,dy) {
var [compX,slope,destination,dif,destination] = [canvas.width*5/6,dy*dx,0,0,0];
if(slope === -1){
dif = compX-posx;
destination = posy-dif;
}
else{
	dif = compX-posx;
	destination = posy+dif;
}
return destination;
}

function Puck() {
this.y = canvas.height/2;    
this.x = canvas.width/2;
this.dx = 1;
this.rad = 5;
this.dy = 1;
this.color = 'orange';
this.intersect = calcX(this.x,this.y,this.dx,this.dy);
this.show = () => {
	ctx.beginPath();
	ctx.arc(this.x,this.y,this.rad,0, Math.PI*2);
	ctx.fillStyle = this.color;
	ctx.fill();
	ctx.closePath();
}
this.move = () => {
this.x += this.dx;
this.y += this.dy;
}
this.properties = () => {	
var [xLeft,xRight,yUp,yDown]=[this.x-this.rad,this.x+this.rad,this.y-this.rad,this.y+this.rad]; 
(this.y+this.rad>=canvas.height||this.y-this.rad<=0)?this.dy*=-1:null;
if(xLeft<=me.x+5&&xLeft>=me.x&&yUp>=me.y&&yUp<=me.y+25||xLeft<=me.x+5&&xLeft>=me.x&&yDown>=me.y&&yDown<=me.y+25){
	this.dx*=-1;
	rallies++;
	scoreboard.textContent = rallies;
}
if(this.x<=me.x+5&&this.x>=me.x&&this.y>=me.y&&yUp<=me.y+25){
	this.dx*=-1;
	score++;
	scoreboard.textContent = rallies;
}
if(xRight>=computer.x&&xRight<=computer.x+5&&yUp>=computer.y&&yUp<=computer.y+25||xRight>=computer.x&&xRight<=computer.x+5&&yDown>=computer.y&&yDown<=computer.y+25){
	this.dx*=-1;
	rallies++;
	scoreboard.textContent = rallies;
}
if(this.x>=computer.x&&this.x<=computer.x+5&&this.y>=computer.y&&yUp<=computer.y+25){
	this.dx*=-1;
	rallies++;
	scoreboard.textContent = rallies;
}
this.dx===1&&this.y+this.rad>=canvas.height||this.y-this.rad<=0&&this.dx===1?this.intersect = calcX(this.x,this.y,this.dx,this.dy):null;
}
}

function User() {
this.x = canvas.width/6;
this.y = canvas.height/2;
this.dy = 1;
this.color = 
 this.showPaddle = () => {
	ctx.beginPath();
	ctx.rect(this.x,this.y,5,25);
	ctx.fillStyle = this.color;
	ctx.fill();
	ctx.closePath();
}


this.move = () => {
up === true ? this.y-- : null;
down === true ? this.y++ : null;
this.y+28>=canvas.height?this.y=canvas.height-29:this.y<=3?this.y=4:null;
}
this.AI = () => {
this.y+28>=canvas.height?this.y=canvas.height-29:this.y<=3?this.y=4:null;	
this.y<puck.intersect?this.y+=this.dy:this.y-=this.dy;
this.y===puck.intersect?this.dy=0:this.dy=1;
}
}

function run() {
ctx.clearRect(0,0,canvas.width, canvas.height);
source.initMap();
source.updateColors();
me.showPaddle();
me.move();
puck.properties();
computer.showPaddle();
computer.AI();
puck.show();
puck.move();
stopPuck();
}

var runGame = setInterval(run,10);
