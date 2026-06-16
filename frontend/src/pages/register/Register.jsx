import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerRequest, login as loginRequest } from "../../services/authService";
import { useAuth } from "../../context/auth/AuthContext";
import { useToast } from "../../context/toast/ToastContext";
import styles from "./Register.module.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerRequest(username, password);

      // log user in and immediately authenticate user after register
      const data = await loginRequest(username, password);
      login(data.user);

      toast.success("Account created successfully");

      navigate("/");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Register</h2>

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
          Register
        </button>
      </form>

      <p
        className={styles.text}
        onClick={() => navigate("/login")}
      >
        Already have an account? Login
      </p>
    </div>
  );
} 

