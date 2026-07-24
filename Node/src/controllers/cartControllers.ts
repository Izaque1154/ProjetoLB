//Dependências
import Carrinho from "../models/carrinho";
import { produtos } from "../models/produtos";
import {Response, Request} from "express"

//Carrinho
export const carrinho = async(req: Request, res: Response): Promise<any> =>{
    const idUser: number = Number(req.user.id);
    const { peca } = req.body;
    if (!idUser || peca === undefined || peca === null){
        return res.status(404).json({erro: "token invalido"});
    };
    try{
        const resp = await Carrinho.findOne({where: {idUser: idUser, peca: peca}});
        if(resp === null){
            await Carrinho.create({
                idUser: idUser,
                peca: peca
            });
            return res.status(200).json({res: "Item adicionado ao carrinho"});
        }
        return res.status(200).json({res: "Item já existe no carrinho"});
    }catch(error){
        return res.status(500).json({erro: "Carrinho vazio"});
    };
};

//Função para consultar o carrinho
export const itemCarrinho =  async(req: Request, res: Response): Promise<any> =>{
    const idUser: number = Number(req.user.id);
    const {peca} = req.body;
    if (!idUser || peca === undefined || peca === null){
        return res.status(404).json({erro: "token invalido"});
    };
    try{
        const resp = await Carrinho.findOne({where: {
            idUser: idUser, 
            peca: peca}});
        if(!resp){
            return res.status(500).json({erro: "Peça não encontrada"});
        };
        return res.status(200).json({msg: "item já existe no carrinho"});
    }catch(error){
        return res.status(400).json({erro: "Carrinho vazio"});
    };
};

//Função para buscar item no carrinho
export const buscarCarrinho = async(req: Request, res: Response): Promise<any> =>{
    const idUser: number = Number(req.user.id);
     
    if(!idUser){
        return res.status(404).json({erro: "Token invalido"});
    };
    try{
        const resp = await Carrinho.findAll({where: {idUser: idUser}});
        return res.status(200).json({msg: resp});
    }catch(erro){
        return res.status(400).json({erro: "Nenhum item no carrinho"});
    };
};

//Excluir item no carrinho
export const excluir = async(req: Request, res: Response): Promise<any> =>{
    const idUser: number = Number(req.user.id);
    const {peca} = req.body;
    
    if(!idUser || idUser === null){
        return res.status(404).json({erro: "Token invalido"});
    };
    try{
        await Carrinho.destroy({where: {peca: peca, idUser: idUser}});
        return res.status(200).json({msg: "item apagado"});
    }catch(erro){
        return res.status(400).json({erro: "item não encontrado"});
    };
};

//Comprar item no carrinho
export const comprar = async(req: Request, res: Response): Promise<any> =>{
    const idUser: number = Number(req.user.id);
    
    if(!idUser || idUser === null){
        return res.status(404).json({erro: "Token invalido"});
    };
    try{
        await Carrinho.destroy({where: {idUser: idUser}});
        return res.status(200).json({msg: "item apagado"});
    }catch(erro){
        return res.status(400).json({erro: "item não encontrado"});
    };
};

//exibir produtos 
export const exibirProduto = async(req: Request, res: Response): Promise<any> => { 
    try{
        const listaProdutos = await produtos.findAll();
        return res.status(200).json({produtos: listaProdutos});
    } catch(erro){
        return res.status(400).json({erro});
    };
};
