import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import type { IconType } from "react-icons";
import {
  FiAlertTriangle,
  FiArchive,
  FiBox,
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiEdit2,
  FiEye,
  FiFilter,
  FiHash,
  FiLayers,
  FiMapPin,
  FiPackage,
  FiPlus,
  FiRefreshCw,
  FiSearch,
  FiTag,
  FiTool,
  FiTruck,
  FiUploadCloud,
  FiZap,
} from "react-icons/fi";
import styles from "../css/cssAdmin/produtosAdmin.module.css";

type ProductStatus = "Ativo" | "Baixo estoque" | "Sem estoque" | "Destaque";
type StockFilter = "todos" | "disponivel" | "baixo" | "sem-estoque";
type AlertTone = "warning" | "danger" | "info";

interface Product {
  id: string;
  name: string;
  code: string;
  category: string;
  application: string;
  stock: number;
  minimumStock: number;
  price: number;
  cost: number;
  status: ProductStatus;
  image: string;
  description: string;
  manufacturer: string;
  barcode: string;
  unit: string;
  compatibility: string;
  location: string;
  specifications: string[];
  notes: string;
}

interface ProductFilters {
  category: string;
  stock: StockFilter;
  search: string;
}

interface QuickAction {
  icon: IconType;
  title: string;
  description: string;
}

interface StockAlert {
  productId: string;
  icon: IconType;
  title: string;
  description: string;
  badge: string;
  tone: AlertTone;
}

