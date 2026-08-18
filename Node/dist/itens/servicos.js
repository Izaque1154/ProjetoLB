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
exports.servicosIniciais = void 0;
exports.seedServicos = seedServicos;
const servicos_1 = __importDefault(require("../models/servicos"));
exports.servicosIniciais = [
    {
        nome: "Manutenção de cardan",
        descricao: "Inspeção e manutenção preventiva ou corretiva do conjunto do cardan, incluindo análise de folgas, cruzetas, luvas e fixações.",
        precoBase: null,
        ativo: true
    },
    {
        nome: "Balanceamento de cardan",
        descricao: "Balanceamento do eixo cardan para reduzir vibrações, ruídos e desgaste prematuro dos componentes da transmissão.",
        precoBase: null,
        ativo: true
    },
    {
        nome: "Usinagem de peças",
        descricao: "Usinagem, ajuste dimensional e recuperação de componentes conforme a avaliação técnica da peça.",
        precoBase: null,
        ativo: true
    },
    {
        nome: "Reparo de componentes",
        descricao: "Reparo ou substituição de componentes danificados do cardan e de peças relacionadas ao sistema de transmissão.",
        precoBase: null,
        ativo: true
    },
    {
        nome: "Outro serviço",
        descricao: "Avaliação técnica para solicitações que não se enquadram nos serviços previamente listados.",
        precoBase: null,
        ativo: true
    }
];
function seedServicos() {
    return __awaiter(this, void 0, void 0, function* () {
        for (const dadosServico of exports.servicosIniciais) {
            const [servico, criado] = yield servicos_1.default.findOrCreate({
                where: { nome: dadosServico.nome },
                defaults: dadosServico
            });
            if (!criado) {
                yield servico.update({
                    descricao: dadosServico.descricao,
                    precoBase: dadosServico.precoBase,
                    ativo: dadosServico.ativo
                });
            }
        }
    });
}
