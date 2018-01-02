import React from 'react';

export class Canvas extends React.Component {
  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
    this.ghostCtx = this.ghostCanvas.getContext('2d');
    this.props.ctxRef(this.ctx);
    this.props.ghostCtxRef(this.ghostCtx);
    this.props.canvasContainerRef(this.canvasContainer);
  }

  handleDrawStart = evt => {
    const { pixelSize } = this.props;
    const rect = this.canvas.getBoundingClientRect();
    const x = Math.floor((evt.clientX - rect.left) / pixelSize);
    const y = Math.floor((evt.clientY - rect.top) / pixelSize);
    this.props.onDrawStart({ evt, ctx: this.ctx, x, y, ghostCtx: this.ghostCtx });
  }

  handleDrawMove = evt => {
    const { pixelSize } = this.props;
    const rect = this.canvas.getBoundingClientRect();
    const x = Math.floor((evt.clientX - rect.left) / pixelSize);
    const y = Math.floor((evt.clientY - rect.top) / pixelSize);
    this.props.updateMousePosition(x, y);
    this.props.onDrawMove({ evt, ctx: this.ctx, x, y, ghostCtx: this.ghostCtx });
  }

  handleDrawEnd = evt => {
    this.props.onDrawEnd({ evt, ctx: this.ctx, ghostCtx: this.ghostCtx });
  }

  render() {
    const {
      canvasWidth,
      canvasHeight,
      updateMousePosition,
      pixelSize
    } = this.props;

    return <div className="Canvas" ref={el => this.canvasContainer = el}>
      <canvas
        ref={el => this.canvas = el}
        className="Canvas-canvas"
        style={{
          position: 'absolute',
          backgroundSize: `${pixelSize * 2}px ${pixelSize * 2}px`,
          backgroundPosition: `0 0, ${pixelSize}px ${pixelSize}px`,
          width: canvasWidth * pixelSize,
          height: canvasHeight * pixelSize
        }}
        width={canvasWidth}
        height={canvasHeight}
        onTouchStart={evt => this.handleDrawStart(evt.touches[0])}
        onTouchMove={evt => this.handleDrawMove(evt.touches[0])}
        onTouchEnd={evt => this.handleDrawEnd(evt.touches[0])}
        onMouseDown={this.handleDrawStart}
        onMouseMove={this.handleDrawMove}
        onMouseOut={evt => {
          updateMousePosition(null, null);
          this.handleDrawEnd(evt);
        }}
        onMouseUp={this.handleDrawEnd} />

      <canvas
        ref={el => this.ghostCanvas = el}
        className="Canvas-ghost-canvas"
        width={canvasWidth}
        height={canvasHeight}
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          width: canvasWidth * pixelSize,
          height: canvasHeight * pixelSize
        }}/>
    </div>;
  }
}
