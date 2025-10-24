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
import { SlLike } from "react-icons/sl";


function Contato(){
  const [nome, setNome] = useState<string>("")
  const [show, setShow] = useState<boolean>(true)
  const navigate = useNavigate()
  //React Hooks e instancias

  useEffect(() =>{
    axios.post("http://localhost:5000/perfil", {}, {withCredentials:true})
    .then((res) => setNome(res.data.user.nome))
  }, [])
    function copiar(texto: string): void{
        navigator.clipboard.writeText(texto)
        .then(() => console.log("Texto copiado"))
        .catch((err) => console.log(`Erro ao copiar o texto`))
        warning()
    }
    function warning(){
      setShow(false)
      setTimeout(() =>{
        setShow(true)
      }, 1700)
    }

    return(
        <div className={styles.container}>
          <span className={ show ? styles.hide : styles.show}>
            <div className={styles.warningLike}><SlLike /></div>
            <p className={styles.warningP}>Texto copiado com sucesso</p>
          </span>
            <header className={styles.header}>
                <img src="/imagens/lb.jpg" alt="LB-Cardns" className={styles.LogoImage} onClick={() => navigate("/")} />
                <nav className={styles.links}>
                    <a href="" onClick={() => navigate("/")} className={styles.a}>Home</a>
                    <a href="" onClick={() => navigate("/oficina")} className={styles.a}>Oficina</a>
                    <a href="" onClick={() => navigate("/contato")} className={styles.a}>Contato</a>
                    <a href="" onClick={() => navigate("/sobre")} className={styles.a}>Sobre</a>
            { nome ? 
                <div className={styles.containerName}>
                  <div className={styles.divNome}><a href="" className={styles.nome}>{nome}</a></div>
                  <div className={styles.acesso}>
                    <div className={styles.a}><a className={styles.login} onClick={() => navigate("/login")}>Login</a></div>
                    <div className={styles.a}><a className={styles.registro} onClick={() => navigate("/registro")}>Registro</a></div>
                    <hr />
                    <div className={styles.carrinho}>
                      <label className={styles.lCarrinho} onClick={() => navigate("/carrinho")}><BsCart4 /></label>                    
                      <a href="" onClick={() => navigate("/carrinho")} className={styles.aCarrinho}>Carrinho</a>
                    </div>
                    <div className={styles.configuracoes}>
                      <label className={styles.lconfiguracoes}><GrConfigure /></label>                    
                      <a href="" className={styles.aConfiguracoes}>Configurações</a>
                    </div>
                    <div className={styles.pedidos}>
                      <label className={styles.lpedidos}><IoGitPullRequestSharp /></label>                    
                      <a href="" className={styles.aPedidos}>Meus pedidos</a>
                    </div>
                    <div className={styles.mensagens}>
                      <label className={styles.lmensagens}><FaFacebookMessenger /></label>
                      <a href="" className={styles.aMensagens}>Central de mensagens</a>
                    </div>
                    <div className={styles.suporte}>
                      <label className={styles.lsuporte}><IoIosHelp /></label>
                      <a href="" className={styles.aSuporte}>suporte</a>
                    </div>
                  </div>
                </div>
              :
                <div className={styles.loginRegistro}>
                  <div className={styles.pLoginRegistro}>Login/Registro</div> 
                  <div className={styles.caixinha}>
                    <div className={styles.a}><a className={styles.login} onClick={() => navigate("/login")}>Login</a></div>
                    <div className={styles.a}><a className={styles.registro} onClick={() => navigate("/registro")}>Registro</a></div>
                    <hr />
                    <div className={styles.carrinho}>
                      <label className={styles.lCarrinho} onClick={() => navigate("/carrinho")}><BsCart4 /></label>                    
                      <a href="" onClick={() => navigate("/carrinho")} className={styles.aCarrinho}>Carrinho</a>
                    </div>
                    <div className={styles.configuracoes}>
                      <label className={styles.lconfiguracoes}><GrConfigure /></label>                    
                      <a href="" className={styles.aConfiguracoes}>Configurações</a>
                    </div>
                    <div className={styles.pedidos}>
                      <label className={styles.lpedidos}><IoGitPullRequestSharp /></label>                    
                      <a href="" className={styles.aPedidos}>Meus pedidos</a>
                    </div>
                    <div className={styles.mensagens}>
                      <label className={styles.lmensagens}><FaFacebookMessenger /></label>
                      <a href="" className={styles.aMensagens}>Central de mensagens</a>
                    </div>
                    <div className={styles.suporte}>
                      <label className={styles.lsuporte}><IoIosHelp /></label>
                      <a href="" className={styles.aSuporte}>suporte</a>
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
            <footer className={styles.containerFoot}>
              <section className={styles.section}>
                <div className={styles.listaSection}>
                  <h6 className={styles.tituloLIsta}>Sobre a</h6>
                  <ul className={styles.itemLista}>
                    <li className={styles.linkLista} onClick={() => navigate("/sobre")}>lb Cardans</li>
                    <li className={styles.linkLista} onClick={() => navigate("/oficina")}>Oficina</li>
                    <li className={styles.linkLista}>Tendências</li>
                    <li className={styles.linkLista} onClick={() => navigate("/")}>Página Inicial</li>
                    <li className={styles.linkLista}>Blog</li>
                  </ul>
                </div>
              </section>
              <section className={styles.section}>
                <div className={styles.listaSection}>
                  <h6 className={styles.tituloLIsta}>Outros Sites</h6>
                  <ul className={styles.itemLista}>
                    <li className={styles.linkLista}><a href="Sites/Website/website.html" className={styles.listaA}>Website</a></li>
                    <li className={styles.linkLista}><a href="Sites/Fogo do Doom/doom.html" className={styles.listaA}>Fogo do Doom</a></li>
                    <li className={styles.linkLista}><a href="Sites/Animation Loading/loading.html" className={styles.listaA}>Animation Loading</a></li>
                    <li className={styles.linkLista}><a href="Sites/Gerador/gerador.html" className={styles.listaA}>Gerador</a></li>
                    <li className={styles.linkLista}><a href="Sites/Notas com Estrelas/notas.html" className={styles.listaA}>Notas com Estrelas</a></li>
                  </ul>
                </div>
              </section>
              <section className={styles.section}>
                <div className={styles.listaSection}>
                  <h6 className={styles.tituloLIsta}>Contato</h6>
                  <ul className={styles.itemLista}>
                    <li className={styles.linkLista} onClick={() => navigate("/contato")}>Contatos</li>
                    <li className={styles.linkLista}>segurança</li>
                    <li className={styles.linkLista}>vender</li>
                    <li className={styles.linkLista}>solução de problemas</li>
                  </ul>
                </div>
              </section>
              <section className={styles.section}>
                <div className={styles.listaSection}>
                  <h6 className={styles.tituloLIsta}>Redes Sociais</h6>
                  <ul className={styles.itemLista}>
                    <li className={styles.linkLista}>X</li>
                    <li className={styles.linkLista}>Facebook</li>
                    <li className={styles.linkLista}>Instagram</li>
                    <li className={styles.linkLista}>Youtube</li>
                  </ul>
                </div>
              </section>
              <section className={styles.section}>
                <div className={styles.listaSection}>
                  <h6 className={styles.tituloLIsta}>Minha conta</h6>
                  <ul className={styles.itemLista}>
                    <li className={styles.linkLista} onClick={() => navigate("/carrinho")}>Carrinho</li>
                    <li className={styles.linkLista}>favoritos</li>
                    <li className={styles.linkLista}>configurações</li>
                    <li className={styles.linkLista}>Resumo</li>
                  </ul>
                </div>
              </section>
           </footer>
        </div>
    )
}

export default Contato