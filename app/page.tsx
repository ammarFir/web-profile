"use client";

import { useState } from "react";
import SpiralText from "./components/SpiralText";
import AnimatedText from "./components/AnimatedText";
import Typewriter from "./components/TypeWriter";
import PulseDot from "./components/PulseDot";

export default function Home() {
  const [mouseX, setMouseX] = useState(50);
  const [mouseY, setMouseY] = useState(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouseX(x);
    setMouseY(y);
  };

  const gradientStyle = {
    backgroundImage: `radial-gradient(circle at ${mouseX}% ${mouseY}%, cyan, #6366f1, purple)`,
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
    <main
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden cursor-default"
    >
      {/* Efek Glow */}
      <div className="absolute w-[600px] h-[600px] bg-cyan-500 rounded-full blur-[200px] opacity-30 animate-pulse -top-40 -right-40"></div>
      <div className="absolute w-[500px] h-[500px] bg-purple-600 rounded-full blur-[200px] opacity-20 animate-pulse -bottom-40 -left-40"></div>

      {/* Kiri: Teks */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <AnimatedText delay={0.1}>
          <p className="text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-4 flex items-center gap-2" style={gradientStyle}>
            <PulseDot />
            Web Developer
          </p>
        </AnimatedText>

        <AnimatedText delay={0.2}>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight" style={gradientStyle}>
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

      {/* Kanan: Spiral Text (DEBUG: fixed size box just to verify geometry in Step 5.2) */}
      <div className="relative z-10 mt-10 md:mt-0 md:absolute md:right-10 lg:right-20 top-1/2 md:-translate-y-1/2 w-[600px] h-[600px] max-w-full bg-red-500/30">
        <SpiralText />
      </div>
    </main>
  );
}