import { lerp, nudge_point } from "./utils.mjs";

/**
 * @typedef {Object} LineOptions
 *
 * @property {string} stroke? - point stroke color
 * @property {Number} weight? - point stroke weight
 * @property {string} fill? - point fill color
 * @property {Number} spacing? - point spacing
 * @property {Number} thickness? - point thickness
 * @property {Number} jitter? - point jitter
 *
 * @property {Number} draw_time? - draw time in milliseconds
 */

/** @type {LineOptions} */
export const DEFAULT_LINE = {
  stroke: "orange",
  spacing: 1.5,
  thickness: 3,
  jitter: 1,

  draw_time: 150,
};

/**
 * @property {p5.Vector} center
 * @property {LineOptions} [line]
 */
function draw_point(center, line = {}) {
  var line = { ...DEFAULT_LINE, ...line };

  push();

  noStroke();
  noFill();
  if (line.stroke != null) {
    stroke(line.stroke);
  }
  if (line.weight != null) {
    strokeWeight(line.weight);
  }
  if (line.fill != null) {
    fill(line.fill);
  }

  console.log(line);

  var offset = createVector(random(0, 1), random(0, 1));
  if (line.jitter != null) {
    offset.setMag(line.jitter);
  } else {
    offset.setMag(0);
  }

  const c = nudge_point(center, offset);

  circle(c.x, c.y, line.thickness);
  pop();
}

/**
 * @param {p5.Vector} p0 - starting point
 * @param {p5.Vector} p1 - ending point
 * @param {LineOptions} [line = {}]
 */
export function draw_line(p0, p1, line = {}) {
  var line = { ...DEFAULT_LINE, ...line };

  var line_length = p0.dist(p1);
  var num_points = line_length / line.spacing;
  var point_interval = line.draw_time / num_points;

  var delay = 0;

  for (let i = 0; i < num_points; i++) {
    setTimeout(() => {
      draw_point(center, line);
    }, delay);
    delay += point_interval;
  }
}

/**
 * @param {p5.Vector} p0 - starting point
 * @param {p5.Vector} c0 - control point 1
 * @param {p5.Vector} c1 - control point 2
 * @param {p5.Vector} p1 - ending point
 * @param {Number} t
 */
function point_on_curve(p0, c0, c1, p1, t) {
  var i0 = lerp(p0, c0, t);
  var i1 = lerp(c0, c1, t);
  var i2 = lerp(c1, p1, t);

  var i3 = lerp(i0, i1, t);
  var i4 = lerp(i1, i2, t);

  return lerp(i3, i4, t);
}

/**
 * @param {p5.Vector} p0 - starting point
 * @param {p5.Vector} c0 - control point 1
 * @param {p5.Vector} c1 - control point 2
 * @param {p5.Vector} p1 - ending point
 * @param {LineOptions} [line = {}]
 */
export function draw_bezier(p0, c0, c1, p1, line = {}) {
  const SEGMENTS = 6;

  var line = { ...DEFAULT_LINE, ...line };

  var points = [];

  for (var i = 0; i <= SEGMENTS; i++) {
    var t = i / SEGMENTS;

    points.push(point_on_curve(p0, c0, c1, p1, t));
  }

  var length = 0;

  for (var i = 1; i < points.length; i++) {
    length += points[i - 1].dist(points[i]);
  }

  var num_points = length / line.spacing;

  for (var i = 0; i <= num_points; i++) {
    const t = i / num_points;
    setTimeout(() => {
      draw_point(point_on_curve(p0, c0, c1, p1, t), line);
    }, line.draw_time * t);
  }
}

/**
 * @param {p5.Vector} p0 - starting point
 * @param {p5.Vector} c0 - control point 1
 * @param {p5.Vector} c1 - control point 2
 * @param {p5.Vector} p1 - ending point
 * @param {LineOptions} [line = {}]
 * @param {number} [segments = 6] - number of line segments for the bezier curve. int please
 */
export function draw_bezier_segmented(
  p0,
  c0,
  c1,
  p1,
  line = {},
  segments = 12,
) {
  var line = { ...DEFAULT_LINE, ...line };

  var points = [];

  for (var i = 0; i <= segments; i++) {
    var t = i / segments;

    points.push(point_on_curve(p0, c0, c1, p1, t));
    var t = i / segments;
  }

  const draw_time = line.draw_time;

  var length = 0;

  for (var i = 1; i < points.length; i++) {
    length += points[i - 1].dist(points[i]);
  }

  function draw_segment(i) {
    if (i < points.length) {
      var p0 = points[i - 1];
      var p1 = points[i];

      var time = draw_time / (length / p0.dist(p1));

      draw_line(p0, p1, { ...line, draw_time: time });
      setTimeout(() => {
        draw_segment(i + 1);
      }, time);
    }
  }

  draw_segment(1);
}
