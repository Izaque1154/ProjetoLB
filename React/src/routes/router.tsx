import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "../App";
import LayoutAdmin from "../AppAdmin";
import LayoutLimpo from "../AppLimpo";
import Carrinho from "../components/carrinho";
import ConfirmarEmail from "../components/confirmarEmail";
import Contato from "../components/contato";
import Pecas from "../components/detalhesPeças";
import EsqueceuSenha from "../components/esqueceuSenha";
import Home from "../components/home";
import Login from "../components/login";
import Oficina from "../components/oficina";
import Admin from "../components/painelAdmin/admin";
import CategoriasAdmin from "../components/painelAdmin/categoriasAdmin";
import ClientesAdmin from "../components/painelAdmin/clientesAdmin";
import ConfiguraçõesAdmin from "../components/painelAdmin/configuraçoesAdmin";
import OrçamentoAdmin from "../components/painelAdmin/orçamentoAdmin";
import ProdutosAdmin from "../components/painelAdmin/produtosAdmin";
import RelatoriosAdmin from "../components/painelAdmin/relatoriosAdmin";
import RedefinirSenha from "../components/redefinirSenha";
import Registro from "../components/registro";
import Servico from "../components/servico";
import Sobre from "../components/sobre";
import Verificar from "../components/Verificar";
import OrcamentoCliente from "../components/orcamento";

const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/sobre",
          element: <Sobre />,
        },
        {
          path: "/contato",
          element: <Contato />,
        },
        {
          path: "/oficina",
          element: <Oficina />,
        },
        {
          path: "/peca/:id",
          element: <Pecas />,
        },
        {
          path: "/carrinho",
          element: <Carrinho />,
        },
        {
          path: '/orçamento',
          element: <OrcamentoCliente/>
        },
      ],
    },
    {
      element: <LayoutLimpo />,
      children: [
        {
          path: "/registro",
          element: <Registro />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/esqueceuSenha",
          element: <EsqueceuSenha />,
        },
        {
          path: "/redefinirSenha",
          element: <RedefinirSenha />,
        },
        {
          path: "/servico",
          element: <Servico />,
        },
        {
          path: "/confirmarEmail",
          element: <ConfirmarEmail />,
        },
        {
          path: "/verificar",
          element: <Verificar />,
        },
      ],
    },
    {
      path: "/admin",
      element: <LayoutAdmin />,
      children: [
        {
          index: true,
          element: <Navigate to="dashboard" replace />,
        },
        {
          path: "dashboard",
          element: <Admin />,
        },
        {
          path: "orçamentos",
          element: <OrçamentoAdmin />,
        },
        {
          path: "produtos",
          element: <ProdutosAdmin />,
        },
        {
          path: "relatorios",
          element: <RelatoriosAdmin />,
        },
        {
          path: "configurações",
          element: <ConfiguraçõesAdmin />,
        },
        {
          path: "categorias",
          element: <CategoriasAdmin />,
        },
        {
          path: "clientes",
          element: <ClientesAdmin />,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ],
  { basename },
);

export default router;
