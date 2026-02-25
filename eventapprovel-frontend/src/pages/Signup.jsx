import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/signup", {
        name,
        email,
        password,
        role
      });

      alert("Signup successful. Please login.");
      navigate("/");
    } catch (err) {
      setError("Signup failed");
    }
  };

  return (
    <div style={{ width: "300px", margin: "100px auto" }}>
      <h2>Signup</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSignup}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <br /><br />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="STUDENT">STUDENT</option>
          <option value="HOD">HOD</option>
          <option value="PRINCIPAL">PRINCIPAL</option>
        </select>

        <br /><br />

        <button type="submit">Signup</button>
      </form>

      <p style={{ marginTop: "10px" }}>
        Already registered? <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Signup;
