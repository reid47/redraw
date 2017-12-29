import React from 'react';
import { Toolbar } from './Toolbar';
import { Statusbar } from './Statusbar';
import { Canvas } from './Canvas';
import { doUndo, doRedo, canUndo, canRedo } from '../history';
import * as actions from '../actions';

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'draw',
      pixelSize: 10,
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

  changePixelSize = newPixelSize => {
    this.setState({
      pixelSize: newPixelSize
    });
  }

  render() {
    const {
      mode,
      canvasWidth,
      canvasHeight,
      canvasMousePosX,
      canvasMousePosY,
      pixelSize
    } = this.state;

    return (
      <div className="App">
        <Toolbar {...{
          mode,
          changeMode: this.changeMode,
          canUndo: canUndo(),
          canRedo: canRedo(),
          onUndo: () => doUndo(this.ctx),
          onRedo: () => doRedo(this.ctx)
        }}/>

        <Canvas {...{
          canvasWidth,
          canvasHeight,
          pixelSize,
          resizeCanvas: this.resizeCanvas,
          ctxRef: ctx => this.ctx = ctx,
          updateMousePosition: (newX, newY) => this.setState({
            canvasMousePosX: newX,
            canvasMousePosY: newY
          }),
          onDrawStart: actions[mode].onDrawStart.bind(this),
          onDrawMove: actions[mode].onDrawMove.bind(this),
          onDrawEnd: actions[mode].onDrawEnd.bind(this),
        }}/>

        <Statusbar {...{
          canvasWidth,
          canvasHeight,
          pixelSize,
          changePixelSize: this.changePixelSize,
          mouseX: canvasMousePosX,
          mouseY: canvasMousePosY
        }}/>
      </div>
    );
  }
}
