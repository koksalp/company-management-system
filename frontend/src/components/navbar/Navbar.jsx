import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => navigate("/")}>
          Company Management System
        </div>

        <div className={styles.right}>
          {user && (
            <>
              <span className={styles.username}>Logged in as {user.username}</span>
              <button className={styles.link} onClick={() => navigate("/")}>
                Dashboard
              </button>

              <button
                className={styles.link}
                onClick={() => navigate("/companies")}
              >
                Companies
              </button>
              <button
                className={styles.link}
                onClick={() => navigate("/products")}
              >
                Products
              </button>

              <button className={styles.logout} onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
