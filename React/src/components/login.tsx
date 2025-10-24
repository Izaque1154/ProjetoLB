import styles from "./css/Login.module.css"
import axios from "axios"
import { useState, useEffect } from "react"
import { MdError } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Login(){
    //Estados
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [erro, setErro] = useState<string>("")
    const [formData, setformData] = useState<string>("")
    const [carregar, setCarregar] = useState<boolean>()
    const navigate = useNavigate()

    //UseEffect
    useEffect(() =>{
        setErro(styles.hideErro)
        setformData(styles.submit)
    }, [])

    //Funções
    async function loginUser(e: React.FormEvent) {
        e.preventDefault();
        if(formData === styles.noSubmit){
            return
        }

        try{
            const url: string = "http://localhost:5000/login"
            const params = { email, senha }

            const resposta = await axios.post(url, params, {
                withCredentials: true
            })
            console.log("Usuário autenticado ")
            setCarregar(true)
            setTimeout(() =>{
                navigate("/")
            }, 300)
        } catch(error) {
            console.log("Houve um erro ao fazer o login")
            setErro(styles.showErro)
            setformData(styles.noSubmit)
            setTimeout(() =>{
                setErro(styles.hideErro)
                setformData(styles.submit)
            }, 2500)
        }
    }

    //TSX
    return(
        <div className={styles.container}>
            <div className={erro}>
                <div className={styles.warning}><MdError /></div>
                <p className={styles.erroP}>Email ou senha incorretos</p>
            </div>
            <form onSubmit={loginUser} autoComplete="off" className={styles.formulario}>
                <div className={styles.voltar} onClick={() => navigate("/")}>X</div>
                <h1 className={styles.titulo}>Login</h1>
                <label className={styles.label1}>E-mail</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} id="Lemail" className={styles.email} required/>
                <label className={styles.label2}>Senha</label>
                <input type="password" onChange={(e) => setSenha(e.target.value)} value={senha}  id="Lpassword" className={styles.senha} required/>
                <button id="submit" className={formData}>
                    {
                        !carregar ?
                            <p>Enviar</p>
                        :
                            <div className={styles.loader}></div>
                    }
                </button>
                <a href="/EsqueceuSenha" className={styles.link}>esqueceu sua senha?</a>
                <a href="/registro" className={styles.link}>Ainda não tem uma conta? Faça o cadastro</a>
            </form>
        </div>
    )
}

export default Login