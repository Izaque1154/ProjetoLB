import axios from "axios"
import { useEffect, useState } from "react"
import styles from "./css/redefinirSenha.module.css"
import { useSearchParams } from "react-router-dom";
import { AxiosError } from "axios";
import { AiOutlineLike } from "react-icons/ai";
import { MdError } from "react-icons/md";


function RedefinirSenha() {
    const [senha, setSenha] = useState<string>("");
    const [confirmSenha, setConfirmSenha] = useState<string>("");
    const [showSenha, setShowSenha] = useState<string>("");
    const [inputSenha, setInputSenha] = useState<string>("")
    const [enviado, setEnviado] = useState<string>("")
    const [erro, setErro] = useState<string>("")
    const [formData, setFormData] = useState<boolean>()
    const [msg, setMsg] = useState<any>()
    const [ searchParams ] = useSearchParams()

    useEffect(() =>{
        const tSenha = senha.trim()
        const validacao3: boolean = senha === confirmSenha && tSenha.length >= 4
        if(validacao3){
            return setFormData(true)
        }
        return setFormData(false)
    }, [senha, confirmSenha])
    useEffect(() =>{
        setFormData(false)
        setInputSenha(styles.senha)
        setShowSenha(styles.hide)
        setEnviado(styles.hideEnviar)
        setErro(styles.hideErro)
    }, [])
    useEffect(() =>{
        if (!senha.trim()) {
            setSenha(senha.trim());
            setInputSenha(styles.senha)
            setShowSenha(styles.hide)
        } else if(senha.length < 4){
            setInputSenha(styles.incorreto)
            setShowSenha(styles.show)
        }else{
            setInputSenha(styles.senha)
            setShowSenha(styles.hide)
        }
    }, [senha])

    async function redefinir(e: React.FormEvent) {
        e.preventDefault();
        const tSenha = senha.trim()

        if(tSenha.length < 4){
            setShowSenha(styles.show)
            setInputSenha(styles.incorreto)
            return;
        } else if (senha !== confirmSenha){
            return
        }
        if(formData === false){
            return
        }

        try{
            if(senha != confirmSenha){
                alert("As senhas não coincidem")
            }
            const id = searchParams.get("id");
            const token = searchParams.get("token");

            const url: string = `https://backendlb-3uos.onrender.com/RedefinirSenha`;
            const dados = {senha, confirmSenha, token, id}

            await axios.put(url, dados, {
                "headers": {
                    "Content-Type": "application/json"
                }
            })
            console.log("Senha redefinida")
            setEnviado(styles.showEnviar)
            setTimeout(() =>{
                setEnviado(styles.hideEnviar)
                window.location.reload()
            }, 2500)
        }catch(error){
            if (error instanceof AxiosError){
                console.log("Houve um erro ao redefinir a senha")
                setMsg(error.response?.data.erro)
                setErro(styles.showErro)
                setFormData(false)
                setTimeout(() =>{
                    setErro(styles.hideErro)
                    setFormData(true)
                }, 2500)
            }
        }
    };

    return(
        <div className={styles.container}>
            <div className={erro}>
                <div className={styles.warning}><MdError /></div>
                <p className={styles.erroP}>{msg}</p>
            </div>
            <div className={enviado}>
                <div className={styles.warningEnviar}><AiOutlineLike /></div>
                <p className={styles.enviarP}>Senha redefinida com sucesso</p>
            </div>
            <h1 className={styles.h1}>Crie uma nova senha</h1>
            <div className={styles.box}>
                <form onSubmit={redefinir} autoComplete="off" className={styles.formulario}>
                    <input type="password" id="password" value={senha} onChange={(e) => setSenha(e.target.value)} autoComplete="off" placeholder="Senha" className={inputSenha} required/>
                    <p className={showSenha}>Senha não pode ser menor que 4 dígitos</p>   
                    <input type="password" onChange={(e) => setConfirmSenha(e.target.value)} id="passwordC" className={senha === confirmSenha? styles.confirmSenha: styles.incorreto} value={confirmSenha}placeholder="confirme sua senha" required/>
                    <input type="submit" className={!formData ? styles.noSubmit : styles.submit} id="submit" value="Redefinir Senha" />
                </form>
            </div>
        </div>
    )
}

export default RedefinirSenha