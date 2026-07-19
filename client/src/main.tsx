import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import "./styles/globals.css";
import ToastProvider from "./components/Toast/ToastProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
       <ToastProvider />
    </BrowserRouter>
  </StrictMode>
);