export const getImageSize = (height: number, width: number) => {
  if (width > height) {
    // landscape
    return 180;
  } else if (width < height) {
    // portrait
    return 300;
  } else {
    // square
    return 200;
  }
};
