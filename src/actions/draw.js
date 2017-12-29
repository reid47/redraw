import { pushUndo } from '../history';

function bresenham(x1, y1, x2, y2, callback) {
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
    callback(x1, y1);

    if (x1 === x2 && y1 === y2) break;
    const e2 = err * 2;
    if (e2 >-dy) { err -= dy; x1 += sx; }
    if (e2 < dx) { err += dx; y1 += sy; }
  }
}

function line(ctx, x1, y1, x2, y2) {
  bresenham(x1, y1, x2, y2, (x,y) => {
    ctx.fillRect(x, y, 1, 1);
  });
}

export const draw = {
  onDrawStart({ctx, x, y}) {
    pushUndo(ctx);
    this.setState({ canvasMouseDown: true });
    ctx.fillRect(x, y, 1, 1);
    this.canvasMouseDownStartX = x;
    this.canvasMouseDownStartY = y;
  },

  onDrawEnd() {
    this.setState({ canvasMouseDown: false });
  },

  onDrawMove({ctx, x, y}) {
    if (this.state.canvasMouseDown) {
      line(ctx, this.canvasMouseDownStartX, this.canvasMouseDownStartY, x, y);
      this.canvasMouseDownStartX = x;
      this.canvasMouseDownStartY = y;
    }
  }
};
