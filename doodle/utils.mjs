/**
 * @param {p5.Vector} v0 - starting point
 * @param {p5.Vector} v1 - ending point
 * @param {number} t - blend factor
 *
 * @returns {p5.Vector}
 */
export function lerp(v0, v1, t) {
  return p5.Vector.lerp(v0, v1, t);
}

/**
 * @param {p5.Vector} p - point to nudge
 * @param {p5.Vector} offset - nudge amount
 *
 * @returns {p5.Vector}
 */
export function nudge_point(p, offset) {
  return createVector(p.x + offset.x, p.y + offset.y);
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}
