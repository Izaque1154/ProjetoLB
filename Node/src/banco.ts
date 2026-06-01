//dependências
import { Sequelize }  from "sequelize";
import dotenv from "dotenv";

//Conexão com o banco de ados
    //configurações
dotenv.config()

    //Conexão
const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_SENHA!,
    {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT!),
        dialect: "postgres",
        protocol:"postgres",
        logging: false,
    }
)

sequelize.authenticate()
    .then(() => console.log("Conexão com o banco de dados bem-sucedida!"))
    .catch((error) => console.log("Erro ao conectar-se ao banco: ", error))

export default sequelize



