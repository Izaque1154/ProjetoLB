//Dependências
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/usuario";
import { SignOptions } from "jsonwebtoken";
import crypto from "crypto";
import transporter from "../config/configEmail";
import {Response, Request} from "express"
import { jwtPayload } from "../interfaces/interfaceAuth";

//Variável de produção
const isProd = process.env.NODE_ENV === "production";
//Funções de autenticação

    //Função registrar usuário
export const registrarUsuario = async (req: Request, res: Response): Promise<any>  => {
    const { nome, email, telefone, senha, confirmar } = req.body;

    try{
        if(senha !== confirmar) {
            return res.status(400).json({ erro: 'As senhas não coincidem' });
        };
        const hash: string = await bcrypt.hash(senha, 10);
        
        const usuario = await User.create({
            nome,
            email,
            telefone,
            senha: hash,
            verificado: false,
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

        //Enviando email de confirmação
    const enviar = {
            from: "ia765350@gmail.com",
            to: email,
            subject: "Confirmação de conta",
            template: "confirmarEmail",
            context: {
                name: nome,
                token: token,
            }
        }
    transporter.sendMail(enviar, (error, info) => {
        if (error) {
            console.log("Houve um erro ao enviar o email: ", error)
        } else{
            console.log("Email enviado com sucesso: ", info.response)
        }
    })
    return res.status(201).json({ msg: "cadastro criado com sucesso", token: token });

    }catch(error){
        return res.status(500).json({ erro: "Erro ao criar o usuario", detalhes: error});
    };
};

//Função para confirmar email
export const confirmarEmail = async (req: Request, res:Response): Promise<any> =>{
    const dados = req.user
    const token = req.body.token

    try{
        if(!dados){
            return res.status(500).json({erro: "Token expirado"})
        }
        const dado = await User.findOne({where: {id: dados.id}})
        if(!dado){
            return res.status(500).json({erro: "usuário não encontrado"})
        }
        if(dado.verificado === true){
            return res.status(401).json({erro: "Usuário já verificado"})
        }

        await User.update({verificado: true}, {where: {email: dados.email, id: dados.id}})

    ////////////////////////////////////////////////////////////
        //Criando token
    const token = jwt.sign({id: 1, email: "bizin1237@gmail.com"}, process.env.SECRET as string, {"expiresIn": "1h","algorithm": "HS256"})

        //Armazenando no cookie
    res.cookie("token", token,  {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        maxAge: 3600000
    });
    ////////////////////////////////////////////////////////////    

        return res.status(200).json({msg: "Conta verificada!"})
    } catch(error){
        return res.status(400).json({erro: "Houve um erro ao verificar a conta"})
    }
        
}

   //Login
export const login = async (req: Request, res: Response):Promise<any> => {
    const { email, senha } = req.body;
    const usuario = await User.findOne({where: { email }});

    try{
        if(!usuario){
            return res.status(404).json({erro: "Usuário não encontrado"});
        };
        const hash = await bcrypt.compare(senha, usuario.senha);
        if(!hash){
            return res.status(404).json({erro: "Senha incorreta"});
        } else if(usuario.verificado === false){
            return res.status(500).json({erro: "Usuário não cadastrado"})
        }

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
            secure: isProd,
            sameSite: isProd ? "none" : "lax",
            maxAge: 3600000
        });

        return res.status(201).json({ msg: "Usuário logado com sucesso" });
    } catch(error) {
        return res.status(500).json({erro: "Error ao criar o usuario", detalhes: error});
    };

    
};

    //Esqueceu Senha
export const esqueceuSenha = async (req: Request, res: Response):Promise<any> => {
    const { email } = req.body;

    try {
        const user  = await User.findOne({ where: { email } });
        const nome = user?.nome

        if(!user)
            return res.status(400).json({ error: "User not found" });

        const token = crypto.randomBytes(20).toString("hex");

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.update({
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

};

//Redefinindo senha
export const redefinirSenha = async (req: Request, res: Response): Promise<any> => {

    const{ senha, confirmSenha, token, id } = req.body;
    console.log(senha, " ", confirmSenha," ", token," ", id);

    if (senha !== confirmSenha) {
        return res.status(500).json({erro: "senhas não coincidem!"});
    };
    try{
        new Date();
        const hash: string = await bcrypt.hash(senha, 10);

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(400).json({ erro: "Usuário não encontrado" });
        }
        if (user.token !== token && user.id !== id) {
            return res.status(400).json({ erro: "Token inválido" });
        }
        if (!user || !user.senha || !user.expiracao) {
            return res.status(400).json({ erro: "Token expirado" });
        };

        const compare = await bcrypt.compare(senha, user?.senha);
        if(compare){
            return res.status(404).json({ erro: "senha já existe" });
        };
        await User.update(
            {senha: hash, expiracao: null, token: null},
            { where: {
                id: user?.id
            }}
        );
        return res.status(200).send("Senha atualizada com sucesso");
    } catch(error) {
        return res.status(404).json({erro: error});
    };
};

//Função para exibir perfil do usuário
export const perfil = async (req: Request, res: Response): Promise<any> =>{
    if(!req.user){
        return res.status(404).json({erro: "token invalido"});
    };
    const id: string = JSON.stringify(req.user.id);
    const user = await User.findByPk(id);
    if (!user) {
        return res.status(401).json({message: "usuario não encontrado"})
    }
    return res.status(200).json( {nome: user.nome} );
};

//Reenviar email de confirmação
export const reenviar = async(req: Request, res: Response): Promise<any> =>{
    const email = req.body.email;
    const token = req.body.token;
    
    try{
        const dados = await User.findOne({where: {email: email}});
        if(!dados){
            return res.status(500).json({erro: "Usuário não encontrado"});
        };
        //Enviando email de confirmação
        const enviar = {
                from: "ia765350@gmail.com",
                to: email,
                subject: "Confirmação de conta",
                template: "confirmarEmail",
                context: {
                    name: dados.nome,
                    token: token,
                }
            };
        transporter.sendMail(enviar, (error) => {
            if (error) {
                console.log("Houve um erro ao enviar o email: ", error);
            } else{
                console.log("Email enviado com sucesso");
            };
        });
    }catch(erro){
        return res.status(400).json({erro: "houve um erro"})
    };
};


