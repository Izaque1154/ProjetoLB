import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import type { IconType } from "react-icons";
import {
  FiAlertTriangle,
  FiArchive,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiEdit2,
  FiEye,
  FiFilter,
  FiFolder,
  FiGrid,
  FiLayers,
  FiLink2,
  FiMove,
  FiPackage,
  FiPlus,
  FiSearch,
  FiSliders,
  FiTag,
  FiTrendingUp,
  FiUploadCloud,
  FiZap,
} from "react-icons/fi";
import styles from "../css/cssAdmin/categoriasAdmin.module.css";

type CategoryStatus = "Ativa" | "Em revisão" | "Inativa";
type ProductStockStatus = "Normal" | "Baixo" | "Sem estoque";
type TaskTone = "warning" | "danger" | "info";
type CategorySort = "name" | "products" | "alerts" | "updated";

interface CategoryProduct {
  name: string;
  code: string;
  image: string;
  stock: number;
  status: ProductStockStatus;
}

interface Category {
  id: string;
  code: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  status: CategoryStatus;
  productCount: number;
  availableCount: number;
  lowStockCount: number;
  outOfStockCount: number;
  featuredCount: number;
  owner: string;
  averageMargin: number;
  updatedAt: string;
  updatedOrder: number;
  tags: string[];
  applications: string[];
  sampleProducts: CategoryProduct[];
}

interface CategoryFilters {
  status: "todas" | CategoryStatus;
  sort: CategorySort;
  search: string;
}

interface QuickAction {
  icon: IconType;
  title: string;
  description: string;
}

interface OrganizationTask {
  categoryId?: string;
  icon: IconType;
  title: string;
  description: string;
  badge: string;
  tone: TaskTone;
}

