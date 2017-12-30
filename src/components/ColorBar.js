import React from 'react';

export const ColorBar = ({
  currentColor,
  colorPalette,
  changeCurrentColor
}) => {
  return <div className="ColorBar">
    <div className="ColorBar-current-color-bg">
      <div className="ColorBar-current-color"
        style={{ backgroundColor: currentColor }} />
    </div>

    {colorPalette.map((color, i) => {
      return <div key={i}
        className="ColorBar-color-button-bg">
        <button type="button"
          className="ColorBar-color-button"
          style={{ backgroundColor: color }}
          onClick={() => changeCurrentColor(color)} />
      </div>
    })}
  </div>;
}
