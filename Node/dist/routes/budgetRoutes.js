"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Dependências
const middlewareAuth_1 = __importDefault(require("../middlewares/middlewareAuth"));
const upload_1 = __importDefault(require("../middlewares/upload"));
const express_1 = require("express");
const budgetControllers_1 = require("../controllers/budgetControllers");
const router = (0, express_1.Router)();
//Rotas
router.post("/orcamento", middlewareAuth_1.default.middleware, upload_1.default.single('foto'), budgetControllers_1.criarOrcamento);
exports.default = router;
