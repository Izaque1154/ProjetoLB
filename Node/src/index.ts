import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import sequelize from "./config/banco";
import authRoutes from "./routes/authRoutes";
import cartRoutes from "./routes/cartRoutes";
import budgetRoutes from "./routes/budgetRoutes";
import "./models/servicos";
import "./models/solicitacaoOrcamento";
import "./models/orcamentos";
import "./models/carrinho_itens";
import './models/orcamentoItens'
import "./models/associations";
import { seedProdutos } from "./itens/itens";
import { seedServicos } from "./itens/servicos";
import { User } from "./models/usuario"
import bcrypt from "bcrypt"

dotenv.config();

const app: express.Application = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const diretorioUploadsOrcamentos = path.resolve(
    process.cwd(),
    "dist",
    "uploads",
    "orcamentos"
);
const diretorioUploadsSolicitacoes = path.resolve(
    process.cwd(),
    "uploads",
    "solicitacoes-orcamento"
);

app.use(
    "/uploads/solicitacoes-orcamento",
    express.static(diretorioUploadsSolicitacoes)
);
app.use("/uploads", express.static(diretorioUploadsOrcamentos));

app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use('/budget', budgetRoutes);

const port = process.env.PORT;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("Conexao com o banco de dados bem-sucedida!");

        // Cria somente tabelas ausentes. Alterações estruturais ficam nas migrations.
        await sequelize.sync();
        console.log("Tabelas sincronizadas com sucesso!");
        //usuário admin
        const hash: string = await bcrypt.hash("123456", 10);
        const enderecoAdmin = "Avenida dos Cardans, 765 - Centro, São Paulo - SP";
        const [admin] = await User.findOrCreate({where: {email: "bizin1237@gmail.com"},
            defaults:{
                nome: "Izaque",
                email: "bizin1237@gmail.com",
                telefone: "21998765786",
                endereco: enderecoAdmin,
                senha: hash,
                verificado: true,
                role: "admin"
            }
        })
        if (!admin.endereco) {
            await admin.update({ endereco: enderecoAdmin });
        }

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
