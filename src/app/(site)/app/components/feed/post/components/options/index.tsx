"use client";

import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

export function PostOptions() {
  const POST_OPTIONS: { action: () => void; title: string }[] = [
    { title: "Edit", action: () => {} },
    { title: "Delete", action: () => {} },
    { title: "Report", action: () => {} },
    { title: "Share", action: () => {} },
  ];
  const [showDropdown, setShowDropdown] = useState(false);

  function toggleDropdown() {
    setShowDropdown(!showDropdown);
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="text-white bg-neutral-700 hover:brightness-125 rounded-md p-2 text-center flex items-center"
      >
        <MoreHorizontal />
      </button>

      {showDropdown && (
        <ul
          id="dropdown"
          className="flex flex-col z-10 absolute top-12 right-0 w-48 bg-neutral-700 rounded-md overflow-hidden"
        >
          {POST_OPTIONS.map((option) => (
            <li key={option.title}>
              <button className="bg-neutral-800 text-neutral-200 font-medium text-start px-12 py-3 w-full hover:brightness-125 transition-all delay-75">
                {option.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
