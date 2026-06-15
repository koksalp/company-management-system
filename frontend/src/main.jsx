import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./App.css";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth/AuthContext";
import { ToastProvider } from "./context/toast/ToastContext";
import { DataProvider } from "./context/data/DataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ToastProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </ToastProvider>
    </AuthProvider>
  </BrowserRouter>
);
