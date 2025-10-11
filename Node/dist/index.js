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
//Dependências
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const tabelas_1 = require("./tabelas");
const tabelas_2 = __importDefault(require("./tabelas"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const crypto_1 = __importDefault(require("crypto"));
const configEmail_1 = __importDefault(require("./configEmail"));
//Configurações
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
;
//Rotas
//middleware
function middleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ erro: "Token não encontrado" });
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET);
            req.user = decoded;
            next();
        }
        catch (error) {
            res.status(401).json({ msg: "Token não encontrado" });
        }
    });
}
//Registrando usuário
app.post("/registrar", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, email, telefone, senha, confirmar } = req.body;
    try {
        if (senha !== confirmar) {
            return res.status(400).json({ 'erro': 'As senhas não coincidem' });
        }
        ;
        const hash = yield bcrypt_1.default.hash(senha, 10);
        const usuario = yield tabelas_1.User.create({
            nome,
            email,
            telefone,
            senha: hash
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
        //Armazenando nos cookies
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 3600000
        });
        return res.status(201).json({ msg: "logado com sucesso" });
    }
    catch (error) {
        return res.status(500).json({ erro: "Erro ao criar o usuario: ", detalhes: error });
    }
    ;
}));
//Login
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, senha } = req.body;
    const usuario = yield tabelas_1.User.findOne({ where: { email } });
    try {
        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }
        ;
        const hash = yield bcrypt_1.default.compare(senha, usuario.senha);
        if (!hash) {
            return res.status(404).json({ erro: "Senha incorreta" });
        }
        ;
        //autenticando usuário
        const payload = {
            id: usuario.id,
            email: usuario.email
        };
        const secret = process.env.SECRET;
        const options = {
            "expiresIn": "1h",
            "algorithm": "HS256"
        };
        const token = jsonwebtoken_1.default.sign(payload, secret, options);
        //armazenando token nos cookies
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 3600000
        });
        return res.status(201).json({ msg: "Usuário logado com sucesso" });
    }
    catch (error) {
        return res.status(500).json({ erro: "Error ao criar o usuario", detalhes: error });
    }
    ;
}));
//Esqueceu Senha
app.post("/esqueceuSenha", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield tabelas_1.User.findOne({ where: { email } });
        const nome = user === null || user === void 0 ? void 0 : user.nome;
        if (!user)
            return res.status(400).json({ error: "User not found" });
        const token = crypto_1.default.randomBytes(20).toString("hex");
        const now = new Date();
        now.setHours(now.getHours() + 1);
        const usuario = yield tabelas_1.User.update({
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
}));
//Redefinindo senha
app.put('/RedefinirSenha', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { senha, confirmSenha, token, id } = req.body;
    console.log(senha, " ", confirmSenha, " ", token, " ", id);
    if (senha !== confirmSenha) {
        return res.status(500).json({ erro: "senhas não coincidem!" });
    }
    try {
        const now = new Date();
        const hash = yield bcrypt_1.default.hash(senha, 10);
        const user = yield tabelas_1.User.findByPk(id);
        if (!user || !user.senha || !user.expiracao) {
            return res.status(400).json({ erro: "Token expirado" });
        }
        const compare = yield bcrypt_1.default.compare(senha, user === null || user === void 0 ? void 0 : user.senha);
        if (compare) {
            return res.status(404).json({ erro: "senha já existe" });
        }
        yield tabelas_1.User.update({ senha: hash, expiracao: null, token: null }, { where: {
                id: user === null || user === void 0 ? void 0 : user.id
            } });
        return res.status(200).send("Senha atualizada com sucesso");
    }
    catch (error) {
        return res.status(404).json({ erro: error });
    }
}));
app.post("/perfil", middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(404).json({ erro: "token invalido" });
    }
    const id = JSON.stringify(req.user.id);
    const user = yield tabelas_1.User.findByPk(id);
    return res.status(200).json({ user });
}));
app.post("/carrinho", middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idUser = Number(req.user.id);
    const { peca } = req.body;
    if (!idUser || !peca) {
        return res.status(404).json({ erro: "token invalido" });
    }
    ;
    try {
        const resp = yield tabelas_2.default.findOne({ where: { peca: peca } });
        if (resp === null) {
            const resposta = tabelas_2.default.create({
                idUser: idUser,
                peca: peca
            });
            return res.status(200).json({ res: "Item adicionado ao carrinho" });
        }
        return res.status(200).json({ res: "Item já existe no carrinho" });
    }
    catch (error) {
        return res.status(500).json({ erro: "Carrinho vazio" });
    }
}));
app.post("/itemCarrinho", middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idUser = Number(req.user.id);
    const { peca } = req.body;
    if (!idUser || !peca) {
        return res.status(404).json({ erro: "token invalido" });
    }
    ;
    try {
        const resp = yield tabelas_2.default.findOne({ where: {
                idUser: idUser,
                peca: peca
            } });
        if (!resp) {
            return res.status(500).json({ erro: "Peça não encontrada" });
        }
        return res.status(200).json({ msg: "item já existe no carrinho" });
    }
    catch (error) {
        return res.status(400).json({ erro: "Carrinho vazio" });
    }
}));
app.post("/buscarCarrinho", middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idUser = Number(req.user.id);
    if (!idUser) {
        return res.status(404).json({ erro: "Token invalido" });
    }
    ;
    try {
        const resp = yield tabelas_2.default.findAll({ where: { idUser: idUser } });
        return res.status(200).json({ msg: resp });
    }
    catch (erro) {
        return res.status(400).json({ erro: "Nenhum item no carrinho" });
    }
}));
app.post("/excluir", middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idUser = Number(req.user.id);
    const { peca } = req.body;
    if (!idUser || idUser === null) {
        return res.status(404).json({ erro: "Token invalido" });
    }
    ;
    try {
        const deletar = yield tabelas_2.default.destroy({ where: { peca: peca, idUser: idUser } });
        return res.status(200).json({ msg: "item apagado" });
    }
    catch (erro) {
        return res.status(400).json({ erro: "item não encontrado" });
    }
}));
app.post("/comprado", middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idUser = Number(req.user.id);
    if (!idUser || idUser === null) {
        return res.status(404).json({ erro: "Token invalido" });
    }
    ;
    try {
        const deletar = yield tabelas_2.default.destroy({ where: { idUser: idUser } });
        return res.status(200).json({ msg: "item apagado" });
    }
    catch (erro) {
        return res.status(400).json({ erro: "item não encontrado" });
    }
}));
//Iniciando o server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
