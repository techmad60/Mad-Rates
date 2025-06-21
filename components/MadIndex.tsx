"use client";
import { useState, useEffect, useRef } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoChatboxSharp } from "react-icons/io5";
import Image from "next/image";

interface MadIndexProps {
  high24h: number;
  low24h: number;
  coinSymbol?: string;
}

export default function MadIndex({
  high24h,
  low24h,
  coinSymbol,
}: MadIndexProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLSpanElement>(null);

  if (!high24h || !low24h || low24h === 0) return null;

  const volatility = ((high24h - low24h) / low24h) * 100;

  let label = "";
  let color = "";

  if (volatility < 2) {
    label = "Calm";
    color = "text-green-500";
  } else if (volatility < 5) {
    label = "Moderate";
    color = "text-yellow-500";
  } else if (volatility < 10) {
    label = "High";
    color = "text-orange-500";
  } else {
    label = "Wild";
    color = "text-red-500";
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setShowTooltip(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mt-6 p-3 rounded mx-auto flex flex-col justify-center items-center lg:mt-32">
      <p className="text-light text-lg font-semibold pb-1 border-b border-yellow flex items-center">
        MadIndex{" "}
        <span
          ref={tooltipRef}
          className="relative ml-1"
          onClick={() => setShowTooltip((prev) => !prev)}
        >
          <IoMdInformationCircleOutline className="inline-block text-base cursor-pointer text-yellow" />
          <span
            className={`
              absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2
              w-64 p-2 rounded bg-gray-700 text-xs text-white z-10
              transition-all duration-200 ease-out
              ${showTooltip ? "opacity-100 scale-100" : "opacity-0 scale-95"}
            `}
          >
            The MadIndex is calculated as:
            <br />
            <span className="text-yellow-400">
              ((24h High - 24h Low) / 24h Low) * 100
            </span>{" "}
            — gives the % volatility over 24 hours.
          </span>
        </span>
      </p>
      <div className="relative">
        <IoChatboxSharp className="text-light text-9xl mt-2 absolute left-16" />
        <Image
          src="/images/madindex.svg"
          alt="Mad Index Mascot"
          width={100}
          height={100}
          className="lg:w-[100px] lg:h-[100px] mt-24"
        />
        <p className={`mt-2 text-xs font-bold text-background font-poor-story absolute w-24 top-6 left-20 `}>"
          {coinSymbol
            ? `${coinSymbol.charAt(0).toUpperCase()}${coinSymbol
                .slice(1)
                .toLowerCase()}'s MadIndex is `
            : ""}{" "}
          <span className={`${color}`}>{label}</span> — {volatility.toFixed(2)}%
          (24h)"
        </p>
      </div>
    </div>
  );
}
