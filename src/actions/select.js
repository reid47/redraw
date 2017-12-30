export const select = {
  onDrawStart({ghostCtx, x, y}) {
    this.setState({ canvasMouseDown: true, selectionActive: false });
    ghostCtx.clearRect(0, 0, ghostCtx.canvas.width, ghostCtx.canvas.height);
    this.canvasSelectStartX = x;
    this.canvasSelectStartY = y;
  },

  onDrawEnd({ghostCtx}) {
    this.setState({ canvasMouseDown: false });
  },

  onDrawMove({evt, ghostCtx, x, y}) {
    if (this.state.canvasMouseDown) {
      if (x === this.canvasSelectStartX) return;
      if (y === this.canvasSelectStartY) return;

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

      // ghostCtx.strokeStyle = 'white';
      // ghostCtx.beginPath();
      // ghostCtx.moveTo(startX, startY);
      // ghostCtx.lineTo(startX + w, startY);
      // ghostCtx.lineTo(startX + w, startY + h);
      // ghostCtx.lineTo(startX, startY + h);
      // ghostCtx.lineTo(startX, startY);
      // ghostCtx.closePath();
      // ghostCtx.stroke();

      ghostCtx.clearRect(startX, startY, w, h);
    }
  }
};
