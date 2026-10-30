import crypto from "crypto";
import fs from "fs/promises";
import path from "path";
import { Request, Response } from "express";
import sequelize from "../config/banco";
import Orcamento from "../models/orcamentos";
import OrcamentoIten from "../models/orcamentoItens";
import { produtos as Produto } from "../models/produtos";
import Servico from "../models/servicos";
import SolicitacaoOrcamento from "../models/solicitacaoOrcamento";
import { User } from "../models/usuario";
import { OrcamentoItemInput, OrcamentoStatus } from "../types/budget";

const DIRETORIO_FOTOS = path.resolve(
    process.cwd(),
    "uploads",
    "solicitacoes-orcamento"
);
const URL_FOTOS = "/uploads/solicitacoes-orcamento";

class ControllerError extends Error {
    constructor(public readonly status: number, message: string) {
        super(message);
    }
}

const obterUsuarioId = (req: Request): number => {
    if (!req.user?.id) {
        throw new ControllerError(401, "Usuário não autenticado");
    }

    return req.user.id;
};

const obterIdParametro = (req: Request): number => Number(req.params.id);

const mensagemErro = (error: unknown): string => (
    error instanceof Error ? error.message : "Erro desconhecido"
);

const responderErro = (
    res: Response,
    error: unknown,
    mensagemPadrao: string
): void => {
    if (error instanceof ControllerError) {
        res.status(error.status).json({ message: error.message });
        return;
    }

    const nomeErro = typeof error === "object" && error !== null && "name" in error
        ? String(error.name)
        : "";

    if (nomeErro === "SequelizeUniqueConstraintError") {
        res.status(409).json({ message: "Já existe um orçamento para esta solicitação" });
        return;
    }

    if (
        nomeErro === "SequelizeForeignKeyConstraintError" ||
        nomeErro === "SequelizeValidationError"
    ) {
        res.status(400).json({ message: "Dados relacionados inválidos", error: mensagemErro(error) });
        return;
    }

    console.error(mensagemPadrao, error);
    res.status(500).json({ message: mensagemPadrao });
};

const salvarFoto = async (fotos?: Express.Multer.File[]): Promise<string[] | null> => {
    if (!fotos) {
        return null;
    }
    const fotoCaminho: string[] = [];

    for (const foto of fotos) {
        await fs.mkdir(DIRETORIO_FOTOS, { recursive: true });

        const extensao = path.extname(foto.originalname).toLowerCase();
        const nomeArquivo = `${Date.now()}_${crypto.randomUUID()}${extensao}`;
        const caminhoArquivo = path.join(DIRETORIO_FOTOS, nomeArquivo);

        await fs.writeFile(caminhoArquivo, foto.buffer);
        fotoCaminho.push(`${URL_FOTOS}/${nomeArquivo}`);
    }
    return fotoCaminho;
};

const removerFoto = async (caminhoPublico: string | null): Promise<void> => {
    if (!caminhoPublico) {
        return;
    }

    const nomeArquivo = path.basename(caminhoPublico);
    await fs.unlink(path.join(DIRETORIO_FOTOS, nomeArquivo)).catch(() => undefined);
};

const incluirItens = () => [
    {
        model: Produto,
        as: "produto",
        required: false
    },
    {
        model: Servico,
        as: "servico",
        required: false
    }
];

const incluirSolicitacao = () => [
    {
        model: User,
        as: "usuario",
        attributes: ["id", "nome", "email", "telefone", "endereco"]
    },
    {
        model: Servico,
        as: "servico",
        required: false,
        attributes: ["id", "nome", "descricao", "precoBase", "ativo"]
    },
    {
        model: Orcamento,
        as: "orcamento",
        required: false,
        include: [
            {
                model: OrcamentoIten,
                as: "itens",
                include: incluirItens()
            }
        ]
    }
];

const incluirOrcamento = () => [
    {
        model: SolicitacaoOrcamento,
        as: "solicitacao",
        include: [
            {
                model: Servico,
                as: "servico",
                required: false,
                attributes: ["id", "nome", "descricao", "precoBase", "ativo"]
            }
        ]
    },
    {
        model: User,
        as: "usuario",
        attributes: ["id", "nome", "email", "telefone", "endereco"]
    },
    {
        model: OrcamentoIten,
        as: "itens",
        include: incluirItens()
    }
];

