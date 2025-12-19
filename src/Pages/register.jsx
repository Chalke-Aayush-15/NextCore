import React, { useState } from "react";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      fullname,
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // IMPORTANT for session-based auth
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setMessage("Registration successful 🎉");
        setFullname("");
        setEmail("");
        setPassword("");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server error. Try again later.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Register</h2>

        {message && <p style={{ color: "red" }}>{message}</p>}

        <input
          type="text"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f4f4",
  },
  form: {
    background: "#fff",
    padding: "30px",
    borderRadius: "8px",
    width: "300px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    padding: "8px",
    background: "#28a745",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default Register;
