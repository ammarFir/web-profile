export interface RingConfig {
  radius: number;
  fontSize: number;
  rotationDuration: number;
  direction: 1 | -1;
  repeatCount: number;
  delay: number;
}

export interface RingsOptions {
  ringCount: number;
  centerRadius: number;
  radiusStep: number;
  baseFontSize?: number;
  baseDuration?: number;
}

// Deterministic pseudo-random generator seeded by an integer.
// Same input always produces the same output on both server and client,
// which avoids Next.js hydration mismatches (unlike Math.random()).
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export function generateRings({
  ringCount,
  centerRadius,
  radiusStep,
  baseFontSize = 5,
  baseDuration = 250,
}: RingsOptions): RingConfig[] {
  const rings: RingConfig[] = [];

  for (let i = 0; i < ringCount; i++) {
    const radius = centerRadius + i * radiusStep;

    const baseForRing = baseDuration - i * (baseDuration / (ringCount * 2));
    const jitter = 0.65 + seededRandom(i * 9.13 + 1.7) * 0.7; // 0.65x - 1.35x
    const rotationDuration = Math.max(baseForRing * jitter, baseDuration / 4);

    const direction: 1 | -1 = i % 2 === 0 ? 1 : -1;
    const fontSize = baseFontSize + i * 0.75;

    const circumference = 2 * Math.PI * radius;
    const repeatCount = Math.max(3, Math.round(circumference / 2000));

    // Starting angle offset uses the golden angle (~137.5deg) multiplied by
    // the ring index. This is a classic technique for maximally even spread
    // around a circle -- unlike a random delay (which is scaled by duration
    // and can coincidentally land close to another ring's), this guarantees
    // no two rings start visually near each other, regardless of speed.
    const goldenAngle = 137.508;
    const startAngleDeg = (i * goldenAngle) % 360;
    const delay = -(startAngleDeg / 360) * rotationDuration;

    rings.push({
      radius,
      fontSize: Math.max(fontSize, 6),
      rotationDuration,
      direction,
      repeatCount,
      delay,
    });
  }

  return rings;
}