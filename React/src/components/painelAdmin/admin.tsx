//Dependências
import styles from "../css/cssAdmin/admin.module.css"
import { useNavigate } from "react-router-dom"

function Admin() {
    const navigate = useNavigate()

    return(
        <div className={styles.dashboard_grid}>
           {/* Cartões */}
            <section className={styles.stats_grid}>

                <article className={styles.stat_card} onClick={() => navigate("/admin/orçamentos")}>
                    <div className={styles.stat_icon}>Icon</div>

                    <div className={styles.stat_info}>
                    <strong className={styles.stat_number}>28</strong>
                    <span className={styles.stat_label}>Orçamentos Novos</span>
                    <span className={styles.stat_change}>+12 hoje</span>
                    </div>
                </article>

                <article className={styles.stat_card} onClick={() => navigate("/admin/orçamentos")}>
                    <div className={styles.stat_icon}>Icon</div>

                    <div className={styles.stat_info}>
                    <strong className={styles.stat_number}>15</strong>
                    <span className={styles.stat_label}>Em Análise</span>
                    <span className={styles.stat_change}>+4 hoje</span>
                    </div>
                </article>

                <article className={styles.stat_card} onClick={() => navigate("/admin/orçamentos")}>
                    <div className={styles.stat_icon}>Icon</div>

                    <div className={styles.stat_info}>
                    <strong className={styles.stat_number}>47</strong>
                    <span className={styles.stat_label}>Respondidos</span>
                    <span className={styles.stat_change}>+18 hoje</span>
                    </div>
                </article>

                <article className={styles.stat_card} onClick={() => navigate("/admin/orçamentos")}>
                    <div className={styles.stat_icon}>Icon</div>

                    <div className={styles.stat_info}>
                    <strong className={styles.stat_number}>342</strong>
                    <span className={styles.stat_label}>Produtos Cadastrados</span>
                    <span className={styles.stat_change}>+6 este mês</span>
                    </div>
                </article>

            </section>

            {/* Conteúdo do Dashboard */}
            <section className={styles.dashboard_content}>

                <section className={styles.recent_quotes}>

                    <div className={styles.section_header}>
                        <div className={styles.section_title}>
                            <span>Icon</span>
                            <h2>Orçamento Recentes</h2>
                        </div>

                        <button className={styles.section_action} onClick={() => navigate("/admin/orçamentos")}>
                            Ver todos
                        </button>
                    </div>

                    <div className={styles.quotes_table}>

                        <div className={styles.table_header}>
                            <span>Cliente</span>
                            <span>Veículo</span>
                            <span>Status</span>
                            <span>Data</span>
                            <span>Ação</span>
                        </div>

                        <div className={styles.table_body}>
                            <div className={styles.table_row}>
                                <div className={styles.client_cell}>
                                    <div className={styles.client_avatar}>JS</div>
                                    <span>João da Silva</span>
                                </div>

                                <span>Ford Ranger 2018</span>
                                <span>Novo</span>
                                <span>21/06/2025 10:45</span>

                                <button onClick={() => navigate("/admin/clientes")}>Ver</button>
                            </div>
                            
                        </div>

                    </div>

                </section>

            </section>
            
            {/* painel do Dashboard */}
            <aside className={styles.dashboard_aside}>
                <section className={styles.status_sumary}>

                    <div className={styles.section_header}>
                        <div className={styles.section_title}>
                            <span>Icon</span>
                            <h2>Resumo de Status</h2>
                        </div>
                    </div>

                    <div className={styles.status_content}>

                        <div className={styles.status_chart}>
                            Gráfico
                        </div>

                        <div className={styles.status_legend}>
                            <div className={styles.legend_item}>Novo</div>
                            <div className={styles.legend_item}>Em análise</div>
                            <div className={styles.legend_item}>Respondido</div>
                            <div className={styles.legend_item}>Finalizado</div>
                        </div>

                    </div>

                </section>

                <section className={styles.quick_actions}>
                    <div className={styles.section_header}>
                        <div className={styles.section_title}>
                        <span>Icon</span>
                        <h2>Ações Rápidas</h2>
                        </div>
                    </div>

                    <div className={styles.action_list}>

                        <button className={styles.quick_action_item} onClick={() => navigate("/admin/produtos")}>
                            <div className={styles.action_icon}>Icon</div>

                            <div className={styles.action_text}>
                                <strong>Cadastrar Produto</strong>
                                <span>Adicionar novo produto ao catálogo</span>
                            </div>

                            <span className={styles.action_arrow}>→</span>
                        </button>

                        <button className={styles.quick_action_item} onClick={() => navigate("/admin/orçamentos")}>
                            <div className={styles.action_icon}>Icon</div>

                            <div className={styles.action_text}>
                                <strong>Ver Orçamentos</strong>
                                <span>Acessar todos os orçamentos</span>
                            </div>

                            <span className={styles.action_arrow}>→</span>
                        </button>

                        <button className={styles.quick_action_item} onClick={() => navigate("/admin/categorias")}>
                            <div className={styles.action_icon}>Icon</div>

                            <div className={styles.action_text}>
                                <strong>Adicionar Categoria</strong>
                                <span>Criar nova categoria de produto</span>
                            </div>

                            <span className={styles.action_arrow}>→</span>
                        </button>

                    </div>
                </section>
            </aside>
        </div>
    )
}

export default Admin
