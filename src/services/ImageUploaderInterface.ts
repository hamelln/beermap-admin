interface ImageUploaderInterface {
  upload(file: File): Promise<any>;
}

export default ImageUploaderInterface;
