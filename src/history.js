const undos = [];
const redos = [];

export const pushUndo = ctx => {
  undos.push(ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height));
}

export const popUndo = () => {
  const popped = undos.pop();
  redos.push(popped);
  return popped;
}

export const clearRedos = () => {
  redos.length = 0;
}

export const doUndo = ctx => {
  if (!undos.length) return;
  const poppedCanvas = popUndo();
  ctx.putImageData(poppedCanvas, 0, 0);
}
