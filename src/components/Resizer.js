import React from 'react';
import ReactDOM from 'react-dom';

export class Resizer extends React.Component {
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
      className={`Resizer Resizer-${direction}`} />;
  }
}
