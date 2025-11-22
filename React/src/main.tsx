import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from "./components/router.tsx";

if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
