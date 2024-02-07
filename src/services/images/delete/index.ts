const extractPublicId = async (imageURL: string) => {
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

export const deleteFromCloundinary = async (imageUrl: string) => {
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
