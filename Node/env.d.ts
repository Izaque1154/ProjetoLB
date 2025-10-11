declare namespace NodeJS{
    interface processEnv{
        PORT: number;
        SECRET: string;
        DATABASE_URL: string;
        SENHA_BANCO: string
    }
}