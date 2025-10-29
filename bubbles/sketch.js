const MIN_RADIUS = 30;
const MAX_RADIUS = 50;

const POP_FRAMES = 3;
const POP_LINES = 9;

const BUOYANCY = 20;
const TURBULANCE = 10;

const NOISE_SCALE = 10;

const MAX_SPEED = 8;

const MIN_DELAY = 50;
const MAX_DELAY = 2000;

let bubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  frameRate(12);

  colorMode(OKLCH);
  background(0);

  spawn_bubble();
  spawn_bubble();
  spawn_bubble();
}

function spawn_bubble() {
  bubbles.push(
    new Bubble(
      map(random(), 0, 1, MIN_RADIUS, MAX_RADIUS),
      width * random(),
      height * random(),
    ),
  );

  setTimeout(
    () => {
      spawn_bubble();
    },
    map(random(), 0, 1, MIN_DELAY, MAX_DELAY),
  );
}

function draw() {
  background(0);

  bubbles.forEach(function (bubble) {
    bubble.draw();
    bubble.update_bubble();
  });
  bubbles = bubbles.filter((bubble) => !bubble.done);
}

class Bubble {
  constructor(radius, x, y) {
    this.radius = radius;
    this.pos = [x, y];
    this.velocity = [0, -BUOYANCY];
    this.popped = false;
    this.done = false;
  }

  get speed2() {
    return this.velocity[0] ** 2 + this.velocity[1] ** 2;
  }

  get speed() {
    return sqrt(this.speed2);
  }

  get x() {
    return this.pos[0];
  }
  set x(x) {
    this.pos[0] = x;
  }
  get y() {
    return this.pos[1];
  }
  set y(y) {
    this.pos[1] = y;
  }

  noise(x) {
    let value = map(noise(x), 0, 1, -1, 1);
    return value;
  }

  draw_pop_line(angle) {
    let x = cos(angle);
    let y = sin(angle);

    let inner_radius =
      this.radius * ((POP_FRAMES - this.pop_time) / POP_FRAMES);

    let x0 = this.x + x * inner_radius;
    let y0 = this.y + y * inner_radius;

    let x1 = this.x + x * this.radius;
    let y1 = this.y + y * this.radius;

    line(x0, y0, x1, y1);
  }

  draw() {
    push();

    stroke(50, 70, 240);
    fill(0);

    if (!this.popped) {
      circle(this.x, this.y, this.radius * 2);
    } else {
      for (let angle = 0; angle < 2 * PI; angle += (2 * PI) / POP_LINES) {
        this.draw_pop_line(angle);
      }
    }

    pop();
  }

  update_velocity() {
    // move with the currents
    this.velocity[0] += TURBULANCE * this.noise(this.x * NOISE_SCALE);
    this.velocity[1] += TURBULANCE * this.noise(this.y * NOISE_SCALE + 99999);

    // do buoyancy
    this.velocity[1] -= 1;

    if (this.speed > MAX_SPEED) {
      this.velocity[0] = (this.velocity[0] / this.speed) * MAX_SPEED;
      this.velocity[1] = (this.velocity[1] / this.speed) * MAX_SPEED;
    }
  }

  update_bubble() {
    if (!this.popped) {
      this.x += this.velocity[0];
      this.y += this.velocity[1];

      this.update_velocity();

      if (this.y < this.radius) {
        this.popped = true;
        this.pop_time = POP_FRAMES;
      }
    } else {
      if (this.pop_time < 0) {
        this.done = true;
      } else {
        this.pop_time--;
      }
    }
  }
}
