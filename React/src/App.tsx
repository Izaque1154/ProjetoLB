import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./App.module.css"
import { BsCart4 } from "react-icons/bs";
import { IoGitPullRequestSharp } from "react-icons/io5";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoIosHelp } from "react-icons/io";
import { GrConfigure } from "react-icons/gr";
import axios from 'axios';


function App() {
  //React Hooks e instancias
  const [nome, setNome] = useState<string>("")
  const navigate = useNavigate()

  useEffect(() =>{
    axios.post("http://localhost:5000/perfil", {}, {withCredentials:true})
    .then((res) => setNome(res.data.user.nome))
  }, [])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="/imagens/lb.jpg" alt="Lb-Cardans" className={styles.logoImage}/>
        </div>
        <nav className={styles.nav}>
            <a onClick={() => navigate("/")} href='' className={styles.a}>Home</a>
            <a href="" onClick={() => navigate("/oficina")} className={styles.a}>Oficina</a>
            <a href="" onClick={() => navigate("/contato")} className={styles.a} >Contato</a>
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
      <main className={styles.containerMain}>
        <h1 className={styles.h1}>Bem-vindo à LB Cardans!</h1>
      <p className={styles.p}>
        Na <b>LB Cardans</b>, somos especializados em serviços de <b>manutenção e reparo de cardans</b>, oferecendo soluções rápidas e eficientes para veículos de todos os tipos.
        Com mais de <b>15 anos de experiência no mercado</b>, nossa equipe altamente qualificada garante o máximo desempenho e segurança para o seu veículo.
        Oferecemos uma ampla gama de serviços, incluindo <b>troca e reparo de cardans</b>, alinhamento e balanceamento, tudo realizado com tecnologia de ponta e peças de alta qualidade.
        Atendimento personalizado e preços justos, além de um ambiente acolhedor, fazem da LB Cardans a escolha ideal para quem busca confiança e qualidade em serviços automotivos. 
        <b>Entre em contato conosco</b> e descubra como podemos cuidar do seu veículo com excelência!
      </p>
      <div className={styles.containerContato}>
        Telefone: (21) 99999-9999 <br />
        WhatSapp: (21) 99999-9999
      </div>
      <div className={styles.ImgDiv}>
        <img src="imagens/totoro.jpg" width={550} height={550} alt="Imagem LB" className={styles.imgMain}/>
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

export default App
