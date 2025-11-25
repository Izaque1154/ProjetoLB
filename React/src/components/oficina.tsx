import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import styles from "./css/Oficina.module.css"
import { useLocation } from "react-router-dom";



function Oficina(){
  const [filtrados, setFiltrados] = useState<any[]>([])
  const navigate = useNavigate()
  const location = useLocation()
  
  //React Hooks e instancias

  function removerAcentos(texto: string): string {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

  useEffect(() =>{
    setFiltrados(info)
  }, [])
  useEffect(() =>{
    if(!location){
        return
      } else if (!location.state){
        setFiltrados(info)
        return 
    }
    setFiltrados(info.filter((item) =>{
      return removerAcentos(item.titulo.toLowerCase()).includes(removerAcentos(location.state.toLowerCase()))
    }))
    console.log(filtrados)
  }, [location])


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
    { id: 26, titulo: "Válvula Limitadora de Pressão", preco: "244,90R$" },
    { id: 27, titulo: "Válvula Equalizadora de Freio", preco: "329,99R$" },
    { id: 28, titulo: "Cilindro Mestre de Freio", preco: "489,90R$" },
    { id: 29, titulo: "Servo Freio a Ar", preco: "829,90R$" },
    { id: 30, titulo: "Kit de Reparo para Cilindro Mestre", preco: "159,90R$" },
    { id: 31, titulo: "Cubo de Roda Dianteiro", preco: "679,99R$" },
    { id: 32, titulo: "Cubo de Roda Traseiro", preco: "709,89R$" },
    { id: 33, titulo: "Junta Homocinética", preco: "384,79R$" },
    { id: 34, titulo: "Kit de Rolamento de Roda", preco: "215,99R$" },
    { id: 35, titulo: "Bieleta de Suspensão", preco: "178,49R$" },
    { id: 36, titulo: "Amortecedor Dianteiro", preco: "489,90R$" },
    { id: 37, titulo: "Amortecedor Traseiro", preco: "457,79R$" },
    { id: 38, titulo: "Coxim do Amortecedor", preco: "119,90R$" },
  ]
    return(
        <div className={styles.container}>
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
                              <div className={styles.grade} onClick={() => navigate(`/peca/${src.id}`)} key={i}>
                                  <div className={styles.tImagem}>
                                      <img src={`${import.meta.env.BASE_URL}imagens/tornearia/img${src.id}.jpg`} alt={`imagem${src.id}`} className={styles.gradeItem}/>
                                  </div>
                                  <div className={styles.tInfo}>
                                      <h5 className={styles.tTitulo}>{src.titulo}</h5>
                                      <h6 className={styles.tPreco}>{src.preco}</h6>
                                      <h6 className={styles.frete}>Frete Grátis</h6>
                                  </div>
                              </div>:
                            null
                        ))
                    }
                    {
                      maior >=21 ?
                      <h1 className={styles.fh1}>Freio</h1>:
                      null
                    }
                    {
                        filtrados.map((src, i) => (
                            src.id >= 21?
                        <div className={styles.grade} onClick={() => navigate(`/peca/${src.id}`)} key={i}>
                                  <div className={styles.tImagem}>
                                      <img src={`${import.meta.env.BASE_URL}imagens/freio/img${src.id}.jpg`} alt={`imagem${src.id}`} className={styles.gradeItem}/>
                                  </div>
                                  <div className={styles.tInfo}>
                                      <h5 className={styles.tTitulo}>{src.titulo}</h5>
                                      <h6 className={styles.tPreco}>{src.preco}</h6>
                                      <h6 className={styles.frete}>Frete Grátis</h6>
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