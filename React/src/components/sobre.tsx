import { useNavigate } from "react-router-dom"
import styles from "./css/Sobre.module.css"
import { useState, useEffect } from "react"
import axios from 'axios';
import { BsCart4 } from "react-icons/bs";
import { IoGitPullRequestSharp } from "react-icons/io5";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoIosHelp } from "react-icons/io";
import { GrConfigure } from "react-icons/gr";

function Sobre(){
  //React Hooks e instancias
  const [nome, setNome] = useState<string>("")
  const navigate = useNavigate()
  

  useEffect(() =>{
    axios.post("http://localhost:5000/perfil", {}, {withCredentials:true})
    .then((res) => setNome(res.data.user.nome))
  }, [])
  
  return(
        <div className={styles.container}>
            <header className={styles.header}>
            <img src="/imagens/lb.jpg" alt="LB-Cardns" className={styles.logoImage} />
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
                <h1 className={styles.titulo}>Sobre a LB-Cardans</h1>
                <h2 className={styles.subTitulo}>Quem Somos</h2>
                <p  className={styles.paragrafo}>
                    A <strong>LB-Cardns</strong> é uma <strong>tornearia mecânica</strong> com foco na <strong>manutenção, fabricação e reparo de cardans</strong>, oferecendo soluções precisas e confiáveis para veículos leves, pesados e aplicações industriais. <br />
                    Atuamos com responsabilidade e comprometimento, buscando sempre a <strong>melhor performance e durabilidade</strong> para cada peça que passa pela nossa oficina. <br />
                    Com uma equipe experiente e estrutura preparada, atendemos tanto clientes particulares quanto empresas, sempre com foco em <strong>qualidade, agilidade e confiança</strong>. <br />
                    Na <strong>LB-Cardns</strong>, o nosso compromisso é com o funcionamento do seu equipamento — do jeito certo, no tempo certo.
                </p>
                <h2  className={styles.subTitulo}>🔧 Nossa Especialidade</h2>
                    <p className={styles.paragrafo}>
                        Na <strong>LB-Cardns</strong>, somos especializados em serviços de <strong>tornearia mecânica com foco em cardans</strong>. <br />
                        Trabalhamos com a <strong>fabricação, manutenção e recuperação</strong> de cardans automotivos e industriais. <br />
                        Garantimos que cada peça atenda aos <strong>mais altos padrões de qualidade e segurança</strong>. <br />
                        Nosso compromisso é oferecer soluções <strong>precisas e duráveis</strong> para veículos leves, pesados e equipamentos que exigem <strong>desempenho mecânico confiável</strong>. <br />
                        Quer ver alguns dos projetos e peças que já passaram por aqui? Dá uma olhada na nossa <a href="/oficina">oficina</a> — ela mostra um pouco do que somos capazes de fazer.
                    </p>
                    <h2  className={styles.subTitulo}>🛠️ Como começou</h2>
                    <p className={styles.paragrafo}>
                        A história da <strong>LB-Cardns</strong> começou com a união entre <strong>experiência em mecânica de precisão</strong> e a paixão por resolver problemas técnicos com <strong>qualidade</strong> e <strong>eficiência</strong>. <br />
                        O projeto nasceu com o objetivo de atender uma <strong>demanda crescente por serviços especializados em cardans</strong> — e desde então, vem se consolidando como referência pela dedicação e pelo <strong>atendimento direto ao cliente</strong>. <br />
                        O que começou como um pequeno espaço de oficina, hoje é uma <strong>estrutura sólida</strong>, equipada para atender com <strong>agilidade</strong> e <strong>confiança</strong>.
                    </p>
                    <h2  className={styles.subTitulo}>👨‍🔧 Equipe</h2>
                    <p className={styles.paragrafo}>
                        Contamos com uma <strong>equipe técnica qualificada</strong> e comprometida com cada serviço executado. <br />
                        São profissionais com experiência em <strong>usinagem, solda, balanceamento</strong> e <strong>montagem</strong>, sempre buscando <strong>excelência</strong> em cada detalhe. <br />
                        Além da técnica, valorizamos o <strong>atendimento humano, direto e transparente</strong>, que é a base do relacionamento com nossos clientes. <br />
                    </p>
                    <h2  className={styles.subTitulo}>Como entrar em contato</h2>
                    <p className={styles.paragrafo}>
                        Se você precisa de um <strong>orçamento</strong>, tem <strong>dúvidas</strong> ou quer saber mais sobre os nossos serviços, estamos prontos para te atender. <br />
                        Você pode entrar em contato com a <strong>LB-Cardns</strong> pelos seguintes canais: <br /> <br />
                        <ul className={styles.containerLista}>
                            <li className={styles.lista}>📧 <strong>E-mail:</strong> <a href="/contato">abc123@gmail.com</a></li>
                            <li className={styles.lista}>📞 <strong>Telefone:</strong> <a href="/contato"> (21) 99999-9999</a></li>
                            <li className={styles.lista}>💬 <strong>WhatsApp:</strong> <a href="/contato">(21) 99999-9999</a></li>
                        </ul>
                        <strong>Nosso atendimento é rápido e direto</strong> — fale com a gente e vamos encontrar a <strong>melhor solução para o seu cardan</strong>.
                    </p>
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

export default Sobre