//Interface RegistroBody{
interface jwtPayload{
    id: number;
    email: string;
};

//interface para o token
interface TokenPayload {
  id: number;
  email: string;
}

export {jwtPayload, TokenPayload}