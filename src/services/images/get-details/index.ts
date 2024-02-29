import cloudinary from "@/services/cloudinary";
import { extractPublicId } from "../extract-public-id";
import { GetImageDetailsApiRespone } from "./details.models";

export const getImageDetails = async (
  imageUrl: string,
): Promise<{ details: GetImageDetailsApiRespone | null }> => {
  try {
    const public_id = await extractPublicId(imageUrl);

    if (!public_id) throw new Error("Invalid image url");

    const response = await cloudinary.v2.api.resource(public_id);

    return { details: response };
  } catch (error) {
    return { details: null };
  }
};
