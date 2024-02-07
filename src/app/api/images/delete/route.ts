import cloudinary from "@/services/cloudinary";

export async function DELETE(req: Request) {
  try {
    const reqBody: { public_id: string | null } = await req.json();
    const { public_id } = reqBody;

    if (!public_id) {
      throw new Error("Invalid public_id");
    }

    const result = await cloudinary.v2.uploader.destroy(public_id);

    if (result.result === "ok") {
      return Response.json({
        message: "Image deleted successfully",
      });
    } else {
      throw new Error("Failed to delete image");
    }
  } catch (error) {
    console.log("Error in DELETE: ", { error });
    return Response.error();
  }
}
