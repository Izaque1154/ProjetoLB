import styles from "./css/verificar.module.css"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"

function Verificar() {
    const [ searchParams ] = useSearchParams()
    const [ cooldown, setCooldown ] = useState(0);
    //useEffect
    useEffect(() => {
        if (cooldown > 0) {
            const time = setInterval(() =>{
                setCooldown((prev) => prev - 1)
            }, 1000);
            localStorage.setItem("contador2", cooldown.toLocaleString())
            return () => clearInterval(time)
        }

    }, [cooldown]);

    useEffect(() => {
        if (!localStorage.getItem("contador2")){
            return
        } else if(Date.now() > Number(localStorage.getItem('timestamp2'))){
            localStorage.removeItem("timestamp2")
            localStorage.removeItem("contador2")
            localStorage.removeItem("timer2")
        }
    },[])

    async function confirmar(){
        try{
            const email = searchParams.get("email")
            const token = searchParams.get("token")
            if (cooldown > 0){
            return console.log("Espere o cooldown")
            }else if(!localStorage.getItem("timer2")){
                localStorage.setItem("timer2", "60")
            }
            const count = Number(localStorage.getItem("timer2"))
            setCooldown(count)
            const soma: number = count * 2
            localStorage.setItem("timer2", soma.toString())
            const data: string = String(Date.now() + 6000000)
            localStorage.setItem("timestamp2", data)
            console.log("Email enviado com sucesso")
            await axios.post("http://localhost:5000/reenviar", {email: email, token: token})
        }catch(erro){
            console.log("erro", erro)
        }
    }
    return(
        <div className={styles.container}>
            <div className={styles.caixa}>
                <h1 className={styles.h1}>Enviamos um email de verificação</h1>
                <h2 className={styles.h2}>Verifique sua caixa de email</h2>
                <hr />
                <div className={styles.reenviar}>
                    <p className={styles.p}>Não recebeu o email? clique para reenviarmos o email:</p>
                    <button className={cooldown > 0 ? styles.cooldown : styles.button} 
                        onClick={() => confirmar()}>{cooldown>0 ? `Aguarde ${cooldown}s` : "clique para receber o email"}</button>
                </div>
            </div>
        </div>
    )
}

export default Verificar