type IResponse = {
  error: any;
  assetSecureUrl: string | null;
};

export async function postImage(image: File): Promise<IResponse> {
  try {
    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch("/api/cloudinary/upload", {
      method: "POST",
      body: formData,
    });

    const resBody = await res.json();

    const assetSecureUrl = resBody.data.image.secure_url as string;

    if (!res.ok || !assetSecureUrl) {
      return {
        error:
          "There is been an error on the response, or wether the asset secure url was not found on the response",
        assetSecureUrl: null,
      };
    }

    return { error: false, assetSecureUrl: assetSecureUrl };
  } catch (e) {
    return { error: e, assetSecureUrl: null };
  }
}
