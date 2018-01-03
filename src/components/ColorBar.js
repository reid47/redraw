import React from 'react';
import { ToolButton } from './ToolButton';
import { fromRGBA } from '../rgba';
import { t } from '../translations';

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
          style={{ backgroundColor: fromRGBA(currentColor) }} />
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

      <ToolButton
        image="eyedropper"
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
            style={{ backgroundColor: fromRGBA(color) }}
            onClick={() => changeCurrentColor(color)} />
        </div>
      })}
    </div>;
  }
}
