"use client";

import { Pencil } from "lucide-react";
import Link from "next/link";
import { ClientRouting } from "@/models/routing/client";
import { DeletePostBtn } from "./components/delete";
import { DownloadPostImage } from "./components/download";
import { AddPostToCollectionBtn } from "./components/add-to-collection";

export function PostOptions({
  post_id,
  image_url,
  doesUserOwnPost,
}: {
  post_id: number;
  image_url: string;
  doesUserOwnPost: boolean;
}) {
  return (
    <div className="w-full flex justify-between gap-2">
      {doesUserOwnPost && (
        <>
          <ul className="flex gap-2">
            <li className="flex w-full">
              <DeletePostBtn postId={post_id} imageUrl={image_url} />
            </li>
            <li className="flex w-full">
              <Link
                href={ClientRouting.post().edit(post_id)}
                className="w-full flex items-center justify-center px-4 py-2 dark:hover:brightness-125 hover:brightness-90 transition-all duration-75 bg-neutral-300 dark:bg-neutral-700"
              >
                <Pencil className="text-neutral-800 dark:text-neutral-300" />
              </Link>
            </li>
            <li className="flex w-full">
              <DownloadPostImage image_url={image_url} />
            </li>
          </ul>
          <div>
            <AddPostToCollectionBtn postId={post_id} />
          </div>
        </>
      )}
    </div>
  );
}
