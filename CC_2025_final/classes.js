// classes.js

class TriangleParticle {
  constructor(x, y) {
    this.pos = createVector(x, y);

    // Start tiny
    this.size = 1;

    //  size large enough to fill whole canvas
    this.maxSize = max(width, height) * 1.8;

    // Growth speed
    this.growthRate = 6;

    this.hue = random(360);
    // random webcam offset
    this.offX = random(-width * 0.5, width * 0.5);
    this.offY = random(-height * 0.5, height * 0.5);
  }

  update() {
    this.rot += this.rotSpeed;

    // Expand until covering canvas
    if (this.size < this.maxSize) {
      this.size += this.growthRate;
    }
  }

  display(videoFrame) {
    push();
    translate(this.pos.x, this.pos.y);
    

    drawingContext.save();
    drawingContext.beginPath();
    const s = this.size;
//makes the shape
    drawingContext.moveTo(0, -s);
    drawingContext.lineTo(s, s);
    drawingContext.lineTo(-s, s);
    drawingContext.closePath();
    drawingContext.clip();

    colorMode(HSB);
    tint(this.hue, 255, 255, 200);

    // centers the triangle so it grows outward
    imageMode(CENTER);
    let scale = max(width, height) * 2.5;
    image(videoFrame, this.offX, this.offY, scale, scale);

    drawingContext.restore();
    pop();
  }
}
