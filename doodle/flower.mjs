/**
 * @typedef {Object} FlowerOptions
 *
 * @property {Number} num_petals - the number of petals
 * @property {Number} inner_radius
 * @property {Number} outer_radius
 *
 * @property {import("./lines.mjs").LineOptions} [stroke_options]
 */

/**
 * @type {FlowerOptions}
 */
const DEFAULT_FLOWER = {
  num_petals: 6,
  inner_radius: 4,
  outer_radius: 28,
};

import { DEFAULT_LINE, draw_bezier } from "./lines.mjs";
import { INNER_NUDGE, OUTER_NUDGE } from "./sketch.mjs";
import { nudge_point, sleep } from "./utils.mjs";

/**
 * a flower
 * @property {p5.Vector} center - center point of the flower
 * @property {Number} rotation - the angle of the flower
 *
 * @property {FlowerOptions} options - flower options
 */
export class Flower {
  /**
   * @param {p5.Vector} center
   * @param {Number} rotation
   * @param {FlowerOptions} flower_options
   */
  constructor(center, rotation, flower_options) {
    this.center = center;
    this.rotation = rotation;
    this.options = flower_options;
  }

  move(center) {
    this.center = center;
  }

  get petal_arc_length() {
    return TWO_PI / this.options.num_petals;
  }

  /**
   * @param {Number} i - petal index
   * @param {import("./lines.mjs").LineOptions} [line={}]
   */
  draw_petal(i) {
    var line = { ...DEFAULT_LINE, ...this.options.stroke_options };

    var start_angle = this.rotation + i * this.petal_arc_length;

    const start_point = createVector(cos(start_angle), sin(start_angle));
    const end_point = createVector(
      cos(start_angle + this.petal_arc_length),
      sin(start_angle + this.petal_arc_length),
    );

    var p0 = nudge_point(
      this.center,
      p5.Vector.setMag(start_point, this.options.inner_radius),
    );
    var c0 = nudge_point(
      this.center,
      p5.Vector.setMag(start_point, this.options.outer_radius),
    );
    var c1 = nudge_point(
      this.center,
      p5.Vector.setMag(end_point, this.options.outer_radius),
    );
    var p1 = nudge_point(
      this.center,
      p5.Vector.setMag(end_point, this.options.inner_radius),
    );

    var offset_p0 = createVector(random(0, 1), random(0, 1));
    var offset_c0 = createVector(random(0, 1), random(0, 1));
    var offset_c1 = createVector(random(0, 1), random(0, 1));
    var offset_p1 = createVector(random(0, 1), random(0, 1));

    offset_p0.setMag(random(0, INNER_NUDGE));
    offset_c0.setMag(random(0, OUTER_NUDGE));
    offset_c1.setMag(random(0, OUTER_NUDGE));
    offset_p1.setMag(random(0, INNER_NUDGE));

    draw_bezier(
      nudge_point(p0, offset_p0),
      nudge_point(c0, offset_c0),
      nudge_point(c1, offset_c1),
      nudge_point(p1, offset_p1),
      line,
    );
  }

  async *draw_petals() {
    for (var i = 0; i < this.options.num_petals; i++) {
      await sleep(random(200, 250));
      this.draw_petal(i);
      await sleep(this.options.stroke_options.draw_time + random(10, 30));
    }
  }
}

export function random_flower(opts = {}) {
  return new Flower(createVector(0, 0), random(0, TWO_PI), {
    ...DEFAULT_FLOWER,
    ...opts,
  });
}
