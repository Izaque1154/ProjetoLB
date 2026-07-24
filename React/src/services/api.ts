import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

export const apiRoutes = {
    auth: {
        registrar: "/auth/registrar",
        confirmarEmail: "/auth/confirmarEmail",
        login: "/auth/login",
        esqueceuSenha: "/auth/esqueceuSenha",
        redefinirSenha: "/auth/RedefinirSenha",
        perfil: "/auth/perfil",
        reenviar: "/auth/reenviar",
        admin: "/auth/admin"
    },
    cart: {
        adicionar: "/cart/carrinho",
        item: "/cart/itemCarrinho",
        buscar: "/cart/buscarCarrinho",
        excluir: "/cart/excluir",
        comprar: "/cart/comprar",
        produtos: "/cart/produtos"
    }
}

export default api
