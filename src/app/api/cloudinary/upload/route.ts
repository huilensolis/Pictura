import cloudinary from "@/services/cloudinary";
import { ImageFileSystem } from "@/utils/image-file-system";

export async function POST(req: Request) {
  const formData = await req.formData();

  const image = formData.get("image") as File;

  if (!image) {
    return Response.json({ message: "no image found in request" });
  }

  const Image = new ImageFileSystem(image);

  try {
    await Image.saveIntoFileSystem();
    const imagePath = Image.getImagePath();

    if (!imagePath) {
      throw new Error("image not found");
    }
    const imageFromCloudinary = await cloudinary.v2.uploader.upload(
      imagePath,
      {},
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
  } finally {
    console.log("running finally");
    await Image.deleteFromFileSystem();
  }
}
