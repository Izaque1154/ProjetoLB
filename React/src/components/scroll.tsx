import { useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useLayoutEffect(() => {
    if (navType === "POP") return; // não interfere no voltar
    requestAnimationFrame(() => window.scrollTo(0, 0));
  }, [pathname, navType]);

  return null;
}
