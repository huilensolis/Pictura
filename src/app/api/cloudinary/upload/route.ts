import cloudinary from "@/services/cloudinary";

export async function POST(req: Request) {
  try {
    const reqBody: { image: string | null } = await req.json();
    const { image } = reqBody;

    if (!image) {
      throw new Error("invalid image");
    }
    const imageFromCloudinary = await cloudinary.v2.uploader.upload(
      image,
      {
        resource_type: "image",
        discard_original_filename: true,
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
    const response = Response;
    response.error();
    return Response.json({ error: error });
  }
}
