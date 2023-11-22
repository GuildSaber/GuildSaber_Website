export function decimalToHex(number) {
  return number.toString(16);
}

export function decimalToRGB(number) {
  const hex = decimalToHex(number);
  const aRgbHex = hex.match(/.{1,2}/g);

  return [
    parseInt(aRgbHex[0], 16),
    parseInt(aRgbHex[1], 16),
    parseInt(aRgbHex[2], 16),
  ];
}
