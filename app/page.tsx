"use client";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import { AnimatePresence } from "framer-motion";
import SplashSlide from "./components/SplashSlide";

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

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % splashData.length);
  };

  const current = splashData[activeIndex];

  return (
    <div className="relative bg-[#1A0272] min-h-screen p-4 sm:px-8 md:p-12 overflow-hidden">
      {/* Skip Button */}
      <button
        type="button"
        className="flex justify-end items-center gap-2 text-yellow font-sans cursor-pointer duration-150 hover:opacity-80 border-none outline-none w-fit self-end ml-auto"
      >
        {activeIndex === splashData.length - 1 ? "Finish" : "Skip"}{" "}
        <FaArrowRight />
      </button>

      {/* Animated Slide */}
      <AnimatePresence mode="wait">
        <SplashSlide
          key={activeIndex} // triggers exit/enter animations
          image={current.image}
          title={current.title}
          description={current.description}
          highlight={current.highlight}
          isFirst={activeIndex === 0}
        />
      </AnimatePresence>

      {/* Carousel & Play */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 items-center">
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
            onClick={nextSlide}
            className="text-yellow duration-100 hover:text-yellow-400 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}
