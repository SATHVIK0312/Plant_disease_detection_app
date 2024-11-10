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
    <div style={styles.outerContainer}>
      <header style={styles.navbar}>
        <h1 style={styles.navTitle}>Rice Plant Disease Detection</h1>
      </header>
      <div style={styles.container}>
        <h2 style={styles.title}>Upload Image</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={styles.input}
        />
        {image && (
          <div style={styles.imageContainer}>
            <h3 style={styles.imageText}>Uploaded Image:</h3>
            <img src={image} alt="Uploaded" style={styles.image} />
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  outerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    padding: "20px",
    border: "5px solid #4CAF50",
    background: "linear-gradient(to right, #e0f7fa, #e1bee7)",
  },
  navbar: {
    width: "100%",
    backgroundColor: "#4CAF50",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    animation: "fadeIn 2s ease",
  },
  navTitle: {
    color: "#ffffff",
    fontSize: "1.8rem",
    fontWeight: "bold",
    fontFamily: "'Roboto', sans-serif",
    animation: "textGlow 2s ease infinite",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px",
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: "#f8f9fa",
    borderRadius: "15px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
    maxWidth: "80%",
    margin: "20px",
  },
  title: {
    color: "#343a40",
    fontSize: "1.6rem",
    fontWeight: "bold",
    marginBottom: "30px",
    animation: "bounce 2s infinite",
  },
  input: {
    marginBottom: "30px",
    padding: "12px 20px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "2px solid #6c757d",
    outline: "none",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  imageContainer: {
    textAlign: "center",
    marginTop: "20px",
    padding: "15px",
    border: "1px solid #6c757d",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "fit-content",
  },
  imageText: {
    animation: "fadeInUp 1.5s ease",
  },
  image: {
    width: "320px",
    marginTop: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease",
  },
};

// CSS Animations
const keyframes = `
  @keyframes textGlow {
    0%, 100% {
      text-shadow: 0 0 5px #ffffff, 0 0 10px #4CAF50, 0 0 15px #4CAF50;
    }
    50% {
      text-shadow: 0 0 20px #ffffff, 0 0 30px #4CAF50, 0 0 40px #4CAF50;
    }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-15px); }
    60% { transform: translateY(-10px); }
  }
  @keyframes fadeInUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

// Adding keyframes to document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = keyframes;
document.head.appendChild(styleSheet);

// Adding hover effects for input and image
styles.input[':hover'] = {
  borderColor: "#343a40",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

styles.image[':hover'] = {
  transform: "scale(1.05)",
};

export default ImageUploader;
