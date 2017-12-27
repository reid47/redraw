import React from 'react';

export class Menubar extends React.Component {
  render() {
    const {
      onUndo,
      onRedo
    } = this.props;

    return <div className="Menubar" role="toolbar">
      <button
        type="button"
        onClick={onUndo}
        >undo</button>
      <button
        type="button"
        onClick={onRedo}>
        redo</button>
    </div>;
  }
}
