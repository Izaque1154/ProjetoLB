import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./css/detalhesPecas.module.css";
import Servico from "./servico";
import { useNavigate } from "react-router-dom";

function Peças(){
    const navigate = useNavigate()
    const [ imagem, setImagem ] = useState<string>("")
    const [ nome, setNome ] = useState<string>("")
    const [ text, setText ] = useState<string>("")
    const { id } = useParams()
    const [itemCarrinho, setItemCarrinho] = useState<string>("")
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    const imgPecas: string[] =["barraLonga", "barraCurta", "colunaDirecao", "tensor", "buchaTensor", "bombaHidraulica", "tomadaForca", "cardan", "rolamentoCardan"
        , "cruzetaCardan", "macacoHidraulico", "pistao", "reparoPistao", "mangaEixo", "reparoMangaEixo", "caixaTransmissao", "flange", "diferencial", "tamborFreio", "usinagem",
         "fabricacaoPeca", "cuica", "catraca", "valvulaPedal", "valvulaManeco", "valvulaRele", ""]
    const imagemEnter: string = `/imagens/${Number(id) >= 21? "freio": "tornearia"}/${imgPecas[Number(id)]}/img${id}.jpg`
    const imagemEnter1: string = `/imagens/${Number(id) >= 21? "freio": "tornearia"}/${imgPecas[Number(id)]}/img01.jpg`
    const imagemEnter2: string = `/imagens/${Number(id) >= 21? "freio": "tornearia"}/${imgPecas[Number(id)]}/img02.jpg`
    const imagemEnter3: string = `/imagens/${Number(id) >= 21? "freio": "tornearia"}/${imgPecas[Number(id)]}/img03.jpg`

const pecas = [
  // === ITENS ORIGINAIS (mantidos) ===
  {
    id: 0,
    titulo: "Barra longa de direção",
    garantia: "3 meses",
    preco: "587,99R$",
    categoria: "Direção",
    fabricante: "AutoParts LTDA",
    codigo: "DIR-001",
    imagem: "/imagens/barra_longa.jpg",
    fichaTecnica: {
      dimensoes: "120 x 15 cm",
      peso: "7,2kg",
      material: "Aço forjado"
    },
    estoque: 12,
    compatibilidade: "Caminhões e veículos pesados",
    caracteristica: "Peça de alta durabilidade utilizada no sistema de direção, garantindo firmeza e precisão no controle do veículo. Possui tratamento térmico anticorrosivo e acabamento zincado para maior vida útil.",
    descricao: "A barra longa de direção é fabricada em aço forjado, proporcionando resistência e segurança. Ideal para caminhões e veículos pesados, sua construção robusta oferece estabilidade e precisão em manobras, reduzindo o desgaste de outros componentes do sistema."
  },
  {
    id: 1,
    titulo: "Barra curta de direção",
    garantia: "3 meses",
    preco: "486,89R$",
    categoria: "Direção",
    fabricante: "MetalTruck",
    codigo: "DIR-002",
    imagem: "/imagens/barra_curta.jpg",
    fichaTecnica: {
      dimensoes: "80 x 10 cm",
      peso: "5,5kg",
      material: "Aço carbono"
    },
    estoque: 15,
    compatibilidade: "Veículos leves e médios",
    caracteristica: "Responsável por transmitir o movimento da direção às rodas com precisão, garantindo estabilidade e segurança em altas velocidades.",
    descricao: "A barra curta de direção é essencial para o bom funcionamento do sistema de direção, feita em aço carbono de alta resistência. Oferece desempenho duradouro, reduzindo folgas e vibrações no volante."
  },
  {
    id: 2,
    titulo: "Coluna de Direção",
    garantia: "6 meses",
    preco: "495,50R$",
    fichaTecnica: {
      dimensoes: "75 x 12 cm",
      peso: "6kg",
      material: "Ferro fundido"
    },
    estoque: 8,
    caracteristica: "Liga o volante ao sistema de direção, com articulação de segurança.",
    descricao: "Coluna de direção reforçada, garantindo segurança e suavidade na condução."
  },
  {
    id: 3,
    titulo: "Braço tensor simples",
    garantia: "3 meses",
    preco: "876,67R$",
    fichaTecnica: {
      dimensoes: "50 x 8 cm",
      peso: "3,2kg",
      material: "Aço temperado"
    },
    estoque: 10,
    caracteristica: "Mantém o alinhamento da suspensão e absorve impactos durante o uso.",
    descricao: "O braço tensor simples é ideal para caminhões e ônibus, proporcionando estabilidade e segurança na direção."
  },
  {
    id: 4,
    titulo: "Bucha de braço tensor",
    garantia: "3 meses",
    preco: "279,90R$",
    fichaTecnica: {
      dimensoes: "10 x 6 cm",
      peso: "0,8kg",
      material: "Borracha vulcanizada"
    },
    estoque: 30,
    caracteristica: "Absorve vibrações e reduz ruídos no sistema de suspensão.",
    descricao: "A bucha de braço tensor é desenvolvida para garantir conforto e durabilidade em estradas irregulares."
  },
  {
    id: 5,
    titulo: "Bomba Hidraulica",
    garantia: "6 meses",
    preco: "429,59R$",
    fichaTecnica: {
      dimensoes: "25 x 20 cm",
      peso: "4kg",
      material: "Alumínio fundido"
    },
    estoque: 6,
    caracteristica: "Garante o fluxo de fluido no sistema hidráulico com pressão estável.",
    descricao: "A bomba hidráulica é projetada para oferecer desempenho confiável e duradouro em sistemas de direção hidráulica."
  },
  {
    id: 6,
    titulo: "Tomada de Força",
    garantia: "6 meses",
    preco: "2.284,99R$",
    fichaTecnica: {
      dimensoes: "35 x 25 cm",
      peso: "9,5kg",
      material: "Aço fundido"
    },
    estoque: 5,
    caracteristica: "Permite a transferência de potência do motor para equipamentos auxiliares.",
    descricao: "A tomada de força é utilizada em caminhões e máquinas agrícolas, oferecendo alto desempenho e resistência."
  },
  {
    id: 7,
    titulo: "Eixo Cardan",
    garantia: "6 meses",
    preco: "2.087,46R$",
    fichaTecnica: {
      dimensoes: "150 x 12 cm",
      peso: "15kg",
      material: "Aço tubular"
    },
    estoque: 4,
    caracteristica: "Transmite torque entre componentes mecânicos distantes.",
    descricao: "O eixo cardan garante a transferência de força do motor para o diferencial de forma estável e eficiente."
  },
  {
    id: 8,
    titulo: "Rolamento de Cardan",
    garantia: "3 meses",
    preco: "383,98R$",
    fichaTecnica: {
      dimensoes: "12 x 12 cm",
      peso: "1kg",
      material: "Aço de rolamento"
    },
    estoque: 20,
    caracteristica: "Peça fundamental no suporte e rotação do eixo cardan.",
    descricao: "Rolamento de cardan com lubrificação selada, proporcionando maior durabilidade e desempenho silencioso."
  },
  {
    id: 9,
    titulo: "Cruzeta de Cardan",
    garantia: "3 meses",
    preco: "43,90R$",
    fichaTecnica: {
      dimensoes: "8 x 8 cm",
      peso: "0,7kg",
      material: "Aço temperado"
    },
    estoque: 50,
    caracteristica: "Faz a ligação entre os eixos do cardan permitindo o movimento angular.",
    descricao: "Cruzeta de cardan reforçada, com pinos de alta precisão e graxeira para lubrificação eficiente."
  },
  {
    id: 10,
    titulo: "Macaco Hidraulico",
    garantia: "12 meses",
    preco: "587,99R$",
    fichaTecnica: {
      dimensoes: "35 x 25 cm",
      peso: "11kg",
      material: "Aço inoxidável"
    },
    estoque: 25,
    caracteristica: "Utilizado para elevação de veículos com facilidade e segurança.",
    descricao: "Macaco hidráulico portátil, ideal para oficinas e uso automotivo, com capacidade de elevação de até 5 toneladas."
  },
  {
    id: 11,
    titulo: "Pistão",
    garantia: "3 meses",
    preco: "2.489,89R$",
    fichaTecnica: {
      dimensoes: "15 x 10 cm",
      peso: "2,5kg",
      material: "Alumínio"
    },
    estoque: 18,
    caracteristica: "Componente essencial do motor, responsável pela compressão do combustível.",
    descricao: "Pistão de alta performance, com revestimento antifricção, ideal para motores a diesel e gasolina."
  },
  {
    id: 12,
    titulo: "Reparo para Pistão",
    garantia: "3 meses",
    preco: "274,99R$",
    fichaTecnica: {
      dimensoes: "10 x 5 cm",
      peso: "0,4kg",
      material: "Aço + borracha"
    },
    estoque: 22,
    caracteristica: "Kit completo para manutenção de pistões desgastados.",
    descricao: "O reparo para pistão contém anéis e vedantes de alta qualidade para restauração do desempenho original."
  },
  {
    id: 13,
    titulo: "Manga de Eixo",
    garantia: "6 meses",
    preco: "1.478,78R$",
    fichaTecnica: {
      dimensoes: "40 x 30 cm",
      peso: "12kg",
      material: "Ferro fundido"
    },
    estoque: 7,
    caracteristica: "Componente que conecta o eixo da roda à suspensão.",
    descricao: "Manga de eixo reforçada, projetada para suportar grandes cargas e manter o alinhamento perfeito das rodas."
  },
  {
    id: 14,
    titulo: "Reparo de Manga de Eixo",
    garantia: "3 meses",
    preco: "595,98R$",
    fichaTecnica: {
      dimensoes: "18 x 10 cm",
      peso: "1,2kg",
      material: "Aço e borracha"
    },
    estoque: 16,
    caracteristica: "Substitui peças danificadas da manga de eixo, prolongando sua vida útil.",
    descricao: "Reparo de manga de eixo desenvolvido para encaixe preciso e durabilidade superior."
  },
  {
    id: 15,
    titulo: "Caixa de Transmissão",
    garantia: "12 meses",
    preco: "678,35R$",
    fichaTecnica: {
      dimensoes: "70 x 50 cm",
      peso: "25kg",
      material: "Aço fundido"
    },
    estoque: 3,
    caracteristica: "Responsável pela troca de marchas do veículo.",
    descricao: "Caixa de transmissão de alta precisão, garantindo trocas suaves e maior eficiência no consumo de combustível."
  },
  {
    id: 16,
    titulo: "Flange de Cardan",
    garantia: "3 meses",
    preco: "876,54R$",
    fichaTecnica: {
      dimensoes: "15 x 15 cm",
      peso: "1,8kg",
      material: "Aço carbono"
    },
    estoque: 12,
    caracteristica: "Faz a união entre o cardan e o diferencial.",
    descricao: "Flange de cardan fabricada com precisão, oferecendo vedação e fixação seguras."
  },
  {
    id: 17,
    titulo: "Diferencial",
    garantia: "12 meses",
    preco: "989,99R$",
    fichaTecnica: {
      dimensoes: "60 x 40 cm",
      peso: "30kg",
      material: "Ferro fundido"
    },
    estoque: 4,
    caracteristica: "Distribui a força do motor entre as rodas.",
    descricao: "O diferencial garante melhor tração e estabilidade, mesmo em curvas e terrenos irregulares."
  },
  {
    id: 18,
    titulo: "Tambor de Freio",
    garantia: "6 meses",
    preco: "275,43R$",
    fichaTecnica: {
      dimensoes: "30 x 30 cm",
      peso: "8kg",
      material: "Ferro fundido"
    },
    estoque: 14,
    caracteristica: "Componente essencial do sistema de frenagem.",
    descricao: "Tambor de freio de alta resistência térmica, garantindo frenagem estável e duradoura."
  },
  {
    id: 19,
    titulo: "Usinagem",
    garantia: "3 meses",
    preco: "--R$",
    fichaTecnica: {
      dimensoes: "Sob medida",
      peso: "--",
      material: "Variável"
    },
    estoque: 0,
    caracteristica: "Serviço personalizado de usinagem sob demanda.",
    descricao: "Usinagem de precisão para peças industriais e automotivas conforme especificações do cliente."
  },
  {
    id: 20,
    titulo: "Tornearia Industrial",
    garantia: "3 meses",
    preco: "--R$",
    fichaTecnica: {
      dimensoes: "Sob medida",
      peso: "--",
      material: "Variável"
    },
    estoque: 0,
    caracteristica: "Serviço de torneamento de peças metálicas e mecânicas.",
    descricao: "Tornearia especializada em componentes industriais de alta precisão e acabamento técnico."
  },
  {
    id: 21,
    titulo: "Cuíca de Freio",
    garantia: "6 meses",
    preco: "774,99R$",
    fichaTecnica: {
      dimensoes: "28 x 20 cm",
      peso: "5,3kg",
      material: "Aço e alumínio"
    },
    estoque: 9,
    caracteristica: "Atua como servo-freio pneumático para veículos pesados.",
    descricao: "A cuíca de freio aumenta a força aplicada nos freios, proporcionando frenagens mais eficientes."
  },
  {
    id: 22,
    titulo: "Catraca de Freio",
    garantia: "6 meses",
    preco: "587,99R$",
    fichaTecnica: {
      dimensoes: "22 x 12 cm",
      peso: "3kg",
      material: "Aço carbono"
    },
    estoque: 11,
    caracteristica: "Permite o ajuste automático das lonas de freio.",
    descricao: "Catraca de freio de alta durabilidade, essencial para a manutenção do sistema de frenagem pneumático."
  },
  {
    id: 23,
    titulo: "Válvula Pedal de Freio",
    garantia: "6 meses",
    preco: "197,67R$",
    fichaTecnica: {
      dimensoes: "18 x 10 cm",
      peso: "1,5kg",
      material: "Alumínio"
    },
    estoque: 13,
    caracteristica: "Controla a pressão do ar no sistema de freios.",
    descricao: "Válvula pedal de freio com resposta precisa e construção leve, ideal para caminhões e ônibus."
  },
  {
    id: 24,
    titulo: "Válvula Maneco Freio de Mão",
    garantia: "6 meses",
    preco: "688,59R$",
    fichaTecnica: {
      dimensoes: "20 x 14 cm",
      peso: "2kg",
      material: "Alumínio"
    },
    estoque: 10,
    caracteristica: "Comando pneumático do freio de estacionamento.",
    descricao: "Válvula maneco desenvolvida para operação suave e segura do freio de mão em veículos pesados."
  },
  {
    id: 25,
    titulo: "Válvula Relê",
    garantia: "6 meses",
    preco: "125,45R$",
    fichaTecnica: {
      dimensoes: "15 x 10 cm",
      peso: "1kg",
      material: "Alumínio"
    },
    estoque: 18,
    caracteristica: "Regula o fluxo de ar entre o pedal e as câmaras de freio.",
    descricao: "Válvula relê com corpo em alumínio leve e resistência à corrosão, garantindo resposta rápida no sistema pneumático."
  },
];

  useEffect(() =>{
    axios.post("http://localhost:5000/perfil", {}, {withCredentials:true})
    .then((res) => setNome(res.data.user.nome))
    .catch((erro) => console.log(erro))

    axios.post("http://localhost:5000/itemCarrinho", {peca: id}, {withCredentials:true})
    .then((res) => setItemCarrinho(res.data.msg))
    .catch((erro) => console.log("Nenhum item no carrinho"))
  }, [])

    async function carrinho(){
        try{
            const res = await axios.post("http://localhost:5000/carrinho", {peca: id}, {withCredentials: true})
            setItemCarrinho("item adicionando")
        }catch(erro){
            console.log("erro ao buscar o carrinho: ", erro)
        }
    }

    return(
        <div className={styles.container}>
            <header className={styles.header}>
                <img src="/imagens/lb.jpg" alt="LB-Cardns" onClick={() => navigate("/")} className={styles.LogoImage} />
                <input type="text" id="pesquisar" className={styles.pesquisar} value={text} onChange={(e) => setText(e.target.value)} placeholder="Pesquisar" />
                <nav className={styles.links}>
                    <a href="" onClick={() => navigate("/")} className={styles.a}>Home</a>
                    <a href="" onClick={() => navigate("/oficina")} className={styles.a}>Oficina</a>
                    <a href="" onClick={() => navigate("/contato")} className={styles.a}>Contato</a>
                    <a href="" onClick={() => navigate("/sobre")} className={styles.a}>Sobre</a>
                    <a href="" onClick={() => navigate("/carrinho")} className={styles.a}>Carrinho</a>
                    { nome ? <a href="" className={styles.nome}>{nome}</a> :
                        <div className={styles.login}>
                            Login/Registro
                            <div className={styles.caixinha}>
                                <a href="" onClick={() => navigate("/login")} className={styles.a}>Login</a>
                                <a href="" onClick={() => navigate("/registro")} className={styles.a}>Registro</a>
                            </div>
                        </div>
                    }
                </nav>
            </header>
            {pecas.map(p => (
                p.id.toString() === id?.toString() ?
                <main className={styles.main}>
                    <div className={styles.box}>
                        <div className={styles.info}>
                            <div className={styles.containerT}>
                                <h2 className={styles.titulo}> {p.titulo}</h2> 
                            </div>
                            <div className={styles.containerP}>
                                <h2 className={styles.preco}>{p.preco}</h2>
                            </div>
                            <div className={styles.containerG}>
                                <h5 className={styles.Hgarantia}>Garantia: </h5>
                                <p className={styles.garantia}>{p.garantia}</p>
                            </div>
                            <div className={styles.containerD}>
                                <h3 className={styles.Hdescricao}>Descrição: </h3>
                                <p className={styles.descricao}>{p.descricao}</p>
                            </div>
                            <div className={styles.containerC}>
                                <h3 className={styles.Hcaracteristica}>Caracteristicas: </h3>
                                <p className={styles.caracteristicas}>{p.caracteristica}</p>
                            </div>
                            <div className={styles.containerF}>
                                <h3 className={styles.HfichaTecnica}>Ficha tecnica: </h3>
                                <ul className={styles.LfichaTecnica}>
                                    <li className={styles.fichaTecnica}>Dimensões: {p.fichaTecnica.dimensoes}</li>
                                    <li className={styles.fichaTecnica}>Peso: {p.fichaTecnica.peso}</li>
                                    <li className={styles.fichaTecnica}>Material: {p.fichaTecnica.material}</li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.imagem}>
                            <div className={styles.imagens}>
                                <ul className={styles.listaImagem}>
                                    <li className={styles.imagensLista}>
                                        <img src={`/imagens/${Number(id) >= 21? "freio": "tornearia"}/${imgPecas[Number(id)]}/img01.jpg`} onMouseEnter={() => {
                                            setImagem(imagemEnter1)
                                        }} alt="imagem peça" className={styles.img} />
                                    </li>
                                    <li className={styles.imagensLista}>
                                        <img src={`/imagens/${Number(id) >= 21? "freio": "tornearia"}/${imgPecas[Number(id)]}/img02.jpg`} onMouseEnter={() => {
                                            setImagem(imagemEnter2)
                                        }}  alt="imagem peça" className={styles.img} />
                                    </li>
                                    <li className={styles.imagensLista}>
                                        <img src={`/imagens/${Number(id) >= 21? "freio": "tornearia"}/${imgPecas[Number(id)]}/img03.jpg`} onMouseEnter={() => {
                                            setImagem(imagemEnter3)
                                        }}  alt="imagem peça" className={styles.img} />
                                    </li>
                                    <li className={styles.imagensLista}>
                                        <img src={`/imagens/${Number(id) >= 21? "freio": "tornearia"}/${imgPecas[Number(id)]}/img${id}.jpg`} onMouseEnter={() => {
                                            setImagem(imagemEnter)
                                        }}  alt="imagem peça" className={styles.img} />
                                    </li>
                                </ul>
                            </div>
                            <div className={styles.pImagem}>
                                <img src={!imagem ? `/imagens/${Number(id) >= 21? "freio": "tornearia"}/${imgPecas[Number(id)]}/img${id}.jpg` : imagem} alt="imagem peça" className={styles.img1} />
                            </div>
                            <div className={styles.containerE}>
                                <h6 className={styles.Hestoque}>Estoque: </h6>
                                <p className={styles.estoque}>{p.estoque}</p>
                            </div>
                            <button className={styles.contratar} onClick={() => navigate("/servico", {state: `/peça/${id}`})}>Contratar</button>
                            {
                                !itemCarrinho ?
                                    <button className={styles.carrinho} onClick={() => carrinho()}>Adicionar ao carrinho</button>
                                :
                                    <div><p>Item adicionando ao carrinho</p></div>
                            }

                        </div>
                    </div>
                </main>
                :
                null
            ))}
            <footer className={styles.containerFoot}>
                rodapé da pagina
            </footer>
        </div>
    )
}

export default Peças