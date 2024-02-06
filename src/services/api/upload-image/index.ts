type IResponse = {
  error: any;
  assetSecureUrl: string | null;
};

/**
 * sends a POST request to the project API
 * @param an image in base64 format.
 */
export async function postImage({
  image,
}: {
  image: string; // base 64
}): Promise<IResponse> {
  try {
    const res = await fetch('/api/images/upload', {
      method: 'POST',
      body: JSON.stringify({ image }),
    });

    const resBody = await res.json();

    const assetSecureUrl = resBody.data.image.secure_url as string;

    if (!res.ok || !assetSecureUrl) {
      return {
        error:
          'There is been an error on the response, or wether the asset secure url was not found on the response',
        assetSecureUrl: null,
      };
    }

    return { error: false, assetSecureUrl };
  } catch (e) {
    return { error: e, assetSecureUrl: null };
  }
}
