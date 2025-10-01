const COLUMN_COUNT = 8;
const ROW_COUNT = 8;
let columnSize, rowSize;

let column = [];
let row = [];

let angle1, angle2, angle3, angle4;

function setup() {
  createCanvas(windowWidth, windowHeight);

  angleMode(DEGREES);

  angle1 = 0;
  angle2 = 0;
  angle3 = 0;
  angle4 = 0;

  columnSize = width / COLUMN_COUNT;
  rowSize = height / ROW_COUNT;

  for (i = 0; i < COLUMN_COUNT; i++) {
    column[i] = i * columnSize;
  }

  for (i = 0; i < ROW_COUNT; i++) {
    row[i] = i * rowSize;
  }
}

function draw() {
  background(11, 60, 94);

  drawGrid();

  drawPainting();
}

function drawGrid() {
  stroke(255);

  push();
  for (i = 1; i < COLUMN_COUNT; i++) {
    line(column[i], 0, column[i], height);
  }

  for (i = 1; i < ROW_COUNT; i++) {
    line(0, row[i], width, row[i]);
  }
  pop();
}

function drawPainting() {
  noStroke();
  fill(94, 13, 11);
  triangle(0, 0, 0, height, width, height);

  fill(114, 168, 224);
  triangle(column[3], row[3], width, row[3], width, height);

  fill(158, 30, 12);
  rect(0, row[6], columnSize * 5, rowSize * 2);

  fill(18, 88, 158);
  rect(0, row[3], columnSize * 3, rowSize * 3);

  push();
  rectMode(CENTER);

  push();
  translate(column[4], row[3] + rowSize / 2);
  fill(224, 95, 39);
  rotate(angle1);
  rect(0, 0, rowSize * 4);
  pop();

  push();
  translate(column[4], row[5]);
  fill(232, 223, 179);
  rotate(angle2);
  rect(0, 0, columnSize * 2, rowSize * 3);
  pop();

  pop();

  push();
  stroke(0);
  strokeWeight(4);
  fill(234, 193, 62);
  let circleSize = rowSize * 1.8;
  translate(column[7], row[1]);
  rotate(angle3);
  circle(0, 0, circleSize);
  line(0, 0, circleSize / 2, 0);
  pop();

  angle1 += 1;
  angle2 -= 0.5;
  angle3 += 20;
}
