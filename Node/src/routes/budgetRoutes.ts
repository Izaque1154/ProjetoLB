//Dependências
import middlewares from "../middlewares/middlewareAuth";
import upload from "../middlewares/upload";
import { Router } from "express";
import { criarOrcamento } from "../controllers/budgetControllers";

const router = Router();

//Rotas
router.post("/orcamento", middlewares.middleware, upload.single('foto'), criarOrcamento);

export default router;

