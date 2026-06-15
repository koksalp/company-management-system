import { useEffect } from "react";
import styles from "./Notification.module.css";

export default function Notification({ message, type, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!message) return null;

  const typeClass = styles[type] || styles.default;

  return (
    <div className={styles.overlay}>
      <div className={`${styles.notification} ${typeClass}`}>
        <button className={styles.closeButton} onClick={onClose} type="button">
          ×
        </button>

        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
}
