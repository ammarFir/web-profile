"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import { generateRings } from "../lib/rings";

interface SpiralTextProps {
  text?: string;
  ringCount?: number;
  centerRadius?: number;
  radiusStep?: number;
  opacity?: number;
}

// textPath only reliably works when it references a <path> element, not a
// <circle> element, in most browsers. This builds a full-circle path using
// two arc commands, which behaves identically to a circle visually.
function circlePath(cx: number, cy: number, r: number): string {
  return `M ${cx - r},${cy} A ${r},${r} 0 1,1 ${cx + r},${cy} A ${r},${r} 0 1,1 ${cx - r},${cy}`;
}

export default function SpiralText({
  text = "THE CONTENT ARCHITECTURE",
  ringCount = 9,
  centerRadius = 30,
  radiusStep = 28,
  opacity = 0.55,
}: SpiralTextProps) {
  const rawId = useId();
  const uid = rawId.replace(/:/g, "");
  const size = 600;
  const cx = size / 2;
  const cy = size / 2;

  const rings = generateRings({
    ringCount,
    centerRadius,
    radiusStep,
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full pointer-events-none">
      <defs>
        {rings.map((ring, i) => (
          <path
            key={`def-${i}`}
            id={`ring-${uid}-${i}`}
            d={circlePath(cx, cy, ring.radius)}
            fill="none"
          />
        ))}
      </defs>

      {rings.map((ring, i) => {
        const repeated = Array(ring.repeatCount).fill(text).join("   •   ");
        return (
          <motion.g
            key={`ring-${i}`}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
            animate={{ rotate: ring.direction === 1 ? 360 : -360 }}
            transition={{
              duration: ring.rotationDuration,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <text
              fontSize={ring.fontSize}
              letterSpacing={0.5}
              fill="white"
              opacity={opacity}
              style={{ textTransform: "uppercase" }}
            >
              <textPath href={`#ring-${uid}-${i}`}>{repeated}</textPath>
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}