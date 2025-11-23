// router.tsx
import Layout from "/Users/ia765/OneDrive/Documentos/Meus Projetos/LBCardans/React/src/App";
import LayoutLimpo from "/Users/ia765/OneDrive/Documentos/Meus Projetos/LBCardans/React/src/AppLimpo"
import Home from "./home";
import Sobre from "./sobre";
import Contato from "./contato";
import Oficina from "./oficina";
import Registro from './registro.tsx'
import Login from './login.tsx'
import EsqueceuSenha from './esqueceuSenha.tsx'
import RedefinirSenha from './redefinirSenha.tsx'
import Pecas from './detalhesPeças.tsx'
import Servico from './servico.tsx'
import Carrinho from './carrinho.tsx'
import ConfirmarEmail from './confirmarEmail.tsx'
import Verificar from './Verificar.tsx'
import { createHashRouter } from 'react-router-dom';

const router = createHashRouter([
  {
    element: <Layout />, 
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/sobre",
        element: <Sobre/>
      },
      {
        path: "/contato",
        element: <Contato/>
      },
      {
        path: "/oficina",
        element: <Oficina/>
      },
      {
        path: "/peca/:id",
        element: <Pecas/>
      },
      {
        path: "/carrinho",
        element: <Carrinho/>
      }
    ]
  },{
      element: <LayoutLimpo/>, 
    children: [
    {
      path: "/registro",
      element: <Registro/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/esqueceuSenha",
      element: <EsqueceuSenha/>
    },
    {
      path: "/redefinirSenha",
      element: <RedefinirSenha/>
    },
    {
      path: "/servico",
      element: <Servico/>
    },
    {
      path: "/confirmarEmail",
      element: <ConfirmarEmail/>
    },
    {
      path: "/verificar",
      element: <Verificar/>
    }
  ]
  }
]);
export default router;
