const translations = {
  drawButtonText: {
    en: 'draw'
  },
  drawToolLabel: {
    en: 'Switch to draw tool'
  },
  fillButtonText: {
    en: 'fill'
  },
  fillToolLabel: {
    en: 'Switch to fill tool'
  },
  recolorToolLabel: {
    en: 'Switch to recolor tool'
  },
  recolorButtonText: {
    en: 'recolor'
  },
  selectButtonText: {
    en: 'select'
  },
  selectToolLabel: {
    en: 'Switch to select tool'
  },
  undoButtonText: {
    en: 'undo'
  },
  undoButtonLabel: {
    en: 'Undo last draw or fill'
  },
  redoButtonText: {
    en: 'redo'
  },
  redoButtonLabel: {
    en: 'Redo last draw or fill'
  },
  statusBarCanvasSizeText: {
    en: (width, height) => `canvas: ${width} x ${height}`
  },
  statusBarSelectionSizeText: {
    en: (width, height) => `selection: ${width} x ${height}`
  },
  statusBarCursorPositionText: {
    en: (x, y) => `cursor: ${x}, ${y}`
  },
  zoomLabel: {
    en: 'zoom:'
  },
  cursorPositionLabel: {
    en: 'cursor:'
  },
  cutButtonText: {
    en: 'cut'
  },
  cutToolLabel: {
    en: 'Cut selection'
  },
  copyButtonText: {
    en: 'copy'
  },
  copyToolLabel: {
    en: 'Copy selection'
  },
  pasteButtonText: {
    en: 'paste'
  },
  pasteToolLabel: {
    en: 'Paste from clipboard'
  },
  deleteButtonText: {
    en: 'delete'
  },
  deleteToolLabel: {
    en: 'Delete selection'
  },
  saveButtonText: {
    en: 'save'
  },
  saveButtonLabel: {
    en: 'Save canvas'
  },
  saveDialogCloseButtonLabel: {
    en: 'Close save dialog'
  },
  eyedropperToolLabel: {
    en: 'Switch to eyedropper tool'
  },
  eyedropperButtonText: {
    en: 'pick'
  },
  rgbaTabTitle: {
    en: 'rgba'
  },
  hslaTabTitle: {
    en: 'hsla'
  },
  hexTabTitle: {
    en: 'hex'
  },
  rInputLabel: {
    en: 'r:'
  },
  gInputLabel: {
    en: 'g:'
  },
  bInputLabel: {
    en: 'b:'
  },
  aInputLabel: {
    en: 'a:'
  },
  hInputLabel: {
    en: 'h:'
  },
  sInputLabel: {
    en: 's:'
  },
  lInputLabel: {
    en: 'l:'
  },
  hexInputLabel: {
    en: '#'
  },
  saveModalTitle: {
    en: 'save image'
  },
  saveModalTipText: {
    en: 'TIP:'
  },
  saveModalSelectToolTip: {
    en: 'You can use the select tool to save only part of the canvas!'
  },
  saveModalExportAsLabel: {
    en: 'export as:'
  },
  saveModalPixelScaleLabel: {
    en: 'pixel scale:'
  },
  saveModalExportAsPngLabel: {
    en: 'png'
  },
  saveModalExportAsSvgLabel: {
    en: 'svg'
  },
  saveModalCanvasSizeText: {
    en: (width, height) => `canvas size: ${width} x ${height}`
  },
  saveModalSelectionSizeText: {
    en: (width, height) => `selection size: ${width} x ${height}`
  },
  saveModalExportedSizeText: {
    en: (width, height) => `exported image size: ${width} x ${height}`
  },
  saveModalPreviewTitle: {
    en: 'preview:'
  },
  saveModalSaveInstructions: {
    en: 'To save, right-click below and choose "save image as..."'
  }
};

export const t = (key, locale = 'en') => {
  if (!translations[key]) return key;
  if (!translations[key][locale]) return key;
  return translations[key][locale];
}