const products: Product[] = [
  {
    id: "cc-5153x",
    name: "Cruzeta Cardan 5-153X",
    code: "CC-5153X",
    category: "Cruzetas",
    application: "Ford Ranger 2012+",
    stock: 48,
    minimumStock: 10,
    price: 320,
    cost: 180,
    status: "Ativo",
    image: "/imagens/tornearia/cruzetaCardan/img01.jpg",
    description: "Cruzeta de alta resistência para cardans, projetada para transmissão de torque com máxima durabilidade e desempenho.",
    manufacturer: "Spicer",
    barcode: "7898561234567",
    unit: "Unidade",
    compatibility: "Ford Ranger 2.2 / 3.2 Diesel",
    location: "A-02-03",
    specifications: [
      "Diâmetro do copo: 27,00 mm",
      "Comprimento total: 81,00 mm",
      "Diâmetro do centro: 15,00 mm",
      "Material: aço-liga",
      "Acabamento: temperado",
    ],
    notes: "Produto original Spicer. Garantia de 6 meses contra defeitos de fabricação.",
  },
  {
    id: "rc-30",
    name: "Rolamento Central RC-30",
    code: "RC-30",
    category: "Rolamentos",
    application: "Toyota Hilux 2016+",
    stock: 15,
    minimumStock: 20,
    price: 260,
    cost: 148,
    status: "Baixo estoque",
    image: "/imagens/tornearia/rolamentoCardan/img01.jpg",
    description: "Mancal central com rolamento blindado e suporte em borracha para reduzir vibrações do conjunto cardan.",
    manufacturer: "SKF",
    barcode: "7898561234574",
    unit: "Unidade",
    compatibility: "Toyota Hilux 2.8 Diesel 2016+",
    location: "A-03-01",
    specifications: ["Diâmetro interno: 30 mm", "Rolamento blindado", "Borracha de alta densidade", "Aplicação dianteira"],
    notes: "Recomenda-se verificar alinhamento e balanceamento do cardan durante a instalação.",
  },
  {
    id: "fc-8f",
    name: "Flange Cardan 8 Furos",
    code: "FC-8F",
    category: "Flanges",
    application: "Mercedes-Benz Atego",
    stock: 0,
    minimumStock: 6,
    price: 540,
    cost: 315,
    status: "Sem estoque",
    image: "/imagens/tornearia/flange/img01.jpg",
    description: "Flange de acoplamento reforçada para linha pesada, usinada para garantir encaixe preciso e transmissão uniforme.",
    manufacturer: "Dana",
    barcode: "7898561234581",
    unit: "Unidade",
    compatibility: "Mercedes-Benz Atego 1419 / 1719",
    location: "B-01-02",
    specifications: ["Fixação: 8 furos", "Aço SAE 1045", "Usinagem CNC", "Tratamento anticorrosivo"],
    notes: "Item temporariamente indisponível. Reposição solicitada ao fornecedor.",
  },
  {
    id: "ld-40",
    name: "Luva Deslizante LD-40",
    code: "LD-40",
    category: "Luvas",
    application: "Volvo FH 540",
    stock: 22,
    minimumStock: 8,
    price: 410,
    cost: 238,
    status: "Ativo",
    image: "/imagens/tornearia/colunaDirecao/img01.jpg",
    description: "Luva estriada para compensação axial do cardan, com ajuste preciso e resistência a cargas elevadas.",
    manufacturer: "Meritor",
    barcode: "7898561234598",
    unit: "Unidade",
    compatibility: "Volvo FH 440 / 460 / 500 / 540",
    location: "B-02-04",
    specifications: ["Estriado: 40 mm", "Aço cementado", "Tolerância H7", "Lubrificação por graxeira"],
    notes: "Aplicar graxa de alta pressão antes da montagem e respeitar o alinhamento das marcações.",
  },
  {
    id: "pc-1410",
    name: "Ponteira Cardan PC-1410",
    code: "PC-1410",
    category: "Ponteiras",
    application: "Scania P310 6x2",
    stock: 8,
    minimumStock: 12,
    price: 380,
    cost: 215,
    status: "Baixo estoque",
    image: "/imagens/tornearia/barraCurta/img01.jpg",
    description: "Ponteira usinada para conjuntos cardan da linha pesada, com alta resistência à torção e encaixe controlado.",
    manufacturer: "Spicer",
    barcode: "7898561234604",
    unit: "Unidade",
    compatibility: "Scania P / G / R série 6x2",
    location: "B-03-02",
    specifications: ["Comprimento: 141 mm", "Estriado externo", "Aço SAE 8640", "Dureza: 58-62 HRC"],
    notes: "Estoque abaixo do mínimo. Nova compra recomendada para manter o giro da oficina.",
  },
  {
    id: "ms-35",
    name: "Mancal Suporte MS-35",
    code: "MS-35",
    category: "Suportes",
    application: "Iveco Daily 35S14",
    stock: 0,
    minimumStock: 5,
    price: 275,
    cost: 156,
    status: "Sem estoque",
    image: "/imagens/tornearia/rolamentoCardan/img02.jpg",
    description: "Conjunto de mancal e suporte para estabilização do eixo cardan em veículos comerciais leves.",
    manufacturer: "INA",
    barcode: "7898561234611",
    unit: "Unidade",
    compatibility: "Iveco Daily 35S14 / 45S17",
    location: "A-03-04",
    specifications: ["Diâmetro interno: 35 mm", "Suporte reforçado", "Rolamento selado", "Borracha antivibração"],
    notes: "Produto sem saldo disponível. Pedido de reposição em análise pelo setor de compras.",
  },
  {
    id: "kr-5",
    name: "Kit Reparo Cardan KR-5",
    code: "KR-5",
    category: "Kits de Reparo",
    application: "Universal",
    stock: 36,
    minimumStock: 10,
    price: 190,
    cost: 96,
    status: "Destaque",
    image: "/imagens/freio/kitRolamentoRoda/img01.jpg",
    description: "Kit de manutenção preventiva com componentes selecionados para revisão de conjuntos cardan.",
    manufacturer: "LB Cardans",
    barcode: "7898561234628",
    unit: "Kit",
    compatibility: "Aplicações universais sob conferência",
    location: "C-01-01",
    specifications: ["Anéis de vedação", "Travas de segurança", "Lubrificante técnico", "Embalagem individual"],
    notes: "Conferir medidas e aplicação antes da venda. Produto com alta rotatividade.",
  },
  {
    id: "ec-01",
    name: "Eixo Cardan Dianteiro EC-01",
    code: "EC-01",
    category: "Eixos",
    application: "Ford Ranger 2012+",
    stock: 6,
    minimumStock: 10,
    price: 1450,
    cost: 890,
    status: "Baixo estoque",
    image: "/imagens/tornearia/cardan/img01.jpg",
    description: "Eixo cardan dianteiro montado e balanceado, pronto para instalação em aplicações 4x4.",
    manufacturer: "Dana",
    barcode: "7898561234635",
    unit: "Unidade",
    compatibility: "Ford Ranger 4x4 2012+",
    location: "D-01-01",
    specifications: ["Conjunto balanceado", "Cruzetas instaladas", "Flanges usinadas", "Pintura eletrostática"],
    notes: "Peça fornecida balanceada. Evitar impactos e armazenar na posição horizontal.",
  },
  {
    id: "td-20",
    name: "Terminal Deslizante TD-20",
    code: "TD-20",
    category: "Terminais",
    application: "Volkswagen Amarok",
    stock: 12,
    minimumStock: 6,
    price: 230,
    cost: 124,
    status: "Ativo",
    image: "/imagens/tornearia/barraLonga/img01.jpg",
    description: "Terminal deslizante com tratamento térmico para compensação de curso e redução de folgas no conjunto.",
    manufacturer: "Spicer",
    barcode: "7898561234642",
    unit: "Unidade",
    compatibility: "Volkswagen Amarok 2.0 / 3.0 4Motion",
    location: "B-04-03",
    specifications: ["Curso útil: 82 mm", "Estriado de precisão", "Aço tratado", "Vedação contra contaminantes"],
    notes: "Verificar folga do tubo e condição da coifa durante a substituição.",
  },
  {
    id: "gf-28",
    name: "Garfo Cardan GF-28",
    code: "GF-28",
    category: "Garfos",
    application: "Agrale Marruá",
    stock: 18,
    minimumStock: 8,
    price: 295,
    cost: 165,
    status: "Ativo",
    image: "/imagens/tornearia/flange/img02.jpg",
    description: "Garfo para cruzeta com alojamentos usinados e geometria reforçada para trabalho severo.",
    manufacturer: "LB Cardans",
    barcode: "7898561234659",
    unit: "Unidade",
    compatibility: "Agrale Marruá AM100 / AM200",
    location: "C-02-03",
    specifications: ["Copo: 28 mm", "Aço forjado", "Usinagem CNC", "Controle dimensional individual"],
    notes: "Produto fabricado sob controle dimensional interno.",
  },
  {
    id: "pk-12",
    name: "Kit Fixação Cardan PK-12",
    code: "PK-12",
    category: "Kits de Reparo",
    application: "Linha pesada",
    stock: 4,
    minimumStock: 15,
    price: 85,
    cost: 38,
    status: "Baixo estoque",
    image: "/imagens/tornearia/cruzetaCardan/img03.jpg",
    description: "Conjunto de parafusos, porcas travantes e arruelas para fixação segura de flanges cardan.",
    manufacturer: "LB Cardans",
    barcode: "7898561234666",
    unit: "Kit",
    compatibility: "Flanges de linha pesada com 8 furos",
    location: "C-01-04",
    specifications: ["12 componentes", "Classe 10.9", "Porcas autotravantes", "Acabamento zincado"],
    notes: "Utilizar torquímetro e seguir o aperto recomendado para a aplicação.",
  },
  {
    id: "cd-210",
    name: "Cardan Completo CD-210",
    code: "CD-210",
    category: "Eixos",
    application: "Chevrolet S10 2017+",
    stock: 0,
    minimumStock: 3,
    price: 2180,
    cost: 1380,
    status: "Sem estoque",
    image: "/imagens/tornearia/cardan/img03.jpg",
    description: "Conjunto cardan completo com flanges, cruzetas e balanceamento dinâmico certificado.",
    manufacturer: "Dana",
    barcode: "7898561234673",
    unit: "Unidade",
    compatibility: "Chevrolet S10 2.8 4x4 2017+",
    location: "D-01-02",
    specifications: ["Comprimento: 1.420 mm", "Balanceamento dinâmico", "Cruzetas lubrificáveis", "Pintura anticorrosiva"],
    notes: "Disponível sob encomenda. Prazo médio de fornecimento de 7 dias úteis.",
  },
];

