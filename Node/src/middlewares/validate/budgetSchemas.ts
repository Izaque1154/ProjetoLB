import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { ORCAMENTO_STATUS } from "../../types/budget";

const textoOpcional = (maximo: number) => z.preprocess(
    (valor) => typeof valor === "string" && valor.trim() === "" ? null : valor,
    z.string().trim().max(maximo).nullable().optional()
);

const inteiroOpcional = z.preprocess(
    (valor) => valor === "" || valor === undefined || valor === null ? null : valor,
    z.coerce.number().int().min(0).nullable().optional()
);

const servicoIdOpcional = z.preprocess(
    (valor) => valor === "" || valor === undefined || valor === null ? null : valor,
    z.coerce.number().int().positive().nullable().optional()
);

const moeda = z.coerce.number().finite().min(0).max(99_999_999.99);

export const criarSolicitacaoSchema = z.object({
    servicoId: servicoIdOpcional,
    nome: z.string().trim().min(2).max(100),
    veiculo: z.string().trim().min(2).max(150),
    placa: textoOpcional(20),
    chassi: textoOpcional(50),
    quilometragem: inteiroOpcional,
    descricao: z.string().trim().min(5).max(5_000),
    urgencia: textoOpcional(50)
});

export const statusSchema = z.object({
    status: z.enum(ORCAMENTO_STATUS)
});

export const orcamentoItemSchema = z.object({
    id: z.coerce.number().int().positive().optional(),
    produtoId: z.preprocess(
        (valor) => valor === "" || valor === undefined || valor === null ? null : valor,
        z.coerce.number().int().min(0).nullable().optional()
    ),
    servicoId: servicoIdOpcional,
    quantidade: z.coerce.number().int().positive().max(100_000),
    precoUnitario: moeda,
    descricao: textoOpcional(1_000),
    garantia: textoOpcional(100),
    prazoEntrega: textoOpcional(100),
    desconto: moeda.optional().default(0),
    frete: moeda.optional().default(0)
}).superRefine((item, contexto) => {
    if (item.produtoId === null || item.produtoId === undefined) {
        if (item.servicoId === null || item.servicoId === undefined) {
            contexto.addIssue({
                code: "custom",
                message: "Informe produtoId ou servicoId",
                path: ["produtoId"]
            });
        }
    }

    const subtotalComFrete = item.quantidade * item.precoUnitario + item.frete;
    if (item.desconto > subtotalComFrete) {
        contexto.addIssue({
            code: "custom",
            message: "O desconto não pode deixar o item com valor negativo",
            path: ["desconto"]
        });
    }
});

const validadeSchema = z.preprocess(
    (valor) => valor === "" || valor === undefined ? null : valor,
    z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use validade no formato YYYY-MM-DD").nullable().optional()
);

export const criarOrcamentoSchema = z.object({
    status: z.enum(ORCAMENTO_STATUS).optional(),
    respostaAdmin: textoOpcional(5_000),
    validade: validadeSchema,
    itens: z.array(orcamentoItemSchema).max(500).optional().default([])
});

export const atualizarOrcamentoSchema = z.object({
    respostaAdmin: textoOpcional(5_000),
    validade: validadeSchema,
    itens: z.array(orcamentoItemSchema).max(500).optional()
}).refine(
    (dados) => dados.respostaAdmin !== undefined || dados.validade !== undefined || dados.itens !== undefined,
    { message: "Informe ao menos um campo para atualizar" }
);

const idParamSchema = z.object({
    id: z.coerce.number().int().positive()
});

const validarCorpo = (schema: z.ZodType) => (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const resultado = schema.safeParse(req.body);

    if (!resultado.success) {
        res.status(400).json({
            message: "Dados inválidos",
            detalhes: resultado.error.issues
        });
        return;
    }

    req.body = resultado.data;
    next();
};

export const validarIdParametro = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const resultado = idParamSchema.safeParse(req.params);

    if (!resultado.success) {
        res.status(400).json({
            message: "ID inválido",
            detalhes: resultado.error.issues
        });
        return;
    }

    next();
};

export const validarCriacaoSolicitacao = validarCorpo(criarSolicitacaoSchema);
export const validarAtualizacaoStatus = validarCorpo(statusSchema);
export const validarCriacaoOrcamento = validarCorpo(criarOrcamentoSchema);
export const validarAtualizacaoOrcamento = validarCorpo(atualizarOrcamentoSchema);

