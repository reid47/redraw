import React from 'react';
import { t } from '../translations';

export class ColorBar extends React.Component {
  render() {
    const {
      currentColor,
      colorPalette
    } = this.props;

    return <div className="ColorBar">
      <div className="ColorBar-current-color"
        style={{ background: currentColor }} />


    </div>;
  }
}
