import styles from "./css/Registro.module.css"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { MdError } from "react-icons/md";
import { PatternFormat } from "react-number-format";


function Registro(){
    //Estados
    const [nome, setNome] = useState<string>("")
    const [sobrenome, setSobrenome] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [senha, setSenha] = useState<string>("")
    const [confirmar, setConfirmar] = useState<string>("");
    const [telefone, setTelefone] = useState<string>("");
    const [formData, setFormData] = useState<boolean>(false);
    const [showNome, setShowNome] = useState<string>("")
    const [showSobrenome, setShowSobrenome] = useState<string>("")
    const [inputNome, setInputNome] = useState<string>("")
    const [inputSobrenome, setInputSobrenome] = useState<string>("")
    const [inputSenha, setInputSenha] = useState<string>("")
    const [showSenha, setShowSenha] = useState<string>("")
    const [erro, setErro] = useState<string>("")
    const [carregar, setCarregar] = useState<boolean>()
    const navigate = useNavigate()

    useEffect(() =>{
        const apenasLetras = /^[A-Za-zÀ-ÿ\s]+$/;
        const tSenha = senha.trim()
        const validacao: boolean = nome !== "" && sobrenome !== "" && email !== "" && senha !== "" && confirmar !== "" && telefone !== ""
        const validacao2: boolean = telefone.length === 11
        const validacao3: boolean = senha === confirmar && tSenha.length >= 4
        const validacao4: Boolean = apenasLetras.test(nome) && apenasLetras.test(sobrenome)
        if(validacao && validacao2 && validacao3 && validacao4){
            return setFormData(true)
        }
        return setFormData(false)
    }, [nome, sobrenome, email, senha, confirmar, telefone])

    useEffect(() =>{
        setShowNome(styles.hide)
        setShowSobrenome(styles.hide)
        setShowSenha(styles.hide)
        setInputNome(styles.input)
        setInputSobrenome(styles.input)
        setInputSenha(styles.input)
        setErro(styles.hideErro)
    },[])

    useEffect(() => {
        const apenasLetras = /^[A-Za-zÀ-ÿ\s]+$/;

        if (!nome.trim()) {
            setNome(nome.trim());
            setShowNome(styles.hide)
            setInputNome(styles.input)
        } else if (apenasLetras.test(nome)) {
            setShowNome(styles.hide)
            setInputNome(styles.input)
        } else {
            setShowNome(styles.show);
            setInputNome(styles.incorreto)
        }

    }, [nome])
    useEffect(() => {
        const apenasLetras = /^[A-Za-zÀ-ÿ\s]+$/;

        if (!nome.trim()) {
            setNome(nome.trim());
            setShowNome(styles.hide)
            setInputNome(styles.input)
        } else if (apenasLetras.test(nome)) {
            setShowNome(styles.hide)
            setInputNome(styles.input)
        } else {
            setShowNome(styles.show);
            setInputNome(styles.incorreto)
        }

    }, [nome])
    useEffect(() => {
        if (!senha.trim()) {
            setSenha(senha.trim());
            setInputSenha(styles.input)
            setShowSenha(styles.hide)
        } else if(senha.length < 4){
            setInputSenha(styles.incorreto)
            setShowSenha(styles.show)
        }else{
            setInputSenha(styles.input)
            setShowSenha(styles.hide)
        }
    }, [senha])
    useEffect(() => {
        const apenasLetras = /^[A-Za-zÀ-ÿ\s]+$/;

        if(!sobrenome.trim()){
            setSobrenome(sobrenome.trim())
            setShowSobrenome(styles.hide);
            setInputSobrenome(styles.input)
        }
        else if(apenasLetras.test(sobrenome)){
            setShowSobrenome(styles.hide);
            setInputSobrenome(styles.input)
        } else{
            setShowSobrenome(styles.show);
            setInputSobrenome(styles.incorreto)
        }
    }, [sobrenome])

    //Funções   
    async function registrar(e: React.FormEvent){
        e.preventDefault();
        const apenasLetras = /^[A-Za-zÀ-ÿ\s]+$/;
        const tSenha = senha.trim()

        if(telefone.length !== 11){
            return
        } else if (senha !== confirmar){
            return
        }else if (!apenasLetras.test(nome) && !apenasLetras.test(sobrenome)){
            return;
        }else if(tSenha.length < 4){
            setShowSenha(styles.show)
            return;
        }

        const url: string = "http://localhost:5000/registrar";
        const dados = {nome, email, telefone, senha, confirmar}
        try{
            const resposta = await axios.post(url, dados, {
                withCredentials: true
            })
            console.log("Usuário cadastrado")
            setCarregar(true)
            setTimeout(() =>{
                navigate("/verificar")
            }, 300)
        }
        catch(err: any){
            console.log("Houve um erro ao registrar o usuário")
            setErro(styles.showErro)
            setTimeout(() =>{
                setErro(styles.hideErro)
            }, 2500)
        }
    }

    //JSX
    return(
        <div className={styles.container}>
            <div className={erro}>
                <div className={styles.warning}><MdError /></div>
                <p className={styles.erroP}>Usuário já existe</p>
            </div>
            <form onSubmit={registrar} autoComplete="off" className={styles.formulario}>
                <div className={styles.voltar} onClick={() => navigate("/")}>X</div>
                <h1 className={styles.titulo}>Criar Conta</h1>
                <label className={styles.label}>Nome*</label>
                    <input type="text" id="nome" onChange={(e) => setNome(e.target.value)} onKeyDown={(e) => {if (/\d/.test(e.key)) {e.preventDefault();}}} autoComplete="off" placeholder="Primeiro Nome" className={inputNome} value={nome} required/>
                    {showNome === styles.show ? <p className={showNome}>Nome deve conter apenas caracteres alfanuméricos</p>: null}       
                <label className={styles.label}>Sobrenome*</label>
                    <input type="text" id="sobrenome" onChange={(e) => setSobrenome(e.target.value)} onKeyDown={(e) => {if (/\d/.test(e.key)) {e.preventDefault();}}} autoComplete="off" placeholder="Sobrenome" className={inputSobrenome} value={sobrenome} required/>
                    {showSobrenome === styles.show ? <p className={showNome}>Sobrenome deve conter apenas caracteres alfanuméricos</p>: null}         
                <label className={styles.label}>E-Mail*</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" placeholder="Email" className={styles.input} required/>
                <label className={styles.label}>Telefone*</label>
                    <PatternFormat mask="_" format="(##) #####-####" value={telefone} onValueChange={(values) => setTelefone(values.value)} autoComplete="off" placeholder="(99) 99999-9999" className={telefone.length === 0 || telefone.length === 11? styles.input: styles.incorreto} required/>
                <label className={styles.label}>Senha*</label>
                    <input type="password" id="password" value={senha} onChange={(e) => setSenha(e.target.value)} autoComplete="off" placeholder="Senha" className={inputSenha} required/>
                    <p className={showSenha}>Senha não pode ser menor que 4 dígitos</p>     
                <label className={styles.label}>Confirmar Senha*</label>
                    <input type="password" id="confirmPassword" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} autoComplete="off" placeholder="Confirmar Senha" className={senha === confirmar? styles.input: styles.incorreto} required/>
                <button id="submit" className={!formData ? styles.noSubmit : styles.submit}>
                    {
                        !carregar ?
                            <p>Enviar</p>
                        :
                            <div className={styles.loader}></div>
                    }
                </button>
                <a onClick={() => navigate("/login")} className={styles.login}>Já tem uma conta? Faça Login</a>
            </form>
        </div>
    )
}

export default Registro