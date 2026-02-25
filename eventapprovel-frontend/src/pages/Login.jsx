import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    console.log("LOGIN CLICKED");

    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });

      console.log("LOGIN RESPONSE:", res.data);

      const user = res.data;
      localStorage.setItem("user", JSON.stringify(user));

      if (user.Role === "STUDENT") navigate("/student");
      else if (user.Role === "HOD") navigate("/hod");
      else if (user.Role === "PRINCIPAL") navigate("/principal");

    } catch (err) {
      console.log("LOGIN ERROR:", err);
      alert("Invalid credentials");
    }
  };



  return (
    <div style={{ width: "300px", margin: "100px auto" }}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>

      <p style={{ marginTop: "10px" }}>
        New user? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
}

export default Login;
