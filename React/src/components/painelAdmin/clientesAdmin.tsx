import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import type { IconType } from "react-icons";
import {
  FiAlertTriangle,
  FiBriefcase,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiDownload,
  FiEdit2,
  FiEye,
  FiFilePlus,
  FiFilter,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiPlus,
  FiSearch,
  FiTruck,
  FiUser,
  FiUserCheck,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import styles from "../css/cssAdmin/clientesAdmin.module.css";

type ClientType = "Pessoa física" | "Empresa";
type ClientStatus = "Ativo" | "Potencial" | "Inativo";
type RelationshipLevel = "VIP" | "Recorrente" | "Novo";
type VehicleStatus = "Em dia" | "Revisão próxima" | "Atenção";
type FollowUpTone = "warning" | "danger" | "info";
type AvatarTone = "blue" | "green" | "cyan" | "purple" | "amber";

interface ClientVehicle {
  model: string;
  plate: string;
  year: number;
  lastService: string;
  status: VehicleStatus;
}

interface ClientHistory {
  title: string;
  date: string;
  description: string;
  type: "budget" | "contact" | "service";
}

interface Client {
  id: string;
  initials: string;
  avatarTone: AvatarTone;
  name: string;
  document: string;
  type: ClientType;
  status: ClientStatus;
  relationship: RelationshipLevel;
  phone: string;
  email: string;
  city: string;
  state: string;
  address: string;
  since: string;
  lastContact: string;
  lastContactOrder: number;
  budgetCount: number;
  approvedBudgetCount: number;
  totalValue: number;
  preferredContact: string;
  notes: string;
  tags: string[];
  vehicles: ClientVehicle[];
  history: ClientHistory[];
}

interface ClientFilters {
  type: "todos" | ClientType;
  status: "todos" | ClientStatus;
  search: string;
}

interface QuickAction {
  icon: IconType;
  title: string;
  description: string;
}

interface FollowUp {
  clientId: string;
  icon: IconType;
  title: string;
  description: string;
  due: string;
  tone: FollowUpTone;
}

const clients: Client[] = [
  {
    id: "joao-silva",
    initials: "JS",
    avatarTone: "blue",
    name: "João da Silva",
    document: "123.456.789-10",
    type: "Pessoa física",
    status: "Ativo",
    relationship: "Recorrente",
    phone: "(16) 98845-1234",
    email: "joaodasilva@email.com",
    city: "Ribeirão Preto",
    state: "SP",
    address: "Rua das Acácias, 125 - Jardim América",
    since: "12/03/2023",
    lastContact: "Hoje, 10:45",
    lastContactOrder: 202607231045,
    budgetCount: 8,
    approvedBudgetCount: 6,
    totalValue: 12840,
    preferredContact: "WhatsApp",
    notes: "Prefere atendimento pela manhã e solicita confirmação antes de qualquer serviço adicional.",
    tags: ["Pickup", "Ranger", "Recorrente"],
    vehicles: [
      { model: "Ford Ranger XLT", plate: "FRT-8A23", year: 2018, lastService: "21/05/2026", status: "Em dia" },
      { model: "Chevrolet Onix", plate: "GHT-4B12", year: 2021, lastService: "08/02/2026", status: "Revisão próxima" },
    ],
    history: [
      { title: "Orçamento respondido", date: "21/07/2026 14:35", description: "Reparo de cardan traseiro no valor de R$ 1.750,00.", type: "budget" },
      { title: "Contato por WhatsApp", date: "21/07/2026 11:10", description: "Cliente enviou vídeo da vibração do veículo.", type: "contact" },
      { title: "Serviço finalizado", date: "18/01/2026 16:20", description: "Troca de cruzeta e balanceamento concluídos.", type: "service" },
    ],
  },
  {
    id: "auto-log",
    initials: "AL",
    avatarTone: "green",
    name: "Auto Log Transportes",
    document: "18.245.771/0001-42",
    type: "Empresa",
    status: "Ativo",
    relationship: "VIP",
    phone: "(16) 3976-2250",
    email: "manutencao@autolog.com.br",
    city: "Sertãozinho",
    state: "SP",
    address: "Rodovia Armando Salles, km 12 - Distrito Industrial",
    since: "04/08/2021",
    lastContact: "Hoje, 09:15",
    lastContactOrder: 202607230915,
    budgetCount: 24,
    approvedBudgetCount: 21,
    totalValue: 78450,
    preferredContact: "E-mail",
    notes: "Cliente corporativo com faturamento mensal. Priorizar veículos parados e enviar laudo técnico junto ao orçamento.",
    tags: ["Frota", "Linha pesada", "Faturamento"],
    vehicles: [
      { model: "Mercedes-Benz Atego", plate: "FRO-2D18", year: 2020, lastService: "18/07/2026", status: "Em dia" },
      { model: "Volvo FH 540", plate: "LOG-9E44", year: 2022, lastService: "02/06/2026", status: "Revisão próxima" },
      { model: "Scania P310 6x2", plate: "ALC-7C30", year: 2019, lastService: "11/04/2026", status: "Atenção" },
    ],
    history: [
      { title: "Orçamento em análise", date: "23/07/2026 09:15", description: "Reparo do cardan dianteiro do Atego.", type: "budget" },
      { title: "Ligação com a manutenção", date: "22/07/2026 17:40", description: "Confirmada prioridade para o veículo FRO-2D18.", type: "contact" },
      { title: "Serviço entregue", date: "18/07/2026 15:05", description: "Balanceamento e troca de rolamento central.", type: "service" },
    ],
  },
  {
    id: "maria-costa",
    initials: "MC",
    avatarTone: "purple",
    name: "Maria Aparecida Costa",
    document: "348.229.198-05",
    type: "Pessoa física",
    status: "Potencial",
    relationship: "Novo",
    phone: "(16) 99742-3310",
    email: "maria.costa@email.com",
    city: "Ribeirão Preto",
    state: "SP",
    address: "Avenida Independência, 842 - Centro",
    since: "18/07/2026",
    lastContact: "Ontem, 16:20",
    lastContactOrder: 202607221620,
    budgetCount: 2,
    approvedBudgetCount: 1,
    totalValue: 860,
    preferredContact: "WhatsApp",
    notes: "Primeiro atendimento realizado por indicação. Aguardando retorno sobre orçamento de balanceamento.",
    tags: ["Novo cliente", "Indicação", "S10"],
    vehicles: [
      { model: "Chevrolet S10 LTZ", plate: "MCA-6F22", year: 2016, lastService: "Não realizado", status: "Atenção" },
    ],
    history: [
      { title: "Orçamento enviado", date: "22/07/2026 16:20", description: "Balanceamento de cardan no valor de R$ 860,00.", type: "budget" },
      { title: "Cadastro realizado", date: "18/07/2026 10:32", description: "Cliente chegou por indicação de João da Silva.", type: "contact" },
    ],
  },
  {
    id: "rafael-pereira",
    initials: "RP",
    avatarTone: "cyan",
    name: "Rafael Pereira",
    document: "278.534.009-71",
    type: "Pessoa física",
    status: "Ativo",
    relationship: "Recorrente",
    phone: "(16) 99127-4428",
    email: "rafael.pereira@email.com",
    city: "Cravinhos",
    state: "SP",
    address: "Rua XV de Novembro, 338 - Centro",
    since: "09/11/2022",
    lastContact: "21/07, 15:50",
    lastContactOrder: 202607211550,
    budgetCount: 7,
    approvedBudgetCount: 5,
    totalValue: 9360,
    preferredContact: "Telefone",
    notes: "Utiliza o veículo para trabalho rural. Valoriza prazo de entrega e disponibilidade imediata.",
    tags: ["Hilux", "Rural", "Recorrente"],
    vehicles: [
      { model: "Toyota Hilux SRX", plate: "RPR-3A20", year: 2020, lastService: "20/05/2026", status: "Em dia" },
      { model: "Toyota Bandeirante", plate: "BND-1C84", year: 1998, lastService: "14/12/2025", status: "Atenção" },
    ],
    history: [
      { title: "Serviço aprovado", date: "21/07/2026 15:50", description: "Substituição de cruzeta autorizada.", type: "budget" },
      { title: "Inspeção técnica", date: "20/07/2026 16:15", description: "Folga identificada na cruzeta traseira.", type: "service" },
      { title: "Contato telefônico", date: "20/07/2026 09:40", description: "Agendada avaliação do veículo.", type: "contact" },
    ],
  },
  {
    id: "frota-alfa",
    initials: "FA",
    avatarTone: "amber",
    name: "Frota Alfa Ltda",
    document: "06.183.990/0001-18",
    type: "Empresa",
    status: "Ativo",
    relationship: "VIP",
    phone: "(16) 3512-8090",
    email: "frota@alfa.com.br",
    city: "Barretos",
    state: "SP",
    address: "Avenida das Nações, 2210 - Industrial",
    since: "18/02/2020",
    lastContact: "21/07, 11:35",
    lastContactOrder: 202607211135,
    budgetCount: 31,
    approvedBudgetCount: 26,
    totalValue: 129780,
    preferredContact: "E-mail",
    notes: "Contrato de manutenção de frota. Orçamentos acima de R$ 5 mil exigem aprovação do gestor financeiro.",
    tags: ["Frota", "Contrato", "Scania"],
    vehicles: [
      { model: "Scania P310 6x2", plate: "ALF-1H09", year: 2019, lastService: "19/07/2026", status: "Em dia" },
      { model: "Volvo VM 270", plate: "ALF-4J17", year: 2018, lastService: "28/05/2026", status: "Revisão próxima" },
      { model: "Iveco Tector 240E", plate: "ALF-8K25", year: 2021, lastService: "11/03/2026", status: "Atenção" },
    ],
    history: [
      { title: "Documentos pendentes", date: "21/07/2026 11:35", description: "Solicitados dados completos do veículo ALF-4J17.", type: "contact" },
      { title: "Orçamento preparado", date: "19/07/2026 15:10", description: "Reparo completo do cardan da Scania.", type: "budget" },
      { title: "Veículo liberado", date: "19/07/2026 09:30", description: "Teste de rodagem concluído sem vibrações.", type: "service" },
    ],
  },
  {
    id: "eder-carvalho",
    initials: "EC",
    avatarTone: "green",
    name: "Éder Carvalho",
    document: "411.720.338-46",
    type: "Pessoa física",
    status: "Ativo",
    relationship: "Recorrente",
    phone: "(16) 99218-7754",
    email: "eder.carvalho@email.com",
    city: "Batatais",
    state: "SP",
    address: "Rua Coronel Joaquim, 73 - Riachuelo",
    since: "02/06/2024",
    lastContact: "20/07, 11:22",
    lastContactOrder: 202607201122,
    budgetCount: 5,
    approvedBudgetCount: 4,
    totalValue: 5240,
    preferredContact: "WhatsApp",
    notes: "Solicita peças originais quando disponíveis. Costuma agendar serviços para sexta-feira.",
    tags: ["Amarok", "Peça original", "WhatsApp"],
    vehicles: [
      { model: "Volkswagen Amarok V6", plate: "ECA-5D19", year: 2019, lastService: "20/05/2026", status: "Revisão próxima" },
    ],
    history: [
      { title: "Follow-up programado", date: "20/07/2026 11:22", description: "Retornar sobre garantia da flange substituída.", type: "contact" },
      { title: "Serviço finalizado", date: "20/05/2026 17:10", description: "Reparo de flange e balanceamento.", type: "service" },
    ],
  },
  {
    id: "transportes-parana",
    initials: "TP",
    avatarTone: "blue",
    name: "Transportes Paraná",
    document: "32.427.190/0001-05",
    type: "Empresa",
    status: "Ativo",
    relationship: "Recorrente",
    phone: "(44) 3028-7110",
    email: "oficina@transportesparana.com.br",
    city: "Maringá",
    state: "PR",
    address: "Rodovia PR-317, km 6 - Parque Industrial",
    since: "11/05/2022",
    lastContact: "19/07, 17:30",
    lastContactOrder: 202607191730,
    budgetCount: 18,
    approvedBudgetCount: 15,
    totalValue: 54620,
    preferredContact: "E-mail",
    notes: "Atendimento remoto com envio de peças. Confirmar transportadora e prazo antes do faturamento.",
    tags: ["Frota", "Interestadual", "Iveco"],
    vehicles: [
      { model: "Iveco Daily 35S14", plate: "TPR-2G14", year: 2017, lastService: "19/05/2026", status: "Em dia" },
      { model: "Iveco Tector 170E", plate: "TPR-7F28", year: 2020, lastService: "30/03/2026", status: "Revisão próxima" },
    ],
    history: [
      { title: "Pedido despachado", date: "19/07/2026 17:30", description: "Rolamento e kit de reparo enviados para Maringá.", type: "service" },
      { title: "Pagamento confirmado", date: "19/07/2026 13:05", description: "Orçamento de R$ 720,00 aprovado.", type: "budget" },
    ],
  },
  {
    id: "carlos-lima",
    initials: "CL",
    avatarTone: "cyan",
    name: "Carlos Lima",
    document: "052.819.676-30",
    type: "Pessoa física",
    status: "Potencial",
    relationship: "Novo",
    phone: "(16) 99630-2011",
    email: "carlos.lima@email.com",
    city: "Jardinópolis",
    state: "SP",
    address: "Rua São Pedro, 404 - Centro",
    since: "19/07/2026",
    lastContact: "19/07, 11:05",
    lastContactOrder: 202607191105,
    budgetCount: 1,
    approvedBudgetCount: 0,
    totalValue: 0,
    preferredContact: "WhatsApp",
    notes: "Cadastro recente. Ainda é necessário confirmar placa e ano exato do veículo.",
    tags: ["Novo cliente", "Frontier", "Dados pendentes"],
    vehicles: [
      { model: "Nissan Frontier", plate: "Não informada", year: 2017, lastService: "Não realizado", status: "Atenção" },
    ],
    history: [
      { title: "Dados solicitados", date: "19/07/2026 11:05", description: "Solicitada placa e versão da Frontier.", type: "contact" },
      { title: "Pré-orçamento criado", date: "19/07/2026 10:50", description: "Estimativa inicial para substituição de cruzeta.", type: "budget" },
    ],
  },
  {
    id: "brasil-cargas",
    initials: "BC",
    avatarTone: "purple",
    name: "Brasil Cargas Ltda",
    document: "10.780.214/0001-73",
    type: "Empresa",
    status: "Inativo",
    relationship: "Recorrente",
    phone: "(11) 3412-9088",
    email: "compras@brasilcargas.com.br",
    city: "Guarulhos",
    state: "SP",
    address: "Avenida Monteiro, 1780 - Cumbica",
    since: "27/09/2020",
    lastContact: "18/05, 10:20",
    lastContactOrder: 202605181020,
    budgetCount: 16,
    approvedBudgetCount: 11,
    totalValue: 46800,
    preferredContact: "E-mail",
    notes: "Sem movimentação há mais de 60 dias. Realizar contato comercial para reativação.",
    tags: ["Frota", "Reativação", "Volvo"],
    vehicles: [
      { model: "Volvo FH 540 6x4", plate: "BRC-5A40", year: 2018, lastService: "18/05/2026", status: "Atenção" },
      { model: "Scania R450", plate: "BRC-2B19", year: 2019, lastService: "12/02/2026", status: "Atenção" },
    ],
    history: [
      { title: "Orçamento sem retorno", date: "18/05/2026 10:20", description: "Reparo de cardan no valor de R$ 2.150,00.", type: "budget" },
      { title: "E-mail enviado", date: "16/05/2026 14:15", description: "Proposta comercial encaminhada ao setor de compras.", type: "contact" },
    ],
  },
  {
    id: "juliano-mendes",
    initials: "JM",
    avatarTone: "amber",
    name: "Juliano Mendes",
    document: "307.118.221-92",
    type: "Pessoa física",
    status: "Ativo",
    relationship: "Recorrente",
    phone: "(16) 99410-7362",
    email: "juliano.mendes@email.com",
    city: "Bebedouro",
    state: "SP",
    address: "Rua das Palmeiras, 92 - Jardim Cláudia",
    since: "15/01/2024",
    lastContact: "18/05, 16:45",
    lastContactOrder: 202605181645,
    budgetCount: 6,
    approvedBudgetCount: 5,
    totalValue: 7480,
    preferredContact: "Telefone",
    notes: "Cliente com boa recorrência. Realizar contato preventivo sobre revisão anual.",
    tags: ["S10", "Preventiva", "Recorrente"],
    vehicles: [
      { model: "Chevrolet S10 LT", plate: "JME-8H14", year: 2014, lastService: "18/05/2026", status: "Revisão próxima" },
    ],
    history: [
      { title: "Serviço entregue", date: "18/05/2026 16:45", description: "Troca de rolamento central concluída.", type: "service" },
      { title: "Orçamento aprovado", date: "18/05/2026 09:20", description: "Cliente aprovou serviço de R$ 420,00.", type: "budget" },
    ],
  },
  {
    id: "oficina-sao-lucas",
    initials: "OS",
    avatarTone: "green",
    name: "Oficina São Lucas",
    document: "42.705.119/0001-66",
    type: "Empresa",
    status: "Ativo",
    relationship: "VIP",
    phone: "(16) 3637-5521",
    email: "pecas@oficinasaolucas.com.br",
    city: "Ribeirão Preto",
    state: "SP",
    address: "Rua General Câmara, 630 - Campos Elíseos",
    since: "06/04/2019",
    lastContact: "17/05, 14:10",
    lastContactOrder: 202605171410,
    budgetCount: 37,
    approvedBudgetCount: 33,
    totalValue: 88730,
    preferredContact: "WhatsApp",
    notes: "Parceiro de oficina. Tabela comercial diferenciada e retirada de peças no balcão.",
    tags: ["Parceiro", "Oficina", "Atacado"],
    vehicles: [
      { model: "Veículos de clientes", plate: "Diversas", year: 2026, lastService: "17/05/2026", status: "Em dia" },
    ],
    history: [
      { title: "Pedido de peças", date: "17/05/2026 14:10", description: "Separados dois kits de reparo e uma cruzeta.", type: "service" },
      { title: "Condição comercial renovada", date: "02/05/2026 09:00", description: "Tabela de parceiro atualizada para o trimestre.", type: "contact" },
    ],
  },
  {
    id: "pedro-alves",
    initials: "PA",
    avatarTone: "blue",
    name: "Pedro Henrique Alves",
    document: "192.640.778-18",
    type: "Pessoa física",
    status: "Inativo",
    relationship: "Novo",
    phone: "(16) 99102-4470",
    email: "pedro.alves@email.com",
    city: "Franca",
    state: "SP",
    address: "Rua Voluntários da Franca, 118 - Centro",
    since: "12/01/2026",
    lastContact: "12/01, 13:20",
    lastContactOrder: 202601121320,
    budgetCount: 1,
    approvedBudgetCount: 0,
    totalValue: 0,
    preferredContact: "WhatsApp",
    notes: "Solicitou orçamento inicial, mas não retornou. Contato de reativação recomendado.",
    tags: ["Sem retorno", "Primeiro orçamento"],
    vehicles: [
      { model: "Mitsubishi L200 Triton", plate: "PHM-7D16", year: 2016, lastService: "Não realizado", status: "Atenção" },
    ],
    history: [
      { title: "Orçamento enviado", date: "12/01/2026 13:20", description: "Estimativa para reparo do eixo dianteiro.", type: "budget" },
      { title: "Cadastro realizado", date: "12/01/2026 11:05", description: "Cliente entrou em contato pelo site.", type: "contact" },
    ],
  },
];

const quickActions: QuickAction[] = [
  { icon: FiPlus, title: "Cadastrar cliente", description: "Adicionar pessoa ou empresa" },
  { icon: FiFilePlus, title: "Criar orçamento", description: "Iniciar solicitação para um cliente" },
  { icon: FiMessageCircle, title: "Registrar contato", description: "Salvar ligação, e-mail ou mensagem" },
  { icon: FiDownload, title: "Exportar carteira", description: "Gerar relatório de clientes" },
];

const followUps: FollowUp[] = [
  { clientId: "auto-log", icon: FiClock, title: "Confirmar aprovação", description: "Orçamento do Atego aguardando retorno", due: "Hoje", tone: "warning" },
  { clientId: "frota-alfa", icon: FiAlertTriangle, title: "Dados pendentes", description: "Completar cadastro do veículo ALF-4J17", due: "Hoje", tone: "danger" },
  { clientId: "eder-carvalho", icon: FiPhone, title: "Retorno de garantia", description: "Confirmar desempenho após o reparo", due: "Amanhã", tone: "info" },
  { clientId: "brasil-cargas", icon: FiUserCheck, title: "Reativar cliente", description: "Sem movimentação há mais de 60 dias", due: "2 dias", tone: "warning" },
  { clientId: "juliano-mendes", icon: FiCalendar, title: "Revisão preventiva", description: "Oferecer inspeção anual do cardan", due: "3 dias", tone: "info" },
];

const initialFilters: ClientFilters = {
  type: "todos",
  status: "todos",
  search: "",
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const compactCurrencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  notation: "compact",
  maximumFractionDigits: 1,
});

