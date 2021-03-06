import { pushUndo } from '../history';
import { saveCanvasData } from '../storage';

// Thanks to: https://github.com/1j01/jspaint
function line(ctx, x1, y1, x2, y2) {
  x1 = x1 | 0;
  x2 = x2 | 0;
  y1 = y1 | 0;
  y2 = y2 | 0;

  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  const sx = (x1 < x2) ? 1 : -1;
  const sy = (y1 < y2) ? 1 : -1;

  let err = dx - dy;
  while (1) {
    ctx.clearRect(x1, y1, 1, 1);
    ctx.fillRect(x1, y1, 1, 1);

    if (x1 === x2 && y1 === y2) break;
    const e2 = err * 2;
    if (e2 > -dy) { err -= dy; x1 += sx; }
    if (e2 < dx) { err += dx; y1 += sy; }
  }
}

export const draw = {
  onDrawStart({ctx, x, y}) {
    pushUndo(ctx);
    this.setState({ canvasMouseDown: true });
    ctx.clearRect(x, y, 1, 1);
    ctx.fillRect(x, y, 1, 1);
    this.canvasMouseDownStartX = x;
    this.canvasMouseDownStartY = y;
  },

  onDrawEnd({ctx}) {
    this.setState({ canvasMouseDown: false });
    saveCanvasData(ctx);
  },

  onDrawMove({ctx, x, y}) {
    if (this.state.canvasMouseDown) {
      line(ctx, this.canvasMouseDownStartX, this.canvasMouseDownStartY, x, y);
      this.canvasMouseDownStartX = x;
      this.canvasMouseDownStartY = y;
    }
  }
};
