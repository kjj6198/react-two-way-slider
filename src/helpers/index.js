export const getOffsetFromLeft = (clientX, left, width) => {
  const offset = Math.min(clientX - left, width);
  return Math.max(offset, 0);
}