function getStatusClass(status: ClientStatus) {
  const classes: Record<ClientStatus, string> = {
    Ativo: styles.status_active,
    Potencial: styles.status_potential,
    Inativo: styles.status_inactive,
  };

  return classes[status];
}

function getRelationshipClass(level: RelationshipLevel) {
  const classes: Record<RelationshipLevel, string> = {
    VIP: styles.relationship_vip,
    Recorrente: styles.relationship_recurring,
    Novo: styles.relationship_new,
  };

  return classes[level];
}

function getVehicleStatusClass(status: VehicleStatus) {
  const classes: Record<VehicleStatus, string> = {
    "Em dia": styles.vehicle_ok,
    "Revisão próxima": styles.vehicle_review,
    Atenção: styles.vehicle_attention,
  };

  return classes[status];
}

function getHistoryIcon(type: ClientHistory["type"]) {
  if (type === "budget") return FiFilePlus;
  if (type === "service") return FiTruck;
  return FiMessageCircle;
}

function ClientesAdmin() {
  const [draftFilters, setDraftFilters] = useState<ClientFilters>(initialFilters);
  const [activeFilters, setActiveFilters] = useState<ClientFilters>(initialFilters);
  const [selectedClientId, setSelectedClientId] = useState(clients[0].id);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);

  const summary = useMemo(
    () => clients.reduce(
      (totals, client) => ({
        active: totals.active + (client.status === "Ativo" ? 1 : 0),
        companies: totals.companies + (client.type === "Empresa" ? 1 : 0),
        revenue: totals.revenue + client.totalValue,
      }),
      { active: 0, companies: 0, revenue: 0 },
    ),
    [],
  );

  const filteredClients = useMemo(() => {
    const normalizedSearch = activeFilters.search.trim().toLocaleLowerCase("pt-BR");

    return clients
      .filter((client) => {
        const matchesType = activeFilters.type === "todos" || client.type === activeFilters.type;
        const matchesStatus = activeFilters.status === "todos" || client.status === activeFilters.status;
        const searchableText = `${client.name} ${client.document} ${client.email} ${client.city} ${client.tags.join(" ")} ${client.vehicles.map((vehicle) => vehicle.model).join(" ")}`.toLocaleLowerCase("pt-BR");
        const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);
        return matchesType && matchesStatus && matchesSearch;
      })
      .sort((clientA, clientB) => clientB.lastContactOrder - clientA.lastContactOrder);
  }, [activeFilters]);

  const pageCount = Math.max(1, Math.ceil(filteredClients.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, pageCount);
  const pageStart = (safeCurrentPage - 1) * pageSize;
  const visibleClients = filteredClients.slice(pageStart, pageStart + pageSize);
  const selectedClient = clients.find((client) => client.id === selectedClientId) ?? clients[0];
  const approvalRate = selectedClient.budgetCount > 0
    ? Math.round((selectedClient.approvedBudgetCount / selectedClient.budgetCount) * 100)
    : 0;
  const statusCounts = {
    active: clients.filter((client) => client.status === "Ativo").length,
    potential: clients.filter((client) => client.status === "Potencial").length,
    inactive: clients.filter((client) => client.status === "Inativo").length,
  };
  const activePercentage = (statusCounts.active / clients.length) * 100;
  const potentialPercentage = (statusCounts.potential / clients.length) * 100;
  const chartBackground = `conic-gradient(#1882ff 0 ${activePercentage}%, #27c875 ${activePercentage}% ${activePercentage + potentialPercentage}%, #6f7d8f ${activePercentage + potentialPercentage}% 100%)`;

  function handleFilterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setActiveFilters(draftFilters);
    setCurrentPage(1);
  }

  function handlePageSizeChange(value: number) {
    setPageSize(value);
    setCurrentPage(1);
  }

  function selectClient(clientId: string) {
    setSelectedClientId(clientId);
  }

  function filterByStatus(status: ClientFilters["status"]) {
    const nextFilters = { ...draftFilters, status };
    setDraftFilters(nextFilters);
    setActiveFilters(nextFilters);
    setCurrentPage(1);
  }

  return (
    <div className={styles.clients_page}>
      <section className={styles.summary_grid} aria-label="Resumo da carteira de clientes">
        <article className={styles.summary_card}>
          <span className={`${styles.summary_icon} ${styles.icon_blue}`}><FiUsers aria-hidden="true" /></span>
          <div><strong>{clients.length}</strong><span>Clientes cadastrados</span><small>{summary.active} ativos na carteira</small></div>
        </article>
        <article className={styles.summary_card}>
          <span className={`${styles.summary_icon} ${styles.icon_green}`}><FiUserCheck aria-hidden="true" /></span>
          <div><strong>{summary.active}</strong><span>Relacionamentos ativos</span><small>{summary.companies} contas empresariais</small></div>
        </article>
        <article className={styles.summary_card}>
          <span className={`${styles.summary_icon} ${styles.icon_amber}`}><FiClock aria-hidden="true" /></span>
          <div><strong>{followUps.length}</strong><span>Follow-ups pendentes</span><small>2 ações para hoje</small></div>
        </article>
        <article className={styles.summary_card}>
          <span className={`${styles.summary_icon} ${styles.icon_purple}`}><FiBriefcase aria-hidden="true" /></span>
          <div><strong className={styles.compact_value}>{compactCurrencyFormatter.format(summary.revenue)}</strong><span>Valor em relacionamento</span><small>Histórico aprovado</small></div>
        </article>
      </section>

      <div className={styles.workspace_grid}>
        <div className={styles.main_column}>
          <section className={`${styles.panel} ${styles.list_panel}`} aria-labelledby="client-list-title">
            <header className={styles.panel_header}>
              <div><h2 id="client-list-title">Carteira de Clientes</h2><p>Consulte contatos, veículos e histórico comercial.</p></div>
              <div className={styles.header_actions}>
                <button className={styles.secondary_button} type="button"><FiDownload aria-hidden="true" /><span>Exportar</span></button>
                <button className={styles.primary_button} type="button"><FiPlus aria-hidden="true" /><span>Novo Cliente</span></button>
              </div>
            </header>

            <form className={styles.filter_form} onSubmit={handleFilterSubmit}>
              <label className={styles.select_control} htmlFor="client-type">
                <span>Tipo:</span>
                <select id="client-type" value={draftFilters.type} onChange={(event) => setDraftFilters((filters) => ({ ...filters, type: event.target.value as ClientFilters["type"] }))}>
                  <option value="todos">Todos</option>
                  <option value="Pessoa física">Pessoa física</option>
                  <option value="Empresa">Empresa</option>
                </select>
              </label>
              <label className={styles.select_control} htmlFor="client-status">
                <span>Status:</span>
                <select id="client-status" value={draftFilters.status} onChange={(event) => setDraftFilters((filters) => ({ ...filters, status: event.target.value as ClientFilters["status"] }))}>
                  <option value="todos">Todos</option>
                  <option value="Ativo">Ativos</option>
                  <option value="Potencial">Potenciais</option>
                  <option value="Inativo">Inativos</option>
                </select>
              </label>
              <label className={styles.search_control} htmlFor="client-search">
                <FiSearch aria-hidden="true" />
                <span className={styles.visually_hidden}>Pesquisar clientes</span>
                <input id="client-search" type="search" placeholder="Buscar por nome, documento, cidade ou veículo..." value={draftFilters.search} onChange={(event) => setDraftFilters((filters) => ({ ...filters, search: event.target.value }))} />
              </label>
              <button className={styles.filter_button} type="submit"><FiFilter aria-hidden="true" /><span>Filtrar</span></button>
            </form>

            <div className={styles.table_scroll}>
              <table className={styles.client_table}>
                <thead>
                  <tr>
                    <th scope="col">Cliente</th>
                    <th scope="col">Contato</th>
                    <th scope="col">Localização</th>
                    <th scope="col">Veículos</th>
                    <th scope="col">Orçamentos</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Último contato</th>
                    <th scope="col">Status</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleClients.map((client) => (
                    <tr className={client.id === selectedClient.id ? styles.selected_row : undefined} key={client.id}>
                      <td>
                        <div className={styles.client_cell}>
                          <span className={`${styles.avatar} ${styles[`avatar_${client.avatarTone}`]}`}>{client.initials}</span>
                          <div><strong>{client.name}</strong><small>{client.type} · {client.document}</small></div>
                        </div>
                      </td>
                      <td><div className={styles.contact_cell}><span>{client.phone}</span><small>{client.email}</small></div></td>
                      <td>{client.city} - {client.state}</td>
                      <td className={styles.numeric_cell}>{client.vehicles.length}</td>
                      <td><div className={styles.budget_cell}><strong>{client.approvedBudgetCount}/{client.budgetCount}</strong><small>aprovados</small></div></td>
                      <td className={styles.numeric_cell}>{currencyFormatter.format(client.totalValue)}</td>
                      <td>{client.lastContact}</td>
                      <td><span className={`${styles.status_badge} ${getStatusClass(client.status)}`}>{client.status}</span></td>
                      <td>
                        <div className={styles.row_actions}>
                          <button type="button" title="Visualizar cliente" aria-label={`Visualizar ${client.name}`} onClick={() => selectClient(client.id)}><FiEye aria-hidden="true" /></button>
                          <button type="button" title="Editar cliente" aria-label={`Editar ${client.name}`} onClick={() => selectClient(client.id)}><FiEdit2 aria-hidden="true" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {visibleClients.length === 0 && (
                    <tr><td className={styles.empty_state} colSpan={9}>Nenhum cliente encontrado para os filtros selecionados.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            <footer className={styles.table_footer}>
              <span>
                {filteredClients.length === 0
                  ? "Nenhum cliente encontrado"
                  : `Mostrando ${pageStart + 1} a ${Math.min(pageStart + pageSize, filteredClients.length)} de ${filteredClients.length} clientes`}
              </span>
              <nav className={styles.pagination} aria-label="Paginação de clientes">
                <button type="button" aria-label="Página anterior" disabled={safeCurrentPage === 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}><FiChevronLeft aria-hidden="true" /></button>
                {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
                  <button className={page === safeCurrentPage ? styles.active_page : undefined} type="button" aria-current={page === safeCurrentPage ? "page" : undefined} onClick={() => setCurrentPage(page)} key={page}>{page}</button>
                ))}
                <button type="button" aria-label="Próxima página" disabled={safeCurrentPage === pageCount} onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))}><FiChevronRight aria-hidden="true" /></button>
              </nav>
              <label className={styles.page_size_control} htmlFor="client-page-size">
                <span className={styles.visually_hidden}>Clientes por página</span>
                <select id="client-page-size" value={pageSize} onChange={(event) => handlePageSizeChange(Number(event.target.value))}>
                  <option value={7}>7 por página</option>
                  <option value={14}>14 por página</option>
                  <option value={21}>21 por página</option>
                </select>
              </label>
            </footer>
          </section>

          <section className={`${styles.panel} ${styles.details_panel}`} aria-labelledby="client-details-title">
            <header className={styles.section_header}>
              <div className={styles.section_heading}><FiUser aria-hidden="true" /><h2 id="client-details-title">Perfil do Cliente Selecionado</h2></div>
              <div className={styles.detail_actions}>
                <button className={`${styles.icon_button} ${styles.whatsapp_button}`} type="button" title="Conversar pelo WhatsApp" aria-label={`Conversar com ${selectedClient.name} pelo WhatsApp`}><FiMessageCircle aria-hidden="true" /></button>
                <button className={styles.icon_button} type="button" title="Enviar e-mail" aria-label={`Enviar e-mail para ${selectedClient.name}`}><FiMail aria-hidden="true" /></button>
                <button className={styles.icon_button} type="button" title="Editar cliente" aria-label={`Editar ${selectedClient.name}`}><FiEdit2 aria-hidden="true" /></button>
              </div>
            </header>

            <div className={styles.client_details_grid}>
              <section className={styles.profile_overview} aria-labelledby="selected-client-name">
                <div className={styles.profile_identity}>
                  <span className={`${styles.profile_avatar} ${styles[`avatar_${selectedClient.avatarTone}`]}`}>{selectedClient.initials}</span>
                  <div>
                    <div className={styles.profile_title_row}><h3 id="selected-client-name">{selectedClient.name}</h3><span className={`${styles.relationship_badge} ${getRelationshipClass(selectedClient.relationship)}`}>{selectedClient.relationship}</span></div>
                    <span>{selectedClient.type} · Cliente desde {selectedClient.since}</span>
                  </div>
                </div>
                <dl className={styles.profile_meta}>
                  <div><FiPhone aria-hidden="true" /><dt>Telefone</dt><dd>{selectedClient.phone}</dd></div>
                  <div><FiMail aria-hidden="true" /><dt>E-mail</dt><dd>{selectedClient.email}</dd></div>
                  <div><FiMapPin aria-hidden="true" /><dt>Endereço</dt><dd>{selectedClient.address}<br />{selectedClient.city} - {selectedClient.state}</dd></div>
                </dl>
                <div className={styles.tag_list}>{selectedClient.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </section>

              <section className={styles.relationship_panel} aria-labelledby="relationship-title">
                <h3 id="relationship-title">Relacionamento Comercial</h3>
                <div className={styles.metric_grid}>
                  <div><strong>{selectedClient.budgetCount}</strong><span>Orçamentos</span></div>
                  <div><strong>{selectedClient.approvedBudgetCount}</strong><span>Aprovados</span></div>
                  <div><strong>{selectedClient.vehicles.length}</strong><span>Veículos</span></div>
                  <div><strong>{currencyFormatter.format(selectedClient.totalValue)}</strong><span>Valor acumulado</span></div>
                </div>
                <div className={styles.approval_block}>
                  <div><span>Taxa de aprovação</span><strong>{approvalRate}%</strong></div>
                  <span className={styles.approval_track}><span style={{ width: `${approvalRate}%` }} /></span>
                </div>
                <dl className={styles.relationship_meta}>
                  <div><dt>Contato preferencial</dt><dd>{selectedClient.preferredContact}</dd></div>
                  <div><dt>Último contato</dt><dd>{selectedClient.lastContact}</dd></div>
                  <div><dt>Status</dt><dd><span className={`${styles.status_badge} ${getStatusClass(selectedClient.status)}`}>{selectedClient.status}</span></dd></div>
                </dl>
                <p className={styles.client_notes}>{selectedClient.notes}</p>
              </section>

              <section className={styles.vehicles_panel} aria-labelledby="vehicles-title">
                <div className={styles.subsection_header}><h3 id="vehicles-title">Veículos Vinculados</h3><span>{selectedClient.vehicles.length}</span></div>
                <div className={styles.vehicle_list}>
                  {selectedClient.vehicles.map((vehicle) => (
                    <article className={styles.vehicle_item} key={`${vehicle.model}-${vehicle.plate}`}>
                      <span className={styles.vehicle_icon}><FiTruck aria-hidden="true" /></span>
                      <div><strong>{vehicle.model}</strong><small>{vehicle.plate} · {vehicle.year}</small><small>Último serviço: {vehicle.lastService}</small></div>
                      <span className={`${styles.vehicle_badge} ${getVehicleStatusClass(vehicle.status)}`}>{vehicle.status}</span>
                    </article>
                  ))}
                </div>
                <button className={styles.detail_link} type="button"><span>Gerenciar veículos</span><FiChevronRight aria-hidden="true" /></button>
              </section>

              <section className={styles.history_panel} aria-labelledby="history-title">
                <div className={styles.subsection_header}><h3 id="history-title">Histórico Recente</h3><FiCalendar aria-hidden="true" /></div>
                <ol className={styles.history_list}>
                  {selectedClient.history.map((event) => {
                    const HistoryIcon = getHistoryIcon(event.type);
                    return (
                      <li key={`${event.title}-${event.date}`}>
                        <span className={`${styles.history_icon} ${styles[`history_${event.type}`]}`}><HistoryIcon aria-hidden="true" /></span>
                        <div><strong>{event.title}</strong><span>{event.date}</span><small>{event.description}</small></div>
                      </li>
                    );
                  })}
                </ol>
              </section>
            </div>
          </section>
        </div>

        <aside className={styles.side_column} aria-label="Ações e acompanhamento de clientes">
          <section className={styles.panel} aria-labelledby="client-actions-title">
            <header className={styles.side_header}><FiZap aria-hidden="true" /><h2 id="client-actions-title">Ações Rápidas</h2></header>
            <div className={styles.quick_action_list}>
              {quickActions.map((action) => {
                const ActionIcon = action.icon;
                return (
                  <button className={styles.quick_action_item} type="button" key={action.title}>
                    <span className={styles.quick_action_icon}><ActionIcon aria-hidden="true" /></span>
                    <span className={styles.quick_action_text}><strong>{action.title}</strong><small>{action.description}</small></span>
                    <FiChevronRight className={styles.quick_action_arrow} aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </section>

          <section className={styles.panel} aria-labelledby="portfolio-title">
            <header className={styles.side_header}><FiUsers aria-hidden="true" /><h2 id="portfolio-title">Carteira por Status</h2></header>
            <div className={styles.portfolio_content}>
              <div className={styles.portfolio_chart} style={{ background: chartBackground }}><div><strong>{clients.length}</strong><span>Total</span></div></div>
              <div className={styles.portfolio_legend}>
                <button type="button" onClick={() => filterByStatus("Ativo")}><span className={styles.legend_blue} /><strong>Ativos</strong><small>{statusCounts.active}</small></button>
                <button type="button" onClick={() => filterByStatus("Potencial")}><span className={styles.legend_green} /><strong>Potenciais</strong><small>{statusCounts.potential}</small></button>
                <button type="button" onClick={() => filterByStatus("Inativo")}><span className={styles.legend_gray} /><strong>Inativos</strong><small>{statusCounts.inactive}</small></button>
                <button type="button" onClick={() => filterByStatus("todos")}><span className={styles.legend_all} /><strong>Ver todos</strong><small>{clients.length}</small></button>
              </div>
            </div>
          </section>

          <section className={styles.panel} aria-labelledby="follow-up-title">
            <header className={styles.side_header}><FiClock aria-hidden="true" /><h2 id="follow-up-title">Próximos Contatos</h2><span className={styles.follow_up_count}>{followUps.length}</span></header>
            <div className={styles.follow_up_list}>
              {followUps.map((followUp) => {
                const FollowUpIcon = followUp.icon;
                const client = clients.find((item) => item.id === followUp.clientId);
                if (!client) return null;
                return (
                  <button className={`${styles.follow_up_item} ${styles[`tone_${followUp.tone}`]}`} type="button" onClick={() => selectClient(client.id)} key={`${followUp.clientId}-${followUp.title}`}>
                    <FollowUpIcon className={styles.follow_up_icon} aria-hidden="true" />
                    <span className={styles.follow_up_content}><strong>{followUp.title}</strong><span>{client.name}</span><small>{followUp.description}</small></span>
                    <span className={styles.due_badge}>{followUp.due}</span>
                  </button>
                );
              })}
            </div>
            <button className={styles.view_all_button} type="button"><span>Ver agenda de contatos</span><FiChevronRight aria-hidden="true" /></button>
          </section>
        </aside>
      </div>
    </div>
  );
}

export default ClientesAdmin;
