const undos = [];
const redos = [];

export const pushUndo = ctx => {
  redos.length = 0;
  undos.push(ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height));
}

export const doUndo = ctx => {
  if (!undos.length) return;
  const data = undos.pop();
  redos.push(ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height));
  ctx.putImageData(data, 0, 0);
}

export const doRedo = ctx => {
  if (!redos.length) return;
  const data = redos.pop();
  undos.push(ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height));
  ctx.putImageData(data, 0, 0);
}

export const canUndo = () => {
  return undos.length > 0;
}

export const canRedo = () => {
  return redos.length > 0;
}
