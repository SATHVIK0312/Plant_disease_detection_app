import React, { useState } from "react";
import { saveAs } from "file-saver";

function ImageUploader() {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      // Automatically download the image
      saveAs(file, file.name);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Upload and Download Image</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={styles.input}
      />
      {image && (
        <div style={styles.imageContainer}>
          <h3>Uploaded Image:</h3>
          <img src={image} alt="Uploaded" style={styles.image} />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    color: "#333",
    marginBottom: "20px",
  },
  input: {
    marginBottom: "20px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  imageContainer: {
    textAlign: "center",
    marginTop: "20px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    width: "fit-content",
  },
  image: {
    width: "300px",
    marginTop: "10px",
    borderRadius: "10px",
  },
};

export default ImageUploader;