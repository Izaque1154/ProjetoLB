import styles from "./css/Registro.module.css"
import { useState } from "react"
import axios from "axios"


function Registro(){
    //Estados
    const [nome, setNome] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [senha, setSenha] = useState<string>("")
    const [confirmar, setConfirmar] = useState<string>("");
    const [telefone, setTelefone] = useState<string>("");

    //Funções   
    async function registrar(e: React.FormEvent){
        e.preventDefault();

        const url: string = "http://localhost:5000/registrar";
        const dados = {nome, email, telefone, senha, confirmar}
        try{
            if(senha !== confirmar){
                alert("As senhas não coincidem")
                return
            }

            const resposta = await axios.post(url, dados, {
                withCredentials: true
            })
            console.log("Usuário cadastrado")
        }
        catch(err){
            console.log("Houve um erro ao registrar o usuário: ", err)
            alert("Usuário já existe!")
        }
    }

    //JSX
    return(
        <div className={styles.container}>
            <form onSubmit={registrar} autoComplete="off" className={styles.formulario}>
                <h1 className={styles.titulo}>Criar Conta</h1>
                <label className={styles.label1}>Nome Completo*</label>
                <input type="text" id="nome" onChange={(e) => setNome(e.target.value)} autoComplete="off" placeholder="Nome Completo" className={styles.nome} value={nome} required/>
                <label className={styles.label2}>E-Mail*</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" placeholder="Email" className={styles.email} required/>
                <label className={styles.label3}>Telefone*</label>
                <input type="tel" id="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)} autoComplete="off" placeholder="(21) 99999-9999" className={styles.telefone} required/>
                <label className={styles.label4}>Senha*</label>
                <input type="password" id="password" value={senha} onChange={(e) => setSenha(e.target.value)} autoComplete="off" placeholder="Senha" className={styles.senha} required/>
                <label className={styles.label5}>Confirmar Senha*</label>
                <input type="password" id="confirmPassword" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} autoComplete="off" placeholder="Confirmar Senha" className={styles.confirmSenha} required/>
                <input type="submit" id="submit" className={styles.submit}/>
            </form>
        </div>
    )
}

export default Registro