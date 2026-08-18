"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reenviar = exports.perfil = exports.redefinirSenha = exports.esqueceuSenha = exports.login = exports.confirmarEmail = exports.registrarUsuario = void 0;
//Dependências
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuario_1 = require("../models/usuario");
const crypto_1 = __importDefault(require("crypto"));
const configEmail_1 = __importDefault(require("../config/configEmail"));
//Variável de produção
const isProd = process.env.NODE_ENV === "production";
//Funções de autenticação
//Função registrar usuário
const registrarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, email, telefone, senha, confirmar } = req.body;
    try {
        if (senha !== confirmar) {
            return res.status(400).json({ erro: 'As senhas não coincidem' });
        }
        ;
        const hash = yield bcrypt_1.default.hash(senha, 10);
        const usuario = yield usuario_1.User.create({
            nome,
            email,
            telefone,
            senha: hash,
            verificado: false,
        });
        if (!process.env.SECRET) {
            return console.log("variável de ambiente não definida");
        }
        ;
        //Autenticando o usuário
        const secret = process.env.SECRET;
        const payload = {
            id: usuario.id,
            email: usuario.email
        };
        const options = {
            "expiresIn": "1h",
            "algorithm": "HS256"
        };
        const token = jsonwebtoken_1.default.sign(payload, secret, options);
        //Enviando email de confirmação
        const enviar = {
            from: "ia765350@gmail.com",
            to: email,
            subject: "Confirmação de conta",
            template: "confirmarEmail",
            context: {
                name: nome,
                token: token,
            }
        };
        configEmail_1.default.sendMail(enviar, (error, info) => {
            if (error) {
                console.log("Houve um erro ao enviar o email: ", error);
            }
            else {
                console.log("Email enviado com sucesso: ", info.response);
            }
        });
        return res.status(201).json({ msg: "cadastro criado com sucesso", token: token });
    }
    catch (error) {
        return res.status(500).json({ erro: "Erro ao criar o usuario", detalhes: error });
    }
    ;
});
exports.registrarUsuario = registrarUsuario;
//Função para confirmar email
const confirmarEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dados = req.user;
    try {
        if (!dados) {
            return res.status(500).json({ erro: "Token expirado" });
        }
        const dado = yield usuario_1.User.findOne({ where: { id: dados.id } });
        if (!dado) {
            return res.status(500).json({ erro: "usuário não encontrado" });
        }
        if (dado.verificado === true) {
            return res.status(401).json({ erro: "Usuário já verificado" });
        }
        yield usuario_1.User.update({ verificado: true }, { where: { email: dado.email, id: dado.id } });
        console.log(dado);
        ////////////////////////////////////////////////////////////
        //Criando token
        const token = jsonwebtoken_1.default.sign({ id: dado.id, email: dado.email }, process.env.SECRET, { "expiresIn": "1h", "algorithm": "HS256" });
        //Armazenando no cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "none" : "lax",
            maxAge: 3600000
        });
        ////////////////////////////////////////////////////////////    
        return res.status(200).json({ msg: "Conta verificada!" });
    }
    catch (error) {
        return res.status(400).json({ erro: "Houve um erro ao verificar a conta" });
    }
});
exports.confirmarEmail = confirmarEmail;
//Login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, senha } = req.body;
    const usuario = yield usuario_1.User.findOne({ where: { email } });
    try {
        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }
        ;
        const hash = yield bcrypt_1.default.compare(senha, usuario.senha);
        if (!hash) {
            return res.status(404).json({ erro: "Senha incorreta" });
        }
        else if (usuario.verificado === false) {
            return res.status(500).json({ erro: "Usuário não cadastrado" });
        }
        //autenticando usuário
        const payload = {
            id: usuario.id,
            email: usuario.email
        };
        const secret = process.env.SECRET;
        const options = {
            "expiresIn": "24h",
            "algorithm": "HS256"
        };
        const token = jsonwebtoken_1.default.sign(payload, secret, options);
        //armazenando token nos cookies
        res.cookie("token", token, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "none" : "lax",
            maxAge: 3600000
        });
        return res.status(201).json({ msg: "Usuário logado com sucesso" });
    }
    catch (error) {
        return res.status(500).json({ erro: "Error ao criar o usuario", detalhes: error });
    }
    ;
});
exports.login = login;
//Esqueceu Senha
const esqueceuSenha = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield usuario_1.User.findOne({ where: { email } });
        const nome = user === null || user === void 0 ? void 0 : user.nome;
        if (!user)
            return res.status(400).json({ error: "User not found" });
        const token = crypto_1.default.randomBytes(20).toString("hex");
        const now = new Date();
        now.setHours(now.getHours() + 1);
        yield usuario_1.User.update({
            token: token, expiracao: now
        }, {
            where: { email: email }
        });
        //Enviando o email
        const enviar = {
            from: "ia765350@gmail.com",
            to: email,
            subject: "Redefina sua Senha",
            template: "redefinirSenha",
            context: {
                name: nome,
                token: token,
                id: user.id
            }
        };
        configEmail_1.default.sendMail(enviar, (error, info) => {
            if (error) {
                console.log("Houve um erro ao enviar o email: ", error);
            }
            else {
                console.log("Email enviado com sucesso: ", info.response);
            }
        });
        return res.status(200).send("email enviado com sucesso!");
    }
    catch (error) {
        return res.status(400).json({ error: "User not found" });
    }
    ;
});
exports.esqueceuSenha = esqueceuSenha;
//Redefinindo senha
const redefinirSenha = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { senha, confirmSenha, token, id } = req.body;
    if (senha !== confirmSenha) {
        return res.status(500).json({ erro: "senhas não coincidem!" });
    }
    ;
    try {
        new Date();
        const hash = yield bcrypt_1.default.hash(senha, 10);
        const user = yield usuario_1.User.findByPk(id);
        if (!user) {
            return res.status(400).json({ erro: "Usuário não encontrado" });
        }
        if (user.token !== token && user.id !== id) {
            return res.status(400).json({ erro: "Token inválido" });
        }
        if (!user || !user.senha || !user.expiracao) {
            return res.status(400).json({ erro: "Token expirado" });
        }
        ;
        const compare = yield bcrypt_1.default.compare(senha, user === null || user === void 0 ? void 0 : user.senha);
        if (compare) {
            return res.status(404).json({ erro: "senha já existe" });
        }
        ;
        yield usuario_1.User.update({ senha: hash, expiracao: null, token: null }, { where: {
                id: user === null || user === void 0 ? void 0 : user.id
            } });
        return res.status(200).send("Senha atualizada com sucesso");
    }
    catch (error) {
        return res.status(404).json({ erro: error });
    }
    ;
});
exports.redefinirSenha = redefinirSenha;
//Função para exibir perfil do usuário
const perfil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(404).json({ erro: "token invalido" });
    }
    ;
    const id = JSON.stringify(req.user.id);
    const user = yield usuario_1.User.findByPk(id);
    if (!user) {
        return res.status(401).json({ message: "usuario não encontrado" });
    }
    return res.status(200).json({ nome: user.nome });
});
exports.perfil = perfil;
//Reenviar email de confirmação
const reenviar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const token = req.body.token;
    try {
        const dados = yield usuario_1.User.findOne({ where: { email: email } });
        if (!dados) {
            return res.status(500).json({ erro: "Usuário não encontrado" });
        }
        ;
        //Enviando email de confirmação
        const enviar = {
            from: "ia765350@gmail.com",
            to: email,
            subject: "Confirmação de conta",
            template: "confirmarEmail",
            context: {
                name: dados.nome,
                token: token,
            }
        };
        configEmail_1.default.sendMail(enviar, (error) => {
            if (error) {
                console.log("Houve um erro ao enviar o email: ", error);
            }
            else {
                console.log("Email enviado com sucesso");
            }
            ;
        });
    }
    catch (erro) {
        return res.status(400).json({ erro: "houve um erro" });
    }
    ;
});
exports.reenviar = reenviar;
