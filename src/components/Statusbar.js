import React from 'react';
import { t } from '../translations';

export const StatusBar = ({
  canvasWidth,
  canvasHeight,
  selectionActive,
  selectionWidth,
  selectionHeight,
  mouseX,
  mouseY,
  pixelSize,
  changePixelSize
}) => {
  const hasPosition = mouseX !== null && mouseY !== null;

  return <div className="StatusBar">
    <div>
      {selectionActive
        ? t('statusBarSelectionSizeText')(selectionWidth, selectionHeight)
        : t('statusBarCanvasSizeText')(canvasWidth, canvasHeight)}
    </div>

    {hasPosition && <div className="StatusBar-mouseposition">
      {t('statusBarCursorPositionText')(mouseX, mouseY)}
    </div>}

    <div className="StatusBar-zoom-slider-container">
      <label
        className="StatusBar-zoom-label"
        htmlFor="zoom-slider">
        {t('zoomLabel')} {pixelSize}x
      </label>
      <input
        id="zoom-slider"
        className="StatusBar-zoom-slider"
        type="range"
        min="1"
        max="100"
        value={pixelSize}
        onChange={evt => changePixelSize(evt.target.valueAsNumber)} />
    </div>
  </div>;
}
