let lines = [];
let buffer;
let buffer2;
let imagePixels = [];

//Photoshop dec with the colour coded lines (1Bild für Anfang, 1 Bild für Ende)
function preload(){
buffer = loadImage('assets/Beginning.png')
buffer2 = loadImage('assets/End.png')

}

//SETUP
function setup() {
   createCanvas(poster.getWindowWidth(), poster.getWindowHeight()); // Don't remove this line. 
   poster.setup(this,  "/Poster_Templates/libraries/assets/models/movenet/model.json");  // Don't remove this line. 
  textAlign(CENTER, CENTER);
  textSize(10 * poster.vw);

  lines[0] = new symbol(width*0.2, height*0.2)
  lines[0].setEnd(width*0.8,height*0.8)


  lines[1] = new symbol(width*0.3, height*0.2)
  lines[1].setEnd(width*0.6,height*0.8)
}

function setuplines(){
  lines = [];
  // ... (siehe unten)
  console.log("lines count: " + lines.length + " 2nd index: " + index)
}

function draw() {
  background(0, 0, 0, 50);
  //looping through the lines
  for (let i = 0; i < lines.length; i++) {
    lines[i].display();
  }
  fill(255);

 poster.posterTasks(); // do not remove this last line!  
}

function windowScaled() { // this is a custom event called whenever the poster is scaled
  textSize(10 * poster.vw);
  setuplines()
}


class symbol {

constructor(startx, starty){
  this.startx = startx;
  this.starty = starty;
  this.animationPos = 0;
  this.inStartPos = false;
  this.animationSpeed = 0.03;
  this.posx = this.startx;
  this.posy = this.startx;
  //this.posx = this.startx * screen1.w
  //this.posx = this.starty * screen1.h
}
setEnd(endx, endy) {
  this.endx = endx;
  this.endy = endy;
}

  animateStanding(posX, posY) {
    push();
    translate(posX, posY - (vh * 0.25))
    rotate(PI / 4);
    line(0, 0, vh * 0.4, vh * 0.4);
    pop();
  }


display() {
 /* if(poster.position.x >= this.posx-5 && poster.position.x <= this.posx+5) {
    console.log(this.inStartPos)
      this.inStartPos =  !this.inStartPos
  }

  let lerpedPosx = lerp(this.startx, this.endx, this.inStartPos ? 0 : 1);
  let lerpedPosy = lerp(this.starty, this.endy, this.inStartPos ? 0 : 1);
*/

  let constrainedX = constrain(poster.posNormal.x, 0.2, 0.8);
 let lerpedPosx = map(constrainedX, 0.2, 0.8,  this.startx ,  this.endx);
 let lerpedPosy = map(constrainedX, 0.2, 0.8,  this.starty ,  this.endy);

    this.posx = lerpedPosx;
    this.posy = lerpedPosy;

    //this.posx = map(this.poster.position.x, 0, 1, this.startx * screen1.w, screen3.x + (this.endx * screen1.w))
    //this.posy = map(this.poster.position.x, 0, 1, this.starty * screen1.h, screen3.y + (this.endy * screen1.h))
  
  stroke(255) 
    line(this.posx-10, this.posy, this.posx+10, this.posy);
  }
}

//Questions  luke: how can you make the actual display? Referencing the picture and colours
//how can you make the lines turn, and the bounce in the end?
//can we not take the fly programming of github/or what is the difference?

