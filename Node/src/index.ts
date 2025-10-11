//Dependências
import dotenv from "dotenv";
import express from "express";
import cors from 'cors';
import axios from "axios";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "./tabelas";
import Carrinho from "./tabelas";
import cookieParser from "cookie-parser";
import { SignOptions } from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer"
import { text } from "body-parser";
import transporter from "./configEmail";
import {Response, Request, NextFunction } from "express"
import { template } from "handlebars";

//Configurações
dotenv.config();
const app: express.Application = express();
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


//Interface RegistroBody{
interface jwtPayload{
    id: number;
    email: string;
};
interface TokenPayload {
  id: number;
  email: string;
}

//Rotas

    //middleware
async function middleware(req: Request, res: Response, next: NextFunction): Promise<any>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({erro: "Token não encontrado"})
    }

    try{
        const decoded = jwt.verify(token, process.env.SECRET as string) as TokenPayload
        req.user = decoded;
        next();
    }catch(error) {
        res.status(401).json({msg: "Token não encontrado"})
    }
}

    //Registrando usuário
app.post("/registrar", async (req: Request, res: Response): Promise<any> => {
    const { nome, email, telefone, senha, confirmar } = req.body;

    try{
        if(senha !== confirmar) {
            return res.status(400).json({ 'erro': 'As senhas não coincidem' });
        };
        const hash: string = await bcrypt.hash(senha, 10);
        
        const usuario = await User.create({
            nome,
            email,
            telefone,
            senha: hash
    });
    if (!process.env.SECRET){
        return console.log("variável de ambiente não definida");
    };
    //Autenticando o usuário
    const secret = process.env.SECRET as string;
    const payload: jwtPayload = {
        id: usuario.id,
        email: usuario.email
    };
    const options: SignOptions = {
        "expiresIn": "1h",
        "algorithm": "HS256"
    };

    const token = jwt.sign(payload, secret, options);

    //Armazenando nos cookies
    res.cookie("token", token,  {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 3600000
    });

    return res.status(201).json({ msg: "logado com sucesso" });
    }catch(error){
        return res.status(500).json({ erro: "Erro ao criar o usuario: ", detalhes: error});
    };
});

    //Login
app.post("/login", async (req: Request, res: Response):Promise<any> => {
    const { email, senha } = req.body;
    const usuario = await User.findOne({where: { email }});

    try{
        if(!usuario){
            return res.status(404).json({erro: "Usuário não encontrado"});
        };
        const hash = await bcrypt.compare(senha, usuario.senha);
        if(!hash){
            return res.status(404).json({erro: "Senha incorreta"});
        };

        //autenticando usuário
        const payload: jwtPayload = {
            id: usuario.id,
            email: usuario.email
        };
        const secret = process.env.SECRET as string;
        const options: SignOptions = {
            "expiresIn": "1h",
            "algorithm": "HS256"
        } ;
        const token = jwt.sign(payload, secret, options);
        
        //armazenando token nos cookies
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 3600000
        });

        return res.status(201).json({ msg: "Usuário logado com sucesso" });
    } catch(error) {
        return res.status(500).json({erro: "Error ao criar o usuario", detalhes: error});
    };

    
});

    //Esqueceu Senha
app.post("/esqueceuSenha", async (req: Request, res: Response):Promise<any> => {
    const { email } = req.body;

    try {
        const user  = await User.findOne({ where: { email } });
        const nome = user?.nome

        if(!user)
            return res.status(400).json({ error: "User not found" });

        const token = crypto.randomBytes(20).toString("hex");

        const now = new Date();
        now.setHours(now.getHours() + 1);

        const usuario = await User.update({
            token: token, expiracao: now
        }, {
            where: { email: email }
        });

        //Enviando o email
        const enviar = {
            from: "ia765350@gmail.com",
            to: email,
            subject: "Redefina sua Senha",
            template: "redefinirSenha",
            context: {
                name: nome,
                token: token,
                id:user.id
            }
        }

        transporter.sendMail(enviar, (error, info) => {
            if (error) {
                console.log("Houve um erro ao enviar o email: ", error)
            } else{
                console.log("Email enviado com sucesso: ", info.response)
            }
        })
        return res.status(200).send("email enviado com sucesso!")

    } catch(error) {
        return res.status(400).json({ error: "User not found"});
    };

});

    //Redefinindo senha
