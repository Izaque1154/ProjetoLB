import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import styles from "./css/header.module.css"
import axios from 'axios';
import { BsCart4 } from "react-icons/bs";
import { IoGitPullRequestSharp } from "react-icons/io5";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoIosHelp } from "react-icons/io";
import { GrConfigure } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";

function Header(){
    const [nome, setNome] = useState<string>("")
    const [text, setText] = useState<string>("")
    const navigate = useNavigate()
    const location = useLocation()
    
    useEffect(() =>{
    axios.post("http://localhost:5000/perfil", {}, {withCredentials:true})
    .then((res) => setNome(res.data.user.nome))
  }, [])

    function chamar(e: React.ChangeEvent<HTMLInputElement>){
        setText(e.target.value)
    }
    const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleLogin();
    }
    };
    const handleLogin = () => {
      if(text.trim() === "" && location.pathname !== "/oficina"){
        return
      }
        navigate("/oficina", {state: text})
    };


    return(
      <header className={location.pathname === "/"?styles.header: styles.header2}>
        <img src="/imagens/lb.jpg" alt="LB-Cardns" onClick={() => navigate("/")} className={styles.LogoImage} />
        <div className={styles.search}>
          <input type="text" id="pesquisar" value={text} onChange={chamar} className={styles.pesquisar} onKeyDownCapture={(e) => handleKeyDown(e)} placeholder="Pesquisar" autoComplete="off" />
          <div className={styles.iconSearch} onClick={(() => handleLogin())}>
            <div className={styles.iconSearch2}> 
              <FaSearch />
            </div>
          </div>
        </div>
        <nav className={styles.links}>
            <a onClick={() => navigate("/")} className={styles.a}>Home</a>
            <a onClick={() => navigate("/oficina")} className={styles.a}>Oficina</a>
            <a onClick={() => navigate("/contato")} className={styles.a}>Contato</a>
            <a onClick={() => navigate("/sobre")} className={styles.a}>Sobre</a>
            <a onClick={() => navigate("/carrinho")} className={styles.a}>Carrinho</a>
          <div className={styles.loginRegistro}>
            { nome ? 
                  <div className={styles.divNome}><a className={styles.a}>{nome}</a></div>
              :
              <div className={styles.pLoginRegistro}><a className={styles.a}>Login/Registro</a></div> 
            } 
            <div className={styles.caixinha}>
              <div className={styles.aLogin}>
                <div className={styles.lr}><a className={styles.aLR} onClick={() => navigate("/login")}>Login</a></div>
                <div className={styles.lr}><a className={styles.aLR} onClick={() => navigate("/registro")}>Registro</a></div>
              </div>
              <hr />
              <div className={styles.aElementos}>
                <div className={styles.aIcones}>               
                  <a onClick={() => navigate("/carrinho")} className={styles.aLink}><label className={styles.aLIcon}><BsCart4 /></label>Carrinho</a>
                </div>
                <div className={styles.aIcones}> 
                  <a className={styles.aLink}><label className={styles.aLIcon}><GrConfigure /></label>Configurações</a>
                </div>
                <div className={styles.aIcones}>                 
                  <a className={styles.aLink}><label className={styles.aLIcon}><IoGitPullRequestSharp /></label>Meus pedidos</a>
                </div>
                <div className={styles.aIcones}>
                  <a className={styles.aLink}><label className={styles.aLIcon}><FaFacebookMessenger /></label>Mensagens</a>
                </div>
                <div className={styles.aIcones}>
                  <a className={styles.aLink}><label className={styles.aLIcon}><IoIosHelp /></label>suporte</a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    )
}

export default Header

