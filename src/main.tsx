import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.output.css";
import App from "./App.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { AuthProvider } from "./components/providers/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <Toaster />
    </AuthProvider>
  </StrictMode>
);
