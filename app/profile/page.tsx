"use client";

import { useEffect, useRef } from "react";
import AnimatedText from "../components/AnimatedText";
import Link from "next/link";

// Mapping huruf ke alternatif
const leetMap: Record<string, string[]> = {
  a: ["4", "@", "A"],
  b: ["8", "6"],
  e: ["3", "E"],
  g: ["9", "6"],
  i: ["1", "!", "I"],
  o: ["0", "O"],
  s: ["5", "$", "S"],
  t: ["7", "T"],
  z: ["2", "Z"],
  c: ["(", "C"],
  l: ["1", "L"],
  h: ["#", "H"],
  u: ["U", "v"],
  w: ["W", "vv"],
  r: ["R"],
  n: ["N"],
  m: ["M"],
  d: ["D"],
  f: ["F"],
  p: ["P"],
  y: ["Y"],
  x: ["X"],
  k: ["K"],
  q: ["Q"],
  v: ["V"],
};

const words = [
  "EVERY", "DECISION", "ALREADY", "MADE", "SKIP", "WORK",
  "AGENT", "SCHEMA", "FETCH", "STRUCTURE", "SEO", "COMMIT",
  "CLONE", "RENAME", "SHIP", "AGENTS", "MCP", "CHROME",
  "NEXTJS", "REACT", "TAILWIND", "TYPESCRIPT", "FRAMER",
  "WEB", "DEV", "PROFILE", "PORTFOLIO", "CREATIVE",
  "CODE", "MATRIX", "RANDOM", "GLITCH", "CYBER", "HACKER"
];

