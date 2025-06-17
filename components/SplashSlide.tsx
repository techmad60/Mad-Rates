"use client";
import Image from "next/image";
import { motion } from "framer-motion";

interface SplashSlideProps {
  image: string;
  title?: string;
  description?: string;
  highlight: string;
  isFirst: boolean;
  onSwipe: (direction: number) => void;
}

export default function SplashSlide({
  image,
  title,
  description,
  highlight,
  isFirst,
  onSwipe,
}: SplashSlideProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-center text-white mt-20 absolute top-0 left-0 w-full"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(e, info) => {
        if (info.offset.x > 10) onSwipe(-1); // swipe right
        else if (info.offset.x < -10) onSwipe(1); // swipe left
      }}
    >
      <Image src={image} alt="Splash Image" width={200} height={200} />

      {isFirst && title ? (
        <p className="absolute top-52 font-display text-[2.5rem] text-cyan text-center">
          {title.replace(highlight, "")}
          <span className="text-yellow">{highlight}</span>
        </p>
      ) : (
        <p className="mt-16 text-slate-100 font-display text-center px-4 text-3xl leading-relaxed">
          {description?.split(highlight).map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className="text-cyan font-semibold">{highlight}</span>
              )}
            </span>
          ))}
        </p>
      )}
    </motion.div>
  );
}
