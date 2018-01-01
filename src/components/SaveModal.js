import React from 'react';
import { t } from '../translations';

export class SaveModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      format: 'png'
    };
  }

  render() {
    const {
      isOpen,
      onClose,
      getDataURL,
      getSVGData,
      canvasWidth,
      canvasHeight
    } = this.props;

    const {
      format
    } = this.state;

    if (!isOpen) return null;

    const dataUrl = getDataURL();
    const svgData = getSVGData();

    // TODO: localize text below!

    return <div className="SaveModal" role="dialog">
      <div className="SaveModal-content">
        <button
          type="button"
          className="SaveModal-close-button"
          title={t('saveDialogCloseButtonLabel')}
          style={{ backgroundImage: 'url(assets/close.png)' }}
          onClick={onClose} />

        <h1>save image</h1>

        <span>
          <b>TIP:</b> You can use the select tool to save only a part of the
          canvas.
        </span>

        <fieldset>
          <legend>export as:</legend>

          <div>
            <input
              id="export-as-png"
              type="radio"
              name="format"
              checked={format === 'png'}
              onChange={evt => evt.target.checked && this.setState({format: 'png'})}/>
            <label htmlFor="export-as-png">png</label>
          </div>

          <div>
            <input
              id="export-as-svg"
              type="radio"
              name="format"
              checked={format === 'svg'}
              onChange={evt => evt.target.checked && this.setState({format: 'svg'})}/>
            <label htmlFor="export-as-svg">svg</label>
          </div>
        </fieldset>

        <h2>preview (right-click and choose "save image"):</h2>
        <div className="SaveModal-preview" style={{
          backgroundImage: 'url(assets/checkerboard.png)'
        }}>
          {format === 'png' && <img src={dataUrl} />}
          {format === 'svg' && <div dangerouslySetInnerHTML={{
            __html: svgData
          }}/>}
        </div>
      </div>
    </div>;
  }
}
