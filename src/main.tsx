import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.output.css";
import App from "./App.tsx";
import { DbContextProvider } from "./DbContextProvider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DbContextProvider>
      <App />
      <Toaster />
    </DbContextProvider>
  </StrictMode>
);
