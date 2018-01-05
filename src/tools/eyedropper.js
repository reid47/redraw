import { fromRGBA } from '../rgba';

export const eyedropper = {
  onDrawStart({ctx, x, y, changeCurrentColor, resetToLastMode}) {
    const [r, g, b, a] = ctx.getImageData(x, y, 1, 1).data;
    changeCurrentColor(fromRGBA({r, g, b, a: a / 255}));
    resetToLastMode();
  }
};
