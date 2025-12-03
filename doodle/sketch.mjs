// import { draw_bezier } from "./lines.mjs";

import { Flower, random_flower } from "./flower.mjs";
import { make_flowers } from "./grid.mjs";
import { sleep } from "./utils.mjs";

export const FLOWER_SPACING = 175;

export const INNER_MIN = 2;
export const INNER_MAX = 8;
export const OUTER_MIN = 26;
export const OUTER_MAX = 32;

export const INNER_NUDGE = 3;
export const OUTER_NUDGE = 10;

async function setup() {
  createCanvas(windowWidth, windowHeight);

  colorMode(OKLCH);
  background(90, 3, 75);

  var flowers = make_flowers();

  var gen = draw_flowers(flowers);

  while (true) {
    var result = await gen.next();
    var value = result.value;
    if (value == null) {
      break;
    }
  }
}

async function* draw_flowers(flowers) {
  for (var i = 0; i < flowers.length; i++) {
    yield* flowers[i].draw_petals();

    await sleep(random(125, 175));
  }
}

window.setup = setup;
