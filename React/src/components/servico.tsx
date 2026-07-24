import styles from "./css/servico.module.css"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

function Servico(){
    const [expandir, setExpandir] = useState(false);

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
      setExpandir(true);
      const origem = typeof location.state === "string" ? location.state : "/";
      const timer = setTimeout(() =>{
        navigate(origem)
      }, 2000)

      return () => clearTimeout(timer);
    }, [location.state, navigate]);

  return(
    <div className={styles.main}>
      <div className={`${styles.expandir} ${expandir ? styles.expandida : ""}`}/>
        <div className={styles.centro}>
          <h1 className={styles.servico}>Serviço Contratado</h1>
      </div>
    </div>
  )
}

export default Servico
