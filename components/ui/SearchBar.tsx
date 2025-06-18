// components/SearchBar.tsx
"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Modal from "../Modal";


export default function SearchBar() {
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="relative w-full bg-white mx-auto rounded-lg cursor-text"
        onClick={() => setOpen(true)}
      >
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow text-gray-800"
          readOnly
        />
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <div className="w-11/12">
          <div className="relative mb-4">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              autoFocus
              placeholder="Search for a coin..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow text-gray-800 bg-white"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>

          {/* <SearchDropdown searchTerm={term} /> */}
        </div>
      </Modal>
    </>
  );
}
