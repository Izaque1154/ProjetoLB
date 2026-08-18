import Servico from "../models/servicos";

export const servicosIniciais = [
    {
        nome: "Manutenção de cardan",
        descricao: "Inspeção e manutenção preventiva ou corretiva do conjunto do cardan, incluindo análise de folgas, cruzetas, luvas e fixações.",
        precoBase: null,
        ativo: true
    },
    {
        nome: "Balanceamento de cardan",
        descricao: "Balanceamento do eixo cardan para reduzir vibrações, ruídos e desgaste prematuro dos componentes da transmissão.",
        precoBase: null,
        ativo: true
    },
    {
        nome: "Usinagem de peças",
        descricao: "Usinagem, ajuste dimensional e recuperação de componentes conforme a avaliação técnica da peça.",
        precoBase: null,
        ativo: true
    },
    {
        nome: "Reparo de componentes",
        descricao: "Reparo ou substituição de componentes danificados do cardan e de peças relacionadas ao sistema de transmissão.",
        precoBase: null,
        ativo: true
    },
    {
        nome: "Outro serviço",
        descricao: "Avaliação técnica para solicitações que não se enquadram nos serviços previamente listados.",
        precoBase: null,
        ativo: true
    }
];

export async function seedServicos(): Promise<void> {
    for (const dadosServico of servicosIniciais) {
        const [servico, criado] = await Servico.findOrCreate({
            where: { nome: dadosServico.nome },
            defaults: dadosServico
        });

        if (!criado) {
            await servico.update({
                descricao: dadosServico.descricao,
                precoBase: dadosServico.precoBase,
                ativo: dadosServico.ativo
            });
        }
    }
}
