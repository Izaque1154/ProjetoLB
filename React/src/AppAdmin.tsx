import { useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./components/css/cssAdmin/appAdmin.module.css";
import api, { apiRoutes } from "./services/api";
import { useNavigate } from "react-router-dom";

const adminPages = [
  {
    path: "dashboard",
    label: "Dashboard",
    title: "Dashboard",
    subtitle: "Visão geral do sistema",
  },
  {
    path: "orçamentos",
    label: "Orçamentos",
    title: "Orçamentos",
    subtitle: "Acompanhe as solicitações dos clientes",
  },
  {
    path: "produtos",
    label: "Produtos",
    title: "Produtos",
    subtitle: "Gerencie os produtos cadastrados",
  },
  {
    path: "categorias",
    label: "Categorias",
    title: "Categorias",
    subtitle: "Organize as categorias de produtos",
  },
  {
    path: "clientes",
    label: "Clientes",
    title: "Clientes",
    subtitle: "Consulte os clientes cadastrados",
  },
  {
    path: "relatorios",
    label: "Relatórios",
    title: "Relatórios",
    subtitle: "Visualize os indicadores da empresa",
  },
  {
    path: "configurações",
    label: "Configurações",
    title: "Configurações",
    subtitle: "Ajuste as preferências do painel",
  },
];

export default function LayoutAdmin() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage =
    adminPages.find(({ path }) =>
      decodeURI(location.pathname).endsWith(`/admin/${path}`),
    ) ?? adminPages[0];

  useEffect(() => {
    api
      .post(apiRoutes.auth.admin, {})
      .then((res) => console.log(res))
      .catch(() => console.log("opa"));
  }, []);

  return (
    <div className={styles.admin_layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebar_brand}>
          <div className={styles.brand_logo}>Logo</div>
          <div className={styles.brand_name}>LB Cardans</div>
        </div>

        <nav className={styles.sidebar_nav} aria-label="Navegação administrativa">
          {adminPages.map((page) => (
            <NavLink
              key={page.path}
              to={page.path}
              className={({ isActive }) =>
                `${styles.nav_item} ${isActive ? styles.nav_item_active : ""}`
              }
            >
              {page.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.sidebar_support}>
          <div className={styles.support_icon}>Icon</div>

          <div className={styles.support_info}>
            <span>Suporte Técnico</span>
            <strong>(15) 99765-6006</strong>
          </div>
        </div>
      </aside>

      <div className={styles.admin_area}>
        <header className={styles.admin_header}>
          <div className={styles.header_left}>
            <button
              className={styles.menu_button}
              type="button"
              aria-label="Abrir menu"
            >
              ☰
            </button>

            <div className={styles.page_title_group}>
              <h1>{currentPage.title}</h1>
              <p>{currentPage.subtitle}</p>
            </div>
          </div>

          <div className={styles.header_search}>
            <span className={styles.search_icon}>Icon</span>
            <input placeholder="Pesquisar..." aria-label="Pesquisar" />
            <span className={styles.search_shortcut}>Ctrl + K</span>
          </div>

          <div className={styles.header_right}>
            <button
              className={styles.notification_button}
              type="button"
              aria-label="Notificações"
            >
              Sino
            </button>

            <button className={styles.user_profile} onClick={() => navigate('/admin/configurações')}>
              <div className={styles.user_avatar}>A</div>

              <div className={styles.user_info}>
                <strong>Administrador</strong>
                <span>admin@lbcardans.com</span>
              </div>
            </button>
          </div>
        </header>

        <main className={styles.admin_main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
