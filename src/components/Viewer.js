import React from 'react';
import ReactDOM from 'react-dom';

class Resizer extends React.Component {
  constructor(props) {
    super(props);

    this.history = [];
    this.state = {
      dragging: false
    };
  }

  componentDidUpdate(props, state) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('mouseup', this.onMouseUp)
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)
    }
  }

  onMouseDown = evt => {
    if (evt.button !== 0) return;

    const canvas = ReactDOM.findDOMNode(this.node).parentNode.querySelector('canvas');

    this.setState({
      dragging: true,
      initialWidth: canvas.width,
      initialHeight: canvas.height,
      dragStartX: evt.pageX,
      dragStartY: evt.pageY
    });
  }

  onMouseUp = evt => {
    this.setState({ dragging: false });
  }

  onMouseMove = evt => {
    if (!this.state.dragging) return;

    const deltaX = evt.pageX - this.state.dragStartX;
    const deltaY = evt.pageY - this.state.dragStartY;

    const calcWidth = this.state.initialWidth + deltaX;
    const calcHeight = this.state.initialHeight + deltaY;

    this.props.onResize(calcWidth, calcHeight);
  }

  render() {
    const { direction } = this.props;

    return <div
      ref={el => this.node = el}
      onMouseDown={this.onMouseDown}
      className={`Viewer-resize Viewer-resize-${direction}`} />;
  }
}

export class Viewer extends React.Component {
  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
    this.props.ctxRef(this.ctx);
  }

  render() {
    const {
      canvasWidth,
      canvasHeight,
      resizeCanvas,
      updateMousePosition,
      onCanvasMouseDown,
      onCanvasMouseMove,
      onCanvasMouseUp
    } = this.props;

    return <div className="Viewer">
      <div className="Viewer-resize-wrapper" style={{
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
          className="Viewer-canvas"
          onMouseDown={evt => {
            const rect = this.canvas.getBoundingClientRect();
            const x = evt.clientX - rect.left;
            const y = evt.clientY - rect.top;
            onCanvasMouseDown(this.ctx, x, y);
          }}
          onMouseMove={evt => {
            const rect = this.canvas.getBoundingClientRect();
            const x = evt.clientX - rect.left;
            const y = evt.clientY - rect.top;
            updateMousePosition(x, y);
            onCanvasMouseMove(this.ctx, x, y);
          }}
          onMouseOut={evt => {
            updateMousePosition(null, null);
          }}
          onMouseUp={evt => {
            onCanvasMouseUp(evt, this.ctx);
          }}
          width={canvasWidth}
          height={canvasHeight}/>
      </div>
    </div>;
  }
}