const categories: Category[] = [
  {
    id: "cruzetas",
    code: "CAT-CRZ",
    name: "Cruzetas",
    slug: "cruzetas",
    description: "Cruzetas para transmissão cardan de veículos leves, utilitários e linha pesada.",
    image: "/imagens/tornearia/cruzetaCardan/img01.jpg",
    status: "Ativa",
    productCount: 28,
    availableCount: 24,
    lowStockCount: 3,
    outOfStockCount: 1,
    featuredCount: 6,
    owner: "Equipe Catálogo",
    averageMargin: 43,
    updatedAt: "22/07/2026",
    updatedOrder: 20260722,
    tags: ["Cardan", "Transmissão", "Alta rotação"],
    applications: ["Ford Ranger", "Toyota Hilux", "Chevrolet S10", "Linha pesada"],
    sampleProducts: [
      { name: "Cruzeta Cardan 5-153X", code: "CC-5153X", image: "/imagens/tornearia/cruzetaCardan/img01.jpg", stock: 48, status: "Normal" },
      { name: "Cruzeta Reforçada CR-27", code: "CR-27", image: "/imagens/tornearia/cruzetaCardan/img02.jpg", stock: 9, status: "Baixo" },
      { name: "Cruzeta Linha Pesada 6-4X", code: "CP-64X", image: "/imagens/tornearia/cruzetaCardan/img03.jpg", stock: 0, status: "Sem estoque" },
    ],
  },
  {
    id: "rolamentos",
    code: "CAT-ROL",
    name: "Rolamentos",
    slug: "rolamentos-cardans",
    description: "Rolamentos centrais, mancais e conjuntos de apoio para eixos cardan.",
    image: "/imagens/tornearia/rolamentoCardan/img01.jpg",
    status: "Ativa",
    productCount: 34,
    availableCount: 30,
    lowStockCount: 3,
    outOfStockCount: 1,
    featuredCount: 8,
    owner: "Marcos Lima",
    averageMargin: 38,
    updatedAt: "21/07/2026",
    updatedOrder: 20260721,
    tags: ["Rolamentos", "Mancais", "Antivibração"],
    applications: ["Toyota Hilux", "Iveco Daily", "Mercedes-Benz Sprinter"],
    sampleProducts: [
      { name: "Rolamento Central RC-30", code: "RC-30", image: "/imagens/tornearia/rolamentoCardan/img01.jpg", stock: 15, status: "Baixo" },
      { name: "Mancal Cardan RC-35", code: "RC-35", image: "/imagens/tornearia/rolamentoCardan/img02.jpg", stock: 26, status: "Normal" },
      { name: "Suporte com Rolamento RC-40", code: "RC-40", image: "/imagens/tornearia/rolamentoCardan/img03.jpg", stock: 18, status: "Normal" },
    ],
  },
  {
    id: "flanges",
    code: "CAT-FLG",
    name: "Flanges",
    slug: "flanges-cardans",
    description: "Flanges, garfos e acoplamentos usinados para transmissão de alto torque.",
    image: "/imagens/tornearia/flange/img01.jpg",
    status: "Em revisão",
    productCount: 21,
    availableCount: 16,
    lowStockCount: 3,
    outOfStockCount: 2,
    featuredCount: 4,
    owner: "Ana Costa",
    averageMargin: 36,
    updatedAt: "19/07/2026",
    updatedOrder: 20260719,
    tags: ["Flanges", "Acoplamento", "Linha pesada"],
    applications: ["Mercedes-Benz Atego", "Scania Série P", "Volvo FH"],
    sampleProducts: [
      { name: "Flange Cardan 8 Furos", code: "FC-8F", image: "/imagens/tornearia/flange/img01.jpg", stock: 0, status: "Sem estoque" },
      { name: "Garfo Flange GF-28", code: "GF-28", image: "/imagens/tornearia/flange/img02.jpg", stock: 18, status: "Normal" },
      { name: "Flange Reforçada FR-10", code: "FR-10", image: "/imagens/tornearia/flange/img03.jpg", stock: 7, status: "Baixo" },
    ],
  },
  {
    id: "eixos-cardans",
    code: "CAT-EIX",
    name: "Eixos e Cardans",
    slug: "eixos-e-cardans",
    description: "Eixos completos, tubos e conjuntos cardan balanceados para reposição.",
    image: "/imagens/tornearia/cardan/img01.jpg",
    status: "Ativa",
    productCount: 18,
    availableCount: 14,
    lowStockCount: 3,
    outOfStockCount: 1,
    featuredCount: 5,
    owner: "Equipe Técnica",
    averageMargin: 34,
    updatedAt: "20/07/2026",
    updatedOrder: 20260720,
    tags: ["Eixos", "Cardan completo", "Balanceado"],
    applications: ["Ford Ranger", "Chevrolet S10", "Volkswagen Amarok"],
    sampleProducts: [
      { name: "Eixo Cardan Dianteiro EC-01", code: "EC-01", image: "/imagens/tornearia/cardan/img01.jpg", stock: 6, status: "Baixo" },
      { name: "Cardan Completo CD-210", code: "CD-210", image: "/imagens/tornearia/cardan/img02.jpg", stock: 0, status: "Sem estoque" },
      { name: "Eixo Traseiro ET-180", code: "ET-180", image: "/imagens/tornearia/cardan/img03.jpg", stock: 11, status: "Normal" },
    ],
  },
  {
    id: "kits-reparo",
    code: "CAT-KIT",
    name: "Kits de Reparo",
    slug: "kits-de-reparo",
    description: "Kits completos para manutenção preventiva, vedação e recuperação de conjuntos.",
    image: "/imagens/freio/kitRolamentoRoda/img01.jpg",
    status: "Ativa",
    productCount: 42,
    availableCount: 39,
    lowStockCount: 2,
    outOfStockCount: 1,
    featuredCount: 12,
    owner: "Equipe Catálogo",
    averageMargin: 51,
    updatedAt: "23/07/2026",
    updatedOrder: 20260723,
    tags: ["Kits", "Manutenção", "Reposição rápida"],
    applications: ["Universal", "Linha leve", "Linha pesada"],
    sampleProducts: [
      { name: "Kit Reparo Cardan KR-5", code: "KR-5", image: "/imagens/freio/kitRolamentoRoda/img01.jpg", stock: 36, status: "Normal" },
      { name: "Kit Fixação PK-12", code: "PK-12", image: "/imagens/tornearia/cruzetaCardan/img03.jpg", stock: 4, status: "Baixo" },
      { name: "Kit Vedação KV-08", code: "KV-08", image: "/imagens/freio/kitReparoCilindroMestre/img01.jpg", stock: 22, status: "Normal" },
    ],
  },
  {
    id: "ponteiras",
    code: "CAT-PON",
    name: "Ponteiras",
    slug: "ponteiras-cardans",
    description: "Ponteiras e terminais usinados para aplicações de carga leve e severa.",
    image: "/imagens/tornearia/barraCurta/img01.jpg",
    status: "Ativa",
    productCount: 16,
    availableCount: 13,
    lowStockCount: 2,
    outOfStockCount: 1,
    featuredCount: 3,
    owner: "Marcos Lima",
    averageMargin: 41,
    updatedAt: "18/07/2026",
    updatedOrder: 20260718,
    tags: ["Ponteiras", "Usinados", "Estriados"],
    applications: ["Scania P310", "Agrale Marruá", "Implementos"],
    sampleProducts: [
      { name: "Ponteira Cardan PC-1410", code: "PC-1410", image: "/imagens/tornearia/barraCurta/img01.jpg", stock: 8, status: "Baixo" },
      { name: "Ponteira Estriada PE-32", code: "PE-32", image: "/imagens/tornearia/barraCurta/img02.jpg", stock: 14, status: "Normal" },
      { name: "Terminal Forjado TF-40", code: "TF-40", image: "/imagens/tornearia/barraCurta/img03.jpg", stock: 9, status: "Normal" },
    ],
  },
  {
    id: "luvas",
    code: "CAT-LUV",
    name: "Luvas Deslizantes",
    slug: "luvas-deslizantes",
    description: "Luvas estriadas e componentes para compensação axial do conjunto cardan.",
    image: "/imagens/tornearia/colunaDirecao/img01.jpg",
    status: "Ativa",
    productCount: 14,
    availableCount: 12,
    lowStockCount: 2,
    outOfStockCount: 0,
    featuredCount: 3,
    owner: "Ana Costa",
    averageMargin: 44,
    updatedAt: "17/07/2026",
    updatedOrder: 20260717,
    tags: ["Luvas", "Estriados", "Compensação axial"],
    applications: ["Volvo FH", "Volkswagen Delivery", "Linha agrícola"],
    sampleProducts: [
      { name: "Luva Deslizante LD-40", code: "LD-40", image: "/imagens/tornearia/colunaDirecao/img01.jpg", stock: 22, status: "Normal" },
      { name: "Luva Estriada LE-32", code: "LE-32", image: "/imagens/tornearia/colunaDirecao/img02.jpg", stock: 10, status: "Baixo" },
      { name: "Luva Reforçada LR-45", code: "LR-45", image: "/imagens/tornearia/colunaDirecao/img03.jpg", stock: 16, status: "Normal" },
    ],
  },
  {
    id: "suportes-mancais",
    code: "CAT-MAN",
    name: "Suportes e Mancais",
    slug: "suportes-e-mancais",
    description: "Suportes com rolamento, borrachas antivibração e mancais de centro.",
    image: "/imagens/tornearia/rolamentoCardan/img02.jpg",
    status: "Em revisão",
    productCount: 19,
    availableCount: 14,
    lowStockCount: 3,
    outOfStockCount: 2,
    featuredCount: 4,
    owner: "Equipe Técnica",
    averageMargin: 39,
    updatedAt: "14/07/2026",
    updatedOrder: 20260714,
    tags: ["Mancais", "Suportes", "Antivibração"],
    applications: ["Iveco Daily", "Sprinter", "Renault Master"],
    sampleProducts: [
      { name: "Mancal Suporte MS-35", code: "MS-35", image: "/imagens/tornearia/rolamentoCardan/img02.jpg", stock: 0, status: "Sem estoque" },
      { name: "Suporte Central SC-30", code: "SC-30", image: "/imagens/tornearia/rolamentoCardan/img01.jpg", stock: 13, status: "Normal" },
      { name: "Mancal Reforçado MR-40", code: "MR-40", image: "/imagens/tornearia/rolamentoCardan/img03.jpg", stock: 5, status: "Baixo" },
    ],
  },
  {
    id: "terminais",
    code: "CAT-TER",
    name: "Terminais",
    slug: "terminais-deslizantes",
    description: "Terminais longos, curtos e deslizantes para montagem e recuperação de eixos.",
    image: "/imagens/tornearia/barraLonga/img01.jpg",
    status: "Ativa",
    productCount: 23,
    availableCount: 21,
    lowStockCount: 2,
    outOfStockCount: 0,
    featuredCount: 5,
    owner: "Marcos Lima",
    averageMargin: 42,
    updatedAt: "16/07/2026",
    updatedOrder: 20260716,
    tags: ["Terminais", "Barras", "Direção"],
    applications: ["Volkswagen Amarok", "Linha agrícola", "Implementos"],
    sampleProducts: [
      { name: "Terminal Deslizante TD-20", code: "TD-20", image: "/imagens/tornearia/barraLonga/img01.jpg", stock: 12, status: "Normal" },
      { name: "Terminal Longo TL-42", code: "TL-42", image: "/imagens/tornearia/barraLonga/img02.jpg", stock: 18, status: "Normal" },
      { name: "Terminal Curto TC-25", code: "TC-25", image: "/imagens/tornearia/barraLonga/img03.jpg", stock: 7, status: "Baixo" },
    ],
  },
  {
    id: "freios",
    code: "CAT-FRE",
    name: "Componentes de Freio",
    slug: "componentes-de-freio",
    description: "Válvulas, cilindros, cubos e componentes para sistemas de freio e suspensão.",
    image: "/imagens/freio/cuboRodaDianteiro/img01.jpg",
    status: "Ativa",
    productCount: 38,
    availableCount: 36,
    lowStockCount: 2,
    outOfStockCount: 0,
    featuredCount: 9,
    owner: "Ana Costa",
    averageMargin: 47,
    updatedAt: "22/07/2026",
    updatedOrder: 20260722,
    tags: ["Freios", "Suspensão", "Linha pesada"],
    applications: ["Caminhões", "Ônibus", "Utilitários"],
    sampleProducts: [
      { name: "Cubo de Roda Dianteiro", code: "CRD-31", image: "/imagens/freio/cuboRodaDianteiro/img01.jpg", stock: 17, status: "Normal" },
      { name: "Válvula de Pedal", code: "VP-23", image: "/imagens/freio/valvulaPedal/img01.jpg", stock: 9, status: "Baixo" },
      { name: "Servo Freio a Ar", code: "SFA-29", image: "/imagens/freio/servoFreioAr/img01.jpg", stock: 14, status: "Normal" },
    ],
  },
  {
    id: "hidraulica",
    code: "CAT-HID",
    name: "Componentes Hidráulicos",
    slug: "componentes-hidraulicos",
    description: "Bombas e componentes hidráulicos mantidos para consultas e pedidos especiais.",
    image: "/imagens/tornearia/bombaHidraulica/img01.jpg",
    status: "Inativa",
    productCount: 12,
    availableCount: 9,
    lowStockCount: 2,
    outOfStockCount: 1,
    featuredCount: 0,
    owner: "Equipe Técnica",
    averageMargin: 32,
    updatedAt: "02/06/2026",
    updatedOrder: 20260602,
    tags: ["Hidráulica", "Bombas", "Sob encomenda"],
    applications: ["Implementos", "Máquinas", "Linha agrícola"],
    sampleProducts: [
      { name: "Bomba Hidráulica BH-05", code: "BH-05", image: "/imagens/tornearia/bombaHidraulica/img01.jpg", stock: 9, status: "Normal" },
      { name: "Bomba Direcional BD-08", code: "BD-08", image: "/imagens/tornearia/bombaHidraulica/img02.jpg", stock: 2, status: "Baixo" },
      { name: "Conjunto Hidráulico CH-12", code: "CH-12", image: "/imagens/tornearia/bombaHidraulica/img03.jpg", stock: 0, status: "Sem estoque" },
    ],
  },
];

