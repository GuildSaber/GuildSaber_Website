export function decimalToHex(number: number) {
  return `#${number.toString(16)}`;
}

export function hexToRGB(hex: string) {
  const aRgbHex = hex.match(/.{1,2}/g);
  if (!aRgbHex) {
    return [0, 0, 0];
  }

  return [
    parseInt(aRgbHex[0], 16),
    parseInt(aRgbHex[1], 16),
    parseInt(aRgbHex[2], 16),
  ];
}

export function decimalToRGB(number: number | undefined) {
  if (!number) {
    return [0, 0, 0];
  }

  return hexToRGB(decimalToHex(number).replace("#", ""));
}
