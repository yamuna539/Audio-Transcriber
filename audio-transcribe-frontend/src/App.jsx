import React from "react";
import UploadForm from "./component/UploadForm";

function App() {
  return (
   <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "20px",
  }}
>
  <div
    style={{
      width: "100%",
      maxWidth: "700px",
      padding: "40px",
      textAlign: "center",
      backgroundColor: "white",
      borderRadius: "16px",
      boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    }}
  >
    <h1
      style={{
        color: "#4f46e5",
        marginBottom: "20px",
        fontSize: "2.2rem",
        fontWeight: "bold",
      }}
    >
       Audio Transcriber
    </h1>
    <p style={{ color: "#555", marginBottom: "30px" }}>
      Upload your audio file and get instant transcription.
    </p>
    <UploadForm />
  </div>
</div>

  );
}

export default App;
