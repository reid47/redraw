import React from 'react';

export class Statusbar extends React.Component {
  render() {
    const {
      mouseX,
      mouseY
    } = this.props;

    const hasPosition = mouseX !== null && mouseY !== null;

    return <div className="Statusbar">
      {hasPosition && <div
        className="Statusbar-mouseposition">
        {mouseX}, {mouseY}
      </div>}
    </div>;
  }
}
