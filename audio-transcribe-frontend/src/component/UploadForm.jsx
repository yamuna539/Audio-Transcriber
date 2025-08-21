import React, { useState } from "react";
import axios from "axios";

function UploadForm() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setResult("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8081/api/transcribe", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data.transcription);
    } catch (err) {
      setResult("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px 25px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#4f46e5",
            color: "white",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
            transition: "0.2s",
          }}
        >
          {loading ? "Transcribing..." : "Upload & Transcribe"}
        </button>
      </form>

      {result && (
        <div
          style={{
            marginTop: "30px",
            textAlign: "left",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ marginBottom: "10px", color: "#333" }}>📝 Transcription:</h3>
          <p style={{ color: "#555", lineHeight: "1.5" }}>{result}</p>
        </div>
      )}
    </div>
  );
}

export default UploadForm;
