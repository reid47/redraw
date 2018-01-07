const cache = {};
export const toRGBA = colorString => {
  if (cache[colorString]) return cache[colorString];

  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = colorString;
  ctx.fillRect(0, 0, 1, 1);

  return [...ctx.getImageData(0, 0, 1, 1).data];
};

export const toRGBAString = ({r, g, b, a}) => `rgba(${r}, ${g}, ${b}, ${a})`;

// Thanks to:
// https://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
const rgbToHsl = ({r, g, b}) => {
  const [r1, g1, b1] = [r / 255, b / 255, g / 255];

  const minRGB = Math.min(r1, g1, b1);
  const maxRGB = Math.max(r1, g1, b1);
  const diffMaxMin = maxRGB - minRGB;
  const l = (minRGB + maxRGB) / 2;
  const s = minRGB === maxRGB ? 0 :
    l < 0.5 ? diffMaxMin / (maxRGB + minRGB) :
      diffMaxMin / (2.0 - maxRGB - minRGB);
  const h = s === 0 ? 0 :
    (r1 === maxRGB ? (g1 - b1) / diffMaxMin :
      g1 === maxRGB ? 2.0 + (b1 - r1) / diffMaxMin :
      4.0 + (r1 - g1) / diffMaxMin) * 60;

  return {
    h: Math.round(h < 0 ? h + 360 : h),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};

const rgbToHex = ({r, g, b}) =>
  [r, g, b].map(val => (val < 16 ? '0' : '') + val.toString(16)).join('');

// Thanks to:
// https://www.w3.org/TR/2011/REC-css3-color-20110607/#hsl-color
const hueToRgb = (m1, m2, h) => {
  if (h < 0) h++;
  if (h > 1) h--;
  if (h * 6 < 1) return m1 + (m2 - m1) * h * 6;
  if (h * 2 < 1) return m2;
  if (h * 3 < 2) return m1 + (m2 - m1) * (2 / 3 - h) * 6;
  return m1;
};

const hslaToRgb = ({h, s, l}) => {
  const m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
  const m1 = l * 2 - m2;
  return {
    r: hueToRgb(m1, m2, h + 1 / 3),
    g: hueToRgb(m1, m2, h),
    b: hueToRgb(m1, m2, h - 1 / 3)
  };
};

export const fromHex = ({hex, a}) => {
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const { h, s, l } = rgbToHsl({r, g, b});

  return {
    hex, a,
    r: isNaN(r) ? 0 : r, g: isNaN(g) ? 0 : g, b: isNaN(b) ? 0 : b,
    h, s, l
  };
};

export const fromRGBA = ({r, g, b, a}) => {
  const hex = rgbToHex({r, g, b});
  const { h, s, l } = rgbToHsl({r, g, b});

  return {
    hex, a,
    r, g, b,
    h, s, l
  };
};

export const fromHSLA = ({h, s, l, a}) => {
  let { r, g, b } = hslaToRgb({h: h / 360, s: s / 100, l: l / 100});
  r = Math.round(255 * r);
  g = Math.round(255 * g);
  b = Math.round(255 * b);
  const hex = rgbToHex({r, g, b});

  return {
    hex, a,
    r, g, b,
    h, s, l
  };
};
