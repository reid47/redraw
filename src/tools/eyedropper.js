export const eyedropper = {
  onDrawStart({ctx, x, y, changeCurrentColor, resetToLastMode}) {
    const [r, g, b, a] = ctx.getImageData(x, y, 1, 1).data;
    changeCurrentColor({r, g, b, a});
    resetToLastMode();
  }
};
