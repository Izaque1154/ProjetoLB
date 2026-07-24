//Dependências
import jwt from "jsonwebtoken";
import {Response, Request, NextFunction } from "express"
import dotenv from "dotenv";
import { TokenPayload, jwtPayload } from "../interfaces/interfaceAuth";
import { User } from "../models/usuario"

dotenv.config();


//middleware
async function middleware(req: Request, res: Response, next: NextFunction): Promise<any>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({erro: "Token não encontrado"})
    }

    try{
        const decoded = jwt.verify(token, process.env.SECRET as string) as jwtPayload
        req.user = decoded;
        next();
    }catch(error) {
        res.status(401).json({erro: "Token expirado"})
    }
}

async function middleware2(req: Request, res: Response, next: NextFunction): Promise<any> {
    const token = req.body.token;

    if(!token){
        return res.status(401).json({erro: "Token Expirado"})
    }

    try{
        const decoded = jwt.verify(token, process.env.SECRET as string) as TokenPayload
        req.user = decoded
        next();
    }catch(erro) {
        res.status(401).json({erro: "Token expirado"})
    }

}

async function middlewareAdmin(req: Request, res: Response, next: NextFunction): Promise<any> {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({erro: "Token Expirado"})
    }

    try{
        const decoded = jwt.verify(token, process.env.SECRET as string) as TokenPayload
        req.user = decoded
        const resp = await User.findByPk(req.user.id);
        const status = resp?.role
        if(status == "admin"){
            next();
        } else {
            return res.status(403).json({erro: "Bloqueado"})
        }
    }catch(erro) {
        res.status(401).json({erro: "Token Inválido"})
    }

}

export default {middleware, middleware2, middlewareAdmin}