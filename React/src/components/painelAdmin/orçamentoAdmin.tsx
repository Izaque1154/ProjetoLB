// Dependências
import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import {
  FiAlertTriangle,
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiEdit2,
  FiEye,
  FiFileText,
  FiFilter,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiMessageSquare,
  FiPhone,
  FiPlus,
  FiSearch,
  FiTool,
  FiUser,
  FiZap,
} from "react-icons/fi";

import api, { apiRoutes } from "../../services/api";
import type {
  OrcamentoItem,
  ServicoResumo,
  SolicitacaoOrcamento,
} from "../../types/orcamentoInterface";
import styles from "../css/cssAdmin/orçamentoAdmin.module.css";
import { useNavigate } from "react-router-dom";

// Tipos
type ActionTone = "warning" | "danger" | "info";

type OrcamentoItemResumo = OrcamentoItem;
type BudgetRow = SolicitacaoOrcamento;

interface PendingAction {
  icon: IconType;
  title: string;
  client: string;
  description: string;
  due: string;
  tone: ActionTone;
}

// Dados de apoio da barra lateral
const pendingActions: PendingAction[] = [
  {
    icon: FiMessageSquare,
    title: "Aguardando resposta do cliente",
    client: "Auto Log Transportes",
    description: "R$ 2.580,00 • Enviado há 1 dia",
    due: "Hoje",
    tone: "warning",
  },
  {
    icon: FiAlertTriangle,
    title: "Informações pendentes",
    client: "Frota Alfa Ltda",
    description: "Dados do veículo incompletos",
    due: "Hoje",
    tone: "danger",
  },
  {
    icon: FiMessageSquare,
    title: "Aguardando resposta do cliente",
    client: "Brasil Cargas Ltda",
    description: "R$ 2.150,00 • Enviado há 2 dias",
    due: "Amanhã",
    tone: "warning",
  },
  {
    icon: FiUser,
    title: "Follow-up devido",
    client: "Éder Carvalho",
    description: "Último contato: 20/05/2025",
    due: "Amanhã",
    tone: "info",
  },
  {
    icon: FiAlertTriangle,
    title: "Informações pendentes",
    client: "Carlos Lima",
    description: "Necessário placa e ano do veículo",
    due: "2 dias",
    tone: "warning",
  },
  {
    icon: FiUser,
    title: "Follow-up devido",
    client: "Juliano Mendes",
    description: "Último contato: 18/05/2025",
    due: "3 dias",
    tone: "info",
  },
];

// Funções auxiliares de apresentação
const NAO_INFORMADO = "Não informado";

function pegarIniciais(nome: string) {
  const nomeNormalizado = nome.trim();

  if (!nomeNormalizado) {
    return "—";
  }

  const nomes = nomeNormalizado.split(/\s+/);

  if (nomes.length === 1) {
    return nomes[0][0].toUpperCase();
  } else {
    return (nomes[0][0] + nomes[nomes.length - 1][0]).toUpperCase();
  }
}

function formatarData(data: string): string {
  const dataFormatada = data.split("T")[0].split("-").reverse().join("/");

  return dataFormatada;
}

function textoOuPlaceholder(valor: string | number | null | undefined): string {
  if (valor === null || valor === undefined || String(valor).trim() === "") {
    return NAO_INFORMADO;
  }

  return String(valor);
}

function converterParaNumero(
  valor: number | string | null | undefined,
): number | null {
  if (typeof valor === "number") {
    return Number.isFinite(valor) ? valor : null;
  }

  if (typeof valor !== "string" || valor.trim() === "") {
    return null;
  }

  const valorNormalizado = valor.includes(",")
    ? valor.replace(/\./g, "").replace(",", ".")
    : valor;
  const numero = Number(valorNormalizado);

  return Number.isFinite(numero) ? numero : null;
}

function formatarMoeda(valor: number | string | null | undefined): string {
  const numero = converterParaNumero(valor);

  if (numero === null) {
    return NAO_INFORMADO;
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numero);
}

function formatarQuilometragem(
  valor: number | string | null | undefined,
): string {
  const numero = converterParaNumero(valor);

  if (numero === null) {
    return NAO_INFORMADO;
  }

  return `${new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 0,
  }).format(numero)} km`;
}

