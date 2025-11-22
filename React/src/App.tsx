import Header from "./components/header";
import { Outlet } from "react-router-dom";
import styles from "./App.module.css"
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { RiArrowDownWideLine } from "react-icons/ri";
import { useState } from "react";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useLocation } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate()
  const [validacao, setValidacao] = useState<boolean>(true)
  const location = useLocation()
  return (
    <>
    <div className={location.pathname === "/"? styles.background: styles.background2}>
    {
      location.pathname ==="/"?
      <div className={styles.slider}>
        <div className={styles.divImg}><img src="/imagens/redefinir.jpg" alt="ffff" className={styles.img}/></div>
        <div className={styles.divImg}><img src="/imagens/of.jpg" alt="sfdh" className={styles.img}/></div>
        <div className={styles.divImg}><img src="/imagens/pixel.jpg" alt="hfd" className={styles.img}/></div>
        <div className={styles.divImg}><img src="/imagens/redefinir.jpg" alt="hfd" className={styles.img}/></div>
      </div>
      :
      <div></div>
    }
      <Header />
      <main className={styles.main}>
        <Outlet /> 
      </main>
    </div>
    <div className={styles.foot}>
      <button className={styles.button} onClick={() =>{setValidacao(!validacao)}}>{validacao? <RiArrowDownWideLine />: <MdOutlineKeyboardArrowUp />}</button>
      <footer className={validacao? styles.hideContainerFooter: styles.showContainerFooter}>
        <hr className={styles.hr}/>
        <section className={styles.section}>
          <div className={styles.listaSection}>
           
            <ul className={styles.itemLista}>
              <h6 className={styles.tituloLIsta}>Sobre a</h6>
              <li className={styles.linkLista} onClick={() => navigate("/sobre")}>lb Cardans</li>
              <li className={styles.linkLista} onClick={() => navigate("/oficina")}>Oficina</li>
              <li className={styles.linkLista}>Tendências</li>
              <li className={styles.linkLista} onClick={() => navigate("/")}>Página Inicial</li>
              <li className={styles.linkLista}>Blog</li>
            </ul>
          </div>
        </section>
        <section className={styles.section}>
          <ul className={styles.itemLista}>
            <h6 className={styles.tituloLIsta}>Outros Sites</h6>
            <li className={styles.linkLista}><a href="Sites/Website/website.html" className={styles.listaA}>Website</a></li>
            <li className={styles.linkLista}><a href="Sites/Fogo do Doom/doom.html" className={styles.listaA}>Fogo do Doom</a></li>
            <li className={styles.linkLista}><a href="Sites/Animation Loading/loading.html" className={styles.listaA}>Animation Loading</a></li>
            <li className={styles.linkLista}><a href="Sites/Gerador/gerador.html" className={styles.listaA}>Gerador</a></li>
            <li className={styles.linkLista}><a href="Sites/Notas com Estrelas/notas.html" className={styles.listaA}>Notas com Estrelas</a></li>
          </ul>
        </section>
        <section className={styles.section}>
          <ul className={styles.itemLista}>
            <h6 className={styles.tituloLIsta}>Contato</h6>
            <li className={styles.linkLista} onClick={() => navigate("/contato")}>Contatos</li>
            <li className={styles.linkLista}>segurança</li>
            <li className={styles.linkLista}>vender</li>
            <li className={styles.linkLista}>solução de problemas</li>
          </ul>
        </section>
        <section className={styles.section}>
          <ul className={styles.itemLista}>
            <h6 className={styles.tituloLIsta}>Redes Sociais</h6>
            <li className={styles.linkLista}>X</li>
            <li className={styles.linkLista}>Facebook</li>
            <li className={styles.linkLista}>Instagram</li>
            <li className={styles.linkLista}>Youtube</li>
          </ul>
        </section>
        <section className={styles.section}>
          <ul className={styles.itemLista}>
            <h6 className={styles.tituloLIsta}>Minha conta</h6>
            <li className={styles.linkLista} onClick={() => navigate("/carrinho")}>Carrinho</li>
            <li className={styles.linkLista}>favoritos</li>
            <li className={styles.linkLista}>configurações</li>
            <li className={styles.linkLista}>Resumo</li>
          </ul>
      </section>
      </footer>
    </div>
    </>
  );
}
