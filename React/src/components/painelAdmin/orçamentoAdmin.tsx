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
import styles from "../css/cssAdmin/orçamentoAdmin.module.css";

type BudgetStatus = "Novo" | "Em análise" | "Respondido" | "Finalizado";
type ActionTone = "warning" | "danger" | "info";

interface BudgetRow {
  initials: string;
  client: string;
  vehicle: string;
  service: string;
  status: BudgetStatus;
  date: string;
  value: string;
}

interface PendingAction {
  icon: IconType;
  title: string;
  client: string;
  description: string;
  due: string;
  tone: ActionTone;
}

const budgetRows: BudgetRow[] = [
  {
    initials: "JS",
    client: "João da Silva",
    vehicle: "Ford Ranger 2018",
    service: "Reparo cardan traseiro",
    status: "Novo",
    date: "21/05/2025 10:45",
    value: "R$ 1.750,00",
  },
  {
    initials: "MC",
    client: "Maria Ap. Costa",
    vehicle: "Chevrolet S10 2016",
    service: "Balanceamento cardan",
    status: "Em análise",
    date: "21/05/2025 09:32",
    value: "R$ 860,00",
  },
  {
    initials: "RP",
    client: "Rafael Pereira",
    vehicle: "Toyota Hilux 2020",
    service: "Cruzeta cardan",
    status: "Respondido",
    date: "20/05/2025 16:15",
    value: "R$ 630,00",
  },
  {
    initials: "AL",
    client: "Auto Log Transportes",
    vehicle: "Mercedes-Benz Atego",
    service: "Reparo cardan dianteiro",
    status: "Em análise",
    date: "20/05/2025 14:08",
    value: "R$ 2.580,00",
  },
  {
    initials: "EC",
    client: "Éder Carvalho",
    vehicle: "Volkswagen Amarok",
    service: "Reparo flange cardan",
    status: "Respondido",
    date: "20/05/2025 11:22",
    value: "R$ 480,00",
  },
  {
    initials: "TP",
    client: "Transportes Paraná",
    vehicle: "Iveco Daily 35S14",
    service: "Balanceamento cardan",
    status: "Finalizado",
    date: "19/05/2025 17:30",
    value: "R$ 720,00",
  },
  {
    initials: "FA",
    client: "Frota Alfa Ltda",
    vehicle: "Scania P310 6x2",
    service: "Reparo cardan completo",
    status: "Em análise",
    date: "19/05/2025 15:10",
    value: "R$ 3.450,00",
  },
  {
    initials: "CL",
    client: "Carlos Lima",
    vehicle: "Nissan Frontier 2017",
    service: "Cruzeta cardan",
    status: "Novo",
    date: "19/05/2025 11:05",
    value: "R$ 560,00",
  },
];

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

function getStatusClass(status: BudgetStatus) {
  const classes: Record<BudgetStatus, string> = {
    Novo: styles.status_new,
    "Em análise": styles.status_analysis,
    Respondido: styles.status_answered,
    Finalizado: styles.status_finished,
  };

  return classes[status];
}

