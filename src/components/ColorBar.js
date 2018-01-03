import React from 'react';
import { fromRGBA } from '../rgba';

export const ColorBar = ({
  currentColor,
  colorPalette,
  changeCurrentColor
}) => {
  return <div className="ColorBar">
    <div className="ColorBar-current-color-bg">
      <div className="ColorBar-current-color"
        style={{ backgroundColor: fromRGBA(currentColor) }} />
    </div>

    <div className="ColorBar-color-editor">
      <div>
        <label htmlFor="ColorBar-color-editor-r">r:</label>
        <input id="ColorBar-color-editor-r"
          type="number" min="0" max="255"
          value={currentColor.r}
          onChange={evt => changeCurrentColor({
            r: evt.target.valueAsNumber,
            g: currentColor.g,
            b: currentColor.b,
            a: currentColor.a
          })}/>
      </div>
      <div>
        <label htmlFor="ColorBar-color-editor-g">g:</label>
        <input id="ColorBar-color-editor-g"
          type="number" min="0" max="255"
          value={currentColor.g}
          onChange={evt => changeCurrentColor({
            r: currentColor.r,
            g: evt.target.valueAsNumber,
            b: currentColor.b,
            a: currentColor.a
          })}/>
      </div>
      <div>
        <label htmlFor="ColorBar-color-editor-b">b:</label>
        <input id="ColorBar-color-editor-b"
          type="number" min="0" max="255"
          value={currentColor.b}
          onChange={evt => changeCurrentColor({
            r: currentColor.r,
            g: currentColor.g,
            b: evt.target.valueAsNumber,
            a: currentColor.a
          })}/>
      </div>
      <div>
        <label htmlFor="ColorBar-color-editor-a">a:</label>
        <input id="ColorBar-color-editor-a"
          type="number" min="0" max="1" step="0.1"
          value={currentColor.a}
          onChange={evt => changeCurrentColor({
            r: currentColor.r,
            g: currentColor.g,
            b: currentColor.b,
            a: evt.target.valueAsNumber
          })}/>
      </div>
    </div>

    {colorPalette.map((color, i) => {
      return <div key={i}
        className="ColorBar-color-button-bg">
        <button type="button"
          className="ColorBar-color-button"
          style={{ backgroundColor: fromRGBA(color) }}
          onClick={() => changeCurrentColor(color)} />
      </div>
    })}
  </div>;
}
