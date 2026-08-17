"use client";

interface PulseDotProps {
  className?: string;
}

export default function PulseDot({ className = "" }: PulseDotProps) {
  return (
    <span className={`relative flex size-3 ${className}`}>
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
      <span className="relative inline-flex size-full rounded-full bg-cyan-400"></span>
    </span>
  );
}