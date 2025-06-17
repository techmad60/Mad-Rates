"use client";

import { useEffect, useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import SearchBar from "./ui/SearchBar";
import Image from "next/image";
export default function Header() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    document.body.classList.toggle("light", theme === "light");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  return (
    <div className="flex flex-col items-center justify-center fixed top-0 left-0 right-0 z-50 bg-background p-4 sm:px-8 md:p-12 lg:py-4">
      <div className="flex items-center justify-between max-w-[74.5rem] xl:max-w-[74rem] w-full">
        <div className="flex items-center space-x-1">
          <Image
            src="/images/Logo.svg"
            alt="Mad Rates Logo"
            width={60}
            height={60}
            className="lg:w-[100px] lg:h-[100px]"
          />
          <p className="font-display text-[#dab006] text-2xl">
            MAD<span className="text-[#14CCFF]">RATES!</span>
          </p>
        </div>

        <div className="hidden lg:flex w-full max-w-md mx-auto">
          <SearchBar />
        </div>

        <button
          onClick={toggleTheme}
          className={`text-2xl lg:text-3xl cursor-pointer hover:opacity-80 transition duration-150 ${
            theme === "dark" ? "text-yellow" : "text-blue-900"
          }`}
        >
          {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
        </button>
      </div>
    </div>
  );
}
