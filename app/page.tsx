"use client";

import { useState } from "react";
import AnimatedText from "./components/AnimatedText";
import Typewriter from "./components/TypeWriter";
import PulseDot from "./components/PulseDot";
import SimpleCircle from "./components/SimpleCircle";

export default function Home() {
  const [mouseX, setMouseX] = useState(50);
  const [mouseY, setMouseY] = useState(50);
  const [isHoveringLeft, setIsHoveringLeft] = useState(false);
  
  // Single source of truth: change this and both the wrapper div and
  // SimpleCircle's size prop stay in sync automatically.
  const CIRCLE_SIZE = 80;
  const CIRCLE_FONT_SIZE = 8;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouseX(x);
    setMouseY(y);
    setIsHoveringLeft(true);
  };

  const handleMouseLeave = () => {
    setIsHoveringLeft(false);
  };

  // Gradient hanya aktif ketika hover di kiri
  const gradientStyle = {
    backgroundImage: isHoveringLeft
      ? `radial-gradient(circle at ${mouseX}% ${mouseY}%, cyan, #6366f1, purple)`
      : `radial-gradient(circle at 50% 50%, cyan, #6366f1, purple)`, // Default position
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    transition: "background-image 0.08s ease",
  } as const;

  const words = [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
  ];

  return (
    <main className="relative min-h-screen overflow-hidden cursor-default">
      {/* Split background: putih di kiri, abu di kanan (mengikuti pembagian grid) */}
      <div className="absolute inset-0 -z-10 hidden md:grid md:grid-cols-2">
        <div className="bg-white" />
        <div className="bg-[#232323]" />
      </div>
      <div className="absolute inset-0 -z-10 md:hidden bg-neutral-800" />

      {/* Spiral: dicenter tepat di tengah separuh kanan layar */}
      <div className="absolute inset-y-0 right-0 w-full md:w-1/2 flex items-center justify-center pointer-events-none">
        <div style={{ width: CIRCLE_SIZE, height: CIRCLE_SIZE }}>
          <SimpleCircle
            size={CIRCLE_SIZE}
            fontSize={CIRCLE_FONT_SIZE}
            dotGapMultiplier={3}
            letterSpacing={1.5}
          />
        </div>
      </div>

      {/* Area kiri full-height untuk mouse tracking */}
      <div
        className="absolute inset-y-0 left-0 w-full md:w-1/2 z-10"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />

      {/* Grid 2 kolom: kiri teks, kanan spacer kosong */}
      <div className="relative z-20 min-h-screen grid grid-cols-1 md:grid-cols-2 items-center px-6 md:px-12 lg:px-20 gap-10 pointer-events-none">
        {/* Kiri: Teks */}
        <div className="flex flex-col items-start justify-center text-left pointer-events-auto">
          <AnimatedText delay={0.1}>
            <p className="text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-4 flex items-center gap-2" style={gradientStyle}>
              <PulseDot />
              Web Developer
            </p>
          </AnimatedText>

          <AnimatedText delay={0.2}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight" style={gradientStyle}>
              Halo, Saya Ammar Fir
            </h1>
          </AnimatedText>

          <AnimatedText delay={0.3}>
            <p className="text-base md:text-lg mt-6 max-w-xl" style={gradientStyle}>
              Saya bikin website modern, cepat, dan penuh karakter. Bukan template, tapi karya.
            </p>
          </AnimatedText>

          <AnimatedText delay={0.4}>
            <div className="mt-6 flex items-center gap-3 text-sm md:text-base font-medium text-white/70">
              <span>Built with</span>
              <Typewriter words={words} delay={0.5} className="text-cyan-400 font-semibold" />
            </div>
          </AnimatedText>
        </div>

        {/* Kanan: spacer kosong */}
        <div aria-hidden="true" />
      </div>
    </main>
  );
}