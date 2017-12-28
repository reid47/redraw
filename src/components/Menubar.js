import React from 'react';

export class Menubar extends React.Component {
  render() {
    const {
      onUndo,
      onRedo,
      canUndo,
      canRedo
    } = this.props;

    return <div className="Menubar" role="toolbar">
      <button
        type="button"
        onClick={onUndo}
        disabled={!canUndo}>
        undo</button>
      <button
        type="button"
        onClick={onRedo}
        disabled={!canRedo}>
        redo</button>
    </div>;
  }
}
