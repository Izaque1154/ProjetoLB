interface FichaTecnicaAtributos {
    dimensoes: string;
    peso: string;
    material: string;
}

interface ProdutosAtributos {
    id: number;
    titulo: string;
    garantia: string;
    preco: string;
    categoria?: string | null;
    fabricante?: string | null;
    codigo?: string | null;
    imagem?: string | null;
    fichaTecnica: FichaTecnicaAtributos;
    estoque: number;
    compatibilidade?: string | null;
    caracteristica: string;
    descricao: string;
}

export {FichaTecnicaAtributos, ProdutosAtributos}