function criarLinkTelefone(telefone: string | null | undefined): string | null {
  if (!telefone) {
    return null;
  }

  const somenteNumeros = telefone.replace(/\D/g, "");

  if (!somenteNumeros) {
    return null;
  }

  const numeroCompleto =
    somenteNumeros.length === 10 || somenteNumeros.length === 11
      ? `55${somenteNumeros}`
      : somenteNumeros;

  return `tel:+${numeroCompleto}`;
}

function obterNomeItem(item: OrcamentoItemResumo): string {
  const referencias = [item.produto?.titulo, item.servico?.nome].filter(
    (nome): nome is string => Boolean(nome?.trim()),
  );

  if (referencias.length > 0) {
    return referencias.join(" + ");
  }

  return textoOuPlaceholder(item.descricao);
}

function obterDescricaoItem(item: OrcamentoItemResumo): string {
  return textoOuPlaceholder(
    item.descricao ?? item.produto?.descricao ?? item.servico?.descricao,
  );
}

function resumirItens(
  itens: OrcamentoItemResumo[] | undefined,
  servicoSolicitado: ServicoResumo | null | undefined,
): string {
  if (!itens?.length) {
    return textoOuPlaceholder(servicoSolicitado?.nome);
  }

  return itens.map(obterNomeItem).join(", ");
}

type CampoMonetarioItem = "subtotal" | "desconto" | "frete" | "valorTotal";

function somarValoresDosItens(
  itens: OrcamentoItemResumo[],
  campo: CampoMonetarioItem,
): number | null {
  const valores = itens
    .map((item) => converterParaNumero(item[campo]))
    .filter((valor): valor is number => valor !== null);

  if (valores.length === 0) {
    return null;
  }

  return valores.reduce((total, valor) => total + valor, 0);
}
//barra status
function pegarPosicao(valor: string | null) {
  if (!valor){
    return 0
  }
  const barraStatus: string[] = ['novo', 'em analise', 'orçamento criado', 'respondido', 'aguardando aprovação', 'aprovado', 'finalizado']

  const posicao = barraStatus.indexOf(valor)
  console.log(posicao)

  return posicao

}

