import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./base.css";
import App from "./App";
import { QueryProvider } from "./app/providers/QueryProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </StrictMode>,
);
