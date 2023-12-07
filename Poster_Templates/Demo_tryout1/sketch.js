let lines;
function setup() {
   /*important!*/ createCanvas(poster.getWindowWidth(), poster.getWindowHeight()); // Don't remove this line. 
  /*important!*/ poster.setup(this,  "/Poster_Templates/libraries/assets/models/movenet/model.json");  // Don't remove this line. 
  textAlign(CENTER, CENTER);
  textSize(10 * poster.vw);

  line = new line(width*0.2, height*0.2)

  line.setEnd(width*0.8,height*0.8)
}

function draw() {
  background(0, 0, 0, 50);
  fill(255);
  line.display();
/*important!*/ poster.posterTasks(); // do not remove this last line!  
}

function windowScaled() { // this is a custom event called whenever the poster is scaled
  textSize(10 * poster.vw);
}


class line {

constructor(startx, starty){
  this.startx = startx;
  this.starty = starty;
  this.inStartPos = false;
  this.posx = this.startx;
  this.posy = this.startx;
}
setEnd(endx, endy) {
  this.endx = endx;
  this.endy = endy
}
display() {


  if(poster.position.x >= this.posx-5 && poster.position.x <= this.posx+5) {
    console.log(this.inStartPos)
      this.inStartPos =  !this.inStartPos;

  }

  if (this.inStartPos == true) {
   this.posx = this.startx; 
    this.posy = this.starty;
  } else {
   this.posx = this.endx; 
  this.posy = this.endy;
  }
  rect(this.posx, this.posy, 10,10)
}

}





