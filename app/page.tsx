"use client";
import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import { AnimatePresence } from "framer-motion";
import SplashSlide from "@/components/SplashSlide";
import Link from "next/link";

const splashData = [
  {
    image: "/images/Logo.svg",
    title: "MADRATES!",
    highlight: "RATES!",
  },
  {
    image: "/images/splash2.svg",
    description: "Get real time prices of crypto currencies.",
    highlight: "real time",
  },
  {
    image: "/images/splash3.svg",
    description: "Convert Any Cryptocurrency with Precision.",
    highlight: "Convert",
  },
  {
    image: "/images/splash4.svg",
    description: "Track the Trends with our MadIndex",
    highlight: "MadIndex",
  },
];



export default function Home() {
  
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSwipe = (dir: number) => {
    if (dir === -1 && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    } else if (dir === 1 && activeIndex < splashData.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };
  

  const current = splashData[activeIndex];
  useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") handleSwipe(1);
    if (e.key === "ArrowLeft") handleSwipe(-1);
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [activeIndex]);


  return (
    <div className="relative bg-background min-h-screen p-4 sm:px-8 md:p-12 overflow-hidden">
      {/* Skip / Finish Button */}
      <Link
        href="/main"
        className="flex justify-end items-center gap-2 text-yellow font-sans cursor-pointer duration-150 hover:opacity-80 border-none outline-none w-fit self-end ml-auto"
      >
        {activeIndex === splashData.length - 1 ? "Finish" : "Skip"}{" "}
        <FaArrowRight />
      </Link>

      {/* Animated Slide */}
      <AnimatePresence mode="wait" initial={false}>
        <SplashSlide
          key={activeIndex}
          image={current.image}
          title={current.title}
          description={current.description}
          highlight={current.highlight}
          isFirst={activeIndex === 0}
          onSwipe={handleSwipe}
        />
      </AnimatePresence>

      {/* Carousel & Play Button */}
      <div className="absolute bottom-18 left-0 right-0 flex justify-center gap-2 items-center">
        {splashData.map((_, i) => (
          <div
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
              i === activeIndex ? "bg-yellow-500 scale-110" : "bg-slate-100"
            }`}
          />
        ))}
        {activeIndex < splashData.length - 1 && (
          <FaPlay
            onClick={() => handleSwipe(1)}
            className="text-yellow duration-100 hover:text-yellow-400 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}
