import { z } from 'zod';
import {Response, Request, NextFunction } from "express"

const redefinirSenhaSchema = z.object({
    senha: z.string().min(6),
    confirmSenha: z.string().min(6),
    token: z.string()
})

export const validateRedefinirSenha = async (req: Request, res: Response, next: NextFunction): Promise<any>  => {

    try{
        redefinirSenhaSchema.parse(req.body);
    } catch (error) {
        return res.status(400).json({ erro: error});
    }
    next();
}
