import styles from "./css/esqueceuSenha.module.css"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { MdError } from "react-icons/md";
import axios from "axios"


function EsqueceuSenha() {
    const navigate = useNavigate();
    const [ email, setEmail ] = useState<string>("");
    const [ cooldown, setCooldown ] = useState(0);
    const [erro, setErro] = useState<string>("")
    const [enviado, setEnviado] = useState<string>("")

    useEffect(() => {
        if (cooldown > 0) {
            const time = setInterval(() =>{
                setCooldown((prev) => prev - 1)
            }, 1000);
            localStorage.setItem("contador", cooldown.toLocaleString())
            return () => clearInterval(time)
        }

    }, [cooldown]);

    useEffect(() => {
        setErro(styles.hideErro)
        setEnviado(styles.hideEnviar)
        if (!localStorage.getItem("contador")){
            return
        } else if(Date.now() > Number(localStorage.getItem('timestamp'))){
            localStorage.removeItem("timestamp")
            localStorage.removeItem("contador")
            localStorage.removeItem("timer")
        }
        setCooldown(Number(localStorage.getItem("contador")))
    },[])


    //Evniar Formulário
    async function enviarEmail(e: React.FormEvent) {
        e.preventDefault();
        if (cooldown > 0){
            return 
        }

        try{
            const url = "http://localhost:5000/esqueceuSenha";

            await axios.post(url, {email: email}, {
                "headers": {
                    "Content-Type": "application/json"
                }
            })

            console.log("Email enviado com sucesso")
            setEnviado(styles.showEnviar)
            setTimeout(() =>{
                setEnviado(styles.hideEnviar)
            }, 2500)

        } catch (erro) {
            console.log("erro ao redefinir senha")
            setErro(styles.showErro)
            setTimeout(() =>{
                setErro(styles.hideErro)
            }, 2500)
        }
        
    }
    function submit(e: React.FormEvent) {
        e.preventDefault()
        if (cooldown > 0){
            return console.log("Espere o cooldown")
            
        }else if(!localStorage.getItem("timer")){
            localStorage.setItem("timer", "60")
        }
        const count = Number(localStorage.getItem("timer"))
        setCooldown(count)
        const soma: number = count * 2
        localStorage.setItem("timer", soma.toString())
        const data: string = String(Date.now() + 6000000)
        localStorage.setItem("timestamp", data)
        enviarEmail(e)
    }

//JSX
    return(
        <div className={styles.container}>
            <div className={erro}>
                <div className={styles.warning}><MdError /></div>
                <p className={styles.erroP}>Email não está cadastrado</p>
            </div>
            <div className={enviado}>
                <div className={styles.warningEnviar}><AiOutlineLike /></div>
                <p className={styles.enviarP}>Email enviado com sucesso</p>
            </div>
            <header className={styles.header}>
                <a href="/" ><img className={styles.img} src="/imagens/lb.jpg" alt="Logo LB-Cardans"/></a>
                <nav className={styles.links}>
                    <a href="/login" className={styles.a}>Login</a>
                    <a href="/registro" className={styles.a}>Registro</a>
                </nav>
            </header>
            <div>
                <form className={styles.main} onSubmit={submit} autoComplete="off">
                    <p className={styles.p1}><strong>Problemas para entrar?</strong></p>
                    <p className={styles.p2}>Insira o seu email e enviaremos um link para você voltar a acessar a sua conta.</p>
                    <input type="text" onChange={(e) => setEmail(e.target.value)} className={styles.input} id="email" placeholder="Insira seu email aqui" value={email} autoComplete="off" required/>
                    <input type="submit" id="submit" 
                        className={cooldown > 0 ? styles.cooldown : styles.submit} 
                        value={cooldown>0 ? `Aguarde ${cooldown}s` : "Redefinir senha"}/>
                    <button onClick={() =>  navigate("/login")} className={styles.button}>Voltar ao Login</button>
                </form>
            </div>
        </div>
    )
}

export default EsqueceuSenha

