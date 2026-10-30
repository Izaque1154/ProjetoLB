import styles from "./css/servico.module.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Servico() {
  const [expandir, setExpandir] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Exibe a confirmação e retorna o usuário à página de origem.
  useEffect(() => {
    setExpandir(true);
    const origem = typeof location.state === "string" ? location.state : "/";
    const timer = setTimeout(() => {
      navigate(origem);
    }, 2000);

    return () => clearTimeout(timer);
  }, [location.state, navigate]);

  return (
    <div className={styles.main}>
      <div
        className={`${styles.expandir} ${expandir ? styles.expandida : ""}`}
      />
      <div className={styles.centro}>
        <h1 className={styles.servico}>Serviço Contratado</h1>
      </div>
    </div>
  );
}

export default Servico;
