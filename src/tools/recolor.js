import { pushUndo } from '../history';
import { toRGBA } from '../to-rgba';

export const recolor = {
  onDrawStart({ctx, x, y}) {
    const [r0, g0, b0, a0] = toRGBA(ctx.fillStyle);
    const [r1, g1, b1, a1] = ctx.getImageData(x, y, 1, 1).data;

    pushUndo(ctx, this.forceUpdate);

    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let i = 0; i < imageData.data.length; i += 4) {
      const r = imageData.data[i + 0];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];
      const a = imageData.data[i + 3];

      if (r === r1 && g === g1 && b === b1 && a === a1) {
        imageData.data[i + 0] = r0;
        imageData.data[i + 1] = g0;
        imageData.data[i + 2] = b0;
        imageData.data[i + 3] = a0;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }
};