app.put('/RedefinirSenha', async (req: Request, res: Response): Promise<any> => {
    const{ senha, confirmSenha, token, id } = req.body;
    console.log(senha, " ", confirmSenha," ", token," ", id)

    if (senha !== confirmSenha) {
        return res.status(500).json({erro: "senhas não coincidem!"})
    }
    try{
        const now = new Date()
        const hash: string = await bcrypt.hash(senha, 10);

        const user = await User.findByPk(id)
        if (!user || !user.senha || !user.expiracao) {
            return res.status(400).json({ erro: "Token expirado" });
        }

        const compare = await bcrypt.compare(senha, user?.senha)
        if(compare){
            return res.status(404).json({ erro: "senha já existe" })
        }
        await User.update(
            {senha: hash, expiracao: null, token: null},
            { where: {
                id: user?.id
            }}
        )
        return res.status(200).send("Senha atualizada com sucesso")
    } catch(error) {
        return res.status(404).json({erro: error})
    }
})

app.post("/perfil", middleware, async (req: Request, res: Response): Promise<any> =>{
    if(!req.user){
        return res.status(404).json({erro: "token invalido"})
    }
    const id: string = JSON.stringify(req.user.id)
    const user = await User.findByPk(id)
    return res.status(200).json( {user} )
})

app.post("/carrinho", middleware, async(req: Request, res: Response): Promise<any> =>{
    const idUser: number = Number(req.user.id);
    const { peca } = req.body;
    if (!idUser || !peca){
        return res.status(404).json({erro: "token invalido"})
    };
    try{
        const resp = await Carrinho.findOne({where: {peca: peca}})
        if(resp === null){
            const resposta = Carrinho.create({
                idUser: idUser,
                peca: peca
            })
            return res.status(200).json({res: "Item adicionado ao carrinho"})
        }
        return res.status(200).json({res: "Item já existe no carrinho"})
    }catch(error){
        return res.status(500).json({erro: "Carrinho vazio"})
    }
})

app.post("/itemCarrinho", middleware, async(req: Request, res: Response): Promise<any> =>{
    const idUser: number = Number(req.user.id);
    const {peca} = req.body;
    if (!idUser || !peca){
        return res.status(404).json({erro: "token invalido"})
    };
    try{
        const resp = await Carrinho.findOne({where: {
            idUser: idUser, 
            peca: peca}});
        if(!resp){
            return res.status(500).json({erro: "Peça não encontrada"})
        }
        return res.status(200).json({msg: "item já existe no carrinho"})
    }catch(error){
        return res.status(400).json({erro: "Carrinho vazio"})
    }
})

app.post("/buscarCarrinho", middleware, async(req: Request, res: Response): Promise<any> =>{
    const idUser: number = Number(req.user.id);
     
    if(!idUser){
        return res.status(404).json({erro: "Token invalido"})
    };
    try{
        const resp = await Carrinho.findAll({where: {idUser: idUser}});
        return res.status(200).json({msg: resp})
    }catch(erro){
        return res.status(400).json({erro: "Nenhum item no carrinho"})
    }
})
app.post("/excluir", middleware, async(req: Request, res: Response): Promise<any> =>{
    const idUser: number = Number(req.user.id);
    const {peca} = req.body;
    
    if(!idUser || idUser === null){
        return res.status(404).json({erro: "Token invalido"})
    };
    try{
        const deletar = await Carrinho.destroy({where: {peca: peca, idUser: idUser}});
        return res.status(200).json({msg: "item apagado"})
    }catch(erro){
        return res.status(400).json({erro: "item não encontrado"})
    }
})
app.post("/comprado", middleware, async(req: Request, res: Response): Promise<any> =>{
    const idUser: number = Number(req.user.id);
    
    if(!idUser || idUser === null){
        return res.status(404).json({erro: "Token invalido"})
    };
    try{
        const deletar = await Carrinho.destroy({where: {idUser: idUser}});
        return res.status(200).json({msg: "item apagado"})
    }catch(erro){
        return res.status(400).json({erro: "item não encontrado"})
    }
})

//Iniciando o server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

