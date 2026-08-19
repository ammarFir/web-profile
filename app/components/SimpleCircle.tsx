"use client";

import { useId } from "react";

interface SimpleCircleProps {
  size?: number;
  fontSize?: number;
  text?: string;
  letterSpacing?: number;
  opacity?: number;
  rotationDuration?: number;
  dotSize?: number; // dot diameter in px, independent of fontSize
  dotGapMultiplier?: number;
  textCoverage?: number; // 0-1, what fraction of the ring's circumference the text region gets
}

function pointOnRing(cx: number, cy: number, r: number, thetaDeg: number) {
  const rad = (thetaDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

// Partial arc covering [startFrac, endFrac] of the ring (0 = the 9 o'clock
// point, 1 = back around to that same point), traveling counter-clockwise
// (left -> down -> right -> up). Used for BOTH the text region and the dot
// region, so they always meet edge-to-edge with no gap or overlap.
function partialArcPath(cx: number, cy: number, r: number, startFrac: number, endFrac: number): string {
  const startTheta = 180 - startFrac * 360;
  const endTheta = 180 - endFrac * 360;
  const start = pointOnRing(cx, cy, r, startTheta);
  const end = pointOnRing(cx, cy, r, endTheta);
  const sweepDeg = (endFrac - startFrac) * 360;
  const largeArcFlag = sweepDeg > 180 ? 1 : 0;
  return `M ${start.x},${start.y} A ${r},${r} 0 ${largeArcFlag},0 ${end.x},${end.y}`;
}

export default function SimpleCircle({
  size = 400,
  fontSize = 10,
  text = "THE CONTENT ARCHITECTURE",
  letterSpacing = 0.5,
  opacity = 0.55,
  rotationDuration = 90,
  dotSize = 1.3,
  dotGapMultiplier = 3,
  textCoverage = 0.4,
}: SimpleCircleProps) {
  const rawId = useId();
  const uid = rawId.replace(/:/g, "");
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - fontSize;
  const upperText = text.toUpperCase();
  const separator = "   •   ";

  // The ring is split into exactly two regions by fraction of circumference:
  // [0, textCoverage] for text, [textCoverage, 1] for dots. Nothing here is
  // estimated from character widths anymore -- textPath naturally clips
  // whatever doesn't fit within its own arc's length, so a long phrase just
  // gets cut off at the boundary instead of overflowing into the dot region.
  // Small blank buffer inserted on both sides where dots meet text, so the
  // gap looks the same at the "text end -> dots start" junction as it does
  // at the "dots end -> text start" junction (wrap-around point).
  const bufferFraction = 0.02;
  const textArcPath = partialArcPath(cx, cy, radius, 0, textCoverage);
  const dotArcPath = partialArcPath(
    cx,
    cy,
    radius,
    textCoverage + bufferFraction,
    1 - bufferFraction
  );

  // Repeat the phrase generously so there's always more than enough to
  // fill the text arc regardless of how short `text` is; textPath discards
  // whatever spills past the arc's end.
  const repeatedText = Array(6).fill(upperText).join(separator);

  const dotDiameter = dotSize;
  const dotSpacing = dotDiameter * dotGapMultiplier;

  const textArcId = `text-arc-${uid}`;
  const dotArcId = `dot-arc-${uid}`;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full pointer-events-none" shapeRendering="optimizeSpeed">
      <defs>
        <path id={textArcId} d={textArcPath} fill="none" />
        <path id={dotArcId} d={dotArcPath} fill="none" />
      </defs>

      <g
        className="ring-spin-ccw"
        style={{
          transformOrigin: `${cx}px ${cy}px`,
          transformBox: "view-box",
          animationDuration: `${rotationDuration}s`,
          willChange: "transform",
        }}
      >
        <use
          href={`#${dotArcId}`}
          stroke="white"
          strokeOpacity={opacity}
          strokeWidth={dotDiameter}
          strokeDasharray={`0 ${dotSpacing}`}
          strokeLinecap="round"
          fill="none"
        />

        <text fontSize={fontSize} letterSpacing={letterSpacing} fill="white" opacity={opacity}>
          <textPath href={`#${textArcId}`}>
            {repeatedText.split("").map((char, i) => {
              // Deterministic pseudo-random stagger so letters don't all
              // flicker in sync -- same hash technique used elsewhere in
              // this file, so it stays consistent between server and
              // client renders (no hydration mismatch).
              const seed = Math.sin(i * 127.1 + 311.7) * 43758.5453;
              const rand = seed - Math.floor(seed);
              const delay = rand * 6;
              const duration = 3 + rand * 3;
              return (
                <tspan
                  key={i}
                  className="flicker-letter"
                  style={{ animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
                >
                  {char}
                </tspan>
              );
            })}
          </textPath>
        </text>
      </g>
    </svg>
  );
}