export const ORCAMENTO_STATUS = [
    "novo",
    "em analise",
    "respondido",
    "aguardando resposta",
    "finalizado"
] as const;

export type OrcamentoStatus = (typeof ORCAMENTO_STATUS)[number];

export interface OrcamentoItemInput {
    produtoId?: number | null;
    servicoId?: number | null;
    quantidade: number;
    precoUnitario: number;
    descricao?: string | null;
    garantia?: string | null;
    prazoEntrega?: string | null;
    desconto?: number;
    frete?: number;
}

