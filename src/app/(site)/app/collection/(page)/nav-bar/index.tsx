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
    <nav className="w-full flex justify-between items-center">
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
          className={`focus:outline-transparent focus-visible:outline-transparent p-2 duration-150 rounded-md ${
            areFiltersOpen ? "bg-neutral-300" : "hover:bg-neutral-300"
          }`}
        >
          {areFiltersOpen ? <FilterX className="duration-150" /> : <Filter />}
        </button>
        {areFiltersOpen && (
          <ul className="absolute top-12 right-0 flex flex-col gap-2 items-center justify-center p-2 border border-neutral-300 shadow-xl shadow-neutral-300 rounded-md">
            <li className="w-full">
              <h1 className="text-md font-medium">Filter collections</h1>
            </li>
            <li className="w-full">
              <Link
                href={ClientRouting.collection().list({ filter: "own" })}
                className={`flex gap-1 py-1 px-2 w-full duration-150 rounded-sm font-medium ${
                  filter === "own"
                    ? "bg-neutral-300 text-neutral-950"
                    : "hover:bg-neutral-300 text-neutral-700 hover:text-neutral-950"
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
                className={`flex gap-1 py-1 px-2 w-full duration-150 rounded-sm font-medium ${
                  filter === "bookmarked"
                    ? "bg-neutral-300 text-neutral-950"
                    : "hover:bg-neutral-300 text-neutral-700 hover:text-neutral-950"
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
                  className={`flex gap-1 py-1 px-2 w-full rounded-sm font-medium hover:bg-neutral-300 duration-150 text-neutral-950`}
                >
                  <FilterX /> Clear Filters
                </Link>
              </li>
            )}
          </ul>
        )}
        <Link
          href={ClientRouting.collection().new()}
          className="px-3 py-1.5 text-sm bg-neutral-950 text-center rounded-md text-neutral-50 font-medium"
        >
          Create Collection
        </Link>
      </div>
    </nav>
  );
}
