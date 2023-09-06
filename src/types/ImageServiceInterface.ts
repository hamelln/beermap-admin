export interface CloudinaryResponse {
  public_id: string;
  url: string;
  secure_url: string;
  format: string;
}

export interface ImageServiceInterface {
  uploadOnce(file: File): Promise<CloudinaryResponse>;
  upload(files: File[]): any;
}
