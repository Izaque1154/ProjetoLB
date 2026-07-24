"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Dependências
const middlewareAuth_1 = __importDefault(require("../middlewares/middlewareAuth"));
const express_1 = require("express");
const authControllers_1 = require("../controllers/authControllers");
const registerSchema_1 = require("../middlewares/validate/registerSchema");
const loginSchema_1 = require("../middlewares/validate/loginSchema");
const redefinirSchema_1 = require("../middlewares/validate/redefinirSchema");
const router = (0, express_1.Router)();
//Rotas
router.post("/registrar", registerSchema_1.validateRegister, authControllers_1.registrarUsuario);
router.post("/confirmarEmail", middlewareAuth_1.default.middleware2, authControllers_1.confirmarEmail);
router.post("/login", loginSchema_1.validateLogin, authControllers_1.login);
router.post("/esqueceuSenha", authControllers_1.esqueceuSenha);
router.put("/RedefinirSenha", redefinirSchema_1.validateRedefinirSenha, authControllers_1.redefinirSenha);
router.post("/perfil", middlewareAuth_1.default.middleware, authControllers_1.perfil);
router.post("/reenviar", authControllers_1.reenviar);
router.post("/admin", middlewareAuth_1.default.middlewareAdmin, authControllers_1.perfil);
exports.default = router;
