import axios from "axios"
import styles from "./css/confirmarEmail.module.css"
import { useSearchParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function ConfirmarEmail() {
    const [condicao, setCondicao] = useState<boolean>()
    const [msg, setMsg] = useState<string>("")
    const [ searchParams ] = useSearchParams()
    const navigate = useNavigate()

    useEffect(() =>{
        setCondicao(false)
    }, [])

    async function confirmar() {
        const token = searchParams.get("token")
        console.log("token: ", token)
        try{
            await axios.post("http://localhost:5000/confirmarEmail", {token: token}, {withCredentials: true})
            console.log("Email confirmado")
            setCondicao(true)
            setMsg("Email confirmado")
        }catch(erro: any){
            console.log("Houve um erro ", erro)
            setMsg(erro.response.data.erro)
            setCondicao(true)
        }
    }
    return(
        <div className={styles.container}>
            <div className={styles.caixa}>
                {
                    !condicao ?
                        <button className={styles.button} onClick={() => confirmar()}>Confirmar Email</button>
                    :
                        <h2 className={styles.h2}>{msg}</h2>
                }
                
            </div>
        </div>
    )
}

export default ConfirmarEmail
