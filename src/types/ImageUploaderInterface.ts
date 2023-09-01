export interface CloudinaryResponse {
  public_id: string;
  url: string;
  secure_url: string;
}

export interface ImageUploaderInterface {
  upload(file: File): Promise<CloudinaryResponse>;
}
