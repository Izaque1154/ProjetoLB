import styles from "./css/Contato.module.css"
import { MdEmail  } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { useState } from "react";
import { SlLike } from "react-icons/sl";


function Contato(){
  const [show, setShow] = useState<boolean>(true)
  //React Hooks e instancias
    function copiar(texto: string): void{
        navigator.clipboard.writeText(texto)
        .then(() => console.log("Texto copiado"))
        .catch(() => console.log(`Erro ao copiar o texto`))
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
        <main className={styles.main}>
          <div className={styles.acesso}>
            <div className={styles.contatoCaixa}>
              <div className={styles.divContato}>
                <h1 className={styles.contatoH1}>Entre em contato conosco</h1>
              </div>
            </div>
            <div className={styles.conteudo}>
              <div className={styles.contato1}>
                <div className={styles.icon}>
                  <MdEmail />
                </div>
                  <h2 className={styles.contato2}>E-mail</h2>
                  <p className={styles.contato3}>Você pode entrar em contato pelo E-mail</p>
                  <h4 className={styles.copiar} onClick={() => copiar("abc123@gmail.com")}>abc123@gmail.com</h4>
              </div>
              <div className={styles.contato1}>
                <div className={styles.icon}>
                  <FaPhoneAlt/>
                </div>
                  <h2 className={styles.contato2}>Telefone</h2>
                  <p className={styles.contato3}>Você pode entrar em contato pelo Telefone</p>
                  <h4 className={styles.copiar} onClick={() => copiar("(21)99999-9999")}>(21)99999-9999</h4>
              </div>
              <div className={styles.contato1}>
                <div className={styles.icon}>
                  <FaWhatsappSquare />
                </div>
                  <h2 className={styles.contato2}>WhatSapp</h2>
                  <p className={styles.contato3}>Você pode entrar em contato pelo WhatSapp</p>
                  <h4 className={styles.copiar} onClick={() => copiar("(21)99999-9999")}>(21)99999-9999</h4>
              </div>
            </div>
          </div>
        </main>
    </div>
  )
}

export default Contato