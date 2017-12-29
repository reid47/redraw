import { pushUndo } from '../history';

export const select = {
  onDrawStart({ghostCtx, x, y}) {
    this.setState({ canvasMouseDown: true });
    ghostCtx.clearRect(0, 0, ghostCtx.canvas.width, ghostCtx.canvas.height);
    this.canvasSelectStartX = x;
    this.canvasSelectStartY = y;
  },

  onDrawEnd({ghostCtx}) {
    this.setState({ canvasMouseDown: false });
    // ghostCtx.clearRect(0, 0, ghostCtx.canvas.width, ghostCtx.canvas.height);
  },

  onDrawMove({ghostCtx, x, y}) {
    if (this.state.canvasMouseDown) {
      ghostCtx.clearRect(0, 0, ghostCtx.canvas.width, ghostCtx.canvas.height);
      ghostCtx.fillStyle = 'rgba(0,0,0,0.4)';
      ghostCtx.fillRect(0, 0, ghostCtx.canvas.width, ghostCtx.canvas.height);
      ghostCtx.clearRect(
        Math.min(this.canvasSelectStartX, x),
        Math.min(this.canvasSelectStartY, y),
        Math.abs(this.canvasSelectStartX - x),
        Math.abs(this.canvasSelectStartY - y));
    }
  }
};
