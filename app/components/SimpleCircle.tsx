"use client";

interface Props {
  size?: number;
  fontSize?: number;
}

export default function SimpleCircle({ size = 50, fontSize = 6 }: Props) {
  const center = size / 2;
  const radius = size * 0.4;

  return (
    <div className="absolute inset-y-0 right-0 w-full md:w-1/2 pointer-events-none flex items-center justify-center overflow-visible">
    <svg
  viewBox={`0 0 ${size} ${size}`}
  style={{ width: size, height: size }}
  className="overflow-visible"
>     <defs>
          <path
            id="circlePath"
            d={`M ${center - radius},${center} A ${radius},${radius} 0 1,0 ${center + radius},${center} A ${radius},${radius} 0 1,0 ${center - radius},${center}`}
            fill="none"
          />
        </defs>
        <text fontSize={fontSize} fill="white" opacity="0.5" letterSpacing="3" fontFamily="JetBrains Mono">
          <textPath href="#circlePath" startOffset="0%">
            JUNIOR PROGRAMMER
          </textPath>
        </text>
      </svg>
    </div>
  );
}