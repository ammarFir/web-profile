// app/lib/spiralPath.ts

export function generateSpiralPath(
  cx: number,
  cy: number,
  radiusStart: number,
  radiusEnd: number,
  turns: number,
  points: number = 300
): string {
  let path = "";
  const thetaMax = turns * 2 * Math.PI;

  for (let i = 0; i <= points; i++) {
    const t = i / points;
    const theta = t * thetaMax;
    const r = radiusStart + (radiusEnd - radiusStart) * t;
    const x = cx + r * Math.cos(theta);
    const y = cy + r * Math.sin(theta);

    if (i === 0) {
      path += `M ${x.toFixed(2)} ${y.toFixed(2)}`;
    } else {
      path += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
    }
  }

  return path;
}