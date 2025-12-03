import { Flower, random_flower } from "./flower.mjs";
import { shuffle } from "./utils.mjs";
import {
  FLOWER_SPACING,
  INNER_MAX,
  INNER_MIN,
  OUTER_MAX,
  OUTER_MIN,
} from "./sketch.mjs";

export function make_flowers() {
  /** @type [Flower] */
  var flowers = [];

  var num_x = floor(width / FLOWER_SPACING);
  var num_y = floor(height / FLOWER_SPACING);

  var grid_width = num_x * FLOWER_SPACING;
  var grid_height = num_y * FLOWER_SPACING;

  var x_offset = (width - grid_width) / 2;
  var y_offset = (height - grid_height) / 2;

  for (var x = 0; x < num_x; x++) {
    for (var y = 0; y < num_y; y++) {
      var center = createVector(
        x_offset + random(x * FLOWER_SPACING, (x + 1) * FLOWER_SPACING),
        y_offset + random(y * FLOWER_SPACING, (y + 1) * FLOWER_SPACING),
      );

      var flower = random_flower({
        num_petals: floor(random(5, 12)),
        inner_radius: random(INNER_MIN, INNER_MAX),
        outer_radius: random(OUTER_MIN, OUTER_MAX),
        stroke_options: {
          stroke: "black",
          weight: 0.1,
          thickness: 0.1,
          spacing: 0.05,
          jitter: 2,
        },
      });

      flower.move(center);

      flowers.push(flower);
    }
  }

  shuffle(flowers);

  return flowers;
}
