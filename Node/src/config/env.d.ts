declare namespace NodeJS{
    interface processEnv{
        PORT: number;
        NODE_ENV: string;
        DB_HOST: string;
        DB_SENHA: string;
        DB_USER: string;
        DB_NAME: string;
        DB_PORT: number;
        DATABASE_URL: string;
        SECRET: string;
        SENHAEMAIL: string;
        FRONTEND_URL: string;
    }
}