export const toSVG = ctx => {
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height).data;
  const svgParts = [];

  let y = -1;
  for (let i = 0; i < imageData.length; i += 4) {
    const r = imageData[i];
    const g = imageData[i + 1];
    const b = imageData[i + 2];
    const a = imageData[i + 3];
    const x = (i / 4) % ctx.canvas.width;
    if (x === 0) y++;
    if (a === 0) continue;

    const rgb = `rgb(${r},${g},${b})`;
    svgParts.push(`<rect x="${x}" y="${y}" width="1" height="1" fill="${rgb}" fill-opacity="${a}"/>`)
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="640" height="480" viewBox="0 0 ${ctx.canvas.width} ${ctx.canvas.height}">
${svgParts.join('')}
</svg>`;
};
