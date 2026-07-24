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
exports.validateRegister = void 0;
const zod_1 = require("zod");
const registerSchema = zod_1.z.object({
    nome: zod_1.z.string().min(2).max(100),
    email: zod_1.z.email(),
    telefone: zod_1.z.string().min(10).max(15),
    senha: zod_1.z.string().min(6),
    confirmar: zod_1.z.string().min(6)
});
const validateRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        registerSchema.parse(req.body);
    }
    catch (error) {
        return res.status(400).json({ msg: "Houve um erro de validação", detalhes: error });
    }
    next();
});
exports.validateRegister = validateRegister;
