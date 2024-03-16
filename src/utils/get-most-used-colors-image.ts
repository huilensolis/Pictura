export function getMostUsedColorInImageColors(
  colors: [string, number][],
): string {
  const mostUsedColorNumber = colors
    .map((colorItem) => colorItem[1])
    .sort((a, b) => (a > b ? -1 : 1))[0];

  const mostUsedColor = colors.find(
    (color) => color[1] === mostUsedColorNumber,
  );

  return mostUsedColor ? mostUsedColor[0] : "#90ACE2";
}
