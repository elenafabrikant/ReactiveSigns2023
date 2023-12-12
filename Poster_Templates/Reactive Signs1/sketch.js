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
  poster.setup(this, "/Poster_Templates/libraries/assets/models/movenet/model.json");  // Don't remove this line.
  textAlign(CENTER, CENTER);
  textSize(10 * poster.vw);

  lines[0] = new symbol(width * 0.02, height * 0.2, width * 0.8, height * 0.8, 135);
  lines[1] = new symbol(width * 0.029, height * 0.3, width * 0.6, height * 0.8, 135);
  lines[2] = new symbol(width * 0.3, height * 0.2, width * 0.3, height * 0.9, 60);
  lines[3] = new symbol(7, 10, width * 0.3, height * 0.9, 90);
  lines[4] = new symbol(2, 10, width * 0.3, height * 0.9, 120);
}

function draw() {
  // Hintergrundfarbe ändern, wenn pos x in der Mitte des Bildschirms ist
  if (poster.posNormal.x < 0.5) {
    background(255, 255, 255,);
    stroke(0);
  } else {
    background(0, 0, 0,);
    stroke(255);
  }

  // Schleife durch die Linien
  for (let i = 0; i < lines.length; i++) {
    lines[i].update();
    lines[i].display();
  }
  fill(255);

  poster.posterTasks(); // do not remove this last line!
}

class symbol {
  constructor(startx, starty, endx, endy, startAngle) {
    this.startx = startx;
    this.originalStartAngle = startAngle; // Speichert den ursprünglichen Winkel
    this.starty = starty;
    this.animationPos = 0;
    this.inStartPos = false;
    this.animationSpeed = 0.03;
    this.posx = this.startx;
    this.posy = this.starty;
    

    // Startwinkel als Parameter hinzugefügt
    this.startAngleDegrees = startAngle;

    // Initialisieren des aktuellen Winkels mit dem Startwinkel
    this.angle = this.startAngleDegrees;

    this.endx = endx;
    this.endy = endy;
    this.rotationSpeed = 0.01; // Geschwindigkeit der Rotation

    this.prevPosx = this.posx;
    this.prevPosy = this.posy;

    this.rotationDirection = 1; // 1 für positive Rotation, -1 für negative Rotation
  }

  update() {
    // Überprüfe, ob sich die Linie bewegt
    let dx = this.posx - this.prevPosx;
    let dy = this.posy - this.prevPosy;
    let currentSpeed = dist(this.startx, this.starty, this.endx, this.endy);

    // Überprüfe, ob die Linie nicht an der Start- oder Endposition ist, bevor die Rotation aktualisiert wird
    if (abs(dx) > 1 || abs(dy) > 1) {
      // Aktualisiere den Winkel basierend auf der aktuellen Geschwindigkeit
      this.angle += this.rotationDirection * this.rotationSpeed * currentSpeed;
    } else {
      // Glätte den Übergang zum ursprünglichen Winkel
      this.angle = lerp(this.angle, this.originalStartAngle, 0.1);
    }

    // Begrenze den Winkel im Bereich von 0 bis 360 Grad
    this.angle = (this.angle + 360) % 360;

    // Setze die Rotation auf negativ, wenn der Winkel den ursprünglichen Startwinkel erreicht
    if (this.angle === this.originalStartAngle) {
      this.rotationDirection = -1;
    }

    // Speichere die aktuellen Positionen für den nächsten Update-Schritt
    this.prevPosx = this.posx;
    this.prevPosy = this.posy;
  }

  display() {
    let constrainedX = constrain(poster.posNormal.x, 0.2, 0.8);
    let lerpedPosx = map(constrainedX, 0.2, 0.8, this.startx, this.endx);
    let lerpedPosy = map(constrainedX, 0.2, 0.8, this.starty, this.endy);

    this.posx = lerpedPosx;
    this.posy = lerpedPosy;

    push();
    translate(this.posx, this.posy);

    // Überprüfe, ob die Linie bewegt wird, bevor die Rotation aktualisiert wird
    if (dist(this.startx, this.starty, this.endx, this.endy) > 1) {
      rotate(radians(this.angle)); // Umwandlung in Bogenmaß vor der Rotation
    }

    line(-5, 0, 10, 0);
    pop();
  }
}




