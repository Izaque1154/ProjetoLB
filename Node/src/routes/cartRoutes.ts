//Dependências
import middlewares from "../middlewares/middlewareAuth";
import { Router } from "express";
import { carrinho, 
    itemCarrinho, 
    buscarCarrinho, 
    excluir, 
    comprar,
    exibirProduto } from "../controllers/cartControllers";

const router = Router();

//Rotas
router.post("/carrinho", middlewares.middleware, carrinho);
router.post("/itemCarrinho", middlewares.middleware, itemCarrinho);
router.post("/buscarCarrinho", middlewares.middleware, buscarCarrinho);
router.post("/excluir", middlewares.middleware, excluir);
router.post("/comprar", middlewares.middleware, comprar);
router.post("/produtos", exibirProduto);

export default router;
