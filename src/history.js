const undos = [];
const redos = [];

export const pushUndo = (ctx, callback) => {
  redos.length = 0;
  undos.push(ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height));
  callback && callback();
}

export const doUndo = (ctx, callback) => {
  if (!undos.length) return;
  const data = undos.pop();
  redos.push(ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height));
  ctx.putImageData(data, 0, 0);
  callback && callback();
}

export const doRedo = (ctx, callback) => {
  if (!redos.length) return;
  const data = redos.pop();
  undos.push(ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height));
  ctx.putImageData(data, 0, 0);
  callback && callback();
}

export const canUndo = () => {
  return undos.length > 0;
}

export const canRedo = () => {
  return redos.length > 0;
}
