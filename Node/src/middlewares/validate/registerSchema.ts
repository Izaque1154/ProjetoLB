import {Response, Request, NextFunction } from "express"
import { z } from 'zod';

const registerSchema = z.object({
    nome: z.string().min(2).max(100),
    email: z.email(),
    telefone: z.string().min(10).max(15),
    senha: z.string().min(6),
    confirmar: z.string().min(6)
})

export const validateRegister = async (req: Request, res: Response, next: NextFunction): Promise<any>  => {

    try{
        registerSchema.parse(req.body);
    } catch (error) {
        return res.status(400).json({ msg: "Houve um erro de validação", detalhes: error });
    }
    next();
}