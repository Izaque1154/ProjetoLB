import styles from "./css/Login.module.css"
import axios from "axios"
import { useState } from "react"

function Login(){
    //Estados
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");

    //Funções
    async function loginUser(e: React.FormEvent) {
        e.preventDefault();

        try{
            const url: string = "http://localhost:5000/login"
            const params = { email, senha }

            const resposta = await axios.post(url, params, {
                withCredentials: true
            })
            console.log("Usuário autenticado ")
        } catch(error) {
            alert("Senha ou email incorretos")
            console.log("Erro: ", error)
        }
    }

    //TSX
    return(
        <div className={styles.container}>
            <form onSubmit={loginUser} autoComplete="off" className={styles.formulario}>
                <h1 className={styles.titulo}>Login</h1>
                <label className={styles.label1}>E-mail</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} id="Lemail" className={styles.email} required/>
                <label className={styles.label2}>Senha</label>
                <input type="password" onChange={(e) => setSenha(e.target.value)} value={senha}  id="Lpassword" className={styles.senha} required/>
                <input type="submit" id="Lsubmit" className={styles.submit}  />
                <a href="/EsqueceuSenha" className={styles.link}>esqueceu sua senha?</a>
            </form>
        </div>
    )
}

export default Login