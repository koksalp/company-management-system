import { useEffect } from "react";
import styles from "./BackgroundOverlay.module.css";

export default function BackgroundOverlay({ children, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.content}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
        >
          ×
        </button>

        {children}
      </div>
    </div>
  );
} 

