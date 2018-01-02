import { pushUndo } from '../history';
import { toRGBA } from '../to-rgba';

export const fill = {
  onDrawStart({ctx, x, y}) {
    const [r0, g0, b0, a0] = toRGBA(ctx.fillStyle);
    const [r1, g1, b1, a1] = ctx.getImageData(x, y, 1, 1).data;

    if (r0 === r1 && g0 === g1 && b0 === b1 && a0 === a1) {
      // This pixel is already the right color, so return early
      return;
    }

    pushUndo(ctx, this.forceUpdate());

    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const w = imageData.width;
    const h = imageData.height;

    const getPixel = (x, y) => [
      imageData.data[4 * (y * w + x) + 0],
      imageData.data[4 * (y * w + x) + 1],
      imageData.data[4 * (y * w + x) + 2],
      imageData.data[4 * (y * w + x) + 3]
    ];

    const setPixel = (x, y, r, g, b, a) => {
      imageData.data[4 * (y * w + x) + 0] = r;
      imageData.data[4 * (y * w + x) + 1] = g;
      imageData.data[4 * (y * w + x) + 2] = b;
      imageData.data[4 * (y * w + x) + 3] = a;
    }

    const stack = [[x, y]];
    while (stack.length) {
      const [x2, y2] = stack.pop();
      const [r2, g2, b2, a2] = getPixel(x2, y2);

      if (r2 === r1 && g2 === g1 && b2 === b1 && a2 === a1) {
        setPixel(x2, y2, r0, g0, b0, a0);

        if (x2 > 0) stack.push([x2 - 1, y2]);
        if (x2 < w - 1) stack.push([x2 + 1, y2]);
        if (y2 > 0) stack.push([x2, y2 - 1]);
        if (y2 < h - 1) stack.push([x2, y2 + 1]);
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }
};
