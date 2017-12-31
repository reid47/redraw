const cache = {};

/**
 * Given a string representing a color (e.g. "red"
 * or "#ff0000" or "rgba(255, 0, 0, 1)"), convert it
 * into an array of 4 numbers: the red value, the green
 * value, the blue value, and the alpha value, in that
 * order: [r, g, b, a].
 */
export const toRGBA = colorString => {
  // Since the canvas operations might be expensive, and
  // since the same color string should always give us
  // the same RGBA values, we cache the results.
  if (cache[colorString]) return cache[colorString];

  // To do the conversion, we rely on the canvas' ability
  // to take in these number strings and render things
  // using RGBA. Create a 1x1 rectangle on a temporary
  // canvas with the given color.
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = colorString;
  ctx.fillRect(0, 0, 1, 1);

  // Then, grab the pixel data from the canvas for that
  // 1x1 rectangle and return that.
  return [...ctx.getImageData(0, 0, 1, 1).data];
};
