"use client";

import { Input } from "@/components/ui/input";
import { TFilter } from "../models";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { ClientRouting } from "@/models/routing/client";
import { Filter, FilterX, FolderArchive, FolderHeart } from "lucide-react";
import { useState } from "react";

export function CollectionsNavBar({ filter }: { filter: TFilter }) {
  const [areFiltersOpen, setFiltersOpen] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
  } = useForm<{ search: string }>({ mode: "onChange" });

  function toggleFiltersOpen() {
    setFiltersOpen((prev) => !prev);
  }

  return (
    <nav className="w-full flex flex-wrap justify-between items-end">
      <Input
        label="search"
        type="search"
        id="search"
        error={errors.search}
        register={register}
        validationScheme={{}}
        className="w-full"
      />
      <div className="relative flex items-center justify-center">
        <button
          onClick={toggleFiltersOpen}
          className={`focus:outline-transparent text-neutral-300 focus-visible:outline-transparent p-2 duration-150 rounded-md ${
            areFiltersOpen
              ? "bg-neutral-300 dark:bg-neutral-700"
              : "hover:bg-neutral-700"
          }`}
        >
          {areFiltersOpen ? <FilterX className="duration-150" /> : <Filter />}
        </button>
        {areFiltersOpen && (
          <ul className="absolute top-12 right-0 flex flex-col gap-2 items-center justify-center p-2 border border-neutral-300 dark:border-cm-lighter-gray shadow-xl shadow-neutral-300 dark:shadow-cm-lighter-gray rounded-md bg-neutral-200 dark:bg-cm-darker-gray">
            <li className="w-full">
              <h1 className="text-md text-neutral-800 dark:text-neutral-300 font-medium">
                Filter collections
              </h1>
            </li>
            <li className="w-full">
              <Link
                href={ClientRouting.collection().list({ filter: "own" })}
                className={`flex gap-1 py-1 px-2 w-full duration-150 rounded-md font-medium ${
                  filter === "own"
                    ? "bg-neutral-300 dark:bg-neutral-700 text-neutral-950 dark:text-neutral-300"
                    : "hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-300"
                }`}
              >
                <FolderArchive /> Own
              </Link>
            </li>
            <li>
              <Link
                href={ClientRouting.collection().list({
                  filter: "bookmarked",
                })}
                className={`flex gap-1 py-1 px-2 w-full duration-150 rounded-md font-medium ${
                  filter === "bookmarked"
                    ? "bg-neutral-300 dark:bg-neutral-700 text-neutral-950 dark:text-neutral-300"
                    : "hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-300"
                }`}
              >
                <FolderHeart /> Bookmarked
              </Link>
            </li>
            {filter !== "default" && (
              <li>
                <Link
                  href={ClientRouting.collection().list({
                    filter: "default",
                  })}
                  className={`flex gap-1 py-1 px-2 w-full rounded-md font-medium duration-150 hover:bg-neutral-300 dark:hover:bg-cm-lighter-gray bg-neutral-200 dark:bg-cm-darker-gray text-neutral-950 dark:text-neutral-300`}
                >
                  <FilterX /> Clear Filters
                </Link>
              </li>
            )}
          </ul>
        )}
        <Link
          href={ClientRouting.collection().new()}
          className="px-3 py-1.5 text-sm bg-neutral-950 dark:bg-neutral-50 text-center rounded-md text-neutral-50 dark:text-neutral-700 font-medium"
        >
          Create Collection
        </Link>
      </div>
    </nav>
  );
}
