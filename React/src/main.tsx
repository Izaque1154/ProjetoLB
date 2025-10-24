import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Sobre from './components/sobre.tsx'
import Contato from './components/contato.tsx'
import Registro from './components/registro.tsx'
import Login from './components/login.tsx'
import Oficina from './components/oficina.tsx'
import EsqueceuSenha from './components/esqueceuSenha.tsx'
import RedefinirSenha from './components/redefinirSenha.tsx'
import Peças from './components/detalhesPeças.tsx'
import Servico from './components/servico.tsx'
import Carrinho from './components/carrinho.tsx'
import ConfirmarEmail from './components/confirmarEmail.tsx'
import Verificar from './components/Verificar.tsx'
import path from 'path'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App/>
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
      path: "/registro",
      element: <Registro/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/oficina",
      element: <Oficina/>
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
      path: "/peça/:id",
      element: <Peças/>
    },
    {
      path: "/servico",
      element: <Servico/>
    },
    {
      path: "/carrinho",
      element: <Carrinho/>
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
)

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
