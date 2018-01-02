const undos = [];
const redos = [];

const getCanvasData = ctx => ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

export const pushUndo = (ctx, callback) => {
  redos.length = 0;
  undos.push(getCanvasData(ctx));
  callback && callback();
}

export const doUndo = (ctx, callback) => {
  if (!undos.length) return;
  const poppedData = undos.pop();
  redos.push(getCanvasData(ctx));
  ctx.putImageData(poppedData, 0, 0);
  callback && callback();
}

export const doRedo = (ctx, callback) => {
  if (!redos.length) return;
  const poppedData = redos.pop();
  undos.push(getCanvasData(ctx));
  ctx.putImageData(poppedData, 0, 0);
  callback && callback();
}

export const canUndo = () => {
  return undos.length > 0;
}

export const canRedo = () => {
  return redos.length > 0;
}
