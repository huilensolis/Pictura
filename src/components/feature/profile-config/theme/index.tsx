"use client";

import { useTheme } from "../../../../hooks/use-theme";

export function ProfileConfigTheme() {
  const { setDarkTheme, setLightTheme, theme } = useTheme();
  return (
    <div className="flex gap-2 justify-center items-center w-full">
      <button
        className={`w-full py-16 flex justify-center items-center bg-neutral-800 rounded-xl border-2 border-transparent dark:border-blue-500 focus:outline-none`}
        onClick={setDarkTheme}
      >
        <svg
          className="w-6 h-6 text-neutral-50"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8.509 5.75c0-1.493.394-2.96 1.144-4.25h-.081a8.5 8.5 0 1 0 7.356 12.746A8.5 8.5 0 0 1 8.509 5.75Z"
          />
        </svg>
      </button>
      <button
        className={`w-full py-16 flex justify-center items-center bg-neutral-50 rounded-xl border-2 dark:border-transparent border-blue-500 focus:outline-none`}
        onClick={setLightTheme}
      >
        <svg
          className="w-6 h-6 text-neutral-800"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 3V1m0 18v-2M5.05 5.05 3.636 3.636m12.728 12.728L14.95 14.95M3 10H1m18 0h-2M5.05 14.95l-1.414 1.414M16.364 3.636 14.95 5.05M14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
          />
        </svg>
      </button>
    </div>
  );
}
