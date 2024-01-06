"use client";

import { useUserProfile } from "@/hooks/use-user-profile";
import { Trash, Image } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { FormAreas } from "./new-post.models";
import { PrimaryButton } from "@/components/ui/buttons/primary";
import { postImage } from "@/services/api/upload-image";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/hooks/use-supabase";
import { useBase64Image } from "@/hooks/use-base-64-image";

export function NewPostBox() {
  const [formImageSrc, setFormImageSrc] = useState<string | null>(null);
  const [formSubmitingState, setFormSubmitingState] = useState<{
    hasFormBeenSubmitted: boolean;
    hasSubmittingBeenSuccesful: boolean;
    hasSubmittingFailed: boolean;
  }>({
    hasFormBeenSubmitted: false,
    hasSubmittingFailed: false,
    hasSubmittingBeenSuccesful: false,
  });

  const { userProfile, isLoading: isLoadingUserProfile } = useUserProfile();

  const router = useRouter();

  const {
    register,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    watch,
    resetField,
  } = useForm<FormAreas>({ mode: "onChange" });

  const { parseImageToBase64 } = useBase64Image();

  const { supabase } = useSupabase();

  async function publishPost(data: FormAreas) {
    if (!userProfile) return;

    const image = data.media[0];
    const title = data.title;

    if (!image || !title) return;

    try {
      const base64Image = await parseImageToBase64({ image });
      if (!base64Image) throw new Error("No base64Image");

      const { error: postImageError, assetSecureUrl } = await postImage({
        image: base64Image,
      });
      if (postImageError || !assetSecureUrl) {
        throw new Error(
          postImageError || "There is no assetSecureUrl from the response",
        );
      }

      const { error } = await supabase
        .from("posts")
        .insert({
          asset_url: assetSecureUrl,
          title: title,
          profile_id: userProfile?.id,
          user_id: userProfile.user_id,
        })
        .eq("profile_id", userProfile?.id)
        .single();

      if (error) {
        setFormSubmitingState({
          hasSubmittingFailed: true,
          hasFormBeenSubmitted: true,
          hasSubmittingBeenSuccesful: false,
        });
        return;
      }

      setFormSubmitingState({
        hasFormBeenSubmitted: true,
        hasSubmittingFailed: false,
        hasSubmittingBeenSuccesful: true,
      });
      UnSelectImage();
      resetField("title");
      router.refresh();
    } catch (e) {
      console.log(e);
      setFormSubmitingState({
        hasSubmittingFailed: true,
        hasFormBeenSubmitted: true,
        hasSubmittingBeenSuccesful: false,
      });
    }
  }

  function UnSelectImage() {
    resetField("media");
    setFormImageSrc(null);
  }

  return (
    <div>
      <form
        className="flex flex-col gap-5 p-5"
        onSubmit={handleSubmit(publishPost)}
      >
        <div className="flex gap-4">
          {isLoadingUserProfile ? (
            <div className="h-14 w-14 bg-neutral-400 rounded-full" />
          ) : (
            userProfile &&
            userProfile.avatar_url && (
              <img
                src={userProfile.avatar_url}
                className="h-14 w-14 rounded-full object-cover object-center"
              />
            )
          )}
          <div className="flex flex-col gap-4 pt-3 w-full">
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="What have you drew?"
                className="bg-transparent h-max text-2xl max-w-full text-neutral-800 font-bold placeholder:font-medium placeholder:text-neutral-600 focus:outline-none"
                {...register("title", {
                  maxLength: {
                    value: 50,
                    message: "Max title characteres is 50",
                  },
                  required: { value: true, message: "Title is required" },
                })}
              />
              {errors.title?.type === "maxLength" && (
                <span className="text-red-500">
                  {watch("title").length} of 50 characteres
                </span>
              )}
              {errors.title?.type === "required" && (
                <span className="text-red-500">Title required</span>
              )}
            </div>
            {formImageSrc && (
              <div className="h-full w-full relative">
                <img
                  src={formImageSrc}
                  className="w-full max-w-full max-h-96 rounded-md object-center object-cover"
                />
                <button
                  className="absolute top-2 right-2 text-neutral-50 p-2 bg-neutral-700 rounded-[calc(0.5rem-0.375rem)] hover:bg-red-500 transition-colors delay-75"
                  onClick={UnSelectImage}
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
        <section className="pl-[4.5rem] flex justify-between">
          <div className="flex items-center justify-center border-l border-neutral-300">
            <div className="cursor-pointer relative w-10 h-10 p-4 hover:bg-neutral-300 rounded-sm flex items-center justify-center">
              <label htmlFor="image" className="cursor-pointer">
                <Image
                  className={`h-6 w-6 ${errors.media && "text-red-500"}`}
                />
              </label>
              <input
                type="file"
                className="absolute top-0 left-0 opacity-0 h-full w-full cursor-pointer"
                {...register("media", {
                  onChange: (e: ChangeEvent<HTMLInputElement>) => {
                    if (
                      !e.target ||
                      !e.target.files ||
                      e.target.files.length !== 1
                    )
                      return;

                    const image = e.target.files[0] as File;
                    if (!image) return;

                    const render = new FileReader();
                    render.readAsDataURL(image);
                    render.onload = (event) => {
                      if (!event.target) return;
                      setFormImageSrc(event.target.result as string);
                    };
                  },
                  required: { value: true, message: "Image/Gif is required" },
                })}
              />
            </div>
            {errors.media && (
              <span className="text-red-500">{errors.media.message}</span>
            )}
          </div>
          <div className="max-w-40">
            <PrimaryButton
              type="submit"
              disabled={isSubmitting || !isValid}
              isLoading={isSubmitting}
            >
              Post
            </PrimaryButton>
          </div>
        </section>
        {formSubmitingState.hasSubmittingFailed && (
          <p className="text-red-500 w-full text-center">
            There has been an error trying to publish your post
          </p>
        )}
      </form>
    </div>
  );
}
