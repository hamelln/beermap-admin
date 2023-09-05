import {
  CloudinaryResponse,
  ImageUploaderInterface,
} from "@/types/ImageUploaderInterface";

class ImageUploader implements ImageUploaderInterface {
  private readonly USER_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_USER_NAME!;
  private readonly CLOUD_URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL!;
  private readonly CLOUD_API_URL = process.env.NEXT_PUBLIC_CLOUDINARY_API_URL!;
  private readonly SMALL_WIDTH = 560;
  private readonly MEDIUM_WIDTH = 856;
  private readonly LARGE_WIDTH = 1600;
  private readonly SMALL_HEIGHT = 560;
  private readonly MEDIUM_HEIGHT = 856;
  private readonly LARGE_HEIGHT = 1600;

  async uploadOnce(file: File): Promise<CloudinaryResponse> {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", this.USER_NAME);
    const result = await fetch(`${this.CLOUD_URL}/upload`, {
      method: "POST",
      body: data,
    });
    return await result.json();
  }

  async upload(files: File[]) {
    const uploadedImages = [];
    for (const file of files) {
      const uploaded: CloudinaryResponse = await this.uploadOnce(file);
      uploadedImages.push({
        id: uploaded.public_id,
        small: `${this.CLOUD_API_URL}/c_scale,w_${this.SMALL_WIDTH},h_${this.SMALL_HEIGHT}/f_auto/q_auto/${uploaded.public_id}.${uploaded.format}`,
        medium: `${this.CLOUD_API_URL}/c_scale,w_${this.MEDIUM_WIDTH},h_${this.MEDIUM_HEIGHT}/f_auto/q_auto/${uploaded.public_id}.${uploaded.format}`,
        large: `${this.CLOUD_API_URL}/c_scale,w_${this.LARGE_WIDTH},h_${this.LARGE_HEIGHT}/f_auto/q_auto/${uploaded.public_id}.${uploaded.format}`,
      });
    }
    return uploadedImages;
  }
}

export default ImageUploader;
