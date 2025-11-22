import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function LayoutLimpo() {
  return (
    <>
      <main>
        <Outlet /> 
      </main>
    </>
  );
}