const quickActions: QuickAction[] = [
  { icon: FiPlus, title: "Nova categoria", description: "Criar uma estrutura de catálogo" },
  { icon: FiMove, title: "Reorganizar catálogo", description: "Alterar ordem e hierarquia" },
  { icon: FiLink2, title: "Vincular produtos", description: "Mover itens entre categorias" },
  { icon: FiUploadCloud, title: "Importar estrutura", description: "Cadastrar categorias por planilha" },
];

const organizationTasks: OrganizationTask[] = [
  { categoryId: "flanges", icon: FiEdit2, title: "Revisar descrição", description: "Flanges possui conteúdo incompleto", badge: "Revisar", tone: "warning" },
  { categoryId: "suportes-mancais", icon: FiAlertTriangle, title: "Estoque crítico", description: "5 produtos exigem atenção", badge: "Urgente", tone: "danger" },
  { icon: FiArchive, title: "Produtos sem categoria", description: "7 itens aguardam classificação", badge: "7 itens", tone: "info" },
  { categoryId: "hidraulica", icon: FiSliders, title: "Categoria inativa", description: "Definir destino para 12 produtos", badge: "Ajustar", tone: "warning" },
];

const initialFilters: CategoryFilters = {
  status: "todas",
  sort: "products",
  search: "",
};

