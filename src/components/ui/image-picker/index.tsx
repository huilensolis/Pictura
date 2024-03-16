import { ImagePlusIcon } from "lucide-react";
import { ImagePickerProps } from "./props.model";
import { ChangeEvent, useState } from "react";

export function ImagePicker({
  error,
  label,
  id,
  disabled = false,
  placeholderImageUrl = "",
  register,
  validationScheme,
  imagePlaceHolderClasses = "",
  showErrorMessages = true,
  onChange = () => {},
  ...extraPropsForInput
}: ImagePickerProps) {
  const [backgroundImage, setBackgroundImage] = useState<string>();

  const inputProps: any = {
    id: id,
    disabled: disabled,
    "aria-disabled": { disabled },
  };

  function handleImageSelected(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files as any as File[];

    const selectedFile = files[0] as File;

    if (!files || files.length === 0 || !selectedFile) return;

    const imageUrl = URL.createObjectURL(selectedFile);
    setBackgroundImage(imageUrl);
  }

  return (
    <div className="flex flex-col items-start justify-start h-full w-full">
      <div
        className={`${
          error
            ? "bg-red-200 border-red-300 dark:border-red-600 dark:bg-neutral-800 focus:outline-red-400 focus:dark:border-red-600"
            : "bg-neutral-300 dark:bg-neutral-800"
        } border border-neutral-200 dark:border-cm-gray  flex items-center justify-center relative cursor-pointer bg-cover object-cover bg-center bg-no-repeat ${imagePlaceHolderClasses}`}
        style={{
          backgroundImage: `${
            backgroundImage
              ? `url(${backgroundImage})`
              : placeholderImageUrl
                ? `url(${placeholderImageUrl})`
                : "none"
          }`,
        }}
      >
        {!backgroundImage && !placeholderImageUrl && (
          <ImagePlusIcon className="text-neutral-400 dark:text-neutral-400" />
        )}
        <input
          {...inputProps}
          {...extraPropsForInput}
          type="file"
          accept="image/.jpg, image/.png, image/.jpeg, image/.gif, image/.webp"
          className="w-full h-full absolute opacity-0 top-0 left-0 cursor-pointer"
          {...register(id, validationScheme)}
          onChange={(e) => {
            handleImageSelected(e);
            onChange(e);
          }}
        />
      </div>
      {error?.message && showErrorMessages && (
        <span className="text-red-600 dark:text-red-500">{error.message}</span>
      )}
    </div>
  );
}
