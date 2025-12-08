// sketch.js
let video;
let particles = [];
let running = false;
let btn;
let lastSpawn = 0;
let spawnInterval = 1000; // initial 1 second
let spawnDecrement = 50; // decrease interval progressively
let minSpawnInterval = 100; // cap at 0.1s

function setup() {
  createCanvas(1280, 720);
  colorMode(HSB); // hsb from my last project
// makes the webcam work
  video = createCapture(VIDEO);
  video.size(1280, 720);
  video.hide();

  btn = createButton("Start / Stop");
  btn.position(10, height - 40);
  btn.mousePressed(toggleRunning);
}

function toggleRunning() {
  running = !running;
  if (!running) {
    // Reset everything when stopped
    particles = [];
    spawnInterval = 1000;
  }
  lastSpawn = millis(); 
}

function draw() {
  background(0);

  // faint webcam background
  tint(0, 0, 255, 80);
  image(video, 0, 0, width, height);
  noTint();

  // timed triangle spawning with progressive speed
  if (running && millis() - lastSpawn >= spawnInterval) {
    particles.push(new TriangleParticle(width / 2, height / 2));
    lastSpawn = millis();

    // decreases interval progressively but will not go below min
    spawnInterval = max(minSpawnInterval, spawnInterval - spawnDecrement);
  }

  // update + draw
  for (let t of particles) {
    t.update();
    t.display(video);
  }

  // takes out triangles that have gone offscreen
  particles = particles.filter(t =>
    t.pos.x > -200 && t.pos.x < width + 200 &&
    t.pos.y > -200 && t.pos.y < height + 200
  );
}