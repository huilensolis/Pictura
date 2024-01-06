export function useBase64Image() {
  function parseImageToBase64({ image }: { image: File }) {
    return new Promise<string | null>((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const result = reader.result as string;

        if (!result) return reject("could not parse image");

        return resolve(result);
      };
      reader.readAsDataURL(image);
    });
  }

  return { parseImageToBase64 };
}
