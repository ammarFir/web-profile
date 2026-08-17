export interface RingConfig {
  radius: number;
  fontSize: number;
  rotationDuration: number;
  direction: 1 | -1;
  repeatCount: number;
}

export interface RingsOptions {
  ringCount: number;
  centerRadius: number;
  radiusStep: number;
  baseFontSize?: number;
  baseDuration?: number;
}

export function generateRings({
  ringCount,
  centerRadius,
  radiusStep,
  baseFontSize = 10,
  baseDuration = 90,
}: RingsOptions): RingConfig[] {
  const rings: RingConfig[] = [];

  for (let i = 0; i < ringCount; i++) {
    const radius = centerRadius + i * radiusStep;
    const rotationDuration = baseDuration - i * (baseDuration / (ringCount * 2));
    const direction: 1 | -1 = i % 2 === 0 ? 1 : -1;
    const fontSize = baseFontSize - i * 0.15;
    const circumference = 2 * Math.PI * radius;
    const repeatCount = Math.max(3, Math.round(circumference / 140));

    rings.push({
      radius,
      fontSize: Math.max(fontSize, 6),
      rotationDuration: Math.max(rotationDuration, baseDuration / 2),
      direction,
      repeatCount,
    });
  }

  return rings;
}