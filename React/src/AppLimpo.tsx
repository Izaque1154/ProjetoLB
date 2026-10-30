import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function LayoutLimpo() {
  return (
    <>
      {/* Área reservada para páginas sem cabeçalho e rodapé públicos. */}
      <main>
        <Outlet />
      </main>
    </>
  );
}
