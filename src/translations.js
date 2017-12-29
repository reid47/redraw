const translations = {
  drawButtonText: {
    en: 'draw'
  },
  drawToolLabel: {
    en: 'Draw tool'
  },
  fillButtonText: {
    en: 'fill'
  },
  fillToolLabel: {
    en: 'Switch to fill tool'
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
  canvasSizeLabel: {
    en: 'canvas:'
  },
  selectionSizeLabel: {
    en: 'selection:'
  },
  zoomLabel: {
    en: 'zoom:'
  },
  cursorPositionLabel: {
    en: 'cursor:'
  }
};

export const t = (key, locale = 'en') => {
  if (!translations[key]) return key;
  if (!translations[key][locale]) return key;
  return translations[key][locale];
}
