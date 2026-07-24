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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRedefinirSenha = void 0;
const zod_1 = require("zod");
const redefinirSenhaSchema = zod_1.z.object({
    senha: zod_1.z.string().min(6),
    confirmSenha: zod_1.z.string().min(6),
    token: zod_1.z.string()
});
const validateRedefinirSenha = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        redefinirSenhaSchema.parse(req.body);
    }
    catch (error) {
        return res.status(400).json({ erro: error });
    }
    next();
});
exports.validateRedefinirSenha = validateRedefinirSenha;
