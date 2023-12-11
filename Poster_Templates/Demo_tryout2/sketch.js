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

  lines[2] = new symbol(width*0.3, height*0.2)
  lines[2].setEnd(width*0.3,height*0.9)
  
  lines[3] = new symbol(7, 10)
  lines[3].setEnd(width*0.3,height*0.9)

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
  
  
}
setEnd(endx, endy) {
  this.endx = endx;
  this.endy = endy;
}


display() {

 let constrainedX = constrain(poster.posNormal.x, 0.2, 0.8);
 let lerpedPosx = map(constrainedX, 0.2, 0.8,  this.startx ,  this.endx);
 let lerpedPosy = map(constrainedX, 0.2, 0.8,  this.starty ,  this.endy);

    this.posx = lerpedPosx;
    this.posy = lerpedPosy;


    let dx = this.endx - this.startx;
    let dy = this.endy - this.starty;
    let angle = atan2(dy, dx); //angle festlegen

    stroke(255);

    push();
    translate(this.posx, this.posy);
    rotate(angle); // Rotate by the calculated angle
    line(-10, 0, 10, 0); // Drawing a line centered at (0, 0)
    pop();

    /*push();
    translate(this.startx, this.starty);
    let x = this.startx - width / 2;
    let y = this.starty - height / 2;
    let a = atan2(y, x);
    rotate(a);

    line(this.posx-10, this.posy-10, this.posx+10, this.posy+10);
    pop();
  
  stroke(255) 
    line(this.posx-10, this.posy-10, this.posx+10, this.posy+10);*/
  }
}


