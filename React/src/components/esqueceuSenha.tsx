import styles from "./css/esqueceuSenha.module.css"
import { TbLock } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { FormEvent, useState, useEffect } from "react";
import axios from "axios"


function EsqueceuSenha() {
    const navigate = useNavigate();
    const [ email, setEmail ] = useState<string>("");
    const [ cooldown, setCooldown ] = useState(0);

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

            const resposta = await axios.post(url, {email: email}, {
                "headers": {
                    "Content-Type": "application/json"
                }
            })

            console.log("Resposta: ", resposta.data)

        } catch (erro) {
            console.log("erro: ", erro)
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
                    <input type="text" onChange={(e) => setEmail(e.target.value)} className={styles.input} id="email" placeholder="Insira seu email aqui" value={email} autoComplete="off"/>
                    <input type="submit" id="submit" 
                        className={cooldown > 0 ? styles.cooldown : styles.submit} 
                        value={cooldown>0 ? `Aguarde ${cooldown}s` : "Redefinir senha"}/>
                    <button onClick={() =>  navigate("/login")}>Voltar ao Login</button>
                    <button onClick={() => navigate("/redefinirSenha")}>{cooldown}</button>
                </form>
            </div>
        </div>
    )
}

export default EsqueceuSenha