function getCategoryStatusClass(status: CategoryStatus) {
  const classes: Record<CategoryStatus, string> = {
    Ativa: styles.status_active,
    "Em revisão": styles.status_review,
    Inativa: styles.status_inactive,
  };

  return classes[status];
}

function getProductStockClass(status: ProductStockStatus) {
  const classes: Record<ProductStockStatus, string> = {
    Normal: styles.stock_normal,
    Baixo: styles.stock_low,
    "Sem estoque": styles.stock_out,
  };

  return classes[status];
}

function CategoriasAdmin() {
  const [draftFilters, setDraftFilters] = useState<CategoryFilters>(initialFilters);
  const [activeFilters, setActiveFilters] = useState<CategoryFilters>(initialFilters);
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0].id);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);

  const summary = useMemo(
    () => categories.reduce(
      (totals, category) => ({
        products: totals.products + category.productCount,
        active: totals.active + (category.status === "Ativa" ? 1 : 0),
        alerts: totals.alerts + category.lowStockCount + category.outOfStockCount,
        featured: totals.featured + category.featuredCount,
      }),
      { products: 0, active: 0, alerts: 0, featured: 0 },
    ),
    [],
  );

  const filteredCategories = useMemo(() => {
    const normalizedSearch = activeFilters.search.trim().toLocaleLowerCase("pt-BR");
    const result = categories.filter((category) => {
      const matchesStatus = activeFilters.status === "todas" || category.status === activeFilters.status;
      const searchableText = `${category.name} ${category.code} ${category.slug} ${category.tags.join(" ")}`.toLocaleLowerCase("pt-BR");
      const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);
      return matchesStatus && matchesSearch;
    });

    return result.sort((categoryA, categoryB) => {
      if (activeFilters.sort === "name") return categoryA.name.localeCompare(categoryB.name, "pt-BR");
      if (activeFilters.sort === "alerts") {
        return (categoryB.lowStockCount + categoryB.outOfStockCount) - (categoryA.lowStockCount + categoryA.outOfStockCount);
      }
      if (activeFilters.sort === "updated") return categoryB.updatedOrder - categoryA.updatedOrder;
      return categoryB.productCount - categoryA.productCount;
    });
  }, [activeFilters]);

  const pageCount = Math.max(1, Math.ceil(filteredCategories.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, pageCount);
  const pageStart = (safeCurrentPage - 1) * pageSize;
  const visibleCategories = filteredCategories.slice(pageStart, pageStart + pageSize);
  const selectedCategory = categories.find((category) => category.id === selectedCategoryId) ?? categories[0];
  const stockCoverage = Math.round((selectedCategory.availableCount / selectedCategory.productCount) * 100);
  const distributionCategories = [...categories].sort((a, b) => b.productCount - a.productCount).slice(0, 6);
  const maxCategorySize = distributionCategories[0]?.productCount ?? 1;

  function handleFilterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setActiveFilters(draftFilters);
    setCurrentPage(1);
  }

  function handlePageSizeChange(value: number) {
    setPageSize(value);
    setCurrentPage(1);
  }

  function selectCategory(categoryId: string) {
    setSelectedCategoryId(categoryId);
  }

  return (
    <div className={styles.categories_page}>
      <section className={styles.summary_grid} aria-label="Resumo das categorias">
        <article className={styles.summary_card}>
          <span className={`${styles.summary_icon} ${styles.icon_blue}`}><FiGrid aria-hidden="true" /></span>
          <div><strong>{summary.active}</strong><span>Categorias ativas</span><small>{categories.length} cadastradas</small></div>
        </article>
        <article className={styles.summary_card}>
          <span className={`${styles.summary_icon} ${styles.icon_green}`}><FiPackage aria-hidden="true" /></span>
          <div><strong>{summary.products}</strong><span>Produtos organizados</span><small>{summary.featured} em destaque</small></div>
        </article>
        <article className={styles.summary_card}>
          <span className={`${styles.summary_icon} ${styles.icon_amber}`}><FiAlertTriangle aria-hidden="true" /></span>
          <div><strong>{summary.alerts}</strong><span>Alertas de estoque</span><small>Em todas as categorias</small></div>
        </article>
        <article className={styles.summary_card}>
          <span className={`${styles.summary_icon} ${styles.icon_purple}`}><FiArchive aria-hidden="true" /></span>
          <div><strong>7</strong><span>Sem categoria</span><small>Aguardando organização</small></div>
        </article>
      </section>

      <div className={styles.workspace_grid}>
        <div className={styles.main_column}>
          <section className={`${styles.panel} ${styles.list_panel}`} aria-labelledby="category-list-title">
            <header className={styles.panel_header}>
              <div>
                <h2 id="category-list-title">Estrutura do Catálogo</h2>
                <p>Organize famílias de produtos, disponibilidade e aplicações.</p>
              </div>
              <div className={styles.header_actions}>
                <button className={styles.secondary_button} type="button"><FiDownload aria-hidden="true" /><span>Exportar</span></button>
                <button className={styles.primary_button} type="button"><FiPlus aria-hidden="true" /><span>Nova Categoria</span></button>
              </div>
            </header>

            <form className={styles.filter_form} onSubmit={handleFilterSubmit}>
              <label className={styles.select_control} htmlFor="category-status">
                <span>Status:</span>
                <select
                  id="category-status"
                  value={draftFilters.status}
                  onChange={(event) => setDraftFilters((filters) => ({ ...filters, status: event.target.value as CategoryFilters["status"] }))}
                >
                  <option value="todas">Todas</option>
                  <option value="Ativa">Ativas</option>
                  <option value="Em revisão">Em revisão</option>
                  <option value="Inativa">Inativas</option>
                </select>
              </label>

              <label className={styles.select_control} htmlFor="category-sort">
                <span>Ordenar:</span>
                <select
                  id="category-sort"
                  value={draftFilters.sort}
                  onChange={(event) => setDraftFilters((filters) => ({ ...filters, sort: event.target.value as CategorySort }))}
                >
                  <option value="products">Mais produtos</option>
                  <option value="alerts">Mais alertas</option>
                  <option value="updated">Atualização recente</option>
                  <option value="name">Nome A-Z</option>
                </select>
              </label>

              <label className={styles.search_control} htmlFor="category-search">
                <FiSearch aria-hidden="true" />
                <span className={styles.visually_hidden}>Pesquisar categorias</span>
                <input
                  id="category-search"
                  type="search"
                  placeholder="Buscar por nome, código ou tag..."
                  value={draftFilters.search}
                  onChange={(event) => setDraftFilters((filters) => ({ ...filters, search: event.target.value }))}
                />
              </label>

              <button className={styles.filter_button} type="submit"><FiFilter aria-hidden="true" /><span>Filtrar</span></button>
            </form>

            <div className={styles.table_scroll}>
              <table className={styles.category_table}>
                <thead>
                  <tr>
                    <th scope="col">Categoria</th>
                    <th scope="col">Código</th>
                    <th scope="col">Produtos</th>
                    <th scope="col">Disponíveis</th>
                    <th scope="col">Alertas</th>
                    <th scope="col">Status</th>
                    <th scope="col">Atualização</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleCategories.map((category) => {
                    const alertCount = category.lowStockCount + category.outOfStockCount;
                    return (
                      <tr className={category.id === selectedCategory.id ? styles.selected_row : undefined} key={category.id}>
                        <td>
                          <div className={styles.category_cell}>
                            <img src={category.image} alt="" loading="lazy" />
                            <div><strong>{category.name}</strong><small>{category.description}</small></div>
                          </div>
                        </td>
                        <td>{category.code}</td>
                        <td className={styles.numeric_cell}>{category.productCount}</td>
                        <td className={styles.numeric_cell}>{category.availableCount} de {category.productCount}</td>
                        <td>
                          <span className={`${styles.alert_value} ${alertCount > 4 ? styles.alert_value_critical : ""}`}>{alertCount}</span>
                        </td>
                        <td><span className={`${styles.status_badge} ${getCategoryStatusClass(category.status)}`}>{category.status}</span></td>
                        <td>{category.updatedAt}</td>
                        <td>
                          <div className={styles.row_actions}>
                            <button type="button" title="Visualizar categoria" aria-label={`Visualizar ${category.name}`} onClick={() => selectCategory(category.id)}><FiEye aria-hidden="true" /></button>
                            <button type="button" title="Editar categoria" aria-label={`Editar ${category.name}`} onClick={() => selectCategory(category.id)}><FiEdit2 aria-hidden="true" /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {visibleCategories.length === 0 && (
                    <tr><td className={styles.empty_state} colSpan={8}>Nenhuma categoria encontrada para os filtros selecionados.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            <footer className={styles.table_footer}>
              <span>
                {filteredCategories.length === 0
                  ? "Nenhuma categoria encontrada"
                  : `Mostrando ${pageStart + 1} a ${Math.min(pageStart + pageSize, filteredCategories.length)} de ${filteredCategories.length} categorias`}
              </span>
              <nav className={styles.pagination} aria-label="Paginação de categorias">
                <button type="button" aria-label="Página anterior" disabled={safeCurrentPage === 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}><FiChevronLeft aria-hidden="true" /></button>
                {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
                  <button className={page === safeCurrentPage ? styles.active_page : undefined} type="button" aria-current={page === safeCurrentPage ? "page" : undefined} onClick={() => setCurrentPage(page)} key={page}>{page}</button>
                ))}
                <button type="button" aria-label="Próxima página" disabled={safeCurrentPage === pageCount} onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))}><FiChevronRight aria-hidden="true" /></button>
              </nav>
              <label className={styles.page_size_control} htmlFor="category-page-size">
                <span className={styles.visually_hidden}>Categorias por página</span>
                <select id="category-page-size" value={pageSize} onChange={(event) => handlePageSizeChange(Number(event.target.value))}>
                  <option value={7}>7 por página</option>
                  <option value={14}>14 por página</option>
                  <option value={21}>21 por página</option>
                </select>
              </label>
            </footer>
          </section>

          <section className={`${styles.panel} ${styles.details_panel}`} aria-labelledby="category-details-title">
            <header className={styles.section_header}>
              <div className={styles.section_heading}><FiFolder aria-hidden="true" /><h2 id="category-details-title">Detalhes da Categoria Selecionada</h2></div>
              <button className={styles.icon_button} type="button" title="Editar categoria" aria-label={`Editar ${selectedCategory.name}`}><FiEdit2 aria-hidden="true" /></button>
            </header>

            <div className={styles.category_details_grid}>
              <section className={styles.category_overview} aria-labelledby="selected-category-name">
                <div className={styles.category_image_frame}><img src={selectedCategory.image} alt={selectedCategory.name} /></div>
                <div className={styles.category_intro}>
                  <div className={styles.category_title_row}>
                    <h3 id="selected-category-name">{selectedCategory.name}</h3>
                    <span className={`${styles.status_badge} ${getCategoryStatusClass(selectedCategory.status)}`}>{selectedCategory.status}</span>
                  </div>
                  <p>{selectedCategory.description}</p>
                  <dl className={styles.category_meta}>
                    <div><FiTag aria-hidden="true" /><dt>Código</dt><dd>{selectedCategory.code}</dd></div>
                    <div><FiLink2 aria-hidden="true" /><dt>Slug</dt><dd>/{selectedCategory.slug}</dd></div>
                    <div><FiCheckCircle aria-hidden="true" /><dt>Responsável</dt><dd>{selectedCategory.owner}</dd></div>
                  </dl>
                </div>
              </section>

              <section className={styles.catalog_health} aria-labelledby="catalog-health-title">
                <h3 id="catalog-health-title">Saúde do Catálogo</h3>
                <div className={styles.metric_grid}>
                  <div><strong>{selectedCategory.productCount}</strong><span>Produtos</span></div>
                  <div><strong>{selectedCategory.availableCount}</strong><span>Disponíveis</span></div>
                  <div><strong>{selectedCategory.lowStockCount}</strong><span>Estoque baixo</span></div>
                  <div><strong>{selectedCategory.outOfStockCount}</strong><span>Sem estoque</span></div>
                </div>
                <div className={styles.coverage_block}>
                  <div><span>Cobertura saudável</span><strong>{stockCoverage}%</strong></div>
                  <span className={styles.coverage_track}><span style={{ width: `${stockCoverage}%` }} /></span>
                </div>
                <dl className={styles.health_meta}>
                  <div><dt>Produtos em destaque</dt><dd>{selectedCategory.featuredCount}</dd></div>
                  <div><dt>Margem média</dt><dd>{selectedCategory.averageMargin}%</dd></div>
                  <div><dt>Última atualização</dt><dd>{selectedCategory.updatedAt}</dd></div>
                </dl>
              </section>

              <section className={styles.taxonomy_panel} aria-labelledby="taxonomy-title">
                <h3 id="taxonomy-title">Organização e Aplicações</h3>
                <span className={styles.detail_label}>Tags do catálogo</span>
                <div className={styles.tag_list}>{selectedCategory.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <span className={styles.detail_label}>Principais aplicações</span>
                <ul className={styles.application_list}>{selectedCategory.applications.map((application) => <li key={application}>{application}</li>)}</ul>
              </section>

              <section className={styles.top_products} aria-labelledby="top-products-title">
                <div className={styles.subsection_header}><h3 id="top-products-title">Produtos de Maior Giro</h3><FiTrendingUp aria-hidden="true" /></div>
                <div className={styles.top_product_list}>
                  {selectedCategory.sampleProducts.map((product) => (
                    <article className={styles.top_product_item} key={product.code}>
                      <img src={product.image} alt="" loading="lazy" />
                      <div><strong>{product.name}</strong><small>{product.code} · {product.stock} un</small></div>
                      <span className={`${styles.stock_badge} ${getProductStockClass(product.status)}`}>{product.status}</span>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </section>
        </div>

        <aside className={styles.side_column} aria-label="Ferramentas de organização do catálogo">
          <section className={styles.panel} aria-labelledby="category-actions-title">
            <header className={styles.side_header}><FiZap aria-hidden="true" /><h2 id="category-actions-title">Ações Rápidas</h2></header>
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

          <section className={styles.panel} aria-labelledby="distribution-title">
            <header className={styles.side_header}><FiLayers aria-hidden="true" /><h2 id="distribution-title">Distribuição do Catálogo</h2></header>
            <div className={styles.distribution_list}>
              {distributionCategories.map((category) => (
                <button type="button" onClick={() => selectCategory(category.id)} key={category.id}>
                  <span><strong>{category.name}</strong><small>{category.productCount} produtos</small></span>
                  <span className={styles.distribution_track}><span style={{ width: `${(category.productCount / maxCategorySize) * 100}%` }} /></span>
                </button>
              ))}
            </div>
          </section>

          <section className={styles.panel} aria-labelledby="organization-title">
            <header className={styles.side_header}><FiSliders aria-hidden="true" /><h2 id="organization-title">Pendências de Organização</h2><span className={styles.task_count}>{organizationTasks.length}</span></header>
            <div className={styles.task_list}>
              {organizationTasks.map((task) => {
                const TaskIcon = task.icon;
                return (
                  <button
                    className={`${styles.task_item} ${styles[`tone_${task.tone}`]}`}
                    type="button"
                    onClick={() => task.categoryId && selectCategory(task.categoryId)}
                    key={`${task.title}-${task.description}`}
                  >
                    <TaskIcon className={styles.task_icon} aria-hidden="true" />
                    <span className={styles.task_content}><strong>{task.title}</strong><small>{task.description}</small></span>
                    <span className={styles.task_badge}>{task.badge}</span>
                  </button>
                );
              })}
            </div>
            <button className={styles.view_all_button} type="button"><span>Ver todas as pendências</span><FiChevronRight aria-hidden="true" /></button>
          </section>
        </aside>
      </div>
    </div>
  );
}

export default CategoriasAdmin;
