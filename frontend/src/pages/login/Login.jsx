import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";
import { useToast } from "../../context/toast/ToastContext";
import { login as loginRequest } from "../../services/authService";
import styles from "./Login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginRequest(username, password);

      // update global auth state
      login(data.user); 
      
      toast.success("Login successful");

      navigate("/");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to login"
      );
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={styles.button} type="submit">
          Login
        </button>
      </form>

      <p
        className={styles.text}
        onClick={() => navigate("/register")}
      >
        Don't have an account? Register
      </p>
    </div>
  );
} 

