import React, { memo, useRef, useState } from "react";
import styles from "./image_file_input.module.css";

const ImageFileInput = memo(({ imageUploader, onFileChange }) => {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const onButtonClick = (event) => {
    event.preventDefault();
    inputRef.current.click();
  };
  const [SMALL_WIDTH, MEDIUM_WIDTH, LARGE_WIDTH] = [560, 856, 1600];
  const [SMALL_HEIGHT, MEDIUM_HEIGHT, LARGE_HEIGHT] = [560, 856, 1600];

  const onChange = async (event) => {
    setLoading(true);

    const uploadedImages = [];
    const files = event.target.files;

    for (const file of files) {
      const uploaded = await imageUploader.upload(file);
      uploadedImages.push({
        id: uploaded.public_id,
        small: `${process.env.NEXT_PUBLIC_CLOUDINARY_API_URL}/c_scale,w_${SMALL_WIDTH},h_${SMALL_HEIGHT}/f_auto/q_auto/${uploaded.public_id}.${uploaded.format}`,
        medium: `${process.env.NEXT_PUBLIC_CLOUDINARY_API_URL}/c_scale,w_${MEDIUM_WIDTH},h_${MEDIUM_HEIGHT}/f_auto/q_auto/${uploaded.public_id}.${uploaded.format}`,
        large: `${process.env.NEXT_PUBLIC_CLOUDINARY_API_URL}/c_scale,w_${LARGE_WIDTH},h_${LARGE_HEIGHT}/f_auto/q_auto/${uploaded.public_id}.${uploaded.format}`,
      });
    }

    setLoading(false);
    onFileChange(uploadedImages);
  };

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        className={styles.input}
        type="file"
        accept="image/*"
        multiple
        name="file"
        onChange={onChange}
      />
      {!loading && (
        <button
          className={`${styles.button} ${styles.pink}`}
          onClick={onButtonClick}
        ></button>
      )}
      {loading && <div className={styles.loading}></div>}
    </div>
  );
});
export default ImageFileInput;
