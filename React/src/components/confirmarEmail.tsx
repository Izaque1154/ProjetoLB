import api, { apiRoutes } from "../services/api";
import styles from "./css/confirmarEmail.module.css";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

function ConfirmarEmail() {
  // Estado da confirmação e parâmetros recebidos pelo link.
  const [condicao, setCondicao] = useState<boolean>();
  const [msg, setMsg] = useState<string>("");
  const [searchParams] = useSearchParams();

  // Inicialização da tela.
  useEffect(() => {
    setCondicao(false);
  }, []);

  // Confirma o token informado na URL.
  async function confirmar() {
    const token = searchParams.get("token");
    console.log("token: ", token);
    try {
      await api.post(apiRoutes.auth.confirmarEmail, { token: token });
      console.log("Email confirmado");
      setCondicao(true);
      setMsg("Email confirmado");
    } catch (erro: any) {
      console.log("Houve um erro ", erro);
      setMsg(erro.response.data.erro);
      setCondicao(true);
    }
  }
  // Renderização.
  return (
    <div className={styles.container}>
      <div className={styles.caixa}>
        {/* Ação inicial ou resultado da confirmação. */}
        {!condicao ? (
          <button className={styles.button} onClick={() => confirmar()}>
            Confirmar Email
          </button>
        ) : (
          <h2 className={styles.h2}>{msg}</h2>
        )}
      </div>
    </div>
  );
}

export default ConfirmarEmail;
