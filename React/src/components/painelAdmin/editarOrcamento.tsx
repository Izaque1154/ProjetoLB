import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FiCalendar,
  FiChevronDown,
  FiClock,
  FiDollarSign,
  FiFileText,
  FiHash,
  FiMail,
  FiMapPin,
  FiPackage,
  FiPhone,
  FiPlus,
  FiRefreshCw,
  FiSave,
  FiShield,
  FiTag,
  FiTool,
  FiTrash2,
  FiTruck,
  FiUser,
  FiX,
} from "react-icons/fi";

import api, { apiRoutes } from "../../services/api";
import type {
  CatalogoOrcamento,
  OrcamentoItem,
  OrcamentoItemInput,
  SalvarOrcamentoInput,
  SolicitacaoOrcamento,
} from "../../types/orcamentoInterface";
import styles from "../css/cssAdmin/editarOrcamento.module.css";

interface ItemEditavel {
  chave: string;
  id?: number;
  produtoId: number | null;
  servicoId: number | null;
  quantidade: number;
  precoUnitario: string;
  descricao: string;
  observacao: string;
}

const STATUS_ORCAMENTO = [
  "novo",
  "em analise",
  'Orçamento Criado',
  "respondido",
  "aguardando aprovação",
  "aprovado",
  "finalizado",
] as const;

function criarChaveItem() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function converterNumero(valor: number | string | null | undefined): number {
  if (typeof valor === "number") {
    return Number.isFinite(valor) ? valor : 0;
  }

  if (!valor) return 0;

  const normalizado = valor.includes(",")
    ? valor.replace(/\./g, "").replace(",", ".")
    : valor;
  const numero = Number(normalizado);

  return Number.isFinite(numero) ? numero : 0;
}

