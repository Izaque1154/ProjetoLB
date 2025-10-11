import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import styles from "./css/Oficina.module.css"
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { IoGitPullRequestSharp } from "react-icons/io5";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoIosHelp } from "react-icons/io";
import { GrConfigure } from "react-icons/gr";


function Oficina(){
  const [nome, setNome] = useState<string>("")
  const [text, setText] = useState<string>("")
  const [filtrados, setFiltrados] = useState<any[]>([])
  const navigate = useNavigate()
  const location = useLocation()
  //React Hooks e instancias

  function removerAcentos(texto: string): string {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

  useEffect(() =>{
    axios.post("http://localhost:5000/perfil", {}, {withCredentials:true})
    .then((res) => setNome(res.data.user.nome))
    setFiltrados(info)
  }, [])
  useEffect(() =>{
    setFiltrados(info.filter((item) =>{
      return removerAcentos(item.titulo.toLowerCase()).includes(removerAcentos(text.toLowerCase()))
    }))
  }, [text])
  
  useEffect(() =>{
    if(!location){
        return console.log("Não tem nada no location")
      } else if (!location.state){
        return 
    }
    setText(location.state)
    }, [])

   const maior: number = Math.max(...filtrados.map(p => p.id));
   const menor: number = Math.min(...filtrados.map(p => p.id));
   

  const info: any[] = [
    { id: 0, titulo: "Barra longa de direção", preco: "587,99R$" },
    { id: 1, titulo: "Barra curta de direção", preco: "486,89R$" },
    { id: 2, titulo: "Coluna de Direção", preco: "495,50R$" },
    { id: 3, titulo: "Braço tensor simples", preco: "876,67R$" },
    { id: 4, titulo: "Bucha de braço tensor", preco: "279,90R$" },
    { id: 5, titulo: "Bomba Hidraulica", preco: "429,59R$" },
    { id: 6, titulo: "Tomada de Força", preco: "2.284,99R$" },
    { id: 7, titulo: "Eixo Cardan", preco: "2.087,46R$" },
    { id: 8, titulo: "Rolamento de Cardan", preco: "383,98R$" },
    { id: 9, titulo: "Cruzeta de Cardan", preco: "43,90R$" },
    { id: 10, titulo: "Macaco Hidraulico", preco: "587,99R$" },
    { id: 11, titulo: "Pistão", preco: "2.489,89R$" },
    { id: 12, titulo: "Reparo para Pistão", preco: "274,99R$" },
    { id: 13, titulo: "Manga de Eixo", preco: "1.478,78R$" },
    { id: 14, titulo: "Reparo de Manga de Eixo", preco: "595,98R$" },
    { id: 15, titulo: "Caixa de Transmissão", preco: "678,35R$" },
    { id: 16, titulo: "Flange de Cardan", preco: "876,54R$" },
    { id: 17, titulo: "Diferencial", preco: "989,99R$" },
    { id: 18, titulo: "Tambor de Freio", preco: "275,43R$" },
    { id: 19, titulo: "Usinagem", preco: "--R$" },
    { id: 20, titulo: "Tornearia Industrial", preco: "--R$" },
    { id: 21, titulo: "Cuíca de Freio", preco: "774,99R$" },
    { id: 22, titulo: "Catraca de Freio", preco: "587,99R$" },
    { id: 23, titulo: "Válvula Pedal de Freio", preco: "197,67R$" },
    { id: 24, titulo: "Válvula Maneco Freio de Mão", preco: "688,59R$" },
    { id: 25, titulo: "Válvula Relê", preco: "125,45R$" },
  ]
  function chamar(e: React.ChangeEvent<HTMLInputElement>){
    setText(e.target.value)
  }
    
    return(
        <div className={styles.container}>
            <header className={styles.header}>
                <img src="/imagens/lb.jpg" alt="LB-Cardns" onClick={() => navigate("/")} className={styles.LogoImage} />
                <input type="text" id="pesquisar" value={text} onChange={chamar} className={styles.pesquisar} placeholder="Pesquisar" autoComplete="off" />
                <nav className={styles.links}>
                    <a href="" onClick={() => navigate("/")} className={styles.a}>Home</a>
                    <a href="" onClick={() => navigate("/oficina")} className={styles.a}>Oficina</a>
                    <a href="" onClick={() => navigate("/contato")} className={styles.a}>Contato</a>
                    <a href="" onClick={() => navigate("/sobre")} className={styles.a}>Sobre</a>
                    <a href="" onClick={() => navigate("/carrinho")} className={styles.a}>Carrinho</a>
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
              </div>
            }
                </nav>
            </header>
            <main className={styles.main}>
              {filtrados.length !== 0? 
                <div className={styles.imagens}>
                  {
                    menor < 21?
                    <h1 className={styles.hTornearia}>Tornearia</h1>:
                    null
                  }
                    {
                        filtrados.map((src, i) => (
                            src.id < 21? 
                              <div className={styles.grade} onClick={() => navigate(`/peça/${src.id}`)} key={i}>
                                  <div className={styles.tImagem}>
                                      <img src={`/imagens/tornearia/img${src.id}.jpg`} alt={`imagem${src.id}`} className={styles.gradeItem} onClick={() => navigate(`/peça/${src.id}`)} />
                                  </div>
                                  <div className={styles.tInfo}>
                                      <h5 className={styles.tTitulo}>{src.titulo}</h5>
                                      <h5 className={styles.tPreco}>{src.preco}</h5>
                                  </div>
                              </div>:
                            null
                        ))
                    }
                    {
                      maior >=21 ?
                      <h1 className={styles.Fh1}>Freio</h1>:
                      null
                    }
                    {
                        filtrados.map((src, i) => (
                            src.id >= 21?
                        <div className={styles.grade} onClick={() => navigate(`/peça/${src.id}`)} key={i}>
                                  <div className={styles.fImagem}>
                                      <img src={`/imagens/freio/img${src.id}.jpg`} alt={`imagem${src.id}`} className={styles.gradeItem} onClick={() => navigate(`/peça/${src.id}`)} />
                                  </div>
                                  <div className={styles.fInfo}>
                                      <h5 className={styles.fTitulo}>{src.titulo}</h5>
                                      <h5 className={styles.fPreco}>{src.preco}</h5>
                                  </div>
                              </div>:
                        null
                        ))
                    }
                            

                </div>:
                <h1 className={styles.nItem}>Nenhum item encontrado</h1>
                  }
            </main>
        </div>
    )
}

export default Oficina