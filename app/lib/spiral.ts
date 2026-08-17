export interface SpiralConfig {
  centerX: number;
  centerY: number;
  startRadius: number;
  spacing: number;
  turns: number;
  pointsPerTurn?: number;
}

export function generateSpiralPath(config: SpiralConfig): string {
  const {
    centerX,
    centerY,
    startRadius,
    spacing,
    turns,
    pointsPerTurn = 64,
  } = config;

  const totalPoints = Math.max(2, Math.round(turns * pointsPerTurn));
  const thetaMax = turns * 2 * Math.PI;

  let d = "";

  for (let i = 0; i <= totalPoints; i++) {
    const theta = (i / totalPoints) * thetaMax;
    const r = startRadius + spacing * theta;
    const x = (centerX + r * Math.cos(theta)).toFixed(3);
    const y = (centerY + r * Math.sin(theta)).toFixed(3);

    d += i === 0 ? `M ${x},${y}` : ` L ${x},${y}`;
  }

  return d;
}