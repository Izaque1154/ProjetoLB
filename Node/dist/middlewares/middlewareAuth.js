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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const usuario_1 = require("../models/usuario");
dotenv_1.default.config();
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
            res.status(401).json({ erro: "Token expirado" });
        }
    });
}
function middlewareAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ erro: "Token Expirado" });
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET);
            req.user = decoded;
            const resp = yield usuario_1.User.findByPk(req.user.id);
            const status = resp === null || resp === void 0 ? void 0 : resp.role;
            if (status == "admin") {
                next();
            }
            else {
                return res.status(403).json({ erro: "Bloqueado" });
            }
        }
        catch (erro) {
            res.status(401).json({ erro: "Token Inválido" });
        }
    });
}
exports.default = { middleware, middlewareAdmin };
