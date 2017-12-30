import React from 'react';
import { t } from '../translations';

export class Statusbar extends React.Component {
  render() {
    const {
      canvasWidth,
      canvasHeight,
      selectionActive,
      selectionWidth,
      selectionHeight,
      mouseX,
      mouseY,
      pixelSize,
      changePixelSize
    } = this.props;

    const hasPosition = mouseX !== null && mouseY !== null;

    return <div className="Statusbar">
      <div>
        {selectionActive
          ? `${t('selectionSizeLabel')} ${selectionWidth} x ${selectionHeight}`
          : `${t('canvasSizeLabel')} ${canvasWidth} x ${canvasHeight}`}
      </div>

      {hasPosition && <div className="Statusbar-mouseposition">
        {t('cursorPositionLabel')} {mouseX}, {mouseY}
      </div>}

      <div className="Statusbar-zoom-slider-container">
        <label
          className="Statusbar-zoom-label"
          htmlFor="zoom-slider">
          {t('zoomLabel')} {pixelSize}x
        </label>
        <input
          id="zoom-slider"
          className="Statusbar-zoom-slider"
          type="range"
          min="1"
          max="100"
          value={pixelSize}
          onChange={evt => changePixelSize(evt.target.valueAsNumber)} />
      </div>
    </div>;
  }
}
