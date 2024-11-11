import React, { useState } from "react";
import { saveAs } from "file-saver";

function ImageUploader() {
  const [image, setImage] = useState(null);
  const [upload, setUpload] = useState(false);
  const [prediction, setPrediction] = useState(""); // State to hold the prediction result

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpload(true);
      setPrediction("");
      await fetch('https://plant-disease-backend.vercel.app/updateData', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "ready": false, "data": [] }),
      });
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      
      // Automatically download the image
      saveAs(file, file.name);

      // Prepare the image to send to the backend
      const formData = new FormData();
      formData.append("file", file);

      // Use fetch to send the request to the backend
      try {
        let response=await fetch('https://plant-disease-backend.vercel.app/fetchData');
        let result=await response.json();
        while (result.ready==0) {
          console.log("hjdsjhdj");
            response=await fetch('https://plant-disease-backend.vercel.app/fetchData');
            result=await response.json();
        }
        setPrediction(result.data);
        // const response = await fetch("http://127.0.0.1:5000/predict", {
        //   method: "POST",
        //   body: formData,
        // });

        // if (response.ok) {
        //   const data = await response.json();
        //   setPrediction(data.prediction); // Set the prediction result from the response
        // } else {
        //   console.error("Error in fetching prediction:", response.statusText);
        //   setPrediction("Error fetching prediction");
        // }
      } catch (error) {
        console.error("Error uploading image:", error);
        setPrediction("Error fetching prediction");
      }
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
        
        {(prediction!="")?(
          <div style={styles.predictionContainer}>
            <h3 style={styles.predictionText}>Predicted Disease: {prediction}</h3>
          </div>
        ):(
          ((upload)?
            (<div>Loading</div>):
            (<div>Please Upload image to view</div>)
        )
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
    backgroundImage: "url('./background.avif')", 
    backgroundSize: "cover",
    backgroundRepeat: "repeat",
    backgroundColor: "rgba(224, 247, 250, 0.8)", 
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
  predictionContainer: {
    textAlign: "center",
    marginTop: "20px",
    padding: "15px",
    border: "1px solid #4CAF50",
    borderRadius: "12px",
    backgroundColor: "#e6f7e6",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "fit-content",
  },
  predictionText: {
    fontSize: "1.2rem",
    color: "#333",
    fontWeight: "bold",
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

export default ImageUploader;
