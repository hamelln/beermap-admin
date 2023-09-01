import {
  CloudinaryResponse,
  ImageUploaderInterface,
} from "@/types/ImageUploaderInterface";

class ImageUploader implements ImageUploaderInterface {
  private readonly USER_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_USER_NAME!;
  private readonly CLOUD_URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL!;

  async upload(file: File): Promise<CloudinaryResponse> {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", this.USER_NAME);
    const result = await fetch(`${this.CLOUD_URL}/upload`, {
      method: "POST",
      body: data,
    });
    return await result.json();
  }
}

export default ImageUploader;