const normalizarItem = (item: OrcamentoItemInput) => ({
    produtoId: item.produtoId ?? null,
    servicoId: item.servicoId ?? null,
    quantidade: Number(item.quantidade),
    precoUnitario: Number(item.precoUnitario),
    descricao: item.descricao ?? null,
    garantia: item.garantia ?? null,
    prazoEntrega: item.prazoEntrega ?? null,
    desconto: Number(item.desconto ?? 0),
    frete: Number(item.frete ?? 0)
});

const calcularTotal = (itens: OrcamentoItemInput[]): number => {
    const total = itens.reduce((soma, item) => {
        const subtotal = Number(item.quantidade) * Number(item.precoUnitario);
        return soma + subtotal - Number(item.desconto ?? 0) + Number(item.frete ?? 0);
    }, 0);

    return Number(total.toFixed(2));
};

const buscarOrcamentoCompleto = async (id: number): Promise<Orcamento | null> => (
    Orcamento.findByPk(id, { include: incluirOrcamento() })
);

// Cliente cria uma solicitação; o orçamento verdadeiro só será criado pelo admin.
export const criarSolicitacao = async (req: Request, res: Response): Promise<void> => {
    console.log("verificando se o codigo chega aqui")
    let fotos: string[] | null = null;

    try {
        const usuarioId = obterUsuarioId(req);
        fotos = await salvarFoto(req.files as Express.Multer.File[]);

        const solicitacao = await SolicitacaoOrcamento.create({
            usuarioId,
            servicoId: req.body.servicoId ?? null,
            nome: req.body.nome,
            veiculo: req.body.veiculo,
            placa: req.body.placa ?? null,
            chassi: req.body.chassi ?? null,
            quilometragem: req.body.quilometragem ?? null,
            descricao: req.body.descricao,
            urgencia: req.body.urgencia ?? null,
            foto: fotos,
            status: "novo"
        });

        res.status(201).json({ solicitacao });
    } catch (error) {

        if (!fotos) {
            responderErro(res, error, "Erro ao criar solicitação de orçamento");
            return;
        }
        for (const foto of fotos) {
            await removerFoto(foto);
            responderErro(res, error, "Erro ao criar solicitação de orçamento");
        }
    }
};

export const buscarMinhasSolicitacoes = async (req: Request, res: Response): Promise<void> => {
    try {
        const usuarioId = obterUsuarioId(req);
        const solicitacoes = await SolicitacaoOrcamento.findAll({
            where: { usuarioId },
            include: incluirSolicitacao(),
            order: [["createdAt", "DESC"]]
        });

        res.status(200).json({ solicitacoes });
    } catch (error) {
        responderErro(res, error, "Erro ao buscar suas solicitações");
    }
};

export const buscarMinhaSolicitacaoPorId = async (req: Request, res: Response): Promise<void> => {
    try {
        const usuarioId = obterUsuarioId(req);
        const solicitacao = await SolicitacaoOrcamento.findOne({
            where: { id: obterIdParametro(req), usuarioId },
            include: incluirSolicitacao()
        });

        if (!solicitacao) {
            throw new ControllerError(404, "Solicitação não encontrada");
        }

        res.status(200).json({ solicitacao });
    } catch (error) {
        responderErro(res, error, "Erro ao buscar solicitação");
    }
};

export const buscarSolicitacoesAdmin = async (_req: Request, res: Response): Promise<void> => {
    try {
        const solicitacoes = await SolicitacaoOrcamento.findAll({
            include: incluirSolicitacao(),
            order: [["createdAt", "DESC"]]
        });

        res.status(200).json({ solicitacoes });
    } catch (error) {
        responderErro(res, error, "Erro ao buscar solicitações");
    }
};

