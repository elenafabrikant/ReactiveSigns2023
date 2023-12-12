let lines = [];
let buffer;
let buffer2;
let imagePixels = [];

// Photoshop dec with the colour coded lines (1 Bild für Anfang, 1 Bild für Ende)
function preload() {
  buffer = loadImage('assets/Beginning.png');
  buffer2 = loadImage('assets/End.png');
}

// SETUP
function setup() {
  createCanvas(poster.getWindowWidth(), poster.getWindowHeight()); // Don't remove this line.
  poster.setup(this,  "/Poster_Templates/libraries/assets/models/movenet/model.json");  // Don't remove this line.
  textAlign(CENTER, CENTER);
  textSize(10 * poster.vw);

  lines[0] = new symbol(width * 0.2, height * 0.2);
  lines[0].setEnd(width * 0.8, height * 0.8);

  lines[1] = new symbol(width * 0.3, height * 0.2);
  lines[1].setEnd(width * 0.6, height * 0.8);

  lines[2] = new symbol(width * 0.3, height * 0.2);
  lines[2].setEnd(width * 0.3, height * 0.9);

  lines[3] = new symbol(7, 10);
  lines[3].setEnd(width * 0.3, height * 0.9);

  lines[4] = new symbol(2, 10);
  lines[4].setEnd(width * 0.3, height * 0.9);
}

function draw() {
  background(0, 0, 0, 50);
  // looping through the lines
  for (let i = 0; i < lines.length; i++) {
    lines[i].update();
    lines[i].display();
  }
  fill(255);

  poster.posterTasks(); // do not remove this last line!
}

class symbol {
  constructor(startx, starty) {
    this.startx = startx;
    this.starty = starty;
    this.animationPos = 0;
    this.inStartPos = false;
    this.animationSpeed = 0.03;
    this.posx = this.startx;
    this.posy = this.starty;
    this.angle = 0;
    this.rotationSpeed = 0.01; // Geschwindigkeit der Rotation
  }

  setEnd(endx, endy) {
    this.endx = endx;
    this.endy = endy;
  }

  update() {
    // Überprüfe, ob sich die Linie bewegt
    if (dist(this.startx, this.starty, this.endx, this.endy) > 1) {
      let dx = this.startx - this.endx;
      let dy = this.starty - this.endy;
      let currentSpeed = dist(this.startx, this.starty, this.endx, this.endy);
  
      // Überprüfe, ob die Linie nicht an der Start- oder Endposition ist, bevor die Rotation aktualisiert wird
      if ((this.posx !== this.startx || this.posy !== this.starty) && (this.posx !== this.endx || this.posy !== this.endy)) {
        // Aktualisiere den Winkel basierend auf der aktuellen Geschwindigkeit
        this.angle += this.rotationSpeed * currentSpeed;
      }
    }
  }
  
  

  display() {
    let constrainedX = constrain(poster.posNormal.x, 0.2, 0.8);
    let lerpedPosx = map(constrainedX, 0.2, 0.8, this.startx, this.endx);
    let lerpedPosy = map(constrainedX, 0.2, 0.8, this.starty, this.endy);

    this.posx = lerpedPosx;
    this.posy = lerpedPosy;

    stroke(255);
    push();
    translate(this.posx, this.posy);
    
    // Überprüfe, ob die Linie bewegt wird, bevor die Rotation aktualisiert wird
    if (dist(this.startx, this.starty, this.endx, this.endy) > 1) {
      rotate(this.angle);
    }

    line(-10, 0, 10, 0);
    pop();
  }
}



