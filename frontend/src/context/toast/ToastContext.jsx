import { createContext, useContext, useState, useCallback } from "react";
import ToastContainer from "./ToastContainer";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "default", duration = 3000) => {
    const id = Date.now() + Math.random();

    const toast = { id, message, type };

    setToasts((prev) => [...prev, toast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const success = (msg) => addToast(msg, "success");
  const error = (msg) => addToast(msg, "error");
  const warning = (msg) => addToast(msg, "warning");
  const info = (msg) => addToast(msg, "info");

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider
      value={{ success, error, warning, info }}
    >
      {children}

      <ToastContainer
        toasts={toasts}
        onRemove={removeToast}
      />
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext); 