export const buscarSolicitacaoAdminPorId = async (req: Request, res: Response): Promise<void> => {
    try {
        const solicitacao = await SolicitacaoOrcamento.findByPk(obterIdParametro(req), {
            include: [{
                model: User,
                as: 'usuario',
                attributes: ['email', 'telefone', 'endereco']
            },
        {
            model: Servico,
            as: 'servico',
            attributes: ['id', 'nome']
        }]
        });

        if (!solicitacao) {
            throw new ControllerError(404, "Solicitação não encontrada");
        }
        console.log("Solicitação encontrada:", solicitacao);

        res.status(200).json({ solicitacao });
    } catch (error) {
        responderErro(res, error, "Erro ao buscar solicitação");
    }
};

export const atualizarStatusSolicitacao = async (req: Request, res: Response): Promise<void> => {
    try {
        const solicitacao = await SolicitacaoOrcamento.findByPk(obterIdParametro(req));

        if (!solicitacao) {
            throw new ControllerError(404, "Solicitação não encontrada");
        }

        await solicitacao.update({ status: req.body.status as OrcamentoStatus });
        const atualizada = await SolicitacaoOrcamento.findByPk(solicitacao.id, {
            include: incluirSolicitacao()
        });

        res.status(200).json({ solicitacao: atualizada });
    } catch (error) {
        responderErro(res, error, "Erro ao atualizar status da solicitação");
    }
};

export const criarOrcamentoDaSolicitacao = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log(req.body);
        const solicitacaoId = obterIdParametro(req);
        const itens = req.body.itens as OrcamentoItemInput[];

        const orcamentoId = await sequelize.transaction(async (transaction) => {
            const solicitacao = await SolicitacaoOrcamento.findByPk(solicitacaoId, {
                transaction,
                lock: transaction.LOCK.UPDATE
            });

            if (!solicitacao) {
                throw new ControllerError(404, "Solicitação não encontrada");
            }

            const existente = await Orcamento.findOne({
                where: { solicitacaoId },
                transaction
            });

            if (existente) {
                throw new ControllerError(409, "Esta solicitação já possui um orçamento");
            }

            const status = (req.body.status ?? "em analise") as OrcamentoStatus;

            const orcamento = await Orcamento.create({
                solicitacaoId,
                usuarioId: solicitacao.usuarioId,
                respostaAdmin: req.body.respostaAdmin ?? null,
                quilometragem: req.body.quilometragem ?? null,
                veiculo: req.body.veiculo ?? null,
                placa: req.body.placa ?? null,
                chassi: req.body.chassi ?? null,
                valorTotal: calcularTotal(itens)
            }, { transaction });

            if (itens.length > 0) {
                await OrcamentoIten.bulkCreate(
                    itens.map((item) => ({
                        orcamentoId: orcamento.id,
                        ...normalizarItem(item)
                    })),
                    { transaction }
                );
            }

            await solicitacao.update({ status }, { transaction });
            return orcamento.id;
        });

        const orcamento = await buscarOrcamentoCompleto(orcamentoId);
        res.status(201).json({ orcamento });
    } catch (error) {
        responderErro(res, error, "Erro ao criar orçamento");
    }
};

export const buscarMeusOrcamentos = async (req: Request, res: Response): Promise<void> => {
    try {
        const usuarioId = obterUsuarioId(req);
        const orcamentos = await Orcamento.findAll({
            where: { usuarioId },
            include: incluirOrcamento(),
            order: [["createdAt", "DESC"]]
        });

        res.status(200).json({ orcamentos });
    } catch (error) {
        responderErro(res, error, "Erro ao buscar seus orçamentos");
    }
};

export const buscarMeuOrcamentoPorId = async (req: Request, res: Response): Promise<void> => {
    try {
        const usuarioId = obterUsuarioId(req);
        const orcamento = await Orcamento.findOne({
            where: { id: obterIdParametro(req), usuarioId },
            include: incluirOrcamento()
        });

        if (!orcamento) {
            throw new ControllerError(404, "Orçamento não encontrado");
        }

        res.status(200).json({ orcamento });
    } catch (error) {
        responderErro(res, error, "Erro ao buscar orçamento");
    }
};

export const buscarOrcamentosAdmin = async (_req: Request, res: Response): Promise<void> => {
    try {
        const orcamentos = await Orcamento.findAll({
            include: incluirOrcamento(),
            order: [["createdAt", "DESC"]]
        });

        res.status(200).json({ orcamentos });
    } catch (error) {
        responderErro(res, error, "Erro ao buscar orçamentos");
    }
};

