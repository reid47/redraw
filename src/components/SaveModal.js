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
    const { ctx, canvasWidth, canvasHeight, selectionActive } = this.props;
    const { pixelScale } = this.state;

    const x = selectionActive ? this.props.selectionStartX : 0;
    const y = selectionActive ? this.props.selectionStartY : 0;
    const w = selectionActive ? this.props.selectionWidth : canvasWidth;
    const h = selectionActive ? this.props.selectionHeight : canvasHeight;

    // Create a temporary preview canvas to copy the image data to
    const previewCanvas = document.createElement('canvas');
    previewCanvas.setAttribute('width', w * pixelScale);
    previewCanvas.setAttribute('height', h * pixelScale);
    const pCtx = previewCanvas.getContext('2d');

    // Disable image smoothing so the image will scale without blurring
    pCtx.mozImageSmoothingEnabled = false;
    pCtx.webkitImageSmoothingEnabled = false;
    pCtx.msImageSmoothingEnabled = false;
    pCtx.imageSmoothingEnabled = false;

    // Draw the real canvas data to the preview canvas, scaling it by pixelScale
    pCtx.drawImage(ctx.canvas, x, y, w, h, 0, 0, w * pixelScale, h * pixelScale);

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
      canvasHeight,
      selectionActive
    } = this.props;

    const {
      format,
      pixelScale
    } = this.state;

    if (!isOpen) return null;

    const dataUrl = format === 'png'
      ? this.getPreviewDataURL()
      : getSVGData();

    const originalWidth = selectionActive ? this.props.selectionWidth : canvasWidth;
    const originalHeight = selectionActive ? this.props.selectionHeight : canvasHeight;

    // TODO: localize text below!

    return <div className="SaveModal" role="dialog" aria-labelledby="SaveModal-title">
      <div className="SaveModal-content">
        <button
          type="button"
          className="SaveModal-close-button"
          title={t('saveDialogCloseButtonLabel')}
          style={{ backgroundImage: 'url(assets/close.png)' }}
          onClick={onClose} />

        <h1 id="SaveModal-title">save image</h1>

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

          <div>{`${selectionActive ? 'selection' : 'canvas'} size: ${originalWidth} x ${originalHeight}`}</div>
          <div>exported image size: {originalWidth * pixelScale} x {originalHeight * pixelScale}</div>
        </fieldset>}

        <h2>preview (right-click and choose "save image as..."):</h2>

        <div className="SaveModal-preview-wrapper">
          <div className="SaveModal-preview" style={{
          }}>
            <img src={dataUrl} alt="Export preview"/>
          </div>
        </div>
      </div>
    </div>;
  }
}
