"use client";

import { useEffect, useState } from "react";

const words = [
  "Web Developer",
  "Tech Enthusiast",
  "Content Creator",
  "Problem Solver",
  "Creative Thinker",
];

export default function CircularText() {
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000); // ganti tiap 3 detik

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full animate-spin-slow"
        style={{ animationDuration: "12s" }}
      >
        <defs>
          <path
            id="circlePath"
            d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
          />
        </defs>
        <text className="text-sm md:text-base font-bold tracking-widest uppercase fill-white">
          <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
            {words[currentWord]}
          </textPath>
        </text>
      </svg>
    </div>
  );
}