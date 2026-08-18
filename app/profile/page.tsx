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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const generateText = () => {
      container.innerHTML = "";

      const fontSize = 7;
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

        // Mulai dari -5 biar ga ada space kosong di kiri
        for (let j = -5; j < cols; j++) {
          const word = words[Math.floor(Math.random() * words.length)];
          const span = document.createElement("span");
          span.className = "matrix-word";
          span.style.cssText = `
            font-size: ${fontSize}px;
            opacity: 1;
            color: #222222;
            font-family: monospace;
            letter-spacing: 0.5px;
            white-space: nowrap;
            user-select: none;
            pointer-events: none;
            line-height: 1;
            flex-shrink: 0;
          `;
          span.textContent = word;
          rowDiv.appendChild(span);
        }

        fragment.appendChild(rowDiv);
      }

      container.appendChild(fragment);

      const elements = container.querySelectorAll(".matrix-word");
      const interval = setInterval(() => {
        elements.forEach((el) => {
          const originalText = el.getAttribute("data-original") || el.textContent || "";

          if (!el.getAttribute("data-original")) {
            el.setAttribute("data-original", originalText);
          }

          const original = el.getAttribute("data-original") || "";
          const chars = original.split("");

          const changes = Math.random() < 0.25 ? 2 : 1;
          const indices: number[] = [];
          for (let i = 0; i < changes; i++) {
            let idx;
            do {
              idx = Math.floor(Math.random() * chars.length);
            } while (indices.includes(idx) && chars.length > 1);
            if (chars.length > 1 && !indices.includes(idx)) {
              indices.push(idx);
            }
          }

          indices.forEach((idx) => {
            const char = chars[idx].toLowerCase();
            const alternatives = leetMap[char] || [char.toUpperCase()];
            chars[idx] = alternatives[Math.floor(Math.random() * alternatives.length)];
          });

          el.textContent = chars.join("");
        });
      }, 300);

      return () => clearInterval(interval);
    };

    const timeout = setTimeout(generateText, 50);
    window.addEventListener("resize", generateText);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", generateText);
    };
  }, []);

  return (
    <main className="relative min-h-screen w-screen flex flex-col items-center justify-center px-4 overflow-hidden" style={{ background: "#181818" }}>
      {/* BACKGROUND RANDOM TEXT - FULL LAYAR */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-0 w-full h-full overflow-hidden"
        style={{ left: 0, right: 0, top: 0, bottom: 0 }}
      />

      {/* KONTEN UTAMA */}
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