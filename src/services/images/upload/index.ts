type TResponse = {
  error: any;
  data: {
    width: number;
    height: number;
    colors: [string, number][];
    secure_url: string;
  } | null;
};

/**
 * sends a POST request to the project API
 * @param an image in base64 format.
 */
export async function postImage({
  image,
  apiUrl = "/api",
}: {
  image: string; // base 64
  apiUrl?: string;
}): Promise<TResponse> {
  try {
    const res = await fetch(`${apiUrl}/images/upload`, {
      method: "POST",
      body: JSON.stringify({ image }),
    });

    const resBody: {
      width: number;
      height: number;
      colors: [string, number][];
      secure_url: string;
    } = await res.json();

    if (!res.ok) {
      return {
        error:
          "There is been an error on the response, or wether the asset secure url was not found on the response",
        data: null,
      };
    }

    return { error: false, data: resBody };
  } catch (e) {
    console.log(e);
    return { error: e, data: null };
  }
}
