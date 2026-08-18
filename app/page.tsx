"use client";

import { useState } from "react";
import AnimatedText from "./components/AnimatedText";
import Typewriter from "./components/TypeWriter";
import PulseDot from "./components/PulseDot";
import SimpleCircle from "./components/SimpleCircle";

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
      className="relative min-h-screen overflow-hidden cursor-default"
    >
      {/* Split background: putih di kiri, abu di kanan (mengikuti pembagian grid) */}
      <div className="absolute inset-0 -z-10 hidden md:grid md:grid-cols-2">
        <div className="bg-white" />
       <div className="bg-[#232323]" />
      </div>
      <div className="absolute inset-0 -z-10 md:hidden bg-neutral-800" />

     
      <SimpleCircle size={60} fontSize={8 }/>

      {/* Grid 2 kolom: kiri teks, kanan spacer kosong */}
      <div className="relative z-10 min-h-screen grid grid-cols-1 md:grid-cols-2 items-center px-6 md:px-12 lg:px-20 gap-10">
        {/* Kiri: Teks */}
        <div className="flex flex-col items-start justify-center text-left">
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

        {/* Kanan: spacer kosong, biar teks kiri tetap di kolom kiri secara grid */}
        <div aria-hidden="true" />
      </div>
    </main>
  );
}