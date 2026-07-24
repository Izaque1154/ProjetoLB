import api, { apiRoutes } from "../services/api";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./css/detalhesPecas.module.css";
import { MdError } from "react-icons/md";
import ScrollToTop from "./scroll";

type FichaTecnica = {
    dimensoes: string;
    peso: string;
    material: string;
};

type Produto = {
    id: number;
    titulo: string;
    garantia: string;
    preco: string;
    fichaTecnica: FichaTecnica;
    estoque: number;
    caracteristica: string;
    descricao: string;
};

function Pecas(){
    const navigate = useNavigate();
    const { id } = useParams();
    const produtoId = Number(id);

    const [imagem, setImagem] = useState<string>("");
    const [erro, setErro] = useState<string>("");
    const [itemCarrinho, setItemCarrinho] = useState<boolean>(false);
    const [pecas, setPecas] = useState<Produto[]>([]);

    useEffect(() => {
        setErro(styles.hideErro);
    }, []);

    useEffect(() => {
        api.post(apiRoutes.cart.produtos)
            .then((res) => setPecas(res.data.produtos))
            .catch((erro) => console.log("Erro ao carregar as pecas: ", erro));
    }, []);

    useEffect(() =>{
        if (Number.isNaN(produtoId)) {
            return;
        }

        api.post(apiRoutes.cart.item, {peca: produtoId})
            .then((res) => setItemCarrinho(Boolean(res.data.msg)))
            .catch(() => console.log("Nenhum item no carrinho"));
    }, [produtoId]);

    const imgPecas: string[] = [
        "barraLonga", "barraCurta", "colunaDirecao", "tensor", "buchaTensor",
        "bombaHidraulica", "tomadaForca", "cardan", "rolamentoCardan",
        "cruzetaCardan", "macacoHidraulico", "pistao", "reparoPistao",
        "mangaEixo", "reparoMangaEixo", "caixaTransmissao", "flange",
        "diferencial", "tamborFreio", "usinagem", "fabricacaoPeca", "cuica",
        "catraca", "valvulaPedal", "valvulaManeco", "valvulaRele",
        "valvulaLimitadoraPressao", "valvulaEqualizadoraFreio",
        "cilindroMestreFreio", "servoFreioAr", "kitReparoCilindroMestre",
        "cuboRodaDianteiro", "cuboRodaTraseiro", "juntaHomocinetica",
        "kitRolamentoRoda", "bieletaSuspensao", "amortecedorDianteiro",
        "amortecedorTraseiro", "coximAmortecedor"
    ];

    const pastaProduto = imgPecas[produtoId];
    const categoriaImagem = produtoId >= 21 ? "freio" : "tornearia";
    const imagemBase = `${import.meta.env.BASE_URL}imagens/${categoriaImagem}/${pastaProduto}`;
    const imagemEnter = `${imagemBase}/img${produtoId}.jpg`;
    const imagemEnter1 = `${imagemBase}/img01.jpg`;
    const imagemEnter2 = `${imagemBase}/img02.jpg`;
    const imagemEnter3 = `${imagemBase}/img03.jpg`;
    const pecaAtual = pecas.find((peca) => peca.id === produtoId);

    async function carrinho(){
        try{
            await api.post(apiRoutes.cart.adicionar, {peca: produtoId});
            setItemCarrinho(true);
        }catch(erro){
            console.log("erro ao buscar o carrinho: ", erro);
            setErro(styles.showErro);
            setTimeout(() =>{
                setErro(styles.hideErro);
            }, 2000);
        }
    }

    async function contratar() {
        try{
            await api.post(apiRoutes.auth.perfil, {});
            navigate("/servico", {state: `/peca/${id}`});
        }catch(erro){
            setErro(styles.showErro);
            setTimeout(() =>{
                setErro(styles.hideErro);
            }, 2000);
        }
    }

    return(
        <div className={styles.container}>
            <div className={erro}>
                <div className={styles.warning}><MdError /></div>
                <p className={styles.erroP}>é necessário estar logado</p>
            </div>
            <ScrollToTop/>
            {pecaAtual ?
                <main className={styles.main}>
                    <div className={styles.box}>
                        <div className={styles.info}>
                            <div className={styles.containerT}>
                                <h2 className={styles.titulo}> {pecaAtual.titulo}</h2>
                            </div>
                            <div className={styles.containerP}>
                                <h2 className={styles.preco}>{pecaAtual.preco}</h2>
                            </div>
                            <div className={styles.containerG}>
                                <h5 className={styles.Hgarantia}>Garantia: </h5>
                                <p className={styles.garantia}>{pecaAtual.garantia}</p>
                            </div>
                            <div className={styles.containerD}>
                                <h3 className={styles.Hdescricao}>Descrição: </h3>
                                <p className={styles.descricao}>{pecaAtual.descricao}</p>
                            </div>
                            <div className={styles.containerC}>
                                <h3 className={styles.Hcaracteristica}>Caracteristicas: </h3>
                                <p className={styles.caracteristicas}>{pecaAtual.caracteristica}</p>
                            </div>
                            <div className={styles.containerF}>
                                <h3 className={styles.HfichaTecnica}>Ficha tecnica: </h3>
                                <ul className={styles.LfichaTecnica}>
                                    <li className={styles.fichaTecnica}>Dimensões: {pecaAtual.fichaTecnica.dimensoes}</li>
                                    <li className={styles.fichaTecnica}>Peso: {pecaAtual.fichaTecnica.peso}</li>
                                    <li className={styles.fichaTecnica}>Material: {pecaAtual.fichaTecnica.material}</li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.imagem}>
                            <div className={styles.imagens}>
                                <ul className={styles.listaImagem}>
                                    <li className={styles.imagensLista}>
                                        <img src={imagemEnter1} onMouseEnter={() => setImagem(imagemEnter1)} alt="imagem peça" className={styles.img} />
                                    </li>
                                    <li className={styles.imagensLista}>
                                        <img src={imagemEnter2} onMouseEnter={() => setImagem(imagemEnter2)} alt="imagem peça" className={styles.img} />
                                    </li>
                                    <li className={styles.imagensLista}>
                                        <img src={imagemEnter3} onMouseEnter={() => setImagem(imagemEnter3)} alt="imagem peça" className={styles.img} />
                                    </li>
                                    <li className={styles.imagensLista}>
                                        <img src={imagemEnter} onMouseEnter={() => setImagem(imagemEnter)} alt="imagem peça" className={styles.img} />
                                    </li>
                                </ul>
                            </div>
                            <div className={styles.pImagem}>
                                <img src={!imagem ? imagemEnter : imagem} alt="imagem peça" className={styles.img1} />
                            </div>
                            <div className={styles.containerE}>
                                <h6 className={styles.Hestoque}>Estoque: {pecaAtual.estoque}</h6>
                            </div>
                            <button className={styles.contratar} onClick={() => contratar()}>Contratar</button>
                            {
                                !itemCarrinho ?
                                    <button className={styles.carrinho} onClick={() => carrinho()}>Adicionar ao carrinho</button>
                                :
                                    <div><p>Item adicionado ao carrinho</p></div>
                            }
                        </div>
                    </div>
                </main>
            :
                <main className={styles.main}>
                    <div className={styles.box}>
                        <div className={styles.info}>
                            <h2 className={styles.titulo}>Carregando produto...</h2>
                        </div>
                    </div>
                </main>
            }
        </div>
    );
}

export default Pecas;
