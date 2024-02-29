import { extractPublicId } from "../extract-public-id";

export const deleteImageAsset = async (imageUrl: string) => {
  try {
    const public_id = await extractPublicId(imageUrl);
    const response = await fetch("/api/images/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_id }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete image");
    }

    return Promise.resolve();
  } catch (error) {
    console.error("Error deleting image:", error);
    return Promise.reject(error);
  }
};
