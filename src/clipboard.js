let data, clipboardX, clipboardY, clipboardWidth, clipboardHeight;

export const setClipboardData = (newData, x, y, w, h) => {
  data = newData;
  clipboardX = x;
  clipboardY = y;
  clipboardWidth = w;
  clipboardHeight = h;
}

export const getClipboardData = () => {
  return {
    data,
    clipboardX,
    clipboardY,
    clipboardWidth,
    clipboardHeight
  };
}