function OrcamentoAdmin() {
  return (
    <div className={styles.dashboard_grid}>
      <div className={styles.main_column}>
        <section className={`${styles.panel} ${styles.budget_list}`} aria-labelledby="budget-list-title">
          <header className={styles.list_header}>
            <h2 id="budget-list-title">Lista de Orçamentos</h2>

            <div className={styles.header_actions}>
              <button className={styles.secondary_button} type="button">
                <FiDownload aria-hidden="true" />
                <span>Exportar</span>
              </button>
              <button className={styles.primary_button} type="button">
                <FiPlus aria-hidden="true" />
                <span>Novo Orçamento</span>
              </button>
            </div>
          </header>

          <div className={styles.filters_bar} role="group" aria-label="Filtros de orçamentos">
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

            <label className={`${styles.filter_control} ${styles.search_control}`} htmlFor="budget-search">
              <FiSearch aria-hidden="true" />
              <span className={styles.visually_hidden}>Pesquisar orçamentos</span>
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
                  <th scope="col">Valor</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {budgetRows.map((budget, index) => (
                  <tr className={index === 0 ? styles.selected_row : undefined} key={`${budget.client}-${budget.date}`}>
                    <td>
                      <div className={styles.client_cell}>
                        <span className={styles.client_avatar}>{budget.initials}</span>
                        <span>{budget.client}</span>
                      </div>
                    </td>
                    <td>{budget.vehicle}</td>
                    <td>{budget.service}</td>
                    <td>
                      <span className={`${styles.status_badge} ${getStatusClass(budget.status)}`}>
                        {budget.status}
                      </span>
                    </td>
                    <td>{budget.date}</td>
                    <td>{budget.value}</td>
                    <td>
                      <div className={styles.row_actions}>
                        <button type="button" title="Visualizar orçamento" aria-label={`Visualizar orçamento de ${budget.client}`}>
                          <FiEye aria-hidden="true" />
                        </button>
                        <button type="button" title="Editar orçamento" aria-label={`Editar orçamento de ${budget.client}`}>
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
            <span>Mostrando 1 a 8 de 42 orçamentos</span>

            <nav className={styles.pagination} aria-label="Paginação de orçamentos">
              <button type="button" aria-label="Página anterior">
                <FiChevronLeft aria-hidden="true" />
              </button>
              <button className={styles.active_page} type="button" aria-current="page">1</button>
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

        <section className={styles.panel} aria-labelledby="budget-details-title">
          <header className={styles.section_header}>
            <div className={styles.section_title}>
              <FiFileText aria-hidden="true" />
              <h2 id="budget-details-title">Detalhes do Orçamento Selecionado</h2>
            </div>
            <button className={styles.icon_button} type="button" title="Editar orçamento" aria-label="Editar orçamento selecionado">
              <FiEdit2 aria-hidden="true" />
            </button>
          </header>

          <div className={styles.details_content}>
            <section className={styles.detail_column} aria-labelledby="client-details-title">
              <div className={styles.client_identity}>
                <span className={styles.detail_avatar}>JS</span>
                <div>
                  <h3 className={styles.detail_label} id="client-details-title">Cliente</h3>
                  <strong>João da Silva</strong>
                </div>
                <button className={styles.whatsapp_button} type="button" title="Conversar pelo WhatsApp" aria-label="Conversar com João pelo WhatsApp">
                  <FiMessageCircle aria-hidden="true" />
                </button>
              </div>

              <dl className={styles.detail_list}>
                <div>
                  <dt>Telefone</dt>
                  <dd><a href="tel:+5516988451234"><FiPhone aria-hidden="true" />(16) 98845-1234</a></dd>
                </div>
                <div>
                  <dt>E-mail</dt>
                  <dd><a href="mailto:joaodasilva@email.com"><FiMail aria-hidden="true" />joaodasilva@email.com</a></dd>
                </div>
                <div>
                  <dt>Endereço</dt>
                  <dd>
                    <address><FiMapPin aria-hidden="true" /><span>Rua das Acácias, 125<br />Jardim América, Ribeirão Preto - SP</span></address>
                  </dd>
                </div>
              </dl>
            </section>

            <section className={styles.detail_column} aria-labelledby="vehicle-details-title">
              <h3 className={styles.detail_label} id="vehicle-details-title">Veículo</h3>
              <strong className={styles.detail_title}>Ford Ranger 2018</strong>
              <dl className={styles.detail_list}>
                <div><dt>Placa</dt><dd>FRT-8A23</dd></div>
                <div><dt>Quilometragem</dt><dd>98.450 km</dd></div>
                <div><dt>Chassi</dt><dd>8AFAR23J2J1234567</dd></div>
              </dl>
            </section>

            <section className={styles.detail_column} aria-labelledby="service-details-title">
              <h3 className={styles.detail_label} id="service-details-title">Serviço / Peça</h3>
              <strong className={styles.detail_title}>Reparo cardan traseiro</strong>
              <dl className={styles.detail_list}>
                <div><dt>Descrição</dt><dd>Substituição de cruzeta, balanceamento e solda</dd></div>
                <div><dt>Garantia</dt><dd>6 meses</dd></div>
                <div><dt>Prazo de entrega</dt><dd>2 dias úteis</dd></div>
              </dl>
            </section>

            <section className={`${styles.detail_column} ${styles.price_column}`} aria-labelledby="price-details-title">
              <h3 className={styles.detail_label} id="price-details-title">Orçamento</h3>
              <strong className={styles.price_highlight}>R$ 1.750,00</strong>
              <dl className={styles.price_list}>
                <div><dt>Subtotal</dt><dd>R$ 1.540,00</dd></div>
                <div><dt>Desconto</dt><dd>R$ 0,00</dd></div>
                <div><dt>Frete</dt><dd>R$ 0,00</dd></div>
                <div className={styles.price_total}><dt>Total</dt><dd>R$ 1.750,00</dd></div>
              </dl>
            </section>

            <section className={styles.detail_column} aria-labelledby="notes-details-title">
              <h3 className={styles.detail_label} id="notes-details-title">Observações</h3>
              <p className={styles.observation}>
                Cliente relatou vibração em alta velocidade. Cardan apresentando folga na cruzeta traseira. Recomendado balanceamento após o reparo.
              </p>
            </section>
          </div>

          <div className={styles.status_history}>
            <h3>Histórico de Status</h3>
            <ol className={styles.status_timeline}>
              <li className={styles.timeline_completed}>
                <span className={styles.timeline_dot} aria-hidden="true" />
                <div className={styles.timeline_content}>
                  <strong>Novo</strong><span>21/05/2025 10:45</span><small>Orçamento criado</small>
                </div>
              </li>
              <li className={styles.timeline_completed}>
                <span className={styles.timeline_dot} aria-hidden="true" />
                <div className={styles.timeline_content}>
                  <strong>Em análise</strong><span>21/05/2025 11:20</span><small>Em avaliação técnica</small>
                </div>
              </li>
              <li className={styles.timeline_success}>
                <span className={styles.timeline_dot} aria-hidden="true" />
                <div className={styles.timeline_content}>
                  <strong>Respondido</strong><span>21/05/2025 14:35</span><small>Resposta enviada ao cliente</small>
                </div>
              </li>
              <li className={styles.timeline_pending}>
                <span className={styles.timeline_dot} aria-hidden="true" />
                <div className={styles.timeline_content}>
                  <strong>Aguardando resposta</strong><span>—</span><small>Cliente ainda não respondeu</small>
                </div>
              </li>
              <li className={styles.timeline_pending}>
                <span className={styles.timeline_dot} aria-hidden="true" />
                <div className={styles.timeline_content}>
                  <strong>Finalizado</strong><span>—</span><small>Ainda não finalizado</small>
                </div>
              </li>
            </ol>
          </div>
        </section>
      </div>

      <aside className={styles.side_column} aria-label="Ações relacionadas aos orçamentos">
        <section className={styles.panel} aria-labelledby="quick-actions-title">
          <header className={styles.side_header}>
            <FiZap aria-hidden="true" />
            <h2 id="quick-actions-title">Ações Rápidas</h2>
          </header>

          <div className={styles.quick_action_list}>
            <button className={styles.quick_action_item} type="button">
              <span className={styles.quick_action_icon}><FiPlus aria-hidden="true" /></span>
              <span className={styles.quick_action_text}><strong>Criar novo orçamento</strong><small>Iniciar um novo orçamento</small></span>
              <FiChevronRight className={styles.quick_action_arrow} aria-hidden="true" />
            </button>
            <button className={styles.quick_action_item} type="button">
              <span className={styles.quick_action_icon}><FiMessageSquare aria-hidden="true" /></span>
              <span className={styles.quick_action_text}><strong>Responder cliente</strong><small>Enviar resposta ou atualização</small></span>
              <FiChevronRight className={styles.quick_action_arrow} aria-hidden="true" />
            </button>
            <button className={styles.quick_action_item} type="button">
              <span className={styles.quick_action_icon}><FiEdit2 aria-hidden="true" /></span>
              <span className={styles.quick_action_text}><strong>Editar orçamento</strong><small>Alterar informações do orçamento</small></span>
              <FiChevronRight className={styles.quick_action_arrow} aria-hidden="true" />
            </button>
            <button className={styles.quick_action_item} type="button">
              <span className={styles.quick_action_icon}><FiDownload aria-hidden="true" /></span>
              <span className={styles.quick_action_text}><strong>Exportar lista</strong><small>Exportar orçamentos para Excel</small></span>
              <FiChevronRight className={styles.quick_action_arrow} aria-hidden="true" />
            </button>
          </div>
        </section>

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
                <article className={`${styles.pending_item} ${styles[`tone_${action.tone}`]}`} key={`${action.client}-${action.title}`}>
                  <ActionIcon className={styles.pending_icon} aria-hidden="true" />
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
