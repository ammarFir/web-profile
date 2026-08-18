"use client";

import { useId } from "react";
import { generateRings } from "../lib/rings";

interface SpiralTextProps {
  text?: string;
  ringCount?: number;
  centerRadius?: number;
  radiusStep?: number;
  opacity?: number;
}

function circlePath(cx: number, cy: number, r: number): string {
  return `M ${cx - r},${cy} A ${r},${r} 0 1,1 ${cx + r},${cy} A ${r},${r} 0 1,1 ${cx - r},${cy}`;
}

export default function SpiralText({
  text = "Junior/Newbie Programmer",
  ringCount = 14,
  centerRadius = 20,
  radiusStep = 18,
  opacity = 0.55,
}: SpiralTextProps) {
  const rawId = useId();
  const uid = rawId.replace(/:/g, "");
  const size = 600;
  const cx = size / 2;
  const cy = size / 2;
  const upperText = text.toUpperCase();

  const rings = generateRings({
    ringCount,
    centerRadius,
    radiusStep,
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full pointer-events-none" shapeRendering="optimizeSpeed">
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
        const separator = "   •   ";
        const mainRepeated = Array(ring.repeatCount).fill(upperText).join(separator);

        // Same size/density ratios you tuned before (0.55 for char width
        // basis, 0.4 for spacing, 0.35 for dot-to-font size), but now
        // applied to a native SVG dashed-circle stroke instead of hundreds
        // of individual "•" text characters. A dashed stroke with
        // strokeLinecap="round" and a near-zero dash length renders as an
        // evenly spaced ring of round dots -- as ONE lightweight path
        // element per ring, instead of hundreds of measured text glyphs.
        // This guarantees full coverage (it's geometric, not estimated)
        // and is dramatically cheaper for the browser to animate.
  const avgCharWidth = ring.fontSize * 0.2;
const dotSpacingPx = avgCharWidth * 3.4;
const dotDiameter = ring.fontSize * .35;

        return (
          <g
            key={`ring-${i}`}
            className={ring.direction === 1 ? "ring-spin-cw" : "ring-spin-ccw"}
            style={{
              transformOrigin: `${cx}px ${cy}px`,
              transformBox: "view-box",
              animationDuration: `${ring.rotationDuration}s`,
              animationDelay: `${ring.delay}s`,
              willChange: "transform",
            }}
          >
            {/* Dotted ring underneath the text, native SVG dashed stroke */}
            <use
              href={`#ring-${uid}-${i}`}
              stroke="white"
              strokeOpacity={opacity}
              strokeWidth={dotDiameter}
              strokeDasharray={`0 ${dotSpacingPx}`}
              strokeLinecap="round"
              fill="none"
            />

            <text
              fontSize={ring.fontSize}
              letterSpacing={0.5}
              fill="white"
              opacity={opacity}
            >
              <textPath href={`#ring-${uid}-${i}`}>{mainRepeated}</textPath>
            </text>
          </g>
        );
      })}
    </svg>
  );
}