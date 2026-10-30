import styles from "./css/Login.module.css";
import api, { apiRoutes } from "../services/api";
import { useState, useEffect } from "react";
import { MdError } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  // Estado do formulário e feedback visual.
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [erro, setErro] = useState<string>("");
  const [formData, setformData] = useState<string>("");
  const [carregar, setCarregar] = useState<boolean>();
  const navigate = useNavigate();
  const location = useLocation();

  const destinoAposLogin =
    typeof location.state?.from === "string" ? location.state.from : "/";

  // Inicialização e validação dos campos.
  useEffect(() => {
    setformData(styles.noSubmit);
    setErro(styles.hideErro);
  }, []);
  useEffect(() => {
    const validacao = senha.trim() != "" && email.trim() !== "";
    if (validacao) {
      return setformData(styles.submit);
    }
    setformData(styles.noSubmit);
  }, [senha, email]);

  // Autenticação do usuário.
  async function loginUser(e: React.FormEvent) {
    e.preventDefault();
    if (formData === undefined || formData === styles.noSubmit) {
      return;
    }

    try {
      setCarregar(true);
      const url: string = apiRoutes.auth.login;
      const params = { email, senha };

      await api.post(url, params);
      console.log("Usuário autenticado ");
      setTimeout(() => {
        navigate(destinoAposLogin, { replace: true });
      }, 300);
    } catch (error) {
      setCarregar(false);
      console.log("Houve um erro ao fazer o login");
      setErro(styles.showErro);
      setformData(styles.noSubmit);
      setTimeout(() => {
        setErro(styles.hideErro);
        setformData(styles.submit);
      }, 2500);
    }
  }

  // Renderização.
  return (
    <div className={styles.container}>
      {/* Feedback de autenticação. */}
      <div className={erro}>
        <div className={styles.warning}>
          <MdError />
        </div>
        <p className={styles.erroP}>Email ou senha incorretos</p>
      </div>

      {/* Formulário de acesso. */}
      <form
        onSubmit={loginUser}
        autoComplete="off"
        className={styles.formulario}
      >
        <div className={styles.voltar} onClick={() => navigate("/")}>
          X
        </div>
        <h1 className={styles.titulo}>Login</h1>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          id="Lemail"
          className={styles.email}
          placeholder="Digite seu email"
          required
        />
        <input
          type="password"
          onChange={(e) => setSenha(e.target.value)}
          value={senha}
          id="Lpassword"
          className={styles.senha}
          placeholder="Digite sua senha"
          required
        />
        <button id="submit" className={formData}>
          {!carregar ? (
            <p className={styles.buttonP}>Enviar</p>
          ) : (
            <div className={styles.loader}></div>
          )}
        </button>
        <a onClick={() => navigate("/esqueceuSenha")} className={styles.link}>
          esqueceu sua senha?
        </a>
        <a onClick={() => navigate("/registro")} className={styles.link}>
          Ainda não tem uma conta? Faça o cadastro
        </a>
      </form>
    </div>
  );
}

export default Login;
