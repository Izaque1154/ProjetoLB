import Orcamento from "../models/orcamentos";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/usuario";
import { SignOptions } from "jsonwebtoken";
import crypto from "crypto";
import orcamentoites from "../models/orcamentoItens";
import transporter from "../config/configEmail";
import {Response, Request} from "express"
import fs from "fs/promises";
import path from "path";

export const criarOrcamento = async (req: Request, res: Response): Promise<void> => {
    const { servicoId, nome, telefone, veiculo, descricao, urgencia, respostaAdmin, placa, chassi } = req.body;
    const id = req.user?.id; 
    let caminhoFoto: string | null = null;

    if (!req.body) {
        res.status(400).json({ message: "Dados do orçamento incompletos" });
        return;
    }

    try {

        if(req.file) {
            const foto = req.file;
            const nomeArquivo = `${Date.now()}_${foto.originalname}`;

            const caminho = path.join(__dirname,'../uploads/orcamentos/', nomeArquivo);
            caminhoFoto = caminho;
            console.log(caminhoFoto);
            await fs.writeFile(caminhoFoto, foto.buffer);
        };

        const orcamento = await Orcamento.create({
            usuarioId: id,
            servicoId: Number(servicoId),
            nome,
            telefone,
            veiculo,
            descricao,
            urgencia,
            status: "pendente",
            respostaAdmin,
            placa,
            chassi,
            foto: req.file ? caminhoFoto : null
        });

        res.status(201).json({ message: "Orçamento criado com sucesso", orcamento });

    } catch (error) {
        res.status(500).json({ message: "Erro ao criar orçamento", error });
    }
}
