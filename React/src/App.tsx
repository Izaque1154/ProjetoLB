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
              <a href="" className={styles.nome}>{nome}</a> 
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
      </main>
      <footer className={styles.containerFoot}>
        rodapé da pagina
      </footer>
    </div>
  )
}

export default App
