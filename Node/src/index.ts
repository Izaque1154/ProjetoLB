import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import sequelize from "./config/banco";
import authRoutes from "./routes/authRoutes";
import cartRoutes from "./routes/cartRoutes";
import budgetRoutes from "./routes/budgetRoutes";
import "./models/servicos";
import "./models/orcamentos";
import "./models/carrinho_itens";
import './models/orcamentoItens'
import { seedProdutos } from "./itens/itens";
import { seedServicos } from "./itens/servicos";
import { User } from "./models/usuario"
import bcrypt from "bcrypt"

dotenv.config();

const app: express.Application = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use('/budget', budgetRoutes);

const port = process.env.PORT;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("Conexao com o banco de dados bem-sucedida!");

        await sequelize.sync({alter: true});
        console.log("Tabelas sincronizadas com sucesso!");
        //usuário admin
        const hash: string = await bcrypt.hash("123456", 10);
        await User.findOrCreate({where: {email: "bizin1237@gmail.com"},
            defaults:{
                nome: "Izaque",
                email: "bizin1237@gmail.com",
                telefone: "21998765786",
                senha: hash,
                verificado: true,
                role: "admin"
            }
        })

        await seedServicos();
        console.log("Serviços sincronizados com sucesso!");

        await seedProdutos();
        console.log("Produtos sincronizados com sucesso!");

        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    } catch (error) {
        console.log("Erro ao iniciar servidor:", error);
    }
}

startServer();
