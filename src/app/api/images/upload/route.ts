import cloudinary from "@/services/cloudinary";
import { UploadApiOptions } from "cloudinary";

export async function POST(req: Request) {
  try {
    const reqBody: { image: string | null } = await req.json();
    const { image } = reqBody;

    if (!image) {
      throw new Error("invalid image");
    }

    const imageMetadata = image.split(";")[0];
    const imageType = imageMetadata.split("/")[0].split(":")[1];

    if (imageType !== "image") {
      throw new Error("invalid file type");
    }

    const defaultImageTransformation: UploadApiOptions["transformation"] = {
      crop: "fill",
      gravity: "center",
      fetch_format: "webp",
      quality: 80,
    };

    const res = await cloudinary.v2.uploader.upload(
      image,
      {
        resource_type: "image",
        colors: true,
        discard_original_filename: true,
        transformation: {
          ...defaultImageTransformation,
        },
      },
      (error, result) => {
        if (error || !result) {
          return null;
        }

        return result;
      },
    );
    if (!res) {
      throw new Error("image could not be uploaded :(");
    }

    const { width, height, colors, secure_url } = res;

    return Response.json({
      width,
      height,
      colors,
      secure_url,
    });
  } catch (error) {
    console.log({ error });
    return Response.error();
  }
}
