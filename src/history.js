const undos = [];
const redos = [];

export const pushUndo = ctx => {
  redos.length = 0;
  undos.push(ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height));
}

export const doUndo = ctx => {
  if (!undos.length) return;
  const popped = undos.pop();
  redos.push(popped);
  ctx.putImageData(popped, 0, 0);
}

export const doRedo = ctx => {
  if (!redos.length) return;
  const popped = redos.pop();
  undos.push(popped);
  ctx.putImageData(popped, 0, 0);
}

