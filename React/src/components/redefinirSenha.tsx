import axios from "axios"
import { use, useState } from "react"
import styles from "./css/redefinirSenha.module.css"
import { useSearchParams } from "react-router-dom";
import { AxiosError } from "axios";
import { log } from "console";


function RedefinirSenha() {
    const [senha, setSenha] = useState<string>("");
    const [confirmSenha, setConfirmSenha] = useState<string>("");
    const [ searchParams ] = useSearchParams()

    async function redefinir(e: React.FormEvent) {
        e.preventDefault();

        try{
            if(senha != confirmSenha){
                alert("As senhas não coincidem")
            }
            const id = searchParams.get("id");
            const token = searchParams.get("token");

            const url: string = `http://localhost:5000/RedefinirSenha`;
            const dados = {senha, confirmSenha, token, id}

            const resposta = await axios.put(url, dados, {
                "headers": {
                    "Content-Type": "application/json"
                }
            })
            alert("Senha redefinida com sucesso")
            console.log(resposta.data)
        }catch(error){
            if (error instanceof AxiosError){
                console.log(error)
                alert(error.response?.data.erro)
            }
        }
    };

    return(
        <div className={styles.container}>
            <h1 className={styles.h1}>Crie uma nova senha</h1>
            <div className={styles.box}>
                <form onSubmit={redefinir} autoComplete="off" className={styles.formulario}>
                    <input type="password" onChange={(e) => setSenha(e.target.value)} className={styles.senha} value={senha} id="password" placeholder="redefina sua senha" autoComplete="false" required/>
                    <input type="password" onChange={(e) => setConfirmSenha(e.target.value)} id="passwordC" className={styles.confirmSenha} value={confirmSenha}placeholder="confirme sua senha" required/>
                    <input type="submit" className={styles.submit} id="submit" value="Redefinir Senha" />
                </form>
            </div>
        </div>
    )
}

export default RedefinirSenha