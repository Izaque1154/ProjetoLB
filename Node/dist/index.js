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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const banco_1 = __importDefault(require("./config/banco"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const cartRoutes_1 = __importDefault(require("./routes/cartRoutes"));
const itens_1 = require("./itens/itens");
const usuario_1 = require("./models/usuario");
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use("/auth", authRoutes_1.default);
app.use("/cart", cartRoutes_1.default);
const port = process.env.PORT;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield banco_1.default.authenticate();
            console.log("Conexao com o banco de dados bem-sucedida!");
            yield banco_1.default.sync({ force: true });
            console.log("Tabelas sincronizadas com sucesso!");
            //usuário admin
            const hash = yield bcrypt_1.default.hash("123456", 10);
            yield usuario_1.User.findOrCreate({ where: { email: "bizin1237@gmail.com" },
                defaults: {
                    nome: "Izaque",
                    email: "bizin1237@gmail.com",
                    telefone: "21998765786",
                    senha: hash,
                    verificado: true,
                    role: "admin"
                }
            });
            yield (0, itens_1.seedProdutos)();
            console.log("Produtos sincronizados com sucesso!");
            app.listen(port, () => {
                console.log(`Servidor rodando na porta ${port}`);
            });
        }
        catch (error) {
            console.log("Erro ao iniciar servidor:", error);
        }
    });
}
startServer();
