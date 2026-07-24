import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import type { IconType } from "react-icons";
import {
  FiActivity,
  FiAlertTriangle,
  FiBarChart2,
  FiCalendar,
  FiCheckCircle,
  FiChevronRight,
  FiDollarSign,
  FiDownload,
  FiFileText,
  FiFilter,
  FiPackage,
  FiPieChart,
  FiRefreshCw,
  FiShoppingBag,
  FiTrendingDown,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import styles from "../css/cssAdmin/relatoriosAdmin.module.css";

type PeriodKey = "7d" | "30d" | "90d" | "year";
type MovementType = "Entrada" | "Saída" | "Ajuste";
type InsightTone = "positive" | "warning" | "danger" | "info";

interface RevenuePoint {
  label: string;
  current: number;
  previous: number;
}

interface FunnelStage {
  label: string;
  value: number;
  color: string;
}

interface CategorySale {
  name: string;
  value: number;
  color: string;
}

interface ReportDataset {
  label: string;
  range: string;
  comparisonLabel: string;
  revenue: number;
  previousRevenue: number;
  budgets: number;
  previousBudgets: number;
  approvalRate: number;
  previousApprovalRate: number;
  averageTicket: number;
  previousAverageTicket: number;
  revenueSeries: RevenuePoint[];
  funnel: FunnelStage[];
  categorySales: CategorySale[];
}

interface ProductPerformance {
  name: string;
  code: string;
  category: string;
  baseUnits: number;
  baseRevenue: number;
  trend: number;
}

interface StockMovement {
  product: string;
  code: string;
  type: MovementType;
  quantity: number;
  date: string;
  responsible: string;
}

interface Insight {
  icon: IconType;
  title: string;
  description: string;
  value: string;
  tone: InsightTone;
}

const reportDatasets: Record<PeriodKey, ReportDataset> = {
  "7d": {
    label: "Últimos 7 dias",
    range: "17 a 23 de julho de 2026",
    comparisonLabel: "10 a 16 de julho",
    revenue: 90800,
    previousRevenue: 82400,
    budgets: 31,
    previousBudgets: 28,
    approvalRate: 55,
    previousApprovalRate: 49,
    averageTicket: 4324,
    previousAverageTicket: 4120,
    revenueSeries: [
      { label: "17 Jul", current: 8400, previous: 7600 },
      { label: "18 Jul", current: 12800, previous: 10400 },
      { label: "19 Jul", current: 10300, previous: 11900 },
      { label: "20 Jul", current: 14700, previous: 12100 },
      { label: "21 Jul", current: 9600, previous: 10800 },
      { label: "22 Jul", current: 16100, previous: 14300 },
      { label: "23 Jul", current: 18900, previous: 15300 },
    ],
    funnel: [
      { label: "Solicitados", value: 31, color: "#1f86ff" },
      { label: "Em análise", value: 25, color: "#42a2ff" },
      { label: "Respondidos", value: 22, color: "#28c878" },
      { label: "Aprovados", value: 17, color: "#f4b928" },
      { label: "Finalizados", value: 14, color: "#9b6cff" },
    ],
    categorySales: [
      { name: "Eixos e Cardans", value: 28600, color: "#1782ff" },
      { name: "Kits de Reparo", value: 18400, color: "#26c978" },
      { name: "Cruzetas", value: 15200, color: "#f2b72a" },
      { name: "Rolamentos", value: 12600, color: "#b36aff" },
      { name: "Outros", value: 16000, color: "#65758a" },
    ],
  },
  "30d": {
    label: "Últimos 30 dias",
    range: "24 de junho a 23 de julho de 2026",
    comparisonLabel: "25 de maio a 23 de junho",
    revenue: 280000,
    previousRevenue: 247500,
    budgets: 78,
    previousBudgets: 71,
    approvalRate: 68,
    previousApprovalRate: 62,
    averageTicket: 5283,
    previousAverageTicket: 4890,
    revenueSeries: [
      { label: "Sem. 1", current: 58200, previous: 53600 },
      { label: "Sem. 2", current: 71400, previous: 62400 },
      { label: "Sem. 3", current: 65800, previous: 60300 },
      { label: "Sem. 4", current: 84600, previous: 71200 },
    ],
    funnel: [
      { label: "Solicitados", value: 78, color: "#1f86ff" },
      { label: "Em análise", value: 64, color: "#42a2ff" },
      { label: "Respondidos", value: 57, color: "#28c878" },
      { label: "Aprovados", value: 53, color: "#f4b928" },
      { label: "Finalizados", value: 46, color: "#9b6cff" },
    ],
    categorySales: [
      { name: "Eixos e Cardans", value: 89600, color: "#1782ff" },
      { name: "Kits de Reparo", value: 57100, color: "#26c978" },
      { name: "Cruzetas", value: 46800, color: "#f2b72a" },
      { name: "Rolamentos", value: 39200, color: "#b36aff" },
      { name: "Outros", value: 47300, color: "#65758a" },
    ],
  },
  "90d": {
    label: "Últimos 90 dias",
    range: "25 de abril a 23 de julho de 2026",
    comparisonLabel: "25 de janeiro a 24 de abril",
    revenue: 702000,
    previousRevenue: 631400,
    budgets: 211,
    previousBudgets: 196,
    approvalRate: 66,
    previousApprovalRate: 61,
    averageTicket: 5049,
    previousAverageTicket: 4780,
    revenueSeries: [
      { label: "Maio", current: 198000, previous: 184200 },
      { label: "Junho", current: 224000, previous: 203100 },
      { label: "Julho", current: 280000, previous: 244100 },
    ],
    funnel: [
      { label: "Solicitados", value: 211, color: "#1f86ff" },
      { label: "Em análise", value: 176, color: "#42a2ff" },
      { label: "Respondidos", value: 159, color: "#28c878" },
      { label: "Aprovados", value: 139, color: "#f4b928" },
      { label: "Finalizados", value: 126, color: "#9b6cff" },
    ],
    categorySales: [
      { name: "Eixos e Cardans", value: 221000, color: "#1782ff" },
      { name: "Kits de Reparo", value: 139000, color: "#26c978" },
      { name: "Cruzetas", value: 118000, color: "#f2b72a" },
      { name: "Rolamentos", value: 96000, color: "#b36aff" },
      { name: "Outros", value: 128000, color: "#65758a" },
    ],
  },
  year: {
    label: "Ano de 2026",
    range: "1 de janeiro a 23 de julho de 2026",
    comparisonLabel: "Mesmo período de 2025",
    revenue: 1452000,
    previousRevenue: 1289000,
    budgets: 438,
    previousBudgets: 401,
    approvalRate: 65,
    previousApprovalRate: 59,
    averageTicket: 5105,
    previousAverageTicket: 4720,
    revenueSeries: [
      { label: "Jan", current: 162000, previous: 148000 },
      { label: "Fev", current: 176000, previous: 159000 },
      { label: "Mar", current: 198000, previous: 174000 },
      { label: "Abr", current: 214000, previous: 190000 },
      { label: "Mai", current: 198000, previous: 184200 },
      { label: "Jun", current: 224000, previous: 203100 },
      { label: "Jul", current: 280000, previous: 230700 },
    ],
    funnel: [
      { label: "Solicitados", value: 438, color: "#1f86ff" },
      { label: "Em análise", value: 361, color: "#42a2ff" },
      { label: "Respondidos", value: 324, color: "#28c878" },
      { label: "Aprovados", value: 285, color: "#f4b928" },
      { label: "Finalizados", value: 259, color: "#9b6cff" },
    ],
    categorySales: [
      { name: "Eixos e Cardans", value: 462000, color: "#1782ff" },
      { name: "Kits de Reparo", value: 288000, color: "#26c978" },
      { name: "Cruzetas", value: 241000, color: "#f2b72a" },
      { name: "Rolamentos", value: 194000, color: "#b36aff" },
      { name: "Outros", value: 267000, color: "#65758a" },
    ],
  },
};

const topProducts: ProductPerformance[] = [
  { name: "Eixo Cardan Dianteiro EC-01", code: "EC-01", category: "Eixos e Cardans", baseUnits: 18, baseRevenue: 26100, trend: 18.4 },
  { name: "Cruzeta Cardan 5-153X", code: "CC-5153X", category: "Cruzetas", baseUnits: 64, baseRevenue: 20480, trend: 12.8 },
  { name: "Flange Cardan 8 Furos", code: "FC-8F", category: "Flanges", baseUnits: 31, baseRevenue: 16740, trend: -3.2 },
  { name: "Luva Deslizante LD-40", code: "LD-40", category: "Luvas", baseUnits: 36, baseRevenue: 14760, trend: 9.7 },
  { name: "Rolamento Central RC-30", code: "RC-30", category: "Rolamentos", baseUnits: 52, baseRevenue: 13520, trend: 6.1 },
];

const stockMovements: StockMovement[] = [
  { product: "Cruzeta Cardan 5-153X", code: "CC-5153X", type: "Entrada", quantity: 30, date: "23/07 09:18", responsible: "Marcos Lima" },
  { product: "Eixo Cardan Dianteiro EC-01", code: "EC-01", type: "Saída", quantity: 2, date: "23/07 08:42", responsible: "Ana Costa" },
  { product: "Rolamento Central RC-30", code: "RC-30", type: "Ajuste", quantity: 3, date: "22/07 17:05", responsible: "Sistema" },
  { product: "Kit Reparo Cardan KR-5", code: "KR-5", type: "Saída", quantity: 5, date: "22/07 15:30", responsible: "Éder Souza" },
  { product: "Flange Cardan 8 Furos", code: "FC-8F", type: "Saída", quantity: 1, date: "22/07 14:12", responsible: "Ana Costa" },
];

const insights: Insight[] = [
  { icon: FiTrendingUp, title: "Conversão em alta", description: "Aprovação cresceu em relação ao período anterior.", value: "+6,0 p.p.", tone: "positive" },
  { icon: FiAlertTriangle, title: "Estoque crítico", description: "Cinco produtos de alto giro precisam de reposição.", value: "5 itens", tone: "danger" },
  { icon: FiShoppingBag, title: "Categoria em destaque", description: "Eixos e Cardans lidera o faturamento atual.", value: "32%", tone: "info" },
  { icon: FiUsers, title: "Oportunidade comercial", description: "Sete clientes inativos podem ser reativados.", value: "7 clientes", tone: "warning" },
];

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

function calculateDelta(current: number, previous: number) {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

function getMovementClass(type: MovementType) {
  const classes: Record<MovementType, string> = {
    Entrada: styles.movement_in,
    Saída: styles.movement_out,
    Ajuste: styles.movement_adjustment,
  };

  return classes[type];
}

function buildCategoryChart(categories: CategorySale[]) {
  const total = categories.reduce((sum, category) => sum + category.value, 0);
  let accumulated = 0;
  const stops = categories.map((category) => {
    const start = accumulated;
    accumulated += (category.value / total) * 100;
    return `${category.color} ${start}% ${accumulated}%`;
  });
  return `conic-gradient(${stops.join(", ")})`;
}

function RelatoriosAdmin() {
  const [draftPeriod, setDraftPeriod] = useState<PeriodKey>("30d");
  const [activePeriod, setActivePeriod] = useState<PeriodKey>("30d");
  const [compareEnabled, setCompareEnabled] = useState(true);

  const report = reportDatasets[activePeriod];
  const maxRevenuePoint = Math.max(...report.revenueSeries.flatMap((point) => [point.current, point.previous]));
  const maxFunnelValue = report.funnel[0]?.value ?? 1;
  const productScale = report.revenue / reportDatasets["30d"].revenue;
  const categoryChart = useMemo(() => buildCategoryChart(report.categorySales), [report.categorySales]);

  const kpis = [
    {
      icon: FiDollarSign,
      label: "Faturamento",
      value: compactCurrencyFormatter.format(report.revenue),
      previous: report.previousRevenue,
      current: report.revenue,
      helper: report.range,
      tone: "blue",
    },
    {
      icon: FiFileText,
      label: "Orçamentos",
      value: String(report.budgets),
      previous: report.previousBudgets,
      current: report.budgets,
      helper: `${report.funnel[report.funnel.length - 1]?.value ?? 0} serviços finalizados`,
      tone: "purple",
    },
    {
      icon: FiCheckCircle,
      label: "Taxa de aprovação",
      value: `${report.approvalRate}%`,
      previous: report.previousApprovalRate,
      current: report.approvalRate,
      helper: "Orçamentos aprovados",
      tone: "green",
    },
    {
      icon: FiBarChart2,
      label: "Ticket médio",
      value: currencyFormatter.format(report.averageTicket),
      previous: report.previousAverageTicket,
      current: report.averageTicket,
      helper: "Por orçamento aprovado",
      tone: "amber",
    },
  ];

  function handleFilterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setActivePeriod(draftPeriod);
  }

  return (
    <div className={styles.reports_page}>
      <section className={`${styles.panel} ${styles.report_toolbar}`} aria-labelledby="report-center-title">
        <div className={styles.toolbar_title}>
          <span className={styles.toolbar_icon}><FiActivity aria-hidden="true" /></span>
          <div><h2 id="report-center-title">Central de Relatórios</h2><p>Indicadores comerciais, financeiros e operacionais consolidados.</p></div>
        </div>

        <form className={styles.report_filters} onSubmit={handleFilterSubmit}>
          <label className={styles.period_control} htmlFor="report-period">
            <FiCalendar aria-hidden="true" />
            <span>Período</span>
            <select id="report-period" value={draftPeriod} onChange={(event) => setDraftPeriod(event.target.value as PeriodKey)}>
              <option value="7d">Últimos 7 dias</option>
              <option value="30d">Últimos 30 dias</option>
              <option value="90d">Últimos 90 dias</option>
              <option value="year">Ano de 2026</option>
            </select>
          </label>

          <label className={styles.compare_control} htmlFor="compare-period">
            <input id="compare-period" type="checkbox" checked={compareEnabled} onChange={(event) => setCompareEnabled(event.target.checked)} />
            <span className={styles.toggle_track}><span /></span>
            <span>Comparar período</span>
          </label>

          <button className={styles.filter_button} type="submit"><FiFilter aria-hidden="true" /><span>Aplicar</span></button>
        </form>

        <div className={styles.export_actions}>
          <button type="button"><FiDownload aria-hidden="true" /><span>PDF</span></button>
          <button className={styles.primary_export} type="button"><FiDownload aria-hidden="true" /><span>Excel</span></button>
        </div>
      </section>

      <section className={styles.summary_grid} aria-label="Principais indicadores do período">
        {kpis.map((kpi) => {
          const KpiIcon = kpi.icon;
          const delta = calculateDelta(kpi.current, kpi.previous);
          const DeltaIcon = delta >= 0 ? FiTrendingUp : FiTrendingDown;
          return (
            <article className={styles.summary_card} key={kpi.label}>
              <span className={`${styles.summary_icon} ${styles[`icon_${kpi.tone}`]}`}><KpiIcon aria-hidden="true" /></span>
              <div className={styles.summary_content}>
                <span>{kpi.label}</span>
                <strong>{kpi.value}</strong>
                <small>{kpi.helper}</small>
              </div>
              {compareEnabled && (
                <span className={`${styles.delta_badge} ${delta >= 0 ? styles.delta_positive : styles.delta_negative}`}>
                  <DeltaIcon aria-hidden="true" />{Math.abs(delta).toFixed(1)}%
                </span>
              )}
            </article>
          );
        })}
      </section>

      <div className={styles.analytics_grid}>
        <div className={styles.main_column}>
          <section className={`${styles.panel} ${styles.revenue_panel}`} aria-labelledby="revenue-title">
            <header className={styles.panel_header}>
              <div><FiBarChart2 aria-hidden="true" /><div><h2 id="revenue-title">Evolução do Faturamento</h2><p>{report.range}</p></div></div>
              <div className={styles.chart_legend}>
                <span><i className={styles.legend_current} />{report.label}</span>
                {compareEnabled && <span><i className={styles.legend_previous} />{report.comparisonLabel}</span>}
              </div>
            </header>

            <div className={styles.revenue_summary}>
              <strong>{currencyFormatter.format(report.revenue)}</strong>
              <span>Faturamento acumulado no período</span>
            </div>

            <div className={styles.chart_area}>
              <div className={styles.grid_lines} aria-hidden="true"><span /><span /><span /><span /></div>
              <div className={styles.bar_chart}>
                {report.revenueSeries.map((point) => (
                  <div className={styles.bar_column} key={point.label}>
                    <div className={styles.bar_group}>
                      {compareEnabled && (
                        <span className={`${styles.bar} ${styles.bar_previous}`} style={{ height: `${(point.previous / maxRevenuePoint) * 100}%` }} title={`${point.label}, período anterior: ${currencyFormatter.format(point.previous)}`} />
                      )}
                      <span className={`${styles.bar} ${styles.bar_current}`} style={{ height: `${(point.current / maxRevenuePoint) * 100}%` }} title={`${point.label}: ${currencyFormatter.format(point.current)}`}>
                        <span className={styles.bar_value}>{compactCurrencyFormatter.format(point.current)}</span>
                      </span>
                    </div>
                    <span className={styles.bar_label}>{point.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className={styles.data_grid}>
            <section className={`${styles.panel} ${styles.table_panel}`} aria-labelledby="products-performance-title">
              <header className={styles.compact_header}><div><FiPackage aria-hidden="true" /><h2 id="products-performance-title">Produtos com Melhor Desempenho</h2></div><button type="button">Ver catálogo <FiChevronRight aria-hidden="true" /></button></header>
              <div className={styles.table_scroll}>
                <table className={styles.performance_table}>
                  <thead><tr><th scope="col">Produto</th><th scope="col">Categoria</th><th scope="col">Unidades</th><th scope="col">Faturamento</th><th scope="col">Tendência</th></tr></thead>
                  <tbody>
                    {topProducts.map((product) => (
                      <tr key={product.code}>
                        <td><div className={styles.product_cell}><span>{product.code.slice(0, 2)}</span><div><strong>{product.name}</strong><small>{product.code}</small></div></div></td>
                        <td>{product.category}</td>
                        <td>{Math.max(1, Math.round(product.baseUnits * productScale))}</td>
                        <td>{currencyFormatter.format(product.baseRevenue * productScale)}</td>
                        <td><span className={`${styles.trend_value} ${product.trend >= 0 ? styles.trend_up : styles.trend_down}`}>{product.trend >= 0 ? <FiTrendingUp aria-hidden="true" /> : <FiTrendingDown aria-hidden="true" />}{Math.abs(product.trend).toFixed(1)}%</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className={`${styles.panel} ${styles.table_panel}`} aria-labelledby="stock-movements-title">
              <header className={styles.compact_header}><div><FiRefreshCw aria-hidden="true" /><h2 id="stock-movements-title">Movimentações Recentes</h2></div><button type="button">Ver estoque <FiChevronRight aria-hidden="true" /></button></header>
              <div className={styles.table_scroll}>
                <table className={styles.movement_table}>
                  <thead><tr><th scope="col">Produto</th><th scope="col">Tipo</th><th scope="col">Qtd.</th><th scope="col">Data</th><th scope="col">Responsável</th></tr></thead>
                  <tbody>
                    {stockMovements.map((movement) => (
                      <tr key={`${movement.code}-${movement.date}`}>
                        <td><div><strong>{movement.product}</strong><small>{movement.code}</small></div></td>
                        <td><span className={`${styles.movement_badge} ${getMovementClass(movement.type)}`}>{movement.type}</span></td>
                        <td>{movement.type === "Saída" ? "-" : "+"}{movement.quantity}</td>
                        <td>{movement.date}</td>
                        <td>{movement.responsible}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>

        <aside className={styles.side_column} aria-label="Indicadores complementares">
          <section className={styles.panel} aria-labelledby="funnel-title">
            <header className={styles.side_header}><FiFilter aria-hidden="true" /><h2 id="funnel-title">Funil de Orçamentos</h2></header>
            <div className={styles.funnel_list}>
              {report.funnel.map((stage, index) => {
                const previousStage = report.funnel[index - 1];
                const stageRate = previousStage ? Math.round((stage.value / previousStage.value) * 100) : 100;
                return (
                  <div className={styles.funnel_item} key={stage.label}>
                    <div><span>{stage.label}</span><strong>{stage.value}</strong></div>
                    <span className={styles.funnel_track}><span style={{ width: `${(stage.value / maxFunnelValue) * 100}%`, background: stage.color }} /></span>
                    <small>{index === 0 ? "100% das solicitações" : `${stageRate}% da etapa anterior`}</small>
                  </div>
                );
              })}
            </div>
            <div className={styles.funnel_result}><FiCheckCircle aria-hidden="true" /><div><span>Conversão geral</span><strong>{report.approvalRate}% aprovados</strong></div></div>
          </section>

          <section className={styles.panel} aria-labelledby="category-sales-title">
            <header className={styles.side_header}><FiPieChart aria-hidden="true" /><h2 id="category-sales-title">Faturamento por Categoria</h2></header>
            <div className={styles.category_chart_content}>
              <div className={styles.category_chart} style={{ background: categoryChart }}><div><strong>{compactCurrencyFormatter.format(report.revenue)}</strong><span>Total</span></div></div>
              <div className={styles.category_legend}>
                {report.categorySales.map((category) => (
                  <div key={category.name}><span style={{ background: category.color }} /><strong>{category.name}</strong><small>{Math.round((category.value / report.revenue) * 100)}%</small></div>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.panel} aria-labelledby="insights-title">
            <header className={styles.side_header}><FiActivity aria-hidden="true" /><h2 id="insights-title">Insights do Período</h2><span className={styles.insight_count}>{insights.length}</span></header>
            <div className={styles.insight_list}>
              {insights.map((insight) => {
                const InsightIcon = insight.icon;
                return (
                  <article className={`${styles.insight_item} ${styles[`insight_${insight.tone}`]}`} key={insight.title}>
                    <InsightIcon aria-hidden="true" />
                    <div><strong>{insight.title}</strong><small>{insight.description}</small></div>
                    <span>{insight.value}</span>
                  </article>
                );
              })}
            </div>
            <button className={styles.refresh_button} type="button"><FiRefreshCw aria-hidden="true" /><span>Atualizado em 23/07/2026 às 11:42</span></button>
          </section>
        </aside>
      </div>
    </div>
  );
}

export default RelatoriosAdmin;
