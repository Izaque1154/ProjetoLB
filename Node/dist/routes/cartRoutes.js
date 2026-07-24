"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Dependências
const middlewareAuth_1 = __importDefault(require("../middlewares/middlewareAuth"));
const express_1 = require("express");
const cartControllers_1 = require("../controllers/cartControllers");
const router = (0, express_1.Router)();
//Rotas
router.post("/carrinho", middlewareAuth_1.default.middleware, cartControllers_1.carrinho);
router.post("/itemCarrinho", middlewareAuth_1.default.middleware, cartControllers_1.itemCarrinho);
router.post("/buscarCarrinho", middlewareAuth_1.default.middleware, cartControllers_1.buscarCarrinho);
router.post("/excluir", middlewareAuth_1.default.middleware, cartControllers_1.excluir);
router.post("/comprar", middlewareAuth_1.default.middleware, cartControllers_1.comprar);
router.post("/produtos", cartControllers_1.exibirProduto);
exports.default = router;
