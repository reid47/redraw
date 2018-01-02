import React from 'react';
import { t } from '../translations';

export class SaveModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      format: 'png',
      pixelScale: 1
    };
  }

  getPreviewDataURL = () => {
    const { ctx, canvasWidth, canvasHeight } = this.props;
    const { pixelScale } = this.state;

    // Create a temporary preview canvas to copy the image data to
    const previewCanvas = document.createElement('canvas');
    previewCanvas.setAttribute('width', canvasWidth * pixelScale);
    previewCanvas.setAttribute('height', canvasHeight * pixelScale);
    const pCtx = previewCanvas.getContext('2d');

    // Disable image smoothing so the image will scale without blurring
    pCtx.mozImageSmoothingEnabled = false;
    pCtx.webkitImageSmoothingEnabled = false;
    pCtx.msImageSmoothingEnabled = false;
    pCtx.imageSmoothingEnabled = false;

    // Draw the real canvas data to the preview canvas, scaling it by pixelScale
    pCtx.drawImage(ctx.canvas, 0, 0, canvasWidth, canvasHeight, 0, 0, canvasWidth * pixelScale, canvasHeight * pixelScale);

    // Return the data URL for the preview canvas
    return previewCanvas.toDataURL();
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
      format,
      pixelScale
    } = this.state;

    if (!isOpen) return null;

    const dataUrl = format === 'png'
      ? this.getPreviewDataURL()
      : getSVGData();

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

        {format === 'png' && <fieldset>
          <legend>pixel scale:</legend>

          <div>
            <input
              type="number"
              value={pixelScale}
              min="1"
              max="10"
              onChange={evt => this.setState({ pixelScale: evt.target.valueAsNumber })} />
          </div>

          <div>canvas size: {canvasWidth} x {canvasHeight}</div>
          <div>exported image size: {canvasWidth * pixelScale} x {canvasHeight * pixelScale}</div>
        </fieldset>}

        <h2>preview (right-click and choose "save image"):</h2>
        <div className="SaveModal-preview" style={{
          backgroundImage: 'url(assets/checkerboard.png)'
        }}>
          <img src={dataUrl} alt="Export preview"/>
        </div>
      </div>
    </div>;
  }
}
