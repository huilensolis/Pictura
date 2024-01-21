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
    const imageType = imageMetadata.split("/")[1];
    const defaultImageTransformation: UploadApiOptions["transformation"] = {
      width: 700,
      crop: "fill",
      gravity: "center",
      fetch_format: "webp",
      quality: 80,
    };

    let finalTransformation;

    if (imageType === "gif") {
      finalTransformation = {};
    } else {
      finalTransformation = defaultImageTransformation;
    }

    const imageFromCloudinary = await cloudinary.v2.uploader.upload(
      image,
      {
        resource_type: "image",
        discard_original_filename: true,
        transformation: {
          ...finalTransformation,
        },
      },
      (error, result) => {
        if (error || !result) {
          return null;
        }

        return result;
      },
    );
    if (!imageFromCloudinary) {
      throw new Error("image could not be uploaded :(");
    }

    return Response.json({
      data: { image: { secure_url: imageFromCloudinary.secure_url } },
    });
  } catch (error) {
    console.log({ error });
    return Response.error();
  }
}
