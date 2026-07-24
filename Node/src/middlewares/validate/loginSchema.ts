import { z } from 'zod';
import {Response, Request, NextFunction } from "express"

const loginSchema = z.object({
    email: z.string().email(),
    senha: z.string().min(6)
})

export const validateLogin = async (req: Request, res: Response, next: NextFunction): Promise<any>  => {

    try{
        loginSchema.parse(req.body);
    } catch (error) {
        return res.status(400).json({ erro: error});
    }
    next();
}