//Dependências
import middlewares from "../middlewares/middlewareAuth";
import { Router } from "express";
import { registrarUsuario, confirmarEmail, login, esqueceuSenha, redefinirSenha, perfil, reenviar } from "../controllers/authControllers";
import { validateRegister } from "../middlewares/validate/registerSchema";
import { validateLogin } from "../middlewares/validate/loginSchema";
import { validateRedefinirSenha } from "../middlewares/validate/redefinirSchema";

const router = Router();

//Rotas
router.post("/registrar", validateRegister, registrarUsuario);
router.post("/confirmarEmail", middlewares.middleware2, confirmarEmail);
router.post("/login", validateLogin, login);
router.post("/esqueceuSenha", esqueceuSenha);
router.put("/RedefinirSenha", validateRedefinirSenha, redefinirSenha);
router.post("/perfil", middlewares.middleware, perfil);
router.post("/reenviar", reenviar);
router.post("/admin", middlewares.middlewareAdmin, perfil)

export default router;
