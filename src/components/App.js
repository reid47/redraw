import React from 'react';
import { Toolbar } from './Toolbar';
import { Menubar } from './Menubar';
import { Statusbar } from './Statusbar';
import { Viewer } from './Viewer';
import { pushUndo, doUndo, doRedo } from '../history';

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

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'pencil',
      canvasWidth: 640,
      canvasHeight: 480,
      canvasMousePosX: null,
      canvasMousePosY: null,
      canvasMouseDown: false
    };
  }

  resizeCanvas = (newX, newY) => {
    if (newX && newY) {
      this.setState({
        canvasWidth: Math.max(newX, 16),
        canvasHeight: Math.max(newY, 16)
      });
    } else if (newX) {
      this.setState({
        canvasWidth: Math.max(newX, 16)
      });
    } else if (newY) {
      this.setState({
        canvasHeight: Math.max(newY, 16)
      });
    }
  }

  changeMode = newMode => {
    this.setState({
      mode: newMode
    });
  }

  render() {
    const {
      mode,
      canvasWidth,
      canvasHeight,
      canvasMousePosX,
      canvasMousePosY
    } = this.state;

    return (
      <div className="App">
        <Menubar {...{
          onUndo: () => doUndo(this.ctx),
          onRedo: () => doRedo(this.ctx)
        }}/>
        <Toolbar {...{
          mode,
          changeMode: this.changeMode
        }}/>
        <Viewer {...{
          canvasWidth,
          canvasHeight,
          resizeCanvas: this.resizeCanvas,
          ctxRef: ctx => this.ctx = ctx,
          updateMousePosition: (newX, newY) => this.setState({
            canvasMousePosX: newX,
            canvasMousePosY: newY
          }),
          onCanvasMouseDown: (ctx, x, y) => {
            pushUndo(ctx);
            this.setState({ canvasMouseDown: true });
            line(ctx, x, y, x, y);
            this.canvasMouseDownStartX = x;
            this.canvasMouseDownStartY = y;
          },
          onCanvasMouseMove: (ctx, x, y) => {
            if (this.state.canvasMouseDown) {
              line(ctx, this.canvasMouseDownStartX, this.canvasMouseDownStartY, x, y);
              this.canvasMouseDownStartX = x;
              this.canvasMouseDownStartY = y;
            }
          },
          onCanvasMouseUp: (evt, ctx) => {
            this.setState({ canvasMouseDown: false });
          }
        }}/>
        <Statusbar
          mouseX={canvasMousePosX}
          mouseY={canvasMousePosY} />
      </div>
    );
  }
}