//Componente principal
function OrcamentoAdmin() {
  //useNavigate
  const navigate = useNavigate()

  // Estado
  const [budgetRows, setBudgetRows] = useState<BudgetRow[]>([]);
  const [selecionarOrcamento, setSelecionarOrcamento] =
    useState<BudgetRow | null>(null);
  const [carregandoOrcamentos, setCarregandoOrcamentos] = useState(true);
  const [erroCarregamento, setErroCarregamento] = useState<string | null>(null);

  const clienteSelecionado = selecionarOrcamento?.usuario;
  const orcamentoSelecionado = selecionarOrcamento?.orcamento;
  const itensSelecionados = orcamentoSelecionado?.itens ?? [];
  const primeiroItem = itensSelecionados[0];
  const nomeCliente = textoOuPlaceholder(
    clienteSelecionado?.nome ?? selecionarOrcamento?.usuario.nome,
  );
  const telefoneCliente =
    clienteSelecionado?.telefone ?? selecionarOrcamento?.usuario.telefone;
  const emailCliente = clienteSelecionado?.email;
  const linkTelefone = criarLinkTelefone(telefoneCliente);
  const subtotalItens = somarValoresDosItens(itensSelecionados, "subtotal");
  const descontoItens = somarValoresDosItens(itensSelecionados, "desconto");
  const freteItens = somarValoresDosItens(itensSelecionados, "frete");
  const totalItens =
    converterParaNumero(orcamentoSelecionado?.valorTotal) ??
    somarValoresDosItens(itensSelecionados, "valorTotal");
  const statusTimeline =
    orcamentoSelecionado?.status ?? selecionarOrcamento?.status ?? "novo";

  // Carregamento das solicitações com usuário, serviço e eventual orçamento.
  useEffect(() => {
    let componenteAtivo = true;

    async function carregarOrcamentos() {
      try {
        setErroCarregamento(null);
        const response = await api.get(apiRoutes.solicitacoes.adminLista);
        const orcamentos: BudgetRow[] = Array.isArray(
          response.data.solicitacoes,
        )
          ? response.data.solicitacoes
          : [];

        if (componenteAtivo) {
          setBudgetRows(orcamentos);
          setSelecionarOrcamento(orcamentos[0] ?? null);
        }
      } catch (error) {
        console.error("Erro ao buscar solicitações de orçamento:", error);
        if (componenteAtivo) {
          setErroCarregamento(
            "Não foi possível carregar as solicitações. Verifique sua sessão e tente novamente.",
          );
        }
      } finally {
        if (componenteAtivo) {
          setCarregandoOrcamentos(false);
        }
      }
    }

    carregarOrcamentos();

    return () => {
      componenteAtivo = false;
    };
  }, []);

  if (carregandoOrcamentos) {
    return <section className={styles.panel}>Carregando solicitações...</section>;
  }

  if (erroCarregamento) {
    return <section className={styles.panel}>{erroCarregamento}</section>;
  }

  if (!selecionarOrcamento) {
    return (
      <section className={styles.panel}>Nenhuma solicitação encontrada.</section>
    );
  }

  // Renderização
  return (
    <div className={styles.dashboard_grid}>
      {/* Coluna principal */}
      <div className={styles.main_column}>
        {/* Lista e filtros de solicitações de orçamento */}
        <section
          className={`${styles.panel} ${styles.budget_list}`}
          aria-labelledby="budget-list-title"
        >
          <header className={styles.list_header}>
            <h2 id="budget-list-title">Solicitações de Orçamento</h2>

            <div className={styles.header_actions}>
              <button className={styles.secondary_button} type="button">
                <FiDownload aria-hidden="true" />
                <span>Exportar</span>
              </button>
              <button
                className={styles.primary_button}
                type="button"
                onClick={() =>
                  navigate(
                    `/admin/solicitacoes/${selecionarOrcamento.id}/orcamento`,
                  )
                }
              >
                <FiPlus aria-hidden="true" />
                <span>
                  {orcamentoSelecionado
                    ? "Editar orçamento"
                    : "Montar orçamento"}
                </span>
              </button>
            </div>
          </header>

          <div
            className={styles.filters_bar}
            role="group"
            aria-label="Filtros de solicitações"
          >
            <label className={styles.filter_control} htmlFor="budget-status">
              <span>Status:</span>
              <select id="budget-status" defaultValue="todos">
                <option value="todos">Todos</option>
                <option value="novo">Novo</option>
                <option value="analise">Em análise</option>
                <option value="respondido">Respondido</option>
                <option value="finalizado">Finalizado</option>
              </select>
            </label>

            <label className={styles.filter_control} htmlFor="budget-period">
              <span>Período:</span>
              <select id="budget-period" defaultValue="mes">
                <option value="hoje">Hoje</option>
                <option value="semana">Esta semana</option>
                <option value="mes">Este mês</option>
                <option value="ano">Este ano</option>
              </select>
            </label>

            <label
              className={`${styles.filter_control} ${styles.search_control}`}
              htmlFor="budget-search"
            >
              <FiSearch aria-hidden="true" />
              <span className={styles.visually_hidden}>
                Pesquisar solicitações
              </span>
              <input
                id="budget-search"
                type="search"
                placeholder="Buscar por cliente, veículo ou serviço..."
              />
            </label>

            <button className={styles.filter_button} type="button">
              <FiFilter aria-hidden="true" />
              <span>Filtrar</span>
            </button>
          </div>

          <div className={styles.table_scroll}>
            <table className={styles.budget_table}>
              <thead>
                <tr>
                  <th scope="col">Cliente</th>
                  <th scope="col">Veículo</th>
                  <th scope="col">Serviço / Peça</th>
                  <th scope="col">Status</th>
                  <th scope="col">Data</th>
                  <th scope="col">desc</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {budgetRows.map((budget) => (
                  <tr
                    className={
                      selecionarOrcamento?.id === budget.id ? "bg-primary" : ""
                    }
                    key={budget.id}
                    role="button"
                    onClick={() => setSelecionarOrcamento(budget)}
                  >
                    <td>
                      <div className={styles.client_cell}>
                        <span className={styles.client_avatar}>
                          {pegarIniciais(
                            budget.usuario?.nome ?? budget.usuario.nome ?? "",
                          )}
                        </span>
                        <span>
                          {textoOuPlaceholder(
                            budget.usuario?.nome ?? budget.usuario.nome,
                          )}
                        </span>
                      </div>
                    </td>
                    <td>{textoOuPlaceholder(budget.veiculo)}</td>
                    <td>
                      {resumirItens(budget.orcamento?.itens, budget.servico)}
                    </td>
                    <td>
                      <span
                        className={`${
                          budget.status === "novo"
                            ? "text-primary"
                            : budget.status === "pendente"
                              ? "text-warning"
                              : "text-success"
                        }`}
                      >
                        {budget.status}
                      </span>
                    </td>
                    <td>{formatarData(budget.createdAt)}</td>
                    <td>{budget.descricao}</td>
                    <td>
                      <div className={styles.row_actions}>
                        <button
                          type="button"
                          title="Visualizar solicitação"
                          aria-label={`Visualizar solicitação de ${textoOuPlaceholder(
                            budget.usuario?.nome ?? budget.usuario.nome,
                          )}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            navigate(
                              `/admin/verSolicitacao/${budget.id}`,
                            )}}
                        >
                          <FiEye aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          title={
                            budget.orcamento
                              ? "Editar orçamento"
                              : "Montar orçamento"
                          }
                          aria-label={`${
                            budget.orcamento
                              ? "Editar orçamento"
                              : "Montar orçamento"
                          } de ${textoOuPlaceholder(
                            budget.usuario?.nome ?? budget.usuario.nome,
                          )}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            navigate(
                              `/admin/fazerOrcamento/${budget.id}`,
                            );
                          }}
                        >
                          <FiEdit2 aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <footer className={styles.table_footer}>
            <span>
              {budgetRows.length} {budgetRows.length === 1 ? "solicitação" : "solicitações"}
            </span>

            <nav
              className={styles.pagination}
              aria-label="Paginação de solicitações"
            >
              <button type="button" aria-label="Página anterior">
                <FiChevronLeft aria-hidden="true" />
              </button>
              <button
                className={styles.active_page}
                type="button"
                aria-current="page"
              >
                1
              </button>
              <button type="button">2</button>
              <button type="button">3</button>
              <button type="button">4</button>
              <button type="button">5</button>
              <button type="button" aria-label="Próxima página">
                <FiChevronRight aria-hidden="true" />
              </button>
            </nav>

            <label className={styles.page_size_control} htmlFor="page-size">
              <span className={styles.visually_hidden}>Itens por página</span>
              <select id="page-size" defaultValue="10">
                <option value="10">10 por página</option>
                <option value="25">25 por página</option>
                <option value="50">50 por página</option>
              </select>
            </label>
          </footer>
        </section>

        {/* Detalhes da solicitação selecionada */}
        <section
          className={styles.panel}
          aria-labelledby="budget-details-title"
        >
          <header className={styles.section_header}>
            <div className={styles.section_title}>
              <FiFileText aria-hidden="true" />
              <h2 id="budget-details-title">
                Detalhes da Solicitação Selecionada
              </h2>
            </div>
            <button
              className={styles.icon_button}
              type="button"
              title={
                orcamentoSelecionado ? "Editar orçamento" : "Montar orçamento"
              }
              aria-label={
                orcamentoSelecionado
                  ? "Editar orçamento da solicitação selecionada"
                  : "Montar orçamento da solicitação selecionada"
              }
              onClick={() =>
                navigate(
                  `/admin/fazerOrcamento/${selecionarOrcamento.id}`,
                )
              }
            >
              <FiEdit2 aria-hidden="true" />
            </button>
          </header>

          <div className={styles.details_content}>
            {/* Dados do cliente */}
            <section
              className={styles.detail_column}
              aria-labelledby="client-details-title"
            >
              <div className={styles.client_identity}>
                <span className={styles.detail_avatar}>
                  {pegarIniciais(
                    nomeCliente === NAO_INFORMADO ? "" : nomeCliente,
                  )}
                </span>
                <div>
                  <h3 className={styles.detail_label} id="client-details-title">
                    Cliente
                  </h3>
                  <strong>{nomeCliente}</strong>
                </div>
                <button
                  className={styles.whatsapp_button}
                  type="button"
                  title="Conversar pelo WhatsApp"
                  aria-label={`Conversar com ${nomeCliente} pelo WhatsApp`}
                  disabled={!telefoneCliente}
                >
                  <FiMessageCircle aria-hidden="true" />
                </button>
              </div>

              <dl className={styles.detail_list}>
                <div>
                  <dt>Telefone</dt>
                  <dd>
                    {linkTelefone ? (
                      <a href={linkTelefone}>
                        <FiPhone aria-hidden="true" />
                        {textoOuPlaceholder(telefoneCliente)}
                      </a>
                    ) : (
                      <span>
                        <FiPhone aria-hidden="true" />
                        {NAO_INFORMADO}
                      </span>
                    )}
                  </dd>
                </div>
                <div>
                  <dt>E-mail</dt>
                  <dd>
                    {emailCliente ? (
                      <a href={`mailto:${emailCliente}`}>
                        <FiMail aria-hidden="true" />
                        {emailCliente}
                      </a>
                    ) : (
                      <span>
                        <FiMail aria-hidden="true" />
                        {NAO_INFORMADO}
                      </span>
                    )}
                  </dd>
                </div>
                <div>
                  <dt>Endereço</dt>
                  <dd>
                    <address>
                      <FiMapPin aria-hidden="true" />
                      <span>
                        {textoOuPlaceholder(clienteSelecionado?.endereco)}
                      </span>
                    </address>
                  </dd>
                </div>
              </dl>
            </section>

            {/* Dados do veículo */}
            <section
              className={styles.detail_column}
              aria-labelledby="vehicle-details-title"
            >
              <h3 className={styles.detail_label} id="vehicle-details-title">
                Veículo
              </h3>
              <strong className={styles.detail_title}>
                {textoOuPlaceholder(selecionarOrcamento?.veiculo)}
              </strong>
              <dl className={styles.detail_list}>
                <div>
                  <dt>Placa</dt>
                  <dd>{textoOuPlaceholder(selecionarOrcamento?.placa)}</dd>
                </div>
                <div>
                  <dt>Quilometragem</dt>
                  <dd>
                    {formatarQuilometragem(selecionarOrcamento?.quilometragem)}
                  </dd>
                </div>
                <div>
                  <dt>Chassi</dt>
                  <dd>{textoOuPlaceholder(selecionarOrcamento?.chassi)}</dd>
                </div>
              </dl>
            </section>

            {/* Dados do serviço */}
            <section
              className={styles.detail_column}
              aria-labelledby="service-details-title"
            >
              <h3 className={styles.detail_label} id="service-details-title">
                Serviço / Peça
              </h3>
              <strong className={styles.detail_title}>
                {itensSelecionados.length > 0
                  ? `${itensSelecionados.length} ${
                      itensSelecionados.length === 1
                        ? "item no orçamento"
                        : "itens no orçamento"
                    }`
                  : orcamentoSelecionado
                    ? "Nenhum item adicionado"
                    : "Orçamento ainda não criado"}
              </strong>
              <dl className={styles.detail_list}>
                {primeiroItem ? (
                  <>
                    <div key={primeiroItem.id}>
                      <dt>Primeiro item</dt>
                      <dd>
                        {textoOuPlaceholder(primeiroItem.quantidade)} ×{" "}
                        {obterNomeItem(primeiroItem)}
                      </dd>
                      <dt>Descrição</dt>
                      <dd>{obterDescricaoItem(primeiroItem)}</dd>
                      <dt>Garantia</dt>
                      <dd>
                        {textoOuPlaceholder(
                          primeiroItem.garantia ??
                            primeiroItem.produto?.garantia,
                        )}
                      </dd>
                      <dt>Prazo de entrega</dt>
                      <dd>{textoOuPlaceholder(primeiroItem.prazoEntrega)}</dd>
                      <dt>Valor unitário</dt>
                      <dd>{formatarMoeda(primeiroItem.precoUnitario)}</dd>
                    </div>

                    {itensSelecionados.length > 1 && (
                      <div className={styles.more_items_notice}>
                        <dt aria-hidden="true">•••</dt>
                        <dd>
                          + {itensSelecionados.length - 1}{" "}
                          {itensSelecionados.length - 1 === 1
                            ? "item adicional"
                            : "itens adicionais"}
                        </dd>
                      </div>
                    )}
                  </>
                ) : (
                  <div>
                    <dt>Serviço solicitado</dt>
                    <dd>{textoOuPlaceholder(selecionarOrcamento.servico?.nome)}</dd>
                  </div>
                )}
              </dl>
            </section>

            {/* Valores do orçamento */}
            <section
              className={`${styles.detail_column} ${styles.price_column}`}
              aria-labelledby="price-details-title"
            >
              <h3 className={styles.detail_label} id="price-details-title">
                Orçamento
              </h3>
              <strong className={styles.price_highlight}>
                {formatarMoeda(totalItens)}
              </strong>
              <dl className={styles.price_list}>
                <div>
                  <dt>Subtotal</dt>
                  <dd>{formatarMoeda(subtotalItens)}</dd>
                </div>
                <div>
                  <dt>Desconto</dt>
                  <dd>{formatarMoeda(descontoItens)}</dd>
                </div>
                <div>
                  <dt>Frete</dt>
                  <dd>{formatarMoeda(freteItens)}</dd>
                </div>
                <div className={styles.price_total}>
                  <dt>Total</dt>
                  <dd>{formatarMoeda(totalItens)}</dd>
                </div>
              </dl>
            </section>

            {/* Observações */}
            <section
              className={styles.detail_column}
              aria-labelledby="notes-details-title"
            >
              <h3 className={styles.detail_label} id="notes-details-title">
                Observações
              </h3>
              <p className={styles.observation}>
                {textoOuPlaceholder(
                  orcamentoSelecionado?.respostaAdmin ??
                    orcamentoSelecionado?.observacao ??
                    selecionarOrcamento?.descricao,
                )}
              </p>
            </section>
          </div>

          {/* Histórico de status */}
          <div className={styles.status_history}>
            <h3>Histórico de Status</h3>

            <ol className={styles.status_timeline}>

              {
                pegarPosicao(statusTimeline) > 0 ?
                  <li className={styles.timeline_completed}>
                    <span className={styles.timeline_dot} aria-hidden="true" />
                    <div className={styles.timeline_content}>
                      <strong>Novo</strong>
                      <span>21/05/2025 10:45</span>
                      <small>Orçamento criado</small>
                    </div>
                  </li>
                  : pegarPosicao(statusTimeline) === 0 ?
                  <li className={styles.timeline_pendent}>
                    <span className={styles.timeline_dot} aria-hidden="true" />
                    <div className={styles.timeline_content}>
                      <strong>Novo</strong>
                      <span>21/05/2025 10:45</span>
                      <small>Orçamento criado</small>
                    </div>
                  </li>
                  :
                  <li className={styles.timeline_incomplete}>
                    <span className={styles.timeline_dot} aria-hidden="true" />
                    <div className={styles.timeline_content}>
                      <strong>Novo</strong>
                      <span>21/05/2025 10:45</span>
                      <small>Orçamento criado</small>
                    </div>
                  </li>
              }

              {
                pegarPosicao(statusTimeline) > 1 ?
                  <li className={styles.timeline_completed}>
                    <span className={styles.timeline_dot} aria-hidden="true" />
                    <div className={styles.timeline_content}>
                      <strong>Em análise</strong>
                      <span>21/05/2025 11:20</span>
                      <small>Em avaliação técnica</small>
                    </div>
                  </li>
                : pegarPosicao(statusTimeline) === 1 ?
                  <li className={styles.timeline_pendent}>
                    <span className={styles.timeline_dot} aria-hidden="true" />
                    <div className={styles.timeline_content}>
                      <strong>Em análise</strong>
                      <span>21/05/2025 11:20</span>
                      <small>Em avaliação técnica</small>
                    </div>
                  </li>
                :
                  <li className={styles.timeline_incomplete}>
                    <span className={styles.timeline_dot} aria-hidden="true" />
                    <div className={styles.timeline_content}>
                      <strong>Em análise</strong>
                      <span>21/05/2025 11:20</span>
                      <small>Em avaliação técnica</small>
                    </div>
                  </li>
              }
              {
                pegarPosicao(statusTimeline) > 2 ?
                  <li className={styles.timeline_completed}>
                    <span className={styles.timeline_dot} aria-hidden="true" />
                    <div className={styles.timeline_content}>
                      <strong>Orçamento criado</strong>
                      <span>—</span>
                      <small>Orçamento montado pelo administrador</small>
                    </div>
                  </li>
                : pegarPosicao(statusTimeline) === 2 ?
                  <li className={styles.timeline_pendent}>
                    <span className={styles.timeline_dot} aria-hidden="true" />
                    <div className={styles.timeline_content}>
                      <strong>Orçamento criado</strong>
                      <span>—</span>
                      <small>Orçamento montado pelo administrador</small>
                    </div>
                  </li>
                :
                  <li className={styles.timeline_incomplete}>
                    <span className={styles.timeline_dot} aria-hidden="true" />
                    <div className={styles.timeline_content}>
                      <strong>Orçamento criado</strong>
                      <span>—</span>
                      <small>Orçamento montado pelo administrador</small>
                    </div>
                  </li>
              }
              {
                pegarPosicao(statusTimeline) > 3 ?
                  <li className={styles.timeline_completed}>
                    <span className={styles.timeline_dot} aria-hidden="true" />
                    <div className={styles.timeline_content}>
                      <strong>Respondido</strong>
                      <span>21/05/2025 14:35</span>
                      <small>Resposta enviada ao cliente</small>
                    </div>
                  </li>
                : pegarPosicao(statusTimeline) === 3 ?
                  <li className={styles.timeline_pendent}>
                    <span className={styles.timeline_dot} aria-hidden="true" />
                    <div className={styles.timeline_content}>
                      <strong>Respondido</strong>
                      <span>21/05/2025 14:35</span>
                      <small>Resposta enviada ao cliente</small>
                    </div>
                  </li>
                :
                  <li className={styles.timeline_incomplete}>
                    <span className={styles.timeline_dot} aria-hidden="true" />
                    <div className={styles.timeline_content}>
                      <strong>Respondido</strong>
                      <span>21/05/2025 14:35</span>
                      <small>Resposta enviada ao cliente</small>
                    </div>
                  </li>
              }
              {
                pegarPosicao(statusTimeline) > 4 ?
                  <li className={styles.timeline_completed}>
                    <span className={styles.timeline_dot} aria-hidden="true" />
                    <div className={styles.timeline_content}>
                      <strong>Aguardando aprovação</strong>
                      <span>—</span>
                      <small>Cliente ainda não aprovou</small>
                    </div>
                  </li>
                : pegarPosicao(statusTimeline) === 4 ?
                  <li className={styles.timeline_pendent}>
                    <span className={styles.timeline_dot} aria-hidden="true" />
                    <div className={styles.timeline_content}>
                      <strong>Aguardando aprovação</strong>
                      <span>—</span>
                      <small>Cliente ainda não aprovou</small>
                    </div>
                  </li>
                :
                  <li className={styles.timeline_incomplete}>
                    <span className={styles.timeline_dot} aria-hidden="true" />
                    <div className={styles.timeline_content}>
                      <strong>Aguardando aprovação</strong>
                      <span>—</span>
                      <small>Cliente ainda não aprovou</small>
                    </div>
                  </li>
              }
              {
                pegarPosicao(statusTimeline) > 5 ?
                  <li className={styles.timeline_completed}>
                    <span className={styles.timeline_dot} aria-hidden="true" />
                    <div className={styles.timeline_content}>
                      <strong>Aprovado</strong>
                      <span>—</span>
                      <small>Orçamento aprovado pelo cliente</small>
                    </div>
                  </li>
                : pegarPosicao(statusTimeline) === 5 ?
                  <li className={styles.timeline_pendent}>
                    <span className={styles.timeline_dot} aria-hidden="true" />
                    <div className={styles.timeline_content}>
                      <strong>Aprovado</strong>
                      <span>—</span>
                      <small>Orçamento aprovado pelo cliente</small>
                    </div>
                  </li>
                :
                  <li className={styles.timeline_incomplete}>
                    <span className={styles.timeline_dot} aria-hidden="true" />
                    <div className={styles.timeline_content}>
                      <strong>Aprovado</strong>
                      <span>—</span>
                      <small>Orçamento aprovado pelo cliente</small>
                    </div>
                  </li>
              }
              {
                pegarPosicao(statusTimeline) > 6 ?
                  <li className={styles.timeline_completed}>
                    <span className={styles.timeline_dot} aria-hidden="true" />
                    <div className={styles.timeline_content}>
                      <strong>Finalizado</strong>
                      <span>—</span>
                      <small>Ainda não finalizado</small>
                    </div>
                  </li>
                : pegarPosicao(statusTimeline) === 6 ?
                  <li className={styles.timeline_pendent}>
                    <span className={styles.timeline_dot} aria-hidden="true" />
                    <div className={styles.timeline_content}>
                      <strong>Finalizado</strong>
                      <span>—</span>
                      <small>Ainda não finalizado</small>
                    </div>
                  </li>
                :
                  <li className={styles.timeline_incomplete}>
                    <span className={styles.timeline_dot} aria-hidden="true" />
                    <div className={styles.timeline_content}>
                      <strong>Finalizado</strong>
                      <span>—</span>
                      <small>Ainda não finalizado</small>
                    </div>
                  </li>
              }

            </ol>

          </div>
        </section>
      </div>

      {/* Barra lateral */}
      <aside
        className={styles.side_column}
        aria-label="Ações relacionadas aos orçamentos"
      >
        {/* Ações rápidas */}
        <section className={styles.panel} aria-labelledby="quick-actions-title">
          <header className={styles.side_header}>
            <FiZap aria-hidden="true" />
            <h2 id="quick-actions-title">Ações Rápidas</h2>
          </header>

          <div className={styles.quick_action_list}>
            <button className={styles.quick_action_item} type="button">
              <span className={styles.quick_action_icon}>
                <FiPlus aria-hidden="true" />
              </span>
              <span className={styles.quick_action_text}>
                <strong>Criar novo orçamento</strong>
                <small>Iniciar um novo orçamento</small>
              </span>
              <FiChevronRight
                className={styles.quick_action_arrow}
                aria-hidden="true"
              />
            </button>
            <button className={styles.quick_action_item} type="button">
              <span className={styles.quick_action_icon}>
                <FiMessageSquare aria-hidden="true" />
              </span>
              <span className={styles.quick_action_text}>
                <strong>Responder cliente</strong>
                <small>Enviar resposta ou atualização</small>
              </span>
              <FiChevronRight
                className={styles.quick_action_arrow}
                aria-hidden="true"
              />
            </button>
            <button className={styles.quick_action_item} type="button">
              <span className={styles.quick_action_icon}>
                <FiEdit2 aria-hidden="true" />
              </span>
              <span className={styles.quick_action_text}>
                <strong>Editar orçamento</strong>
                <small>Alterar informações do orçamento</small>
              </span>
              <FiChevronRight
                className={styles.quick_action_arrow}
                aria-hidden="true"
              />
            </button>
            <button className={styles.quick_action_item} type="button">
              <span className={styles.quick_action_icon}>
                <FiDownload aria-hidden="true" />
              </span>
              <span className={styles.quick_action_text}>
                <strong>Exportar lista</strong>
                <small>Exportar orçamentos para Excel</small>
              </span>
              <FiChevronRight
                className={styles.quick_action_arrow}
                aria-hidden="true"
              />
            </button>
          </div>
        </section>

        {/* Pendências */}
        <section className={styles.panel} aria-labelledby="next-actions-title">
          <header className={styles.side_header}>
            <FiTool aria-hidden="true" />
            <h2 id="next-actions-title">Próximas Ações</h2>
            <span className={styles.action_count}>{pendingActions.length}</span>
          </header>

          <div className={styles.pending_list}>
            {pendingActions.map((action) => {
              const ActionIcon = action.icon;
              return (
                <article
                  className={`${styles.pending_item} ${styles[`tone_${action.tone}`]}`}
                  key={`${action.client}-${action.title}`}
                >
                  <ActionIcon
                    className={styles.pending_icon}
                    aria-hidden="true"
                  />
                  <div className={styles.pending_content}>
                    <strong>{action.title}</strong>
                    <span>{action.client}</span>
                    <small>{action.description}</small>
                  </div>
                  <span className={styles.due_badge}>{action.due}</span>
                </article>
              );
            })}
          </div>

          <button className={styles.view_all_button} type="button">
            <span>Ver todas pendências</span>
            <FiChevronRight aria-hidden="true" />
          </button>
        </section>
      </aside>
    </div>
  );
}

export default OrcamentoAdmin;
