export const saveCanvasData = ctx => {
  localStorage.setItem('canvasData', ctx.canvas.toDataURL());
};

export const loadCanvasData = ctx => {
  const savedCanvasData = localStorage.getItem('canvasData');
  if (savedCanvasData) {
    try {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0);
      img.src = savedCanvasData;
    } catch (err) {
      console.error(err);
    }
  }
};
