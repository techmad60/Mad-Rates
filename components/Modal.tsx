// components/Modal.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { FaXmark } from "react-icons/fa6";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center min-h-screen top-20 z-50 rounded-lg sm:mx-6 md:mx-8 md:top-30 lg:top-10 lg:min-h-0 lg:h-3/4 lg:w-xl lg:left-40 lg:mx-auto">
      <div
        className="w-full rounded-lg relative p-6 bg-background lg:shadow-lg "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-lg cursor-pointer"
        >
            <FaXmark />
        </button>
        {children}
      </div>
    </div>
  );
}