function formatarMoeda(valor: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

function formatarDataInput(valor?: string | null): string {
  return valor ? valor.slice(0, 10) : "";
}

function formatarDataHoraInput(valor?: string | null): string {
  return valor ? valor.slice(0, 16) : "";
}

function itemVazio(): ItemEditavel {
  return {
    chave: criarChaveItem(),
    produtoId: null,
    servicoId: null,
    quantidade: 1,
    precoUnitario: "0",
    descricao: "",
    observacao: "",
  };
}

function normalizarItem(item: OrcamentoItem): ItemEditavel {
  return {
    chave: item.id ? `item-${item.id}` : criarChaveItem(),
    id: item.id,
    produtoId: item.produtoId,
    servicoId: item.servicoId,
    quantidade: Math.max(1, Number(item.quantidade) || 1),
    precoUnitario: String(item.precoUnitario ?? 0),
    descricao:
      item.descricao ??
      item.observacao ??
      item.produto?.descricao ??
      item.servico?.descricao ??
      "",
    observacao: item.observacao ?? "",
  };
}

function EditarOrcamento() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [solicitacao, setSolicitacao] =
    useState<SolicitacaoOrcamento | null>(null);
  const [catalogo, setCatalogo] = useState<CatalogoOrcamento>({
    produtos: [],
    servicos: [],
  });
  const [itens, setItens] = useState<ItemEditavel[]>([]);
  const [veiculo, setVeiculo] = useState("");
  const [placa, setPlaca] = useState("");
  const [chassi, setChassi] = useState("");
  const [quilometragem, setQuilometragem] = useState("");
  const [status, setStatus] = useState("respondido");
  const[statusOrcamento, setStatusOrcamento] = useState("");
  const [respostaAdmin, setRespostaAdmin] = useState("");
  const [garantia, setGarantia] = useState("");
  const [prazoEntrega, setPrazoEntrega] = useState("");
  const [desconto, setDesconto] = useState("0");
  const [frete, setFrete] = useState("0");
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [feedback, setFeedback] = useState<{
    tipo: "sucesso" | "erro";
    texto: string;
  } | null>(null);

  useEffect(() => {
    let componenteAtivo = true;

    console.log('id: ', id);

    async function carregarDados() {
      if (!id) {
        setFeedback({ tipo: "erro", texto: "Solicitação não identificada." });
        setCarregando(false);
        return;
      }

      try {
        const [respostaSolicitacao, respostaCatalogo] = await Promise.all([
          api.get(apiRoutes.solicitacoes.adminDetalhe(id)),
          api.get(apiRoutes.catalogoOrcamento),
        ]);

        if (!componenteAtivo) return;

        const solicitacaoRecebida = (respostaSolicitacao.data.solicitacao ??
          respostaSolicitacao.data) as SolicitacaoOrcamento;
        const catalogoRecebido = (respostaCatalogo.data.catalogo ??
          respostaCatalogo.data) as Partial<CatalogoOrcamento>;
        const orcamento = solicitacaoRecebida.orcamento;
        const itensRecebidos = orcamento?.itens ?? [];
        console.log("Solicitação recebida:", respostaSolicitacao);

        setSolicitacao(solicitacaoRecebida);
        setCatalogo({
          produtos: Array.isArray(catalogoRecebido.produtos)
            ? catalogoRecebido.produtos
            : [],
          servicos: Array.isArray(catalogoRecebido.servicos)
            ? catalogoRecebido.servicos
            : [],
        });
        setItens(
          itensRecebidos.length > 0
            ? itensRecebidos.map(normalizarItem)
            : [itemVazio()],
        );
        setVeiculo(orcamento?.veiculo ?? solicitacaoRecebida.veiculo ?? "");
        setPlaca(orcamento?.placa ?? solicitacaoRecebida.placa ?? "");
        setChassi(orcamento?.chassi ?? solicitacaoRecebida.chassi ?? "");
        setQuilometragem(
          String(orcamento?.quilometragem ?? solicitacaoRecebida.quilometragem ?? ""),
        );
        setStatusOrcamento(solicitacaoRecebida?.status);
        setStatus(solicitacaoRecebida?.orcamento?.status ?? "respondido");
        setRespostaAdmin(
          orcamento?.respostaAdmin ?? orcamento?.observacao ?? "",
        );
        setGarantia(orcamento?.garantia ?? "");
        setPrazoEntrega(orcamento?.chassi ?? "");
        setDesconto(
          String(
            itensRecebidos.reduce(
              (total) => total + converterNumero(orcamento?.desconto),
              0,
            ),
          ),
        );
        setFrete(
          String(
            itensRecebidos.reduce(
              (total) => total + converterNumero(orcamento?.frete),
              0,
            ),
          ),
        );
      } catch (error) {
        console.error("Erro ao carregar a solicitação:", error);
        if (componenteAtivo) {
          setFeedback({
            tipo: "erro",
            texto: "Não foi possível carregar a solicitação e o catálogo.",
          });
        }
      } finally {
        if (componenteAtivo) setCarregando(false);
      }
    }

    void carregarDados();

    return () => {
      componenteAtivo = false;
    };
  }, [id]);

  const subtotalItens = useMemo(
    () =>
      itens.reduce(
        (total, item) =>
          total +
          Math.max(0, item.quantidade) * converterNumero(item.precoUnitario),
        0,
      ),
    [itens],
  );

  const totalExibido = Math.max(
    0,
    subtotalItens - converterNumero(desconto) + converterNumero(frete),
  );

  function atualizarItem(chave: string, dados: Partial<ItemEditavel>) {
    setItens((atuais) =>
      atuais.map((item) =>
        item.chave === chave ? { ...item, ...dados } : item,
      ),
    );
  }

  function selecionarItem(chave: string, referencia: string) {
    const [tipo, idReferencia] = referencia.split(":");
    const referenciaId = Number(idReferencia);

    if (tipo === "produto") {
      const produto = catalogo.produtos.find(
        (item) => item.id === referenciaId,
      );

      atualizarItem(chave, {
        produtoId: referenciaId,
        servicoId: null,
        precoUnitario: String(produto?.preco ?? 0),
        descricao: produto?.descricao ?? "",
      });
      if (!garantia && produto?.garantia) setGarantia(produto.garantia);
      return;
    }

    if (tipo === "servico") {
      const servico = catalogo.servicos.find(
        (item) => item.id === referenciaId,
      );

      atualizarItem(chave, {
        produtoId: null,
        servicoId: referenciaId,
        precoUnitario: String(servico?.precoBase ?? 0),
        descricao: servico?.descricao ?? "",
      });
      return;
    }

    atualizarItem(chave, { produtoId: null, servicoId: null });
  }

  function removerItem(chave: string) {
    setItens((atuais) => {
      const restantes = atuais.filter((item) => item.chave !== chave);
      return restantes.length > 0 ? restantes : [itemVazio()];
    });
  }
//Payload do orçamento
  function montarPayload(): SalvarOrcamentoInput | null {
    const possuiItemInvalido = itens.some(
      (item) =>
        (!item.produtoId && !item.servicoId) ||
        item.quantidade < 1 ||
        converterNumero(item.precoUnitario) < 0,
    );

    if (possuiItemInvalido) {
      setFeedback({
        tipo: "erro",
        texto: "Selecione o produto ou serviço e confira quantidade e preço.",
      });
      return null;
    }

    const itensPayload: OrcamentoItemInput[] = itens.map((item) => ({
      id: item.id,
      produtoId: item.produtoId,
      servicoId: item.servicoId,
      quantidade: item.quantidade,
      precoUnitario: converterNumero(item.precoUnitario),
      descricao: item.descricao || null,
      observacao: item.observacao || item.descricao || null,
    }));

    return {
      veiculo: veiculo.trim() || null,
      placa: placa.trim() || null,
      chassi: chassi.trim() || null,
      quilometragem: quilometragem === "" ? null : Number(quilometragem),
      respostaAdmin: respostaAdmin || null,
      observacao: respostaAdmin || null,
      garantia: garantia || null,
      prazoEntrega: prazoEntrega || null,
      desconto: converterNumero(desconto),
      frete: converterNumero(frete),
      itens: itensPayload,
    };
  }

  async function salvarOrcamento(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Iniciando salvamento do orçamento...");
    if (!id || !solicitacao){  
      console.log("ID ou solicitação não encontrados."); 
      return
    };
    console.log("ID da solicitação:", id);
    console.log("itens:", itens);

    const payload = montarPayload();
    if (!payload) {console.log("Payload inválido.", payload); return};
    console.log("Payload montado para envio:", payload);

    setSalvando(true);
    setFeedback(null);

    try {
      console.log("Payload do orçamento:", payload);
      const resposta = solicitacao.orcamento
        ? await api.patch(
            apiRoutes.orcamentos.adminAtualizar(solicitacao.orcamento.id),
            payload,
          )
        : await api.post(apiRoutes.solicitacoes.criarOrcamento(id), payload);
      const orcamentoSalvo = resposta.data.orcamento ?? resposta.data;

      setSolicitacao((atual) =>
        atual ? { ...atual, orcamento: orcamentoSalvo } : atual,
      );
      if (Array.isArray(orcamentoSalvo.itens)) {
        setItens(orcamentoSalvo.itens.map(normalizarItem));
      }
      setFeedback({
        tipo: "sucesso",
        texto: solicitacao.orcamento
          ? "Orçamento atualizado com sucesso."
          : "Orçamento criado a partir da solicitação.",
      });
    } catch (error) {
      console.error("Erro ao salvar orçamento:", error);
      setFeedback({
        tipo: "erro",
        texto: "Não foi possível salvar o orçamento. Confira os campos.",
      });
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return <section className={styles.panel}>Carregando solicitação...</section>;
  }

  if (!solicitacao) {
    return (
      <section className={styles.panel}>
        {feedback?.texto ?? "Solicitação não encontrada."}
      </section>
    );
  }

  const nomeCliente = solicitacao.usuario?.nome ?? solicitacao.nome;
  const telefoneCliente =
    solicitacao.usuario?.telefone || solicitacao.usuario?.telefone || "";

  return (
    <div className={styles.page}>
      <header className={styles.page_header}>
        <div className={styles.heading_group}>
          <nav className={styles.breadcrumb} aria-label="Navegação estrutural">
            <Link to="/admin/orçamentos">Solicitações</Link>
            <span>/</span>
            <span>{solicitacao.orcamento ? "Editar" : "Montar orçamento"}</span>
          </nav>

          <div className={styles.title_row}>
            <h1>
              {solicitacao.orcamento
                ? `Orçamento #${solicitacao.orcamento.id}`
                : `Orçamento #${solicitacao.id}`}
            </h1>
            <span className={styles.status_badge}>{statusOrcamento}</span>
          </div>
        </div>

        <div className={styles.page_actions}>
          <button
            className={styles.secondary_button}
            type="button"
            onClick={() => navigate("/admin/orçamentos")}
          >
            <FiX aria-hidden="true" />
            Cancelar
          </button>

          <button
            className={styles.primary_button}
            type="submit"
            form='orcamento-form'
            disabled={salvando}
          >
            <FiSave aria-hidden="true" />
            {salvando ? "Salvando..." : "Salvar alterações"}
          </button>

        </div>
      </header>

      <div className={styles.content_grid}>
        <main className={styles.main_column}>
          <section className={styles.panel}>
            <div className={styles.section_header}>
              <FiFileText aria-hidden="true" />
              <h2>Dados da solicitação e do orçamento</h2>
            </div>

            <form
              className={styles.budget_form}
              onSubmit={salvarOrcamento}
              id="orcamento-form"
            >
              <div className={styles.form_grid}>
                <label className={styles.field}>
                  <span>Cliente</span>
                  <div className={styles.control_with_icon}>
                    <FiUser aria-hidden="true" />
                    <input value={nomeCliente} readOnly />
                  </div>
                </label>

                <label className={styles.field}>
                  <span>Telefone</span>
                  <div className={styles.control_with_icon}>
                    <FiPhone aria-hidden="true" />
                    <input value={telefoneCliente} readOnly />
                  </div>
                </label>

                <label className={styles.field}>
                  <span>E-mail</span>
                  <div className={styles.control_with_icon}>
                    <FiMail aria-hidden="true" />
                    <input value={solicitacao.usuario?.email ?? ""} readOnly />
                  </div>
                </label>

                <label className={styles.field}>
                  <span>Veículo</span>
                  <div className={styles.control_with_icon}>
                    <FiTruck aria-hidden="true" />
                    <input
                      value={veiculo}
                      onChange={(e) => setVeiculo(e.target.value)}
                      maxLength={150}
                    />
                  </div>
                </label>

                <label className={styles.field}>
                  <span>Placa</span>
                  <div className={styles.control_with_icon}>
                    <FiHash aria-hidden="true" />
                    <input
                      value={placa}
                      onChange={(e) => setPlaca(e.target.value)}
                      maxLength={20}
                    />
                  </div>
                </label>

                <label className={styles.field}>
                  <span>Chassi</span>
                  <div className={styles.control_with_icon}>
                    <FiTag aria-hidden="true" />
                    <input
                      value={chassi}
                      onChange={(e) => setChassi(e.target.value)}
                      maxLength={50}
                    />
                  </div>
                </label>

                <label className={styles.field}>
                  <span>Quilometragem</span>
                  <div className={styles.control_with_icon}>
                    <FiMapPin aria-hidden="true" />
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={quilometragem}
                      onChange={(e) => setQuilometragem(e.target.value)}
                    />
                  </div>
                </label>

                <label className={styles.field}>
                  <span>Serviço solicitado</span>
                  <div className={styles.control_with_icon}>
                    <FiTool aria-hidden="true" />
                    <input value={solicitacao.servico?.nome ?? ""} readOnly />
                  </div>
                </label>

                <label className={styles.field}>
                  <span>Status do orçamento</span>
                  <div className={styles.control_with_icon}>
                    <FiRefreshCw aria-hidden="true" />
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                      {STATUS_ORCAMENTO.map((opcao) => (
                        <option key={opcao} value={opcao}>
                          {opcao}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown aria-hidden="true" />
                  </div>
                </label>

                <label className={styles.field}>
                  <span>Data da solicitação</span>
                  <div className={styles.control_with_icon}>
                    <FiCalendar aria-hidden="true" />
                    <input
                      type="datetime-local"
                      value={formatarDataHoraInput(solicitacao.createdAt)}
                      readOnly
                    />
                  </div>
                </label>

                <label className={styles.field}>
                  <span>Prazo de entrega</span>
                  <div className={styles.control_with_icon}>
                    <FiClock aria-hidden="true" />
                    <input
                      value={prazoEntrega}
                      onChange={(e) => setPrazoEntrega(e.target.value)}
                      placeholder="Ex.: 2 dias úteis"
                    />
                  </div>
                </label>

                <label className={styles.field}>
                  <span>Garantia</span>
                  <div className={styles.control_with_icon}>
                    <FiShield aria-hidden="true" />
                    <input
                      value={garantia}
                      onChange={(e) => setGarantia(e.target.value)}
                      placeholder="Ex.: 6 meses"
                    />
                  </div>
                </label>

                <label className={styles.field}>
                  <span>Valor do orçamento</span>
                  <div className={styles.control_with_icon}>
                    <FiDollarSign aria-hidden="true" />
                    <input value={formatarMoeda(totalExibido)} readOnly />
                  </div>
                </label>

                <label className={styles.field}>
                  <span>Desconto</span>
                  <div className={styles.control_with_icon}>
                    <FiTag aria-hidden="true" />
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={desconto}
                      onChange={(e) => setDesconto(e.target.value)}
                    />
                  </div>
                </label>

                <label className={styles.field}>
                  <span>Frete</span>
                  <div className={styles.control_with_icon}>
                    <FiTruck aria-hidden="true" />
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={frete}
                      onChange={(e) => setFrete(e.target.value)}
                    />
                  </div>
                </label>
              </div>

              <div className={styles.notes_grid}>
                <label className={styles.field}>
                  <span>Descrição do problema</span>
                  <textarea value={solicitacao.descricao} readOnly maxLength={500} />
                  <small>{solicitacao.descricao.length}/500</small>
                </label>

                <label className={styles.field}>
                  <span>Resposta / observação do admin</span>
                  <textarea
                    value={respostaAdmin}
                    onChange={(e) => setRespostaAdmin(e.target.value)}
                    maxLength={500}
                    placeholder="Informe a análise que será apresentada ao cliente."
                  />
                  <small>{respostaAdmin.length}/500</small>
                </label>
              </div>
            </form>
          </section>

          <section className={styles.panel}>
            <div className={styles.items_header}>
              <div className={styles.section_header}>
                <FiPackage aria-hidden="true" />
                <h2>Itens do orçamento</h2>
              </div>

              <button
                className={styles.add_button}
                type="button"
                onClick={() => setItens((atuais) => [...atuais, itemVazio()])}
              >
                <FiPlus aria-hidden="true" />
                Adicionar item
              </button>
            </div>

            <div className={styles.table_scroll}>
              <table className={styles.items_table}>
                <thead>
                  <tr>
                    <th>Produto / serviço</th>
                    <th>Descrição / observação</th>
                    <th>Qtd.</th>
                    <th>Valor unitário</th>
                    <th>Total</th>
                    <th>
                      <span className={styles.visually_hidden}>Ações</span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {itens.map((item) => {
                    const referencia = item.produtoId
                      ? `produto:${item.produtoId}`
                      : item.servicoId
                        ? `servico:${item.servicoId}`
                        : "";
                    const totalItem =
                      Math.max(0, item.quantidade) *
                      converterNumero(item.precoUnitario);

                    return (
                      <tr key={item.chave}>
                        <td>
                          <div className={styles.item_name}>
                            <span className={styles.drag_handle} aria-hidden="true">
                              ⠿
                            </span>
                            <span className={styles.item_icon}>
                              <FiTool aria-hidden="true" />
                            </span>
                            <select
                              className={styles.price_input}
                              value={referencia}
                              onChange={(e) =>
                                selecionarItem(item.chave, e.target.value)
                              }
                              aria-label="Produto ou serviço"
                            >
                              <option value="">Selecione</option>
                              <optgroup label="Produtos">
                                {catalogo.produtos.map((produto) => (
                                  <option
                                    key={`produto-${produto.id}`}
                                    value={`produto:${produto.id}`}
                                  >
                                    {produto.titulo}
                                  </option>
                                ))}
                              </optgroup>
                              <optgroup label="Serviços">
                                {catalogo.servicos.map((servico) => (
                                  <option
                                    key={`servico-${servico.id}`}
                                    value={`servico:${servico.id}`}
                                  >
                                    {servico.nome}
                                  </option>
                                ))}
                              </optgroup>
                            </select>
                          </div>
                        </td>
                        <td>
                          <input
                            className={styles.price_input}
                            value={item.descricao}
                            onChange={(e) =>
                              atualizarItem(item.chave, {
                                descricao: e.target.value,
                                observacao: e.target.value,
                              })
                            }
                            placeholder="Descrição ou observação"
                          />
                        </td>
                        <td>
                          <input
                            className={styles.quantity_input}
                            type="number"
                            min="1"
                            value={item.quantidade}
                            onChange={(e) =>
                              atualizarItem(item.chave, {
                                quantidade: Math.max(1, Number(e.target.value)),
                              })
                            }
                            aria-label="Quantidade"
                          />
                        </td>
                        <td>
                          <input
                            className={styles.price_input}
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.precoUnitario}
                            onChange={(e) =>
                              atualizarItem(item.chave, {
                                precoUnitario: e.target.value,
                              })
                            }
                            aria-label="Valor unitário"
                          />
                        </td>
                        <td className={styles.item_total}>
                          {formatarMoeda(totalItem)}
                        </td>
                        <td>
                          <button
                            className={styles.delete_button}
                            type="button"
                            aria-label="Remover item"
                            onClick={() => removerItem(item.chave)}
                          >
                            <FiTrash2 aria-hidden="true" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <footer className={styles.items_footer}>
              <span>{itens.length} {itens.length === 1 ? "item" : "itens"}</span>
              <div>
                <span>Subtotal dos itens:</span>
                <strong>{formatarMoeda(subtotalItens)}</strong>
              </div>
            </footer>
          </section>
        </main>

      </div>
    </div>
  );
}

export default EditarOrcamento;
