import styles from "./css/carrinho.module.css"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from 'axios';
import { MdError } from "react-icons/md";

function Carrinho(){
    const [soma, setSoma] = useState<number>(0)
    const [alertExcluir, setAlertExcluir] = useState<string>("")
    const [itens, setItens] = useState<any[]>([])
    const [filtrados, setFiltrados] = useState<any[]>([])

    const navigate = useNavigate()

          useEffect(() =>{
            setAlertExcluir(styles.hideErro)
          }, [])
        useEffect(() => {
          axios.post("http://localhost:5000/buscarCarrinho", {}, {withCredentials:true})
          .then((res) => setItens(res.data.msg))
          .catch(() => console.log("Nenhum item no carrinho"))
        }, [excluir])
        useEffect(() => {
          if (itens.length > 0) {
            somar();
          }
        }, [itens]);
        
  const info: any[] = [
    {id: 0,titulo: "Barra longa de direção",preco: "587,99R$",tipo: "tornearia"},
    {id: 1,titulo: "Barra curta de direção",preco: "486,89R$", tipo: "tornearia"},
    {id: 2,titulo: "Coluna de Direção",preco: "495,50R$", tipo: "tornearia"},
    {id: 3, titulo: "Braço tensor simples",preco: "876,67R$",tipo: "tornearia"},
    {id: 4,titulo: "Bucha de braço tensor",preco: "279,90R$", tipo: "tornearia" },
    {id: 5,titulo: "Bomba Hidraulica",preco: "429,59R$", tipo: "tornearia"},
    {id: 6,titulo: "Tomada de Força", preco: "2.284,99R$",tipo: "tornearia"},
    {id: 7,titulo: "Eixo Cardan", preco: "2.087,46R$", tipo: "tornearia" },
    {id: 8, titulo: "Rolamento de Cardan", preco: "383,98R$",  tipo: "tornearia"},
    {id: 9,titulo: "Cruzeta de Cardan",  preco: "43,90R$", tipo: "tornearia"  },
    {id: 10,  titulo: "Macaco Hidraulico",  preco: "587,99R$",  tipo: "tornearia" },
    {id: 11,   titulo: "Pistão",  preco: "2.489,89R$",  tipo: "tornearia"},
    {id: 12, titulo: "Reparo para Pistão", preco: "274,99R$", tipo: "tornearia"},
    {id: 13,  titulo: "Manga de Eixo", preco: "1.478,78R$", tipo: "tornearia"},
    {id: 14,titulo: "Reparo de Manga de Eixo",  preco: "595,98R$",  tipo: "tornearia"},
    {id: 15, titulo: "Caixa de Transmissão",  preco: "678,35R$", tipo: "tornearia"},
    {id: 16, titulo: "Flange de Cardan", preco: "876,54R$", tipo: "tornearia" },
    {id: 17, titulo: "Diferencial",  preco: "989,99R$",  tipo: "tornearia" },
    {id: 18,   titulo: "Tambor de Freio",  preco: "275,43R$",  tipo: "tornearia" },
    {id: 19,  titulo: "Usinagem", preco: "--R$", tipo: "tornearia" },
    {id: 20,  titulo: "Tornearia Industrial",  preco: "--R$", tipo: "tornearia" },
    {id: 21,   titulo: "Cuíca de Freio",  preco: "774,99R$", tipo: "freio"},
    {id: 22, titulo: "Catraca de Freio",preco: "587,99R$", tipo: "freio"},
    {id: 23,titulo: "Válvula Pedal de Freio", preco: "197,67R$", tipo: "freio"},
    {id: 24, titulo: "Válvula Maneco Freio de Mão",preco: "688,59R$", tipo: "freio"},
    {id: 25,titulo: "Válvula Relê",preco: "125,45R$", tipo: "freio"},
    {id: 26, titulo: "Válvula Limitadora de Pressão", preco: "244,90R$", tipo: "freio"},
    {id: 27, titulo: "Válvula Equalizadora de Freio", preco: "329,99R$", tipo: "freio"},
    {id: 28, titulo: "Cilindro Mestre de Freio", preco: "489,90R$", tipo: "freio"},
    {id: 29, titulo: "Servo Freio a Ar", preco: "829,90R$", tipo: "freio"},
    {id: 30, titulo: "Kit de Reparo para Cilindro Mestre", preco: "159,90R$", tipo: "freio"},
    {id: 31, titulo: "Cubo de Roda Dianteiro", preco: "679,99R$", tipo: "freio"},
    {id: 32, titulo: "Cubo de Roda Traseiro", preco: "709,89R$", tipo: "freio"},
    {id: 33, titulo: "Junta Homocinética", preco: "384,79R$", tipo: "freio"},
    {id: 34, titulo: "Kit de Rolamento de Roda", preco: "215,99R$", tipo: "freio"},
    {id: 35, titulo: "Bieleta de Suspensão", preco: "178,49R$", tipo: "freio"},
    {id: 36, titulo: "Amortecedor Dianteiro", preco: "489,90R$", tipo: "freio"},
    {id: 37, titulo: "Amortecedor Traseiro", preco: "457,79R$", tipo: "freio"},
    {id: 38, titulo: "Coxim do Amortecedor", preco: "119,90R$", tipo: "freio"},
  ]

  async function excluir(e: any): Promise<void>{
    try{
      console.log(e)
      const res = await axios.post("http://localhost:5000/excluir", {peca: e}, {withCredentials: true})
      console.log(res)
      setAlertExcluir(styles.showErro)
      setTimeout(() =>{
        setAlertExcluir(styles.hideErro)
      }, 2500)
    }catch(erro){
      alert(erro)
    }
  }
  function somar(){
    const filtroId: any[] =itens.map((src) => src.peca)
    const array: any[] = info.filter((src) =>{
      return filtroId.includes(src.id)
    })
    const resultado: number =array.reduce((acumulado, atual) =>{
      return acumulado + Number(atual.preco.replace(/[^\d,]/g, "").replace(",", "."))
    }, 0)
    setFiltrados(array)
    setSoma(resultado)
  }
  async function comprar(){
    axios.post("http://localhost:5000/comprado", {}, {withCredentials: true})
    navigate("/servico", {state: "/carrinho"})
  }

  return(
    <div className={styles.container}>
      <hr />
      <div className={alertExcluir}>
        <div className={styles.warning}><MdError /></div>
        <p className={styles.erroP}>Item exlcuído</p>
    </div>
        <main className={styles.main}>
          <div className={styles.produtos}>
              <h1 className={styles.Ph1}>Produtos</h1>
              <hr />
              { 
                !itens[0]?
                  <div className={styles.Pitens}>
                    <h2 className={styles.Ph2}>Nenhum item no carrinho</h2>
                  </div>
                :
                  <div className={styles.Pitens}>
                    {
                      filtrados.map((src) => (
                        <div className={styles.Pcarrinho}>
                            <div className={styles.Pcarrinho2}>
                              <div className={styles.Pimg}>
                                <img src={`/public/imagens/${src.tipo}/img${src.id}.jpg`} alt="Imagem Peça"  onClick={() => navigate(`/peca/${src.id}`)} className={styles.img} />
                              </div>
                              <div className={styles.Pinfo}>
                                <div onClick={() => navigate(`/peca/${src.id}`)}>
                                  <h3 className={styles.Ptitulo}>{src.titulo}</h3>
                                  <p className={styles.Ppreco}>{src.preco}</p>
                                  </div>
                                <button className={styles.Pexcluir} onClick={() => excluir(src.id)}>excluir</button>
                              </div>
                            </div>
                        </div>
                      ))
                    }
                </div>
              }
          </div>  
          <div className={styles.resumo}>
              <div className={styles.Rresumo}>
                <h2 className={styles.Rh2}>Resumo da compra</h2>
                <hr />
                {
                  !itens[0] ?
                    null
                  :
                    <div className={styles.Rconteudo}>
                      <div className={styles.RvalorCompra}>
                        <div className={styles.RDproduto}><h4 className={styles.Rproduto}>Produtos: </h4> <p className={styles.RPprodutos}>{itens.length}</p></div>
                        <div className={styles.RDfrete}><h4 className={styles.Rfrete}>Frete</h4> <p className={styles.RPfrete}>Grátis</p></div>
                        <div className={styles.RDtotal}><h2 className={styles.Rtotal}>Total</h2> <p className={styles.RPtotal}>R${soma.toFixed(2)}</p></div>
                      </div>
                      <div className={styles.Rbotao}>
                        <button className={styles.Rcomprar} onClick={() => comprar()}>Continuar compra</button>
                      </div>
                    </div>
                }
              </div>
          </div>
        </main>
    </div>
  )
}

export default Carrinho
