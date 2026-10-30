import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const apiRoutes = {
  auth: {
    registrar: "/auth/registrar",
    confirmarEmail: "/auth/confirmarEmail",
    login: "/auth/login",
    esqueceuSenha: "/auth/esqueceuSenha",
    redefinirSenha: "/auth/RedefinirSenha",
    perfil: "/auth/perfil",
    reenviar: "/auth/reenviar",
    admin: "/auth/admin",
  },
  cart: {
    adicionar: "/cart/carrinho",
    item: "/cart/itemCarrinho",
    buscar: "/cart/buscarCarrinho",
    excluir: "/cart/excluir",
    comprar: "/cart/comprar",
    produtos: "/cart/produtos",
  },
  solicitacoes: {
    criar: "/budget/solicitacoes",
    minhas: "/budget/solicitacoes/minhas",
    adminLista: "/budget/admin/solicitacoes",
    adminDetalhe: (id: number | string) =>
      `/budget/admin/solicitacoes/${id}`,
    adminStatus: (id: number | string) =>
      `/budget/admin/solicitacoes/${id}/status`,
    criarOrcamento: (id: number | string) =>
      `/budget/admin/solicitacoes/${id}/orcamento`,
  },
  orcamentos: {
    meus: "/budget/orcamentos/meus",
    detalhe: (id: number | string) => `/budget/orcamentos/${id}`,
    adminDetalhe: (id: number | string) => `/budget/admin/orcamentos/${id}`,
    adminAtualizar: (id: number | string) =>
      `/budget/admin/orcamentos/${id}`,
    adminStatus: (id: number | string) =>
      `/budget/admin/orcamentos/${id}/status`,
     buscarOrcamentoSolicitacao: (id: number | string) => `/budget/admin/orcamentos/solicitacao/${id}`,
  },
  catalogoOrcamento: "/budget/admin/catalogo",
  // Rotas legadas mantidas enquanto outras telas ainda dependem delas.
  budget: {
    enviar: "/budget/orcamento",
    solicitar: "/budget/solicitar",
    buscar: "/budget/buscarOrcamentos",
    excluir: "/budget/excluir",
    atualizar: "/budget/atualizar",
    servico: "/budget/servico",
    buscarCliente: "/budget/buscarCilente",
  },
};

export default api;
