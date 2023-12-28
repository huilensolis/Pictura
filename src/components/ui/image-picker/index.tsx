"use client";

import { ImagePlusIcon } from "lucide-react";
import { ImagePickerProps } from "./props.model";
import { ChangeEvent, useState } from "react";

export function ImagePicker({
  error = null,
  label,
  id,
  disabled = false,
  placeholderImageUrl = "",
  register,
  validationScheme,
  imagePlaceHolderClasses = "",
  ...extraPropsForInput
}: ImagePickerProps) {
  const [backgroundImage, setBackgroundImage] = useState<string>();

  const inputProps: any = {
    id: id,
    disabled: disabled,
    "aria-disabled": { disabled },
  };

  function handleImageSelected(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setBackgroundImage(imageUrl);
    }
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div
        className={`${
          error
            ? "bg-red-200 border-red-300 dark:border-red-600 dark:bg-neutral-800 focus:outline-red-400 focus:dark:border-red-600"
            : "bg-neutral-300 dark:bg-neutral-800 border-transparent dark:border-transparent"
        } border h-full w-full flex items-center justify-center relative cursor-pointer bg-cover object-cover bg-center bg-no-repeat ${imagePlaceHolderClasses}`}
        style={{
          backgroundImage: `url(${
            backgroundImage ?? placeholderImageUrl ?? ""
          })`,
        }}
      >
        {!backgroundImage && (
          <ImagePlusIcon className="text-neutral-400 dark:text-neutral-400" />
        )}
        <input
          {...inputProps}
          {...extraPropsForInput}
          type="file"
          accept="image/.jpg, image/.png, image/.jpeg, image/.gif, image/.webp"
          className="w-full h-full absolute opacity-0 top-0 left-0 cursor-pointer"
          {...register(id, validationScheme)}
          onChange={handleImageSelected}
        />
      </div>
      {error?.message && (
        <span className="text-red-600 dark:text-red-500">{error.message}</span>
      )}
    </div>
  );
}
