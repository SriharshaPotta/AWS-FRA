import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const [mode, setMode] = useState("auth");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);

      setTimeout(() => {
        const mockResponse = {
          Message: "Success",
          firstName: "John",
          lastName: "Doe",
        };
        setResult(mockResponse);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error:", error);
      setResult({ Message: "Error processing request" });
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!image || !firstName || !lastName) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);

      setTimeout(() => {
        setResult({ Message: "Employee registered successfully!" });
        setLoading(false);
        setFirstName("");
        setLastName("");
        setImage(null);
        setPreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 1500);
    } catch (error) {
      console.error("Error:", error);
      setResult({ Message: "Error registering employee" });
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Employee Facial Recognition</h1>

      <div className="mode-toggle">
        <button
          onClick={() => setMode("auth")}
          className={mode === "auth" ? "active" : ""}
        >
          Authentication
        </button>
        <button
          onClick={() => setMode("register")}
          className={mode === "register" ? "active" : ""}
        >
          Employee Registration
        </button>
      </div>

      {mode === "auth" ? (
        <div className="auth-container">
          <h2>Face Authentication</h2>
          <form onSubmit={handleAuthSubmit}>
            <div className="form-group">
              <label htmlFor="auth-image">Upload your image:</label>
              <input
                id="auth-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </div>
            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Preview" />
              </div>
            )}
            <button type="submit" disabled={loading}>
              {loading ? "Processing..." : "Authenticate"}
            </button>
          </form>
          {result && (
            <div
              className={`result ${
                result.Message === "Success" ? "success" : "error"
              }`}
            >
              {result.Message === "Success" ? (
                <>
                  <p>Authentication successful!</p>
                  <p>
                    Welcome, {result.firstName} {result.lastName}
                  </p>
                </>
              ) : (
                <p>{result.Message}</p>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="register-container">
          <h2>Register New Employee</h2>
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <label htmlFor="first-name">First Name:</label>
              <input
                id="first-name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="last-name">Last Name:</label>
              <input
                id="last-name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="register-image">Upload employee image:</label>
              <input
                id="register-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                required
              />
            </div>
            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Preview" />
              </div>
            )}
            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register Employee"}
            </button>
          </form>
          {result && (
            <div
              className={`result ${
                result.Message.includes("successfully") ? "success" : "error"
              }`}
            >
              <p>{result.Message}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
