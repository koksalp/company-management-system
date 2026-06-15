import styles from "./toast.module.css";

export default function ToastContainer({ toasts, onRemove }) {
  return (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${styles.toast} ${styles[toast.type]}`}
        >
          <span>{toast.message}</span>

          <button
            className={styles.close}
            onClick={() => onRemove(toast.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
} 

