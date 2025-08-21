import React from "react";
import UploadForm from "./component/UploadForm";

function App() {
  return (
    <div
     style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // full viewport height
    width: "100vw",  // full viewport width
    backgroundColor: "#e2e8f0",
  }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          padding: "40px",
          textAlign: "center",
          backgroundColor: "#f0f4f8",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <h1 style={{ color: "#333", marginBottom: "20px" }}>
          🎤 Audio Transcriber
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