export default function ProfilePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const charElementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ==========================================
    // 🎯 SETTING DI SINI BRO!
    // ==========================================
    const CONFIG = {
      coreRadius: 50,              // 🔥 Radius circle inti (pasti hilang total)
      maxEffectRadius: 180,         // 🔥 Jarak maksimal efek random (lebih dari ini = aman)
      maxProbability: 0.85,         // 🔥 Probability Maksimal di pinggir circle (15% = jarang hilang)
      // Probability akan berkurang secara halus dari maxProbability → 0
      // Tidak ada zone kaku, tapi gradasi smooth berdasarkan jarak
    };

    const generateText = () => {
      container.innerHTML = "";
      charElementsRef.current = [];

      const fontSize = 9;
      const gap = 3;
      const wordLength = 8;
      const charWidth = fontSize * 0.55;
      const wordWidth = wordLength * charWidth + gap;
      const rowHeight = fontSize * 1.8;

      const containerWidth = container.clientWidth || window.innerWidth;
      const containerHeight = container.clientHeight || window.innerHeight;

      const cols = Math.floor(containerWidth / wordWidth) + 10;
      const rows = Math.floor(containerHeight / rowHeight) + 2;

      const fragment = document.createDocumentFragment();

      for (let i = 0; i < rows; i++) {
        const rowDiv = document.createElement("div");
        rowDiv.style.cssText = `
          display: flex;
          flex-wrap: nowrap;
          gap: ${gap}px;
          margin: 0;
          padding: 0;
          height: ${rowHeight}px;
          align-items: center;
          flex-shrink: 0;
          width: 100%;
        `;

        for (let j = -5; j < cols; j++) {
          const word = words[Math.floor(Math.random() * words.length)];
          
          const chars = word.split('');
          
          const wordContainer = document.createElement("span");
          wordContainer.style.cssText = `
            display: inline-flex;
            gap: 0px;
            flex-shrink: 0;
            letter-spacing: 0.5px;
          `;
          
          chars.forEach((char) => {
            const span = document.createElement("span");
            span.className = "matrix-char";
            span.style.cssText = `
              font-size: ${fontSize}px;
              visibility: visible;
              color: #222222;
              font-family: monospace;
              user-select: none;
              pointer-events: none;
              line-height: 1;
              display: inline-block;
            `;
            span.textContent = char;
            wordContainer.appendChild(span);
            charElementsRef.current.push(span);
          });
          
          rowDiv.appendChild(wordContainer);
        }

        fragment.appendChild(rowDiv);
      }

      container.appendChild(fragment);

      const elements = container.querySelectorAll(".matrix-char");
      const interval = setInterval(() => {
        elements.forEach((el) => {
          const originalText = el.getAttribute("data-original") || el.textContent || "";

          if (!el.getAttribute("data-original")) {
            el.setAttribute("data-original", originalText);
          }

          const original = el.getAttribute("data-original") || "";
          
          if (Math.random() < 0.3) {
            const char = original.toLowerCase();
            const alternatives = leetMap[char] || [char.toUpperCase()];
            el.textContent = alternatives[Math.floor(Math.random() * alternatives.length)];
          } else {
            el.textContent = original;
          }
        });
      }, 300);

      return () => clearInterval(interval);
    };

    // ==========================================
    // 🔥 EFEK CURSOR - SMOOTH PROBABILITY (NATURAL)
    // ==========================================
    let mouseX = -9999;
    let mouseY = -9999;
    let isMouseOver = false;
    
    const updateVisibility = () => {
      if (!isMouseOver) {
        // Reset semua ke visible kalau mouse keluar
        charElementsRef.current.forEach((el) => {
          el.style.visibility = 'visible';
        });
        return;
      }
      
      const rect = container.getBoundingClientRect();
      
      charElementsRef.current.forEach((el) => {
        const elRect = el.getBoundingClientRect();
        const elX = elRect.left - rect.left + elRect.width / 2;
        const elY = elRect.top - rect.top + elRect.height / 2;
        
        const dx = elX - mouseX;
        const dy = elY - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // ZONA 1: CIRCLE INTI (PASTI HILANG)
        if (distance < CONFIG.coreRadius) {
          el.style.visibility = 'hidden';
          return;
        }
        
        // ZONA 2: SMOOTH PROBABILITY (NATURAL GRADATION)
        // Hitung probability berdasarkan jarak secara smooth
        let hideProbability = 0;
        
        if (distance < CONFIG.maxEffectRadius) {
          // Normalisasi jarak: 0 (di pinggir circle) sampai 1 (di maxEffectRadius)
          const normalizedDistance = (distance - CONFIG.coreRadius) / (CONFIG.maxEffectRadius - CONFIG.coreRadius);
          
          // Probability berkurang secara smooth (easing)
          // Dari maxProbability (dekat circle) → 0 (di maxEffectRadius)
          hideProbability = CONFIG.maxProbability * Math.pow(1 - normalizedDistance, 2);
          
          // Atau bisa pakai easing lain:
          // hideProbability = CONFIG.maxProbability * (1 - normalizedDistance); // Linear
          // hideProbability = CONFIG.maxProbability * Math.pow(1 - normalizedDistance, 3); // Cubic (lebih cepat hilang)
          // hideProbability = CONFIG.maxProbability * Math.sqrt(1 - normalizedDistance); // Square root (lebih lambat hilang)
        }
        
        // Random check untuk visibility
        if (Math.random() < hideProbability) {
          el.style.visibility = 'hidden';
        } else {
          el.style.visibility = 'visible';
        }
      });
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isMouseOver = true;
      
      // Panggil updateVisibility langsung setiap mouse move
      updateVisibility();
    };

    const handleMouseLeave = () => {
      isMouseOver = false;
      mouseX = -9999;
      mouseY = -9999;
      
      // Reset semua ke visible
      charElementsRef.current.forEach((el) => {
        el.style.visibility = 'visible';
      });
    };

    const timeout = setTimeout(generateText, 50);
    window.addEventListener("resize", generateText);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", generateText);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <main className="relative min-h-screen w-screen flex flex-col items-center justify-center px-4 overflow-hidden" style={{ background: "#181818" }}>
      <div
        ref={containerRef}
        className="absolute inset-0 z-0 w-full h-full overflow-hidden"
        style={{ left: 0, right: 0, top: 0, bottom: 0 }}
      />

      <div className="relative z-10 text-center max-w-2xl">
        <AnimatedText delay={0.1}>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
            Profile Saya
          </h1>
        </AnimatedText>

        <AnimatedText delay={0.2}>
          <p className="text-lg text-white/70 leading-relaxed">
            Saya Ammar Fir, seorang web developer yang suka bikin website
            dengan animasi keren dan performa tinggi.
          </p>
        </AnimatedText>

        <AnimatedText delay={0.3}>
          <Link
            href="/"
            className="inline-block mt-8 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-300"
          >
            ← Kembali ke Home
          </Link>
        </AnimatedText>
      </div>
    </main>
  );
}