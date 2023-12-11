let lines;
let buffer;
let buffer2;
let imagePixels = [];

//Photoshop dec with the colour coded lines (1Bild für Anfang, 1 Bild für Ende)
/*function preload(){
buffer = loadImage()
buffer2 = loadImage()

}*/


//SETUP
function setup() {
   createCanvas(poster.getWindowWidth(), poster.getWindowHeight()); // Don't remove this line. 
   poster.setup(this,  "/Poster_Templates/libraries/assets/models/movenet/model.json");  // Don't remove this line. 
  textAlign(CENTER, CENTER);
  textSize(10 * poster.vw);

  line = new line(width*0.2, height*0.2)
  line.setEnd(width*0.8,height*0.8)
}

// Looping through the lines of the typography and moving the elements of the typography
/*function setupLines(){
  lines = [];
}
*/
function draw() {
  background(0, 0, 0, 50);
  //looping through the lines
  //for (let i = 0; i < line.length; i++) {
  //  line[i].draw();
  //}
  fill(255);
  line.display();
 poster.posterTasks(); // do not remove this last line!  
}

function windowScaled() { // this is a custom event called whenever the poster is scaled
  textSize(10 * poster.vw);
  setuplines()
}


class line {

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


display() {
  if(poster.position.x >= this.posx-5 && poster.position.x <= this.posx+5) {
    console.log(this.inStartPos)
      this.inStartPos =  !this.inStartPos;

  }

  let lerpedPosx = lerp(this.startx, this.endx, this.inStartPos ? 0 : 1);
    let lerpedPosy = lerp(this.starty, this.endy, this.inStartPos ? 0 : 1);

    this.posx = lerpedPosx;
    this.posy = lerpedPosy;

    //this.posx = map(this.poster.position.x, 0, 1, this.startx * screen1.w, screen3.x + (this.endx * screen1.w))
    //this.posy = map(this.poster.position.x, 0, 1, this.starty * screen1.h, screen3.y + (this.endy * screen1.h))
  

    rect(this.posx, this.posy, 10, 10);
  }
}