const quickActions: QuickAction[] = [
  { icon: FiPlus, title: "Cadastrar novo produto", description: "Adicionar novo item ao catálogo" },
  { icon: FiRefreshCw, title: "Atualizar estoque", description: "Ajustar quantidades em estoque" },
  { icon: FiEdit2, title: "Editar produto", description: "Alterar informações do produto" },
  { icon: FiUploadCloud, title: "Importar catálogo", description: "Importar produtos via planilha" },
];

const stockAlerts: StockAlert[] = [
  { productId: "pc-1410", icon: FiArchive, title: "Estoque baixo", description: "8 unidades restantes", badge: "Baixo", tone: "warning" },
  { productId: "fc-8f", icon: FiAlertTriangle, title: "Sem estoque", description: "Reposição necessária", badge: "Urgente", tone: "danger" },
  { productId: "ms-35", icon: FiAlertTriangle, title: "Sem estoque", description: "Reposição necessária", badge: "Urgente", tone: "danger" },
  { productId: "ec-01", icon: FiArchive, title: "Estoque baixo", description: "6 unidades restantes", badge: "Baixo", tone: "warning" },
  { productId: "rc-30", icon: FiRefreshCw, title: "Reposição sugerida", description: "Estoque abaixo do ideal", badge: "Reposição", tone: "info" },
];

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const initialFilters: ProductFilters = {
  category: "todas",
  stock: "todos",
  search: "",
};

