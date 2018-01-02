import { saveCanvasData } from '../storage';

export const select = {
  onDrawStart({ctx, ghostCtx, x, y}) {
    this.setState({ canvasMouseDown: true, selectionActive: false });

    if (this.state.movingGhost) {
      // If we're currently pasting something from the clipboard...
      if (x >= this.state.selectionStartX && x <= this.state.selectionStartX + this.state.selectionWidth
        && y >= this.state.selectionStartY && y <= this.state.selectionStartY + this.state.selectionHeight) {
        // ...and we have clicked inside the pasted region, return
        // early without clearing anything. We'll handle moving the pasted
        // region in onDrawMove.
        return;
      } else {
        // ...and we have clicked outside the pasted region, complete the
        // pasting by copying the pasted data from the ghost canvas onto
        // the real canvas.
        ctx.drawImage(
          ghostCtx.canvas,
          this.state.selectionStartX,
          this.state.selectionStartY,
          this.state.selectionWidth,
          this.state.selectionHeight,
          this.state.selectionStartX,
          this.state.selectionStartY,
          this.state.selectionWidth,
          this.state.selectionHeight);
        saveCanvasData(ctx);
      }
    }

    this.setState({ movingGhost: false });
    ghostCtx.clearRect(0, 0, ghostCtx.canvas.width, ghostCtx.canvas.height);
    this.canvasSelectStartX = x;
    this.canvasSelectStartY = y;
  },

  onDrawEnd({ghostCtx}) {
    this.setState({ canvasMouseDown: false });
  },

  onDrawMove({evt, ghostCtx, x, y}) {
    if (this.state.canvasMouseDown) {
      if (this.state.movingGhost) {
        ghostCtx.clearRect(0, 0, ghostCtx.canvas.width, ghostCtx.canvas.height);
        ghostCtx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ghostCtx.fillRect(0, 0, ghostCtx.canvas.width, ghostCtx.canvas.height);
        ghostCtx.putImageData(this.state.clipboardData, x, y);

        this.setState({
          selectionActive: true,
          selectionStartX: x,
          selectionStartY: y,
          selectionWidth: this.state.clipboardWidth,
          selectionHeight: this.state.clipboardHeight
        });
      } else {
        if (x === this.canvasSelectStartX || y === this.canvasSelectStartY) return;

        ghostCtx.clearRect(0, 0, ghostCtx.canvas.width, ghostCtx.canvas.height);
        ghostCtx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ghostCtx.fillRect(0, 0, ghostCtx.canvas.width, ghostCtx.canvas.height);

        const selectW = Math.abs(this.canvasSelectStartX - x);
        const selectH = Math.abs(this.canvasSelectStartY - y);

        let startX, startY, w, h;
        if (!evt.shiftKey) {
          startX = Math.min(this.canvasSelectStartX, x);
          startY = Math.min(this.canvasSelectStartY, y);
          w = selectW;
          h = selectH;
        } else {
          const size = Math.max(selectW, selectH);
          startX = x < this.canvasSelectStartX
            ? this.canvasSelectStartX - size
            : this.canvasSelectStartX;
          startY = y < this.canvasSelectStartY
            ? this.canvasSelectStartY - size
            : this.canvasSelectStartY;
          w = size;
          h = size;
        }

        this.setState({
          selectionActive: true,
          selectionStartX: startX,
          selectionStartY: startY,
          selectionWidth: w,
          selectionHeight: h
        });

        ghostCtx.clearRect(startX, startY, w, h);
      }
    }
  }
};
