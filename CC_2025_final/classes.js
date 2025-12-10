class TriangleParticle {
  // Global color wheel value shared between ALL triangles
  static nextHue = 0;

  constructor(x, y) {
    this.pos = createVector(x, y);

    this.size = 1;
    this.maxSize = max(width, height) * 1.8;

    this.maxGrowth = 12;
    this.minGrowth = 2;

    // Assign this triangle the current hue
    this.hue = TriangleParticle.nextHue;

    // Move the wheel forward for the NEXT triangle
    TriangleParticle.nextHue = (TriangleParticle.nextHue + 5) % 360;

    // random video offset
    this.offX = random(-width * 0.5, width * 0.5);
    this.offY = random(-height * 0.5, height * 0.5);
  }

  update() {
    // do NOT rotate hue anymore — triangles keep their assigned color
    // (this is what makes the gradient build over time)

    // distance-based growth speed
    let center = createVector(width / 2, height / 2);
    let distFromCenter = p5.Vector.dist(this.pos, center);

    let growthSpeed = map(
      distFromCenter,
      0,
      max(width, height) / 2,
      this.maxGrowth,
      this.minGrowth
    );

    if (this.size < this.maxSize) {
      this.size += growthSpeed;
    }
  }

  display(videoFrame) {
    push();
    translate(this.pos.x, this.pos.y);

    drawingContext.save();
    drawingContext.beginPath();

    const s = this.size;
    drawingContext.moveTo(0, -s);
    drawingContext.lineTo(s, s);
    drawingContext.lineTo(-s, s);
    drawingContext.closePath();
    drawingContext.clip();

    // use the triangle's assigned hue
    colorMode(HSB);
    tint(this.hue, 255, 255, 255);

    imageMode(CENTER);
    let scale = max(width, height) * 2.5;
    image(videoFrame, this.offX, this.offY, scale, scale);

    drawingContext.restore();
    pop();
  }
}

