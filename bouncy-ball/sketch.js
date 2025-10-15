const RADIUS = 10;
const SPEED = RADIUS * 2;
let x, y;
let velocity;

function setup() {
  createCanvas(windowWidth, windowHeight);

  velocity = new Vec(random(-1, 1), random(-1, 1));
  velocity.normalize();

  x = width / 2;
  y = height / 2;

  colorMode(OKLCH);
  background(95, 25, 92, 100);
}

function draw() {
  background(95, 25, 92, 0.0075);
  moveCircle();

  noStroke();
  colorMode(OKLCH);
  fill(80, 100, random(0, 360));
  circle(x, y, RADIUS * 2);

  handleCollision();
}

function moveCircle() {
  x += velocity.x * SPEED;
  y += velocity.y * SPEED;
}

function handleCollision() {
  if (RADIUS > x || x > windowWidth - RADIUS) {
    velocity.flip_x();
  }
  if (RADIUS > y || y > windowHeight - RADIUS) {
    velocity.flip_y();
  }
}

class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  length2() {
    return this.x ** 2 + this.y ** 2;
  }

  length() {
    return sqrt(this.length2());
  }

  normalize() {
    let length = this.length();
    this.x = this.x / length;
    this.y = this.y / length;
  }

  flip_x() {
    this.x = -this.x;
  }

  flip_y() {
    this.y = -this.y;
  }
}
