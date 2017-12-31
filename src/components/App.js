import React from 'react';
import { ToolBar } from './ToolBar';
import { StatusBar } from './StatusBar';
import { ColorBar } from './ColorBar';
import { SelectionBar } from './SelectionBar';
import { Canvas } from './Canvas';
import { doUndo, doRedo, canUndo, canRedo } from '../history';
import * as actions from '../actions';
const noop = () => null;

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'draw',
      currentColor: 'rgba(0, 0, 0, 1)',
      colorPalette: [
        'rgba(0,0,0,1)',
        'rgba(0,0,0,0)',
        'rgba(255,0,0,1)',
        'rgba(0,255,0,1)',
        'rgba(0,0,255,1)'
      ],
      pixelSize: 10,
      canvasWidth: 640,
      canvasHeight: 480,
      canvasMousePosX: null,
      canvasMousePosY: null,
      canvasMouseDown: false
    };
  }

  resizeCanvas = (newX, newY) => this.setState({
    canvasWidth: Math.max(newX, 2),
    canvasHeight: Math.max(newY, 2)
  });

  changeMode = newMode => this.setState({ mode: newMode });

  changePixelSize = newPixelSize => this.setState({ pixelSize: newPixelSize });

  changeCurrentColor = newColor => {
    this.ctx.fillStyle = newColor;
    this.setState({ currentColor: newColor });
  }

  render() {
    const {
      mode,
      canvasWidth,
      canvasHeight,
      selectionActive,
      selectionWidth,
      selectionHeight,
      canvasMousePosX,
      canvasMousePosY,
      pixelSize,
      currentColor,
      colorPalette
    } = this.state;

    return (
      <div className="App">
        <ToolBar {...{
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
          onDrawStart: (actions[mode].onDrawStart || noop).bind(this),
          onDrawMove: (actions[mode].onDrawMove || noop).bind(this),
          onDrawEnd: (actions[mode].onDrawEnd || noop).bind(this),
        }}/>

        <SelectionBar {...{

        }}/>

        <ColorBar {...{
          currentColor,
          colorPalette,
          changeCurrentColor: this.changeCurrentColor
        }}/>

        <StatusBar {...{
          canvasWidth,
          canvasHeight,
          selectionActive,
          selectionWidth,
          selectionHeight,
          pixelSize,
          changePixelSize: this.changePixelSize,
          mouseX: canvasMousePosX,
          mouseY: canvasMousePosY
        }}/>
      </div>
    );
  }
}
