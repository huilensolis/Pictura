export const extractPublicId = async (imageURL: string) => {
  const parts = imageURL.split("/");
  const filename = parts.pop(); // Get the last part of the URL
  if (filename) {
    const filenameParts = filename.split(".");
    if (filenameParts.length > 1) {
      return filenameParts[0]; // Return the part before the first '.'
    }
  }
  throw new Error("Invalid imageURL format");
};
