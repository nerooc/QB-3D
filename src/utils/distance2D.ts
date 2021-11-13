export const distance2D = (
  p1x: number,
  p1y: number,
  p2x: number,
  p2y: number,
) => {
  const a = p2x - p1x;
  const b = p2y - p1y;

  return Math.sqrt(a * a + b * b);
}
