import React from 'react';
import { Canvas } from './Canvas';
import { ColorBar } from './ColorBar';
import { SaveModal } from './SaveModal';
import { StatusBar } from './StatusBar';
import { ToolBar } from './ToolBar';
import { pushUndo, doUndo, doRedo, canUndo, canRedo } from '../history';
import { setClipboardData, getClipboardData } from '../clipboard';
import { toSVG } from '../canvas-helpers';
import * as tools from '../tools';
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
        'rgba(0,0,255,1)',
        'rgba(255,255,0,1)',
        'rgba(255,0,255,1)',
        'rgba(0,255,255,1)'
      ],
      pixelSize: 10,
      canvasWidth: 640,
      canvasHeight: 480,
      canvasMousePosX: null,
      canvasMousePosY: null,
      canvasMouseDown: false,
      saveModalOpen: false
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

  cutSelection = () => {
    pushUndo(this.ctx);

    const cutData = this.ctx.getImageData(
      this.state.selectionStartX,
      this.state.selectionStartY,
      this.state.selectionWidth,
      this.state.selectionHeight);

    setClipboardData(
      cutData,
      this.state.selectionStartX,
      this.state.selectionStartY,
      this.state.selectionWidth,
      this.state.selectionHeight);

    this.ctx.clearRect(
      this.state.selectionStartX,
      this.state.selectionStartY,
      this.state.selectionWidth,
      this.state.selectionHeight);

    this.setState({ selectionActive: false });
    this.ghostCtx.clearRect(0, 0, this.ghostCtx.canvas.width, this.ghostCtx.canvas.height);
  }

  copySelection = () => {
    const copiedData = this.ctx.getImageData(
      this.state.selectionStartX,
      this.state.selectionStartY,
      this.state.selectionWidth,
      this.state.selectionHeight);

    setClipboardData(
      copiedData,
      this.state.selectionStartX,
      this.state.selectionStartY,
      this.state.selectionWidth,
      this.state.selectionHeight);

    this.setState({ selectionActive: false });
    this.ghostCtx.clearRect(0, 0, this.ghostCtx.canvas.width, this.ghostCtx.canvas.height);
  }

  pasteFromClipboard = () => {
    const { data, clipboardX, clipboardY, clipboardWidth, clipboardHeight } = getClipboardData();
    if (!data) return;
    this.ghostCtx.clearRect(0, 0, this.ghostCtx.canvas.width, this.ghostCtx.canvas.height);
    this.ghostCtx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ghostCtx.fillRect(0, 0, this.ghostCtx.canvas.width, this.ghostCtx.canvas.height);
    this.ghostCtx.putImageData(data, clipboardX, clipboardY);
    this.setState({
      movingGhost: true,
      clipboardData: data,
      clipboardX,
      clipboardY,
      clipboardWidth,
      clipboardHeight,
      selectionStartX: clipboardX,
      selectionStartY: clipboardY,
      selectionWidth: clipboardWidth,
      selectionHeight: clipboardHeight
    });
  }

  render() {
    const {
      mode,
      movingGhost,
      canvasWidth,
      canvasHeight,
      selectionActive,
      selectionWidth,
      selectionHeight,
      selectionStartX,
      selectionStartY,
      canvasMousePosX,
      canvasMousePosY,
      pixelSize,
      currentColor,
      colorPalette,
      saveModalOpen
    } = this.state;

    return (
      <div className="App">
        <ToolBar {...{
          mode,
          movingGhost,
          changeMode: this.changeMode,
          canUndo: canUndo(),
          canRedo: canRedo(),
          onUndo: () => doUndo(this.ctx, () => this.forceUpdate()),
          onRedo: () => doRedo(this.ctx, () => this.forceUpdate()),
          selectionActive,
          canPaste: !!(getClipboardData().data),
          onCut: this.cutSelection,
          onCopy: this.copySelection,
          onPaste: this.pasteFromClipboard,
          onSave: () => this.setState({ saveModalOpen: true })
        }}/>

        <Canvas {...{
          canvasWidth,
          canvasHeight,
          pixelSize,
          resizeCanvas: this.resizeCanvas,
          ctxRef: ctx => this.ctx = ctx,
          ghostCtxRef: ghostCtx => this.ghostCtx = ghostCtx,
          updateMousePosition: (newX, newY) => this.setState({
            canvasMousePosX: newX,
            canvasMousePosY: newY
          }),
          onDrawStart: (tools[mode].onDrawStart || noop).bind(this),
          onDrawMove: (tools[mode].onDrawMove || noop).bind(this),
          onDrawEnd: (tools[mode].onDrawEnd || noop).bind(this),
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

        <SaveModal {...{
          isOpen: saveModalOpen,
          onClose: () => this.setState({ saveModalOpen: false }),
          ctx: this.ctx,
          canvasWidth,
          canvasHeight,
          getSVGData: () => this.ctx && toSVG(this.ctx),
          selectionActive,
          selectionWidth,
          selectionHeight,
          selectionStartX,
          selectionStartY
        }}/>
      </div>
    );
  }
}
