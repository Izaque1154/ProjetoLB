import { useNavigate } from "react-router-dom"
import styles from "./css/Contato.module.css"
import { MdEmail  } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { useState, useEffect } from "react";
import { BsCart4 } from "react-icons/bs";
import { IoGitPullRequestSharp } from "react-icons/io5";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoIosHelp } from "react-icons/io";
import { GrConfigure } from "react-icons/gr";
import axios from 'axios';


function Contato(){
  const [nome, setNome] = useState<string>("")
  const navigate = useNavigate()
  //React Hooks e instancias

  useEffect(() =>{
    axios.post("http://localhost:5000/perfil", {}, {withCredentials:true})
    .then((res) => setNome(res.data.user.nome))
  }, [])
    function copiar(texto: string): void{
        navigator.clipboard.writeText(texto)
        .then(() => alert("Texto copiado com sucesso!"))
        .catch((err) => alert(`Erro ao copiar o texto`))
    }

    return(
        <div className={styles.container}>
            <header className={styles.header}>
                <img src="/imagens/lb.jpg" alt="LB-Cardns" className={styles.LogoImage} />
                <nav className={styles.links}>
                    <a href="" onClick={() => navigate("/")} className={styles.a}>Home</a>
                    <a href="" onClick={() => navigate("/oficina")} className={styles.a}>Oficina</a>
                    <a href="" onClick={() => navigate("/contato")} className={styles.a}>Contato</a>
                    <a href="" onClick={() => navigate("/sobre")} className={styles.a}>Sobre</a>
                    { nome ? 
            <div className={styles.containerName}>
              <a href="" className={styles.nome}>{nome}</a> 
              <hr />
              <div className={styles.acesso}>
                <div className={styles.carrinho}><a href="" className={styles.aCarrinho}>Carrinho</a></div>
                <div className={styles.configuracoes}><a href="" className={styles.aConfiguracoes}>Configurações</a></div>
                <div className={styles.pedidos}><a href="" className={styles.aPedidos}>Meus pedidos</a></div>
                <div className={styles.mensagens}><a href="" className={styles.aMensagens}>Central de mensagens</a></div>
                <div className={styles.suporte}><a href="" className={styles.aSuporte}>suporte</a></div>
              </div>
            </div>:
              <div className={styles.loginRegistro}>
                <div className={styles.pLoginRegistro}>Login/Registro</div> 
                <div className={styles.caixinha}>
                  <div className={styles.lr}>
                    <a href="" onClick={() => navigate("/login")} className={styles.a} >Login</a>
                    <a href="" onClick={() => navigate("/registro")} className={styles.a} >Registro</a>
                  </div>
                  <hr />
                  <div className={styles.acesso}>
                    <label className={styles.lCarrinho} onClick={() => navigate("/carrinho")}><BsCart4 /></label>
                    <div className={styles.carrinho}><a href="" onClick={() => navigate("/carrinho")} className={styles.aCarrinho}>Carrinho</a></div>
                    <label className={styles.lconfiguracoes}><GrConfigure /></label>
                    <div className={styles.configuracoes}><a href="" className={styles.aConfiguracoes}>Configurações</a></div>
                    <label className={styles.lpedidos}><IoGitPullRequestSharp /></label>
                    <div className={styles.pedidos}><a href="" className={styles.aPedidos}>Meus pedidos</a></div>
                    <label className={styles.lmensagens}><FaFacebookMessenger /></label>
                    <div className={styles.mensagens}><a href="" className={styles.aMensagens}>Central de mensagens</a></div>
                    <label className={styles.lsuporte}><IoIosHelp /></label>
                    <div className={styles.suporte}><a href="" className={styles.aSuporte}>suporte</a></div>
                  </div>
                </div>
              </div>
            }
                </nav>
            </header>
            <main className={styles.main}>
                <div className={styles.contato1}>
                    <MdEmail />
                    <h2 className={styles.contato}>E-mail</h2>
                    <p className={styles.contato}>Você pode entrar em contato pelo E-mail:</p>
                    <h4 className={styles.copiar} onClick={() => copiar("abc123@gmail.com")}>abc123@gmail.com</h4>
                </div>
                <div className={styles.contato2}>
                    <FaPhoneAlt/>
                    <h2 className={styles.contato}>Telefone</h2>
                    <p className={styles.contato}>Você pode entrar em contato pelo Telefone:</p>
                    <h4 className={styles.copiar} onClick={() => copiar("(21)99999-9999")}>(21)99999-9999</h4>
                </div>
                <div className={styles.contato3}>
                    <FaWhatsappSquare />
                    <h2 className={styles.contato}>WhatSapp</h2>
                    <p className={styles.contato}>Você pode entrar em contato pelo WhatSapp:</p>
                    <h4 className={styles.copiar} onClick={() => copiar("(21)99999-9999")}>(21)99999-9999</h4>
                </div>
            </main>
        </div>
    )
}

export default Contato