import { pushUndo } from '../history';

export const bucket = {
  cursor: 'url(assets/cursor-pencil.png), auto',

  onDrawStart({ctx, x, y}) {
    pushUndo(ctx);
    // this.setState({ canvasMouseDown: true });
    // line(ctx, x, y, x, y);
    // this.canvasMouseDownStartX = x;
    // this.canvasMouseDownStartY = y;
  },

  onDrawEnd() {
    // this.setState({ canvasMouseDown: false });
  },

  onDrawMove({ctx, x, y}) {
    // if (this.state.canvasMouseDown) {
    //   line(ctx, this.canvasMouseDownStartX, this.canvasMouseDownStartY, x, y);
    //   this.canvasMouseDownStartX = x;
    //   this.canvasMouseDownStartY = y;
    // }
  }
};