export const buscarOrcamentoAdminPorId = async (req: Request, res: Response): Promise<void> => {
    try {
        const orcamento = await buscarOrcamentoCompleto(obterIdParametro(req));

        if (!orcamento) {
            throw new ControllerError(404, "Orçamento não encontrado");
        }

        res.status(200).json({ orcamento });
    } catch (error) {
        responderErro(res, error, "Erro ao buscar orçamento");
    }
};

export const atualizarOrcamentoAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = obterIdParametro(req);

        await sequelize.transaction(async (transaction) => {
            const orcamento = await Orcamento.findByPk(id, {
                transaction,
                lock: transaction.LOCK.UPDATE
            });

            if (!orcamento) {
                throw new ControllerError(404, "Orçamento não encontrado");
            }

            const alteracoes: {
                respostaAdmin?: string | null;
                validade?: string | null;
                quilometragem?: number | null;
                valorTotal?: number;
            } = {};

            if (req.body.respostaAdmin !== undefined) {
                alteracoes.respostaAdmin = req.body.respostaAdmin;
            }
            if (req.body.validade !== undefined) {
                alteracoes.validade = req.body.validade;
            }

            if (req.body.itens !== undefined) {
                const itens = req.body.itens as OrcamentoItemInput[];
                await OrcamentoIten.destroy({ where: { orcamentoId: id }, transaction });

                if (itens.length > 0) {
                    await OrcamentoIten.bulkCreate(
                        itens.map((item) => ({
                            orcamentoId: id,
                            ...normalizarItem(item)
                        })),
                        { transaction }
                    );
                }

                alteracoes.valorTotal = calcularTotal(itens);
            }

            await orcamento.update(alteracoes, { transaction });
        });

        const orcamento = await buscarOrcamentoCompleto(id);
        res.status(200).json({ orcamento });
    } catch (error) {
        responderErro(res, error, "Erro ao atualizar orçamento");
    }
};

export const buscarCatalogoAdmin = async (_req: Request, res: Response): Promise<void> => {
    try {
        const [produtos, servicos] = await Promise.all([
            Produto.findAll({ order: [["titulo", "ASC"]] }),
            Servico.findAll({ where: { ativo: true }, order: [["nome", "ASC"]] })
        ]);

        res.status(200).json({ produtos, servicos });
    } catch (error) {
        responderErro(res, error, "Erro ao buscar catálogo");
    }
};

// Endpoints antigos preservados para não quebrar telas ainda não migradas.
export const criarOrcamento = criarSolicitacao;
export const buscarOrcamentos = buscarSolicitacoesAdmin;

export const servico = async (req: Request, res: Response): Promise<void> => {
    try {
        const servicoEncontrado = await Servico.findByPk(req.body.id);
        res.status(200).json({ servico: servicoEncontrado });
    } catch (error) {
        responderErro(res, error, "Erro ao buscar serviço");
    }
};

export const buscarCliente = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.body?.id;

        if (id === undefined || id === null) {
            throw new ControllerError(400, "ID do usuário não informado");
        }

        const usuario = await User.findByPk(id, {
            attributes: ["id", "nome", "email", "telefone", "endereco"]
        });

        if (!usuario) {
            throw new ControllerError(404, "Usuário não encontrado");
        }

        res.status(200).json({ usuario });
    } catch (error) {
        responderErro(res, error, "Erro ao buscar usuário");
    }
};

//Faz a busca do orçamento pelo id da solicitação, caso exista, e retorna o orçamento encontrado.

export const buscarOrcamentoPorSolicitacao = async (req: Request, res: Response): Promise<void> => {
    const idSolicitacao = Number(req.params.id);
    console.log("ID da solicitação recebida:", idSolicitacao);

    try {
        const orcamento = await Orcamento.findOne({
            where: { solicitacaoId: idSolicitacao },
            include: incluirOrcamento()
        });

        if (!orcamento) {
            throw new ControllerError(404, "Orçamento não encontrado para a solicitação informada");
        }

        res.status(200).json({ orcamento });
    } catch (error) {
        responderErro(res, error, "Erro ao buscar orçamento pela solicitação");
    }
};

