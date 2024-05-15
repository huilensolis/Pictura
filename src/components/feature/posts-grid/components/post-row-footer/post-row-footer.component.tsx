"use client";

import { DeletePostBtn } from "@/app/(site)/app/post/[postid]/components/post/components/options/components/delete";
import { DownloadPostImage } from "@/app/(site)/app/post/[postid]/components/post/components/options/components/download";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/drop-down";
import { ClientRouting } from "@/models/routing/client";
import { Database } from "@/supabase/types";
import { CircleEllipsis, FolderPlus, Pencil } from "lucide-react";
import Link from "next/link";
import { CollectionList } from "./collection-list";
import { RemovePostFromCollectionBtn } from "./remove-post-from-collection";
import { getShortName } from "@/utils/get-short-name";

export function PostRowFooter({
  collection = undefined,
  userId,
  post,
}: {
  collection?: Database["public"]["Tables"]["collection"]["Row"];
  userId: Database["public"]["Tables"]["users"]["Row"]["id"];
  post: Database["public"]["Tables"]["posts"]["Row"];
}) {
  const doesUserOwnPost = post.user_id === userId;

  const doesUserOwnCollection =
    collection && userId && userId === collection.user_id;

  return (
    <footer className="flex justify-between items-center">
      <p className="text-neutral-700 dark:text-neutral-300">
        {getShortName(post.title, 50)}
      </p>
      <div className="flex">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-center gap-1 px-4 py-2 text-neutral-800 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-cm-lighter-gray rounded-sm transition-all duration-150">
            <FolderPlus />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-neutral-200 max-w-80">
            <DropdownMenuLabel>Select Collection</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex flex-col w-full">
              <CollectionList postId={post.id} />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        {doesUserOwnCollection && (
          <RemovePostFromCollectionBtn
            postId={post.id}
            collectionId={collection.id}
          />
        )}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-center gap-1 px-4 py-2 text-neutral-800 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-cm-lighter-gray rounded-sm transition-all duration-150">
            <CircleEllipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-neutral-200 max-w-80">
            <DropdownMenuLabel>Select Collection</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex flex-col w-full">
              {doesUserOwnPost && (
                <>
                  <Link
                    href={ClientRouting.post().edit(post.id)}
                    className="w-full flex items-center justify-center p-2 dark:hover:brightness-125 hover:brightness-90 transition-all duration-75 bg-neutral-300 dark:bg-neutral-700"
                  >
                    <Pencil className="text-neutral-800 dark:text-neutral-300" />
                  </Link>
                  <DeletePostBtn postId={post.id} imageUrl={post.asset_url} />
                </>
              )}
              <DownloadPostImage image_url={post.asset_url} />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </footer>
  );
}
