export type DecimalValue = number | string;

export type SolicitacaoStatus =
  | "novo"
  | "em analise"
  | "respondido"
  | "aguardando resposta"
  | "finalizado";

export type OrcamentoStatus =
  | "novo"
  | "em analise"
  | "respondido"
  | "aguardando resposta"
  | "finalizado";

export interface UsuarioResumo {
  nome: string;
  email: string;
  telefone?: string | null;
  endereco?: string | null;
}

export interface ServicoResumo {
  id: number;
  nome: string;
  descricao?: string | null;
  precoBase?: DecimalValue | null;
}

export interface ProdutoResumo {
  id: number;
  titulo: string;
  descricao?: string | null;
  garantia?: string | null;
  preco?: DecimalValue | null;
}

export interface OrcamentoItem {
  id?: number;
  orcamentoId?: number;
  produtoId: number | null;
  servicoId: number | null;
  quantidade: number;
  precoUnitario: DecimalValue;
  descricao?: string | null;
  observacao?: string | null;
  produto?: ProdutoResumo | null;
  servico?: ServicoResumo | null;
}

export interface Orcamento {
  id: number;
  solicitacaoId: number;
  usuarioId: number;
  veiculo?: string | null;
  placa?: string | null;
  chassi?: string | null;
  quilometragem?: DecimalValue | null;
  status: OrcamentoStatus | string;
  respostaAdmin?: string | null;
  observacao?: string | null;
  valorTotal?: DecimalValue | null;
  garantia?: string | null;
  prazoEntrega?: string | null;
  subtotal?: DecimalValue | null;
  desconto?: DecimalValue | null;
  frete?: DecimalValue | null;
  createdAt: string;
  updatedAt: string;
  itens?: OrcamentoItem[];
}

export interface SolicitacaoOrcamento {
  id: number;
  usuarioId: number;
  orcamentoId?: number | null;
  nome: string;
  veiculo: string;
  placa?: string | null;
  chassi?: string | null;
  quilometragem?: DecimalValue | null;
  descricao: string;
  foto?: string[] | null | undefined;
  servicoId?: number | null;
  urgencia?: string | null;
  status: SolicitacaoStatus | string;
  createdAt: string;
  updatedAt: string;
  usuario: UsuarioResumo;
  servico?: ServicoResumo | null;
  orcamento?: Orcamento | null;
}

export interface CatalogoOrcamento {
  produtos: ProdutoResumo[];
  servicos: ServicoResumo[];
}

export interface OrcamentoItemInput {
  id?: number;
  produtoId: number | null;
  servicoId: number | null;
  quantidade: number;
  precoUnitario: number;
  descricao?: string | null;
  observacao?: string | null;
  garantia?: string | null;
  prazoEntrega?: string | null;
  desconto?: number;
  frete?: number;
}

export interface SalvarOrcamentoInput {
  veiculo?: string | null;
  placa?: string | null;
  chassi?: string | null;
  quilometragem?: number | null;
  respostaAdmin?: string | null;
  observacao?: string | null;
  garantia?: string | null;
  prazoEntrega?: string | null;
  subtotal?: DecimalValue | null;
  desconto?: DecimalValue | null;
  frete?: DecimalValue | null;
  valorTotal?: DecimalValue | null;
  itens: OrcamentoItemInput[];
}
