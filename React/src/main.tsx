import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";

// Mantém o controle de rolagem sob responsabilidade do React Router.
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

// Ponto de entrada da aplicação.
createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
