import fs from "node:fs/promises";
import { join } from "node:path";

export class ImageFileSystem {
  image: File;
  allowedFileTypes: string[];
  imagePath: string | null;
  imageDirPath: string | null;

  constructor(
    image: File,
    allowedFileTypes = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/gif",
      "image/webp",
    ],
  ) {
    this.image = image;
    this.allowedFileTypes = allowedFileTypes;
    this.imagePath = null;
    this.imageDirPath = null;
  }

  async saveIntoFileSystem(): Promise<void> {
    if (!this.image) {
      return Promise.reject(
        "no image found, double check that you are sending an image to the classconstructor",
      );
    }

    const temporalDirectory = await fs.mkdtemp("mommentary-folder-");
    this.imageDirPath = temporalDirectory;

    try {
      const isFileTypeValid = this.allowedFileTypes.some(
        (fileType) => fileType === this.image.type,
      );

      if (!isFileTypeValid) {
        return Promise.reject("filetype is not accepted");
      }

      const fileExtension = this.image.type.split("/")[1];

      const path = join(
        temporalDirectory,
        `${new Date().getTime().toString()}.${fileExtension}`,
      );
      this.imagePath = path;

      const imageBuffer = Buffer.from(await this.image.arrayBuffer());

      // we save the File
      await fs.writeFile(path, imageBuffer, {
        encoding: "binary",
      });

      return Promise.resolve();
    } catch (error) {
      console.log("error while saving image into file system");
      return Promise.reject(error);
    }
  }

  getImagePath() {
    return this.imagePath;
  }

  async deleteFromFileSystem(): Promise<void> {
    if (!this.imagePath) return Promise.reject("no image path found");
    if (!this.imageDirPath) return Promise.reject("no image path found");

    try {
      await fs.rm(this.imagePath, { recursive: true, force: true });
      await fs.rm(this.imageDirPath, { recursive: true, force: true });
      return Promise.resolve();
    } catch (error) {
      console.log({ erroronDeleting: error });
      return Promise.reject(error);
    }
  }
}
