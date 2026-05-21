import React, { useState } from "react";
import bcrypt from "bcryptjs";

export default function Login({ onSuccess }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const PASSWORD_HASH = "$2b$10$cR3F/6o2qXdl5jCG4qeNOeJWZxDLeM.NZehGJdNA/SNQ18ZsOb3WK";

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const ok = await bcrypt.compare(input, PASSWORD_HASH);

    setLoading(false);

    if (ok) {
      onSuccess();
    } else {
      setError("Wrong passphrase");
    }
  };

  return (
    <div style={styles.loginContainer}>
      <h2>Restricted Access</h2>

      <input
        type="password"
        value={input}
        placeholder="Enter password"
        onChange={(e) => setInput(e.target.value)}
        style={styles.input}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleLogin();
        }}
      />

      <button onClick={handleLogin} style={styles.button} disabled={loading}>
        {loading ? "Checking..." : "Login"}
      </button>

      {error && <div style={styles.error}>{error}</div>}
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  container: {
    maxWidth: 1000,
    margin: "0 auto",
    padding: 20,
    fontFamily: "Arial",
  },

  loginContainer: {
    maxWidth: 400,
    margin: "120px auto",
    padding: 20,
    textAlign: "center",
    border: "1px solid #ddd",
    borderRadius: 10,
  },

  input: {
    width: "100%",
    padding: 12,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
  },

  button: {
    padding: "10px 16px",
    cursor: "pointer",
  },

  error: {
    color: "red",
    marginTop: 10,
  },

  placeholder: {
    textAlign: "center",
    marginTop: 40,
    color: "#888",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: 12,
    marginTop: 20,
  },

  card: {
    border: "1px solid #ddd",
    padding: 12,
    borderRadius: 8,
    background: "#fafafa",
  },

  code: {
    fontWeight: "bold",
    color: "#1976d2",
  },

  name2: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
};
