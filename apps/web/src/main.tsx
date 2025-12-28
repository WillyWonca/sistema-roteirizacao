import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./AuthContext";

import { Toaster } from "react-hot-toast";

// 🆕 import do provider de idioma
import { LanguageProvider } from "./LanguageContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* 🌍 idioma global */}
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />

          {/* 🔔 toasts globais */}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#0f172a",
                color: "#fff",
                border: "1px solid #334155",
              },
            }}
          />
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  </React.StrictMode>
);
