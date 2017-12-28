import React from 'react';

const calculateBackground = pixelSize => {
  return {
    backgroundSize: `${pixelSize * 2}px ${pixelSize * 2}px`,
    backgroundPosition: `0 0, ${pixelSize}px ${pixelSize}px`
  };
}

export class Canvas extends React.Component {
  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
    this.props.ctxRef(this.ctx);
  }

  handleDrawStart = evt => {
    const { pixelSize } = this.props;
    const rect = this.canvas.getBoundingClientRect();
    const x = Math.floor((evt.clientX - rect.left) / pixelSize);
    const y = Math.floor((evt.clientY - rect.top) / pixelSize);
    this.props.onDrawStart({ ctx: this.ctx, x, y });
  }

  handleDrawMove = evt => {
    const { pixelSize } = this.props;
    const rect = this.canvas.getBoundingClientRect();
    const x = Math.floor((evt.clientX - rect.left) / pixelSize);
    const y = Math.floor((evt.clientY - rect.top) / pixelSize);
    this.props.updateMousePosition(x, y);
    this.props.onDrawMove({ ctx: this.ctx, x, y });
  }

  handleDrawEnd = evt => {
    this.props.onDrawEnd({ ctx: this.ctx, evt });
  }

  render() {
    const {
      canvasWidth,
      canvasHeight,
      updateMousePosition,
      cursor,
      pixelSize
    } = this.props;

    const { backgroundSize, backgroundPosition } = calculateBackground(pixelSize);
    // this.ctx && this.ctx.scale(pixelSize, pixelSize);

    return <div className="Canvas">
      <div className="Canvas-resize-wrapper" style={{
        width: canvasWidth * pixelSize, height: canvasHeight * pixelSize
      }}>
        <canvas
          ref={el => this.canvas = el}
          className="Canvas-canvas"
          style={{
            cursor,
            backgroundSize,
            backgroundPosition,
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
      </div>
    </div>;
  }
}