function getStatusClass(status: ProductStatus) {
  const classes: Record<ProductStatus, string> = {
    Ativo: styles.status_active,
    "Baixo estoque": styles.status_low,
    "Sem estoque": styles.status_out,
    Destaque: styles.status_featured,
  };

  return classes[status];
}

function matchesStockFilter(product: Product, filter: StockFilter) {
  if (filter === "disponivel") return product.stock > product.minimumStock;
  if (filter === "baixo") return product.stock > 0 && product.stock <= product.minimumStock;
  if (filter === "sem-estoque") return product.stock === 0;
  return true;
}

function ProdutosAdmin() {
  const [draftFilters, setDraftFilters] = useState<ProductFilters>(initialFilters);
  const [activeFilters, setActiveFilters] = useState<ProductFilters>(initialFilters);
  const [selectedProductId, setSelectedProductId] = useState(products[0].id);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);

  const categoryOptions = useMemo(
    () => [...new Set(products.map((product) => product.category))].sort((a, b) => a.localeCompare(b, "pt-BR")),
    [],
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = activeFilters.search.trim().toLocaleLowerCase("pt-BR");

    return products.filter((product) => {
      const matchesCategory = activeFilters.category === "todas" || product.category === activeFilters.category;
      const matchesStock = matchesStockFilter(product, activeFilters.stock);
      const searchableText = `${product.name} ${product.code} ${product.category} ${product.application}`.toLocaleLowerCase("pt-BR");
      const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);

      return matchesCategory && matchesStock && matchesSearch;
    });
  }, [activeFilters]);

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, pageCount);
  const pageStart = (safeCurrentPage - 1) * pageSize;
  const visibleProducts = filteredProducts.slice(pageStart, pageStart + pageSize);
  const selectedProduct = products.find((product) => product.id === selectedProductId) ?? products[0];

  function handleFilterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setActiveFilters(draftFilters);
    setCurrentPage(1);
  }

  function handlePageSizeChange(value: number) {
    setPageSize(value);
    setCurrentPage(1);
  }

  function selectProduct(productId: string) {
    setSelectedProductId(productId);
  }

  return (
    <div className={styles.catalog_grid}>
      <div className={styles.main_column}>
        <section className={`${styles.panel} ${styles.catalog_panel}`} aria-labelledby="product-list-title">
          <header className={styles.panel_header}>
            <h2 id="product-list-title">Lista de Produtos</h2>

            <div className={styles.header_actions}>
              <button className={styles.secondary_button} type="button">
                <FiDownload aria-hidden="true" />
                <span>Exportar</span>
              </button>
              <button className={styles.primary_button} type="button">
                <FiPlus aria-hidden="true" />
                <span>Novo Produto</span>
              </button>
            </div>
          </header>

          <form className={styles.filter_form} onSubmit={handleFilterSubmit}>
            <label className={styles.select_control} htmlFor="product-category">
              <span>Categoria:</span>
              <select
                id="product-category"
                value={draftFilters.category}
                onChange={(event) => setDraftFilters((filters) => ({ ...filters, category: event.target.value }))}
              >
                <option value="todas">Todas</option>
                {categoryOptions.map((category) => (
                  <option value={category} key={category}>{category}</option>
                ))}
              </select>
            </label>

            <label className={styles.select_control} htmlFor="product-stock">
              <span>Estoque:</span>
              <select
                id="product-stock"
                value={draftFilters.stock}
                onChange={(event) => setDraftFilters((filters) => ({ ...filters, stock: event.target.value as StockFilter }))}
              >
                <option value="todos">Todos</option>
                <option value="disponivel">Disponível</option>
                <option value="baixo">Baixo estoque</option>
                <option value="sem-estoque">Sem estoque</option>
              </select>
            </label>

            <label className={styles.search_control} htmlFor="product-search">
              <FiSearch aria-hidden="true" />
              <span className={styles.visually_hidden}>Pesquisar produtos</span>
              <input
                id="product-search"
                type="search"
                placeholder="Buscar por nome, código ou aplicação..."
                value={draftFilters.search}
                onChange={(event) => setDraftFilters((filters) => ({ ...filters, search: event.target.value }))}
              />
            </label>

            <button className={styles.filter_button} type="submit">
              <FiFilter aria-hidden="true" />
              <span>Filtrar</span>
            </button>
          </form>

          <div className={styles.table_scroll}>
            <table className={styles.product_table}>
              <thead>
                <tr>
                  <th scope="col">Produto</th>
                  <th scope="col">Código</th>
                  <th scope="col">Categoria</th>
                  <th scope="col">Aplicação</th>
                  <th scope="col">Estoque</th>
                  <th scope="col">Preço</th>
                  <th scope="col">Status</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {visibleProducts.map((product) => (
                  <tr className={product.id === selectedProduct.id ? styles.selected_row : undefined} key={product.id}>
                    <td>
                      <div className={styles.product_cell}>
                        <img className={styles.product_thumbnail} src={product.image} alt="" loading="lazy" />
                        <strong>{product.name}</strong>
                      </div>
                    </td>
                    <td>{product.code}</td>
                    <td>{product.category}</td>
                    <td>{product.application}</td>
                    <td className={styles.numeric_cell}>{product.stock} un</td>
                    <td className={styles.numeric_cell}>{currencyFormatter.format(product.price)}</td>
                    <td>
                      <span className={`${styles.status_badge} ${getStatusClass(product.status)}`}>{product.status}</span>
                    </td>
                    <td>
                      <div className={styles.row_actions}>
                        <button
                          type="button"
                          title="Visualizar produto"
                          aria-label={`Visualizar ${product.name}`}
                          onClick={() => selectProduct(product.id)}
                        >
                          <FiEye aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          title="Editar produto"
                          aria-label={`Editar ${product.name}`}
                          onClick={() => selectProduct(product.id)}
                        >
                          <FiEdit2 aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {visibleProducts.length === 0 && (
                  <tr>
                    <td className={styles.empty_state} colSpan={8}>Nenhum produto encontrado para os filtros selecionados.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <footer className={styles.table_footer}>
            <span>
              {filteredProducts.length === 0
                ? "Nenhum produto encontrado"
                : `Mostrando ${pageStart + 1} a ${Math.min(pageStart + pageSize, filteredProducts.length)} de ${filteredProducts.length} produtos`}
            </span>

            <nav className={styles.pagination} aria-label="Paginação de produtos">
              <button
                type="button"
                aria-label="Página anterior"
                disabled={safeCurrentPage === 1}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              >
                <FiChevronLeft aria-hidden="true" />
              </button>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
                <button
                  className={page === safeCurrentPage ? styles.active_page : undefined}
                  type="button"
                  aria-current={page === safeCurrentPage ? "page" : undefined}
                  onClick={() => setCurrentPage(page)}
                  key={page}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                aria-label="Próxima página"
                disabled={safeCurrentPage === pageCount}
                onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))}
              >
                <FiChevronRight aria-hidden="true" />
              </button>
            </nav>

            <label className={styles.page_size_control} htmlFor="product-page-size">
              <span className={styles.visually_hidden}>Produtos por página</span>
              <select
                id="product-page-size"
                value={pageSize}
                onChange={(event) => handlePageSizeChange(Number(event.target.value))}
              >
                <option value={9}>9 por página</option>
                <option value={18}>18 por página</option>
                <option value={27}>27 por página</option>
              </select>
            </label>
          </footer>
        </section>

        <section className={`${styles.panel} ${styles.details_panel}`} aria-labelledby="product-details-title">
          <header className={styles.section_header}>
            <div className={styles.section_heading}>
              <FiPackage aria-hidden="true" />
              <h2 id="product-details-title">Detalhes do Produto Selecionado</h2>
            </div>
            <button className={styles.icon_button} type="button" title="Editar produto" aria-label={`Editar ${selectedProduct.name}`}>
              <FiEdit2 aria-hidden="true" />
            </button>
          </header>

          <div className={styles.product_details_grid}>
            <section className={styles.product_overview} aria-labelledby="selected-product-name">
              <div className={styles.detail_image_frame}>
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>
              <div className={styles.product_intro}>
                <div className={styles.product_title_row}>
                  <h3 id="selected-product-name">{selectedProduct.name}</h3>
                  <span className={`${styles.status_badge} ${getStatusClass(selectedProduct.status)}`}>{selectedProduct.status}</span>
                </div>
                <p>{selectedProduct.description}</p>
                <dl className={styles.product_meta}>
                  <div>
                    <FiTag aria-hidden="true" />
                    <dt>Código (SKU)</dt>
                    <dd>{selectedProduct.code}</dd>
                  </div>
                  <div>
                    <FiHash aria-hidden="true" />
                    <dt>Código de barras</dt>
                    <dd>{selectedProduct.barcode}</dd>
                  </div>
                  <div>
                    <FiBox aria-hidden="true" />
                    <dt>Unidade de medida</dt>
                    <dd>{selectedProduct.unit}</dd>
                  </div>
                </dl>
              </div>
            </section>

            <section className={styles.detail_column} aria-labelledby="catalog-data-title">
              <h3 className={styles.visually_hidden} id="catalog-data-title">Dados de catálogo</h3>
              <dl className={styles.detail_list}>
                <div>
                  <FiLayers aria-hidden="true" />
                  <dt>Categoria</dt>
                  <dd>{selectedProduct.category}</dd>
                </div>
                <div>
                  <FiTruck aria-hidden="true" />
                  <dt>Aplicação</dt>
                  <dd>{selectedProduct.application}</dd>
                </div>
                <div>
                  <FiTool aria-hidden="true" />
                  <dt>Fabricante</dt>
                  <dd>{selectedProduct.manufacturer}</dd>
                </div>
                <div>
                  <FiZap aria-hidden="true" />
                  <dt>Compatibilidade</dt>
                  <dd>{selectedProduct.compatibility}</dd>
                </div>
              </dl>
              <button className={styles.detail_link} type="button">
                <span>Ver todas as compatibilidades</span>
                <FiChevronRight aria-hidden="true" />
              </button>
            </section>

            <section className={`${styles.detail_column} ${styles.inventory_column}`} aria-labelledby="inventory-data-title">
              <h3 className={styles.visually_hidden} id="inventory-data-title">Preço e estoque</h3>
              <span className={styles.detail_label}>Preço de venda</span>
              <strong className={styles.price_value}>{currencyFormatter.format(selectedProduct.price)}</strong>
              <dl className={styles.inventory_list}>
                <div><dt>Custo</dt><dd>{currencyFormatter.format(selectedProduct.cost)}</dd></div>
                <div><dt>Estoque atual</dt><dd>{selectedProduct.stock} unidades</dd></div>
                <div><dt>Estoque mínimo</dt><dd>{selectedProduct.minimumStock} unidades</dd></div>
                <div><dt>Localização</dt><dd><FiMapPin aria-hidden="true" />{selectedProduct.location}</dd></div>
              </dl>
            </section>

            <section className={styles.detail_column} aria-labelledby="specification-title">
              <h3 className={styles.detail_label} id="specification-title">Especificações</h3>
              <ul className={styles.specification_list}>
                {selectedProduct.specifications.map((specification) => <li key={specification}>{specification}</li>)}
              </ul>
              <h3 className={styles.notes_title}>Observações</h3>
              <p className={styles.notes}>{selectedProduct.notes}</p>
            </section>
          </div>
        </section>
      </div>

      <aside className={styles.side_column} aria-label="Ações e alertas de produtos">
        <section className={styles.panel} aria-labelledby="product-actions-title">
          <header className={styles.side_header}>
            <FiZap aria-hidden="true" />
            <h2 id="product-actions-title">Ações Rápidas</h2>
          </header>
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

        <section className={styles.panel} aria-labelledby="stock-alerts-title">
          <header className={styles.side_header}>
            <FiAlertTriangle aria-hidden="true" />
            <h2 id="stock-alerts-title">Alertas de Estoque</h2>
            <span className={styles.alert_count}>{stockAlerts.length}</span>
          </header>
          <div className={styles.alert_list}>
            {stockAlerts.map((alert) => {
              const AlertIcon = alert.icon;
              const product = products.find((item) => item.id === alert.productId);
              if (!product) return null;

              return (
                <button
                  className={`${styles.alert_item} ${styles[`tone_${alert.tone}`]}`}
                  type="button"
                  onClick={() => selectProduct(product.id)}
                  aria-label={`${alert.title}: ${product.name}`}
                  key={`${alert.productId}-${alert.title}`}
                >
                  <AlertIcon className={styles.alert_icon} aria-hidden="true" />
                  <span className={styles.alert_content}>
                    <strong>{alert.title}</strong>
                    <span>{product.name}</span>
                    <small>{alert.description}</small>
                  </span>
                  <span className={styles.alert_badge}>{alert.badge}</span>
                </button>
              );
            })}
          </div>
          <button className={styles.view_all_button} type="button">
            <span>Ver todos os alertas</span>
            <FiChevronRight aria-hidden="true" />
          </button>
        </section>
      </aside>
    </div>
  );
}

export default ProdutosAdmin;
