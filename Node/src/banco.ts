//dependências
import { Sequelize, DataTypes, Model, Optional }  from "sequelize";
import dotenv from "dotenv";

//Conexão com o banco de ados
    //configurações
dotenv.config()
const url = process.env.DATABASE_URL!

    //Conexão
const sequelize = new Sequelize(url!, {
    dialect: "postgres",
    protocol:"postgres",
    logging: false,
    dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

sequelize.authenticate()
    .then(() => console.log("Conexão com o banco de dados bem-sucedida!"))
    .catch((error) => console.log("Erro ao conectar-se ao banco: ", error))

export default sequelize



