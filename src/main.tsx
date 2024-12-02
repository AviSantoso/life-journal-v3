import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.output.css";
import App from "./App.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { UserProvider } from "./components/providers/UserProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <App />
      <Toaster />
    </UserProvider>
  </StrictMode>
);
