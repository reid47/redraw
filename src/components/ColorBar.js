import React from 'react';
import { ToolButton } from './ToolButton';
import { toRGBAString, fromHex, fromRGBA, fromHSLA } from '../rgba';
import { t } from '../translations';

const normalize = (n, min, max) => (!n || isNaN(n)) ? min : Math.max(min, Math.min(max, n));

export class ColorBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      colorMode: 'rgba'
    };
  }

  render () {
    const {
      currentColor,
      colorPalette,
      changeCurrentColor,
      mode,
      changeMode
    } = this.props;

    return <div className="ColorBar">
      <div className="ColorBar-current-color-bg">
        <div className="ColorBar-current-color"
          style={{ backgroundColor: toRGBAString(currentColor) }} />
      </div>

      <div className="ColorBar-color-editor">
        <div className="ColorBar-color-type">
          <input type="radio"
            id="ColorBar-color-type-rgba"
            name="ColorBar-color-type"
            checked={this.state.colorMode === 'rgba'}
            onChange={evt => evt.target.checked && this.setState({ colorMode: 'rgba' })}/>
          <label htmlFor="ColorBar-color-type-rgba">
            rgba
          </label>

          <input type="radio"
            id="ColorBar-color-type-hsla"
            name="ColorBar-color-type"
            checked={this.state.colorMode === 'hsla'}
            onChange={evt => evt.target.checked && this.setState({ colorMode: 'hsla' })}/>
          <label htmlFor="ColorBar-color-type-hsla">
            hsla
          </label>

          <input type="radio"
            id="ColorBar-color-type-hex"
            name="ColorBar-color-type"
            checked={this.state.colorMode === 'hex'}
            onChange={evt => evt.target.checked && this.setState({ colorMode: 'hex' })}/>
          <label htmlFor="ColorBar-color-type-hex">
            hex
          </label>
        </div>

        {this.state.colorMode === 'rgba' && <div className="ColorBar-color-inputs">
          <div>
            <label htmlFor="ColorBar-color-editor-r">r:</label>
            <input id="ColorBar-color-editor-r"
              type="number" min="0" max="255"
              value={currentColor.r}
              onChange={evt => changeCurrentColor(fromRGBA({
                r: normalize(evt.target.valueAsNumber, 0, 255),
                g: currentColor.g,
                b: currentColor.b,
                a: currentColor.a
              }))}/>
          </div>
          <div>
            <label htmlFor="ColorBar-color-editor-g">g:</label>
            <input id="ColorBar-color-editor-g"
              type="number" min="0" max="255"
              value={currentColor.g}
              onChange={evt => changeCurrentColor(fromRGBA({
                r: currentColor.r,
                g: normalize(evt.target.valueAsNumber, 0, 255),
                b: currentColor.b,
                a: currentColor.a
              }))}/>
          </div>
          <div>
            <label htmlFor="ColorBar-color-editor-b">b:</label>
            <input id="ColorBar-color-editor-b"
              type="number" min="0" max="255"
              value={currentColor.b}
              onChange={evt => changeCurrentColor(fromRGBA({
                r: currentColor.r,
                g: currentColor.g,
                b: normalize(evt.target.valueAsNumber, 0, 255),
                a: currentColor.a
              }))}/>
          </div>
          <div>
            <label htmlFor="ColorBar-color-editor-a">a:</label>
            <input id="ColorBar-color-editor-a"
              type="number" min="0" max="1" step="0.1"
              value={currentColor.a}
              onChange={evt => changeCurrentColor(fromRGBA({
                r: currentColor.r,
                g: currentColor.g,
                b: currentColor.b,
                a: normalize(evt.target.valueAsNumber, 0, 1)
              }))}/>
          </div>
        </div>}

        {this.state.colorMode === 'hsla' && <div className="ColorBar-color-inputs">
          <div>
            <label htmlFor="ColorBar-color-editor-h">h:</label>
            <input id="ColorBar-color-editor-h"
              type="number" min="0" max="360"
              value={currentColor.h}
              onChange={evt => changeCurrentColor(fromHSLA({
                h: normalize(evt.target.valueAsNumber, 0, 360),
                s: currentColor.s,
                l: currentColor.l,
                a: currentColor.a
              }))}/>
          </div>
          <div>
            <label htmlFor="ColorBar-color-editor-s">s:</label>
            <input id="ColorBar-color-editor-s"
              type="number" min="0" max="100"
              value={currentColor.s}
              onChange={evt => changeCurrentColor(fromHSLA({
                h: currentColor.h,
                s: normalize(evt.target.valueAsNumber, 0, 100),
                l: currentColor.l,
                a: currentColor.a
              }))}/>
          </div>
          <div>
            <label htmlFor="ColorBar-color-editor-l">l:</label>
            <input id="ColorBar-color-editor-l"
              type="number" min="0" max="100"
              value={currentColor.l}
              onChange={evt => changeCurrentColor(fromHSLA({
                h: currentColor.h,
                s: currentColor.s,
                l: normalize(evt.target.valueAsNumber, 0, 100),
                a: currentColor.a
              }))}/>
          </div>
          <div>
            <label htmlFor="ColorBar-color-editor-a">a:</label>
            <input id="ColorBar-color-editor-a"
              type="number" min="0" max="1" step="0.1"
              value={currentColor.a}
              onChange={evt => changeCurrentColor(fromHSLA({
                h: currentColor.h,
                s: currentColor.s,
                l: currentColor.l,
                a: normalize(evt.target.valueAsNumber, 0, 1)
              }))}/>
          </div>
        </div>}

        {this.state.colorMode === 'hex' && <div className="ColorBar-color-inputs">
          <div>
            <label htmlFor="ColorBar-color-editor-hex">#</label>
            <input id="ColorBar-color-editor-hex"
              type="text"
              maxLength="6"
              value={currentColor.hex}
              onChange={evt => changeCurrentColor(fromHex({
                hex: evt.target.value,
                a: currentColor.a
              }))}/>
          </div>
          <div>
            <label htmlFor="ColorBar-color-editor-a">a:</label>
            <input id="ColorBar-color-editor-a"
              type="number" min="0" max="1" step="0.1"
              value={currentColor.a}
              onChange={evt => changeCurrentColor(fromHex({
                hex: currentColor.hex,
                a: normalize(evt.target.valueAsNumber, 0, 1)
              }))}/>
          </div>
        </div>}
      </div>

      <ToolButton
        image="eyedropper"
        className="ColorBar-eyedropper-tool-button"
        title={t('eyedropperToolLabel')}
        active={mode === 'eyedropper'}
        onClick={() => changeMode('eyedropper')}>
        {t('eyedropperButtonText')}
      </ToolButton>

      {colorPalette.map((color, i) => {
        return <div key={i}
          className="ColorBar-color-button-bg">
          <button type="button"
            className="ColorBar-color-button"
            style={{ backgroundColor: toRGBAString(color) }}
            onClick={() => changeCurrentColor(color)} />
        </div>
      })}
    </div>;
  }
}
