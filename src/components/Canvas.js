import React from 'react';
import { Resizer } from './Resizer';

export class Canvas extends React.Component {
  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
    this.props.ctxRef(this.ctx);
  }

  handleDrawStart = evt => {
    const rect = this.canvas.getBoundingClientRect();
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;
    this.props.onDrawStart({ ctx: this.ctx, x, y });
  }

  handleDrawMove = evt => {
    const rect = this.canvas.getBoundingClientRect();
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;
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
      resizeCanvas,
      updateMousePosition,
      cursor
    } = this.props;

    return <div className="Canvas">
      <div className="Canvas-resize-wrapper" style={{
        width: canvasWidth, height: canvasHeight
      }}>
        <Resizer
          direction="middle-right"
          onResize={w => resizeCanvas(w, null)} />
        <Resizer
          direction="bottom-right"
          onResize={resizeCanvas} />
        <Resizer
          direction="bottom-middle"
          onResize={(w, h) => resizeCanvas(null, h)} />
        <canvas
          ref={el => this.canvas = el}
          className="Canvas-canvas"
          style={{ cursor: cursor }}
          width={canvasWidth}
          height={canvasHeight}
          onTouchStart={evt => this.handleDrawStart(evt.touches[0])}
          onTouchMove={evt => this.handleDrawMove(evt.touches[0])}
          onTouchEnd={evt => this.handleDrawEnd(evt.touches[0])}
          onMouseDown={this.handleDrawStart}
          onMouseMove={this.handleDrawMove}
          onMouseOut={evt => {
            updateMousePosition(null, null);
          }}
          onMouseUp={this.handleDrawEnd} />
      </div>
    </div>;
  }
}
