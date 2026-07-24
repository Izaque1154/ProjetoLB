import { produtos } from "../models/produtos";

export const itens = [
    {
        id: 0,
        titulo: "Barra longa de direção",
        garantia: "6 meses",
        preco: "R$ 642,90",
        categoria: "Direção",
        fabricante: "AutoParts Linha Pesada",
        codigo: "DIR-BL-001",
        imagem: "/imagens/tornearia/barraLonga/img0.jpg",
        fichaTecnica: {
            dimensoes: "Aprox. 1200 mm x 150 mm, terminais reforçados",
            peso: "7,4 kg",
            material: "Aço SAE 1045 forjado, zincado e tratado contra corrosão"
        },
        estoque: 12,
        compatibilidade: "Caminhões, ônibus e utilitários pesados com sistema de direção mecânica ou hidráulica.",
        caracteristica: "Componente de alta resistência para transferência precisa do movimento da direção, com terminais reforçados e acabamento anticorrosivo.",
        descricao: "Barra longa de direção indicada para veículos de carga que exigem estabilidade, segurança e durabilidade em uso diário. A construção em aço forjado reduz folgas no conjunto, melhora a resposta do volante e suporta condições severas de estrada, carga e vibração."
    },
    {
        id: 1,
        titulo: "Barra curta de direção",
        garantia: "6 meses",
        preco: "R$ 529,90",
        categoria: "Direção",
        fabricante: "MetalTruck Components",
        codigo: "DIR-BC-002",
        imagem: "/imagens/tornearia/barraCurta/img1.jpg",
        fichaTecnica: {
            dimensoes: "Aprox. 800 mm x 100 mm, encaixe para terminais de direção",
            peso: "5,6 kg",
            material: "Aço carbono trefilado com pintura protetiva"
        },
        estoque: 15,
        compatibilidade: "Veículos comerciais leves, médios e conjuntos de direção de caminhões.",
        caracteristica: "Projetada para manter alinhamento, reduzir vibração e transmitir movimento com precisão entre os componentes da direção.",
        descricao: "Barra curta de direção para reposição em sistemas que precisam de resposta firme e menor desgaste dos terminais. Ideal para manutenção preventiva ou substituição de peças com folga, empenamento ou ruído durante manobras."
    },
    {
        id: 2,
        titulo: "Coluna de direção",
        garantia: "6 meses",
        preco: "R$ 548,90",
        categoria: "Direção",
        fabricante: "DirecPro",
        codigo: "DIR-CD-003",
        imagem: "/imagens/tornearia/colunaDirecao/img2.jpg",
        fichaTecnica: {
            dimensoes: "Aprox. 750 mm x 120 mm, eixo com articulação",
            peso: "6,2 kg",
            material: "Aço carbono com buchas e juntas de acoplamento"
        },
        estoque: 8,
        compatibilidade: "Caminhões, vans e veículos utilitários com coluna de direção mecânica.",
        caracteristica: "Liga o volante ao sistema de direção com boa rigidez torcional e articulação segura.",
        descricao: "Coluna de direção desenvolvida para recuperar a firmeza do conjunto e melhorar a dirigibilidade. Recomendada quando há folga excessiva, vibração, ruído na coluna ou dificuldade de transmissão do movimento ao sistema de direção."
    },
    {
        id: 3,
        titulo: "Braço tensor simples",
        garantia: "6 meses",
        preco: "R$ 913,90",
        categoria: "Suspensão e direção",
        fabricante: "TruckLine",
        codigo: "SUS-BT-004",
        imagem: "/imagens/tornearia/tensor/img3.jpg",
        fichaTecnica: {
            dimensoes: "Aprox. 500 mm x 80 mm, furação conforme aplicação",
            peso: "3,4 kg",
            material: "Aço temperado com bucha vulcanizada"
        },
        estoque: 10,
        compatibilidade: "Veículos pesados com conjunto tensor simples de suspensão ou direção.",
        caracteristica: "Auxilia no alinhamento do conjunto, absorve impactos e estabiliza componentes sujeitos a esforço lateral.",
        descricao: "Braço tensor simples para aplicações que exigem resistência e estabilidade. A peça ajuda a preservar o alinhamento, reduz ruídos de suspensão e melhora a segurança em frenagens, curvas e pisos irregulares."
    },
    {
        id: 4,
        titulo: "Bucha de braço tensor",
        garantia: "3 meses",
        preco: "R$ 318,90",
        categoria: "Suspensão",
        fabricante: "RubberMax",
        codigo: "SUS-BU-005",
        imagem: "/imagens/tornearia/buchaTensor/img4.jpg",
        fichaTecnica: {
            dimensoes: "Aprox. 100 mm x 60 mm, diâmetro interno conforme aplicação",
            peso: "0,9 kg",
            material: "Borracha vulcanizada com camisa metálica"
        },
        estoque: 30,
        compatibilidade: "Braços tensores de caminhões, ônibus e utilitários.",
        caracteristica: "Absorve vibração, reduz ruído e protege o braço tensor contra desgaste prematuro.",
        descricao: "Bucha de braço tensor indicada para restaurar o conforto e a estabilidade do conjunto. Ideal para substituição quando há estalos, folgas, vibração excessiva ou desgaste visível da borracha."
    },
    {
        id: 5,
        titulo: "Bomba hidráulica",
        garantia: "6 meses",
        preco: "R$ 476,90",
        categoria: "Sistema hidráulico",
        fabricante: "HydroParts",
        codigo: "HID-BH-006",
        imagem: "/imagens/tornearia/bombaHidraulica/img5.jpg",
        fichaTecnica: {
            dimensoes: "Aprox. 250 mm x 200 mm, conexões hidráulicas padrão linha pesada",
            peso: "4,1 kg",
            material: "Carcaça em alumínio fundido com componentes internos em aço"
        },
        estoque: 6,
        compatibilidade: "Sistemas hidráulicos de direção, basculamento e aplicações auxiliares.",
        caracteristica: "Mantém fluxo estável de fluido e pressão adequada para funcionamento seguro do sistema.",
        descricao: "Bomba hidráulica para veículos e equipamentos que precisam de resposta confiável sob carga. Indicada para corrigir perda de pressão, ruído no sistema, vazamentos internos ou falhas de assistência hidráulica."
    },
    {
        id: 6,
        titulo: "Tomada de força",
        garantia: "12 meses",
        preco: "R$ 2.389,90",
        categoria: "Transmissão",
        fabricante: "GearForce",
        codigo: "TRM-TF-007",
        imagem: "/imagens/tornearia/tomadaForca/img6.jpg",
        fichaTecnica: {
            dimensoes: "Aprox. 350 mm x 250 mm, flange conforme caixa",
            peso: "9,8 kg",
            material: "Aço fundido e engrenagens temperadas"
        },
        estoque: 5,
        compatibilidade: "Caminhões com implementos hidráulicos, guinchos, basculantes e equipamentos auxiliares.",
        caracteristica: "Transfere potência da transmissão para sistemas auxiliares com acoplamento robusto e operação segura.",
        descricao: "Tomada de força indicada para aplicações profissionais que exigem acionamento confiável de implementos. Construída para suportar torque elevado, uso contínuo e rotina severa em veículos de trabalho."
    },
    {
        id: 7,
        titulo: "Eixo cardan",
        garantia: "12 meses",
        preco: "R$ 2.189,90",
        categoria: "Cardan e transmissão",
        fabricante: "CardanTech",
        codigo: "TRM-EC-008",
        imagem: "/imagens/tornearia/cardan/img7.jpg",
        fichaTecnica: {
            dimensoes: "Aprox. 1500 mm x 120 mm, tubo balanceado",
            peso: "15,3 kg",
            material: "Aço tubular com solda técnica e cruzetas de alta resistência"
        },
        estoque: 4,
        compatibilidade: "Caminhões, utilitários e veículos com transmissão por eixo cardan.",
        caracteristica: "Transmite torque entre câmbio e diferencial com balanceamento para reduzir vibração.",
        descricao: "Eixo cardan completo para reposição ou montagem sob medida. Recomendado para corrigir vibrações, folgas, ruídos e perda de eficiência na transmissão de força, especialmente em veículos de carga."
    },
    {
        id: 8,
        titulo: "Rolamento de cardan",
        garantia: "6 meses",
        preco: "R$ 419,90",
        categoria: "Cardan e transmissão",
        fabricante: "BearingPro",
        codigo: "TRM-RC-009",
        imagem: "/imagens/tornearia/rolamentoCardan/img8.jpg",
        fichaTecnica: {
            dimensoes: "Aprox. 120 mm x 120 mm, suporte central com borracha",
            peso: "1,2 kg",
            material: "Aço de rolamento com suporte em borracha técnica"
        },
        estoque: 20,
        compatibilidade: "Eixos cardan com suporte intermediário em caminhões e utilitários.",
        caracteristica: "Suporta o eixo cardan, reduz vibração e mantém o alinhamento do conjunto durante a transmissão de torque.",
        descricao: "Rolamento de cardan com suporte reforçado para preservar o conjunto de transmissão. Ideal para substituição quando há vibração no assoalho, ruído metálico ou desgaste do suporte central."
    },
    {
        id: 9,
        titulo: "Cruzeta de cardan",
        garantia: "3 meses",
        preco: "R$ 69,90",
        categoria: "Cardan e transmissão",
        fabricante: "CardanTech",
        codigo: "TRM-CC-010",
        imagem: "/imagens/tornearia/cruzetaCardan/img9.jpg",
        fichaTecnica: {
            dimensoes: "Aprox. 80 mm x 80 mm, medidas conforme aplicação",
            peso: "0,8 kg",
            material: "Aço temperado com roletes internos"
        },
        estoque: 50,
        compatibilidade: "Eixos cardan de veículos leves, utilitários e linha pesada.",
        caracteristica: "Permite articulação angular do cardan mantendo a transmissão de torque com segurança.",
        descricao: "Cruzeta de cardan indicada para reposição preventiva ou corretiva. A peça reduz folgas, estalos e vibrações no conjunto, garantindo funcionamento mais suave e maior vida útil do eixo."
    },
    {
        id: 10,
        titulo: "Macaco hidráulico",
        garantia: "12 meses",
        preco: "R$ 639,90",
        categoria: "Ferramentas e apoio",
        fabricante: "LiftPro",
        codigo: "FER-MH-011",
        imagem: "/imagens/tornearia/macacoHidraulico/img10.jpg",
        fichaTecnica: {
            dimensoes: "Aprox. 350 mm x 250 mm, base reforçada",
            peso: "11,5 kg",
            material: "Aço carbono com sistema hidráulico selado"
        },
        estoque: 25,
        compatibilidade: "Uso em oficinas, manutenção automotiva, utilitários e veículos de carga leve.",
        caracteristica: "Elevação estável, acionamento hidráulico progressivo e estrutura reforçada para uso profissional.",
        descricao: "Macaco hidráulico para oficinas e manutenção de rotina. Oferece elevação segura, boa estabilidade e construção robusta para troca de componentes, inspeções e serviços em veículos."
    },
    {
        id: 11,
        titulo: "Pistão",
        garantia: "6 meses",
        preco: "R$ 2.579,90",
        categoria: "Motor",
        fabricante: "MotorLine",
        codigo: "MOT-PI-012",
        imagem: "/imagens/tornearia/pistao/img11.jpg",
        fichaTecnica: {
            dimensoes: "Aprox. 150 mm x 100 mm, medida conforme motor",
            peso: "2,6 kg",
            material: "Liga de alumínio com canais usinados para anéis"
        },
        estoque: 18,
        compatibilidade: "Motores diesel e aplicações de linha pesada conforme medida técnica.",
        caracteristica: "Componente usinado para compressão eficiente, baixa folga operacional e resistência térmica.",
        descricao: "Pistão para manutenção de motor com foco em vedação, desempenho e durabilidade. Indicado para retífica, reparo de desgaste, baixa compressão ou consumo excessivo de óleo."
    },
    {
        id: 12,
        titulo: "Reparo para pistão",
        garantia: "3 meses",
        preco: "R$ 309,90",
        categoria: "Motor",
        fabricante: "SealMax",
        codigo: "MOT-RP-013",
        imagem: "/imagens/tornearia/reparoPistao/img12.jpg",
        fichaTecnica: {
            dimensoes: "Kit de reparo com anéis e vedadores conforme aplicação",
            peso: "0,5 kg",
            material: "Aço mola, borracha técnica e componentes de vedação"
        },
        estoque: 22,
        compatibilidade: "Conjuntos de pistão de motores diesel e sistemas hidráulicos específicos.",
        caracteristica: "Kit completo para restaurar vedação, reduzir perda de compressão e prolongar a vida útil do conjunto.",
        descricao: "Reparo para pistão indicado para manutenção técnica sem troca completa do conjunto. Ajuda a recuperar desempenho, reduzir vazamentos e estabilizar a operação do sistema."
    },
    {
        id: 13,
        titulo: "Manga de eixo",
        garantia: "12 meses",
        preco: "R$ 1.569,90",
        categoria: "Suspensão e roda",
        fabricante: "AxlePro",
        codigo: "ROD-ME-014",
        imagem: "/imagens/tornearia/mangaEixo/img13.jpg",
        fichaTecnica: {
            dimensoes: "Aprox. 400 mm x 300 mm, alojamentos usinados",
            peso: "12,4 kg",
            material: "Ferro fundido nodular com usinagem de precisão"
        },
        estoque: 7,
        compatibilidade: "Eixos dianteiros de caminhões, utilitários e veículos de carga.",
        caracteristica: "Conecta roda e suspensão, mantendo geometria, alinhamento e segurança do conjunto.",
        descricao: "Manga de eixo robusta para reposição em veículos que apresentam desgaste, trinca, folga no cubo ou dificuldade de alinhamento. A usinagem precisa garante encaixe correto e confiabilidade em uso severo."
    },
    {
        id: 14,
        titulo: "Reparo de manga de eixo",
        garantia: "6 meses",
        preco: "R$ 659,90",
        categoria: "Suspensão e roda",
        fabricante: "AxlePro",
        codigo: "ROD-RM-015",
        imagem: "/imagens/tornearia/reparoMangaEixo/img14.jpg",
        fichaTecnica: {
            dimensoes: "Kit com buchas, pinos e componentes conforme aplicação",
            peso: "1,4 kg",
            material: "Aço temperado, bronze e borracha técnica"
        },
        estoque: 16,
        compatibilidade: "Mangas de eixo de caminhões e veículos utilitários.",
        caracteristica: "Restaura folgas, melhora alinhamento e evita desgaste prematuro de pneus e rolamentos.",
        descricao: "Kit de reparo para manga de eixo desenvolvido para manutenção precisa do conjunto dianteiro. Indicado quando há ruído, folga, vibração ou dificuldade de ajuste no alinhamento."
    },
    {
        id: 15,
        titulo: "Caixa de transmissão",
        garantia: "12 meses",
        preco: "R$ 3.890,90",
        categoria: "Transmissão",
        fabricante: "GearForce",
        codigo: "TRM-CT-016",
        imagem: "/imagens/tornearia/caixaTransmissao/img15.jpg",
        fichaTecnica: {
            dimensoes: "Aprox. 700 mm x 500 mm, carcaça conforme aplicação",
            peso: "25,8 kg",
            material: "Carcaça em ferro fundido com engrenagens em aço tratado"
        },
        estoque: 3,
        compatibilidade: "Veículos comerciais e linha pesada conforme modelo de câmbio.",
        caracteristica: "Conjunto responsável pela transmissão de torque e seleção de marchas com resistência para uso contínuo.",
        descricao: "Caixa de transmissão para aplicações que exigem confiabilidade em operação pesada. Indicada para reposição ou reforma quando há ruídos internos, dificuldade de engate, vazamento ou desgaste de engrenagens."
    },
    {
        id: 16,
        titulo: "Flange de cardan",
        garantia: "6 meses",
        preco: "R$ 929,90",
        categoria: "Cardan e transmissão",
        fabricante: "CardanTech",
        codigo: "TRM-FC-017",
        imagem: "/imagens/tornearia/flange/img16.jpg",
        fichaTecnica: {
            dimensoes: "Aprox. 150 mm x 150 mm, furação conforme aplicação",
            peso: "1,9 kg",
            material: "Aço carbono usinado com tratamento superficial"
        },
        estoque: 12,
        compatibilidade: "Eixos cardan, diferenciais e caixas de transmissão conforme flange.",
        caracteristica: "Garante acoplamento seguro entre cardan e conjunto de transmissão, reduzindo folgas e vibração.",
        descricao: "Flange de cardan usinada para encaixe preciso e fixação firme. Recomendada para corrigir desgaste em furação, folga no acoplamento ou vibração gerada por desalinhamento."
    },
    {
        id: 17,
        titulo: "Diferencial",
        garantia: "12 meses",
        preco: "R$ 4.489,90",
        categoria: "Transmissão",
        fabricante: "AxleDrive",
        codigo: "TRM-DI-018",
        imagem: "/imagens/tornearia/diferencial/img17.jpg",
        fichaTecnica: {
            dimensoes: "Aprox. 600 mm x 400 mm, relação conforme aplicação",
            peso: "30,5 kg",
            material: "Carcaça em ferro fundido com engrenagens temperadas"
        },
        estoque: 4,
        compatibilidade: "Eixos traseiros de caminhões, ônibus e utilitários pesados.",
        caracteristica: "Distribui torque entre as rodas, permitindo curvas estáveis e tração eficiente.",
        descricao: "Diferencial para reposição em veículos de carga que precisam de tração confiável e operação silenciosa. Indicado em casos de ronco, folga, vazamento, quebra de engrenagens ou perda de desempenho."
    },
    {
        id: 18,
        titulo: "Tambor de freio",
        garantia: "6 meses",
        preco: "R$ 348,90",
        categoria: "Freio",
        fabricante: "BrakeMax",
        codigo: "FRM-TF-019",
        imagem: "/imagens/tornearia/tamborFreio/img18.jpg",
        fichaTecnica: {
            dimensoes: "Aprox. 300 mm x 300 mm, pista interna usinada",
            peso: "8,3 kg",
            material: "Ferro fundido de alta resistência térmica"
        },
        estoque: 14,
        compatibilidade: "Sistemas de freio a tambor em veículos comerciais e linha pesada.",
        caracteristica: "Oferece área de atrito estável, boa dissipação térmica e frenagem segura.",
        descricao: "Tambor de freio indicado para manutenção corretiva ou preventiva do sistema de frenagem. Substituição recomendada quando há ovalização, trincas, superaquecimento, vibração ou baixa eficiência na frenagem."
    },
    {
        id: 19,
        titulo: "Serviço de usinagem",
        garantia: "Sob avaliação técnica",
        preco: "Sob consulta",
        categoria: "Serviços de oficina",
        fabricante: "LB Cardans",
        codigo: "SRV-US-020",
        imagem: "/imagens/tornearia/usinagem/img19.jpg",
        fichaTecnica: {
            dimensoes: "Execução sob medida conforme desenho, amostra ou especificação",
            peso: "Variável conforme peça",
            material: "Aço, ferro fundido, alumínio, bronze e ligas conforme demanda"
        },
        estoque: 0,
        compatibilidade: "Peças automotivas, industriais, agrícolas e componentes especiais.",
        caracteristica: "Serviço técnico para recuperação, ajuste dimensional, faceamento, furação, rosca e acabamento de precisão.",
        descricao: "Serviço de usinagem profissional para peças sob medida ou recuperação de componentes. O orçamento é feito após análise da peça, tolerâncias necessárias, material e complexidade do serviço."
    },
    {
        id: 20,
        titulo: "Fabricação de peça sob medida",
        garantia: "Sob avaliação técnica",
        preco: "Sob consulta",
        categoria: "Serviços de oficina",
        fabricante: "LB Cardans",
        codigo: "SRV-FP-021",
        imagem: "/imagens/tornearia/fabricacaoPeca/img20.jpg",
        fichaTecnica: {
            dimensoes: "Personalizadas conforme projeto, amostra ou aplicação",
            peso: "Variável conforme projeto",
            material: "Aço carbono, aço inox, alumínio, bronze ou material especificado"
        },
        estoque: 0,
        compatibilidade: "Projetos automotivos, máquinas, implementos, cardans e aplicações industriais.",
        caracteristica: "Produção personalizada com foco em encaixe, resistência, acabamento e funcionalidade.",
        descricao: "Fabricação de peças sob medida para reposição, adaptação ou desenvolvimento técnico. Ideal quando a peça original está indisponível, danificada ou precisa de reforço para uma aplicação específica."
    },
    {
        id: 21,
        titulo: "Cuíca de freio",
        garantia: "6 meses",
        preco: "R$ 829,90",
        categoria: "Freio pneumático",
        fabricante: "AirBrake Pro",
        codigo: "FRM-CF-022",
        imagem: "/imagens/freio/cuica/img21.jpg",
        fichaTecnica: {
            dimensoes: "Aprox. 280 mm x 200 mm, câmara conforme aplicação",
            peso: "5,5 kg",
            material: "Carcaça metálica com diafragma de borracha técnica"
        },
        estoque: 9,
        compatibilidade: "Caminhões, ônibus e implementos com sistema de freio pneumático.",
        caracteristica: "Converte pressão de ar em força mecânica para acionamento eficiente do freio.",
        descricao: "Cuíca de freio indicada para veículos pesados que dependem de resposta rápida e segura no sistema pneumático. Recomendada para substituir peças com vazamento, perda de pressão ou baixa eficiência de frenagem."
    },
    {
        id: 22,
        titulo: "Catraca de freio",
        garantia: "6 meses",
        preco: "R$ 624,90",
        categoria: "Freio pneumático",
        fabricante: "AirBrake Pro",
        codigo: "FRM-CAT-023",
        imagem: "/imagens/freio/catraca/img22.jpg",
        fichaTecnica: {
            dimensoes: "Aprox. 220 mm x 120 mm, estriado conforme aplicação",
            peso: "3,1 kg",
            material: "Aço carbono com mecanismo de ajuste"
        },
        estoque: 11,
        compatibilidade: "Eixos com freio a ar em caminhões, ônibus e carretas.",
        caracteristica: "Mantém o ajuste do curso das lonas e melhora a resposta do sistema de freio.",
        descricao: "Catraca de freio para reposição em sistemas pneumáticos com desgaste, travamento ou regulagem irregular. Ajuda a manter frenagens mais uniformes e reduz desgaste excessivo das lonas."
    },
    {
        id: 23,
        titulo: "Válvula pedal de freio",
        garantia: "6 meses",
        preco: "R$ 249,90",
        categoria: "Freio pneumático",
        fabricante: "PneumaTruck",
        codigo: "FRM-VP-024",
        imagem: "/imagens/freio/valvulaPedal/img23.jpg",
        fichaTecnica: {
            dimensoes: "Aprox. 180 mm x 100 mm, conexões pneumáticas padrão",
            peso: "1,6 kg",
            material: "Corpo em alumínio com vedações internas"
        },
        estoque: 13,
        compatibilidade: "Sistemas de freio a ar de caminhões, ônibus e veículos pesados.",
        caracteristica: "Controla a pressão enviada ao sistema de freio conforme acionamento do pedal.",
        descricao: "Válvula pedal de freio com resposta progressiva para operação segura. Indicada para substituir válvulas com vazamento, pedal duro, resposta atrasada ou perda de controle da pressão pneumática."
    },
    {
        id: 24,
        titulo: "Válvula maneco de freio de mão",
        garantia: "6 meses",
        preco: "R$ 739,90",
        categoria: "Freio pneumático",
        fabricante: "PneumaTruck",
        codigo: "FRM-VM-025",
        imagem: "/imagens/freio/valvulaManeco/img24.jpg",
        fichaTecnica: {
            dimensoes: "Aprox. 200 mm x 140 mm, alavanca de acionamento manual",
            peso: "2,1 kg",
            material: "Alumínio fundido com componentes internos de vedação"
        },
        estoque: 10,
        compatibilidade: "Freio de estacionamento pneumático em caminhões, ônibus e implementos.",
        caracteristica: "Controla o acionamento do freio de estacionamento com segurança e vedação confiável.",
        descricao: "Válvula maneco para freio de mão pneumático, ideal para veículos que exigem travamento seguro em operação urbana, rodoviária ou pátio. Recomendada em casos de vazamento, perda de pressão ou falha de acionamento."
    },
    {
        id: 25,
        titulo: "Válvula relê",
        garantia: "6 meses",
        preco: "R$ 179,90",
        categoria: "Freio pneumático",
        fabricante: "PneumaTruck",
        codigo: "FRM-VR-026",
        imagem: "/imagens/freio/valvulaRele/img25.jpg",
        fichaTecnica: {
            dimensoes: "Aprox. 150 mm x 100 mm, múltiplas vias pneumáticas",
            peso: "1,1 kg",
            material: "Alumínio com diafragma e vedações internas"
        },
        estoque: 18,
        compatibilidade: "Circuitos pneumáticos de freio em caminhões, ônibus e carretas.",
        caracteristica: "Acelera resposta do sistema, distribuindo ar para as câmaras de freio com menor atraso.",
        descricao: "Válvula relê indicada para melhorar a resposta de frenagem em veículos pesados. Substituição recomendada quando há atraso no freio, vazamento de ar ou desequilíbrio entre eixos."
    },
    {
        id: 26,
        titulo: "Válvula limitadora de pressão",
        garantia: "6 meses",
        preco: "R$ 289,90",
        categoria: "Freio pneumático",
        fabricante: "PneumaTruck",
        codigo: "FRM-VL-027",
        imagem: "/imagens/freio/valvulaLimitadoraPressao/img26.jpg",
        fichaTecnica: {
            dimensoes: "Aprox. 140 mm x 90 mm, regulagem conforme aplicação",
            peso: "0,9 kg",
            material: "Corpo metálico com molas e vedações calibradas"
        },
        estoque: 14,
        compatibilidade: "Sistemas pneumáticos que exigem controle de pressão por circuito.",
        caracteristica: "Limita a pressão de trabalho, protegendo componentes e mantendo operação dentro da faixa segura.",
        descricao: "Válvula limitadora de pressão para proteção e controle do sistema de freio. Indicada para corrigir excesso de pressão, desgaste irregular ou funcionamento instável em circuitos pneumáticos."
    },
    {
        id: 27,
        titulo: "Válvula equalizadora de freio",
        garantia: "6 meses",
        preco: "R$ 369,90",
        categoria: "Freio pneumático",
        fabricante: "PneumaTruck",
        codigo: "FRM-VE-028",
        imagem: "/imagens/freio/valvulaEqualizadoraFreio/img27.jpg",
        fichaTecnica: {
            dimensoes: "Aprox. 160 mm x 100 mm, entradas e saídas pneumáticas",
            peso: "1,2 kg",
            material: "Alumínio fundido com mecanismo equalizador"
        },
        estoque: 12,
        compatibilidade: "Caminhões e ônibus com distribuição pneumática entre eixos.",
        caracteristica: "Equilibra a pressão entre circuitos para frenagem mais uniforme e segura.",
        descricao: "Válvula equalizadora de freio indicada para veículos que apresentam frenagem desbalanceada, travamento irregular ou diferença de resposta entre eixos. Ajuda a preservar pneus, lonas e tambores."
    },
    {
        id: 28,
        titulo: "Cilindro mestre de freio",
        garantia: "6 meses",
        preco: "R$ 539,90",
        categoria: "Freio hidráulico",
        fabricante: "BrakeMax",
        codigo: "FRM-CM-029",
        imagem: "/imagens/freio/cilindroMestreFreio/img28.jpg",
        fichaTecnica: {
            dimensoes: "Aprox. 200 mm x 100 mm, reservatório conforme aplicação",
            peso: "2,3 kg",
            material: "Alumínio fundido com pistões e vedações internas"
        },
        estoque: 12,
        compatibilidade: "Sistemas hidráulicos de freio em veículos leves, utilitários e comerciais.",
        caracteristica: "Gera e controla pressão hidráulica para acionamento eficiente do sistema de freio.",
        descricao: "Cilindro mestre de freio para reposição em sistemas com pedal baixo, vazamento, perda de pressão ou frenagem ineficiente. Peça essencial para segurança e resposta correta do pedal."
    },
    {
        id: 29,
        titulo: "Servo freio a ar",
        garantia: "6 meses",
        preco: "R$ 889,90",
        categoria: "Freio pneumático",
        fabricante: "AirBrake Pro",
        codigo: "FRM-SF-030",
        imagem: "/imagens/freio/servoFreioAr/img29.jpg",
        fichaTecnica: {
            dimensoes: "Aprox. 280 mm x 220 mm, câmara pneumática reforçada",
            peso: "5,8 kg",
            material: "Carcaça metálica com diafragma técnico"
        },
        estoque: 9,
        compatibilidade: "Veículos pesados com sistema de assistência pneumática de freio.",
        caracteristica: "Amplifica a força de frenagem e reduz esforço no acionamento do pedal.",
        descricao: "Servo freio a ar para veículos que precisam de assistência confiável em frenagens constantes. Indicado quando há pedal pesado, perda de assistência ou baixa eficiência no conjunto pneumático."
    },
    {
        id: 30,
        titulo: "Kit de reparo para cilindro mestre",
        garantia: "3 meses",
        preco: "R$ 189,90",
        categoria: "Freio hidráulico",
        fabricante: "SealMax",
        codigo: "FRM-KC-031",
        imagem: "/imagens/freio/kitReparoCilindroMestre/img30.jpg",
        fichaTecnica: {
            dimensoes: "Kit com vedações, anéis e componentes internos",
            peso: "0,4 kg",
            material: "Borracha nitrílica, metal e componentes de vedação"
        },
        estoque: 28,
        compatibilidade: "Cilindros mestres de freio conforme aplicação e diâmetro interno.",
        caracteristica: "Recupera vedação interna e ajuda a restaurar pressão hidráulica do sistema.",
        descricao: "Kit de reparo para cilindro mestre indicado para manutenção técnica quando a carcaça está preservada. Ajuda a corrigir vazamentos, perda de pressão e pedal baixo sem substituir o conjunto completo."
    },
    {
        id: 31,
        titulo: "Cubo de roda dianteiro",
        garantia: "6 meses",
        preco: "R$ 729,90",
        categoria: "Rodas e rolamentos",
        fabricante: "WheelPro",
        codigo: "ROD-CD-032",
        imagem: "/imagens/freio/cuboRodaDianteiro/img31.jpg",
        fichaTecnica: {
            dimensoes: "Aprox. 260 mm x 180 mm, furação conforme aplicação",
            peso: "7,2 kg",
            material: "Aço usinado com alojamento para rolamentos"
        },
        estoque: 10,
        compatibilidade: "Eixos dianteiros de veículos comerciais e linha leve/pesada conforme furação.",
        caracteristica: "Suporta roda e rolamentos, mantendo centralização e segurança do conjunto dianteiro.",
        descricao: "Cubo de roda dianteiro para reposição em casos de desgaste, folga, trinca ou dano no alojamento de rolamentos. Essencial para rodagem segura e alinhamento correto."
    },
    {
        id: 32,
        titulo: "Cubo de roda traseiro",
        garantia: "6 meses",
        preco: "R$ 759,90",
        categoria: "Rodas e rolamentos",
        fabricante: "WheelPro",
        codigo: "ROD-CT-033",
        imagem: "/imagens/freio/cuboRodaTraseiro/img32.jpg",
        fichaTecnica: {
            dimensoes: "Aprox. 280 mm x 200 mm, furação conforme aplicação",
            peso: "8,1 kg",
            material: "Aço usinado com pista para rolamentos"
        },
        estoque: 9,
        compatibilidade: "Eixos traseiros de veículos comerciais, vans e caminhões leves.",
        caracteristica: "Mantém fixação da roda e suporte dos rolamentos em condições de carga e rotação.",
        descricao: "Cubo de roda traseiro robusto para reposição em conjuntos com folga, ruído, aquecimento ou desgaste irregular. Ajuda a preservar rolamentos, pneus e estabilidade do veículo."
    },
    {
        id: 33,
        titulo: "Junta homocinética",
        garantia: "6 meses",
        preco: "R$ 429,90",
        categoria: "Transmissão",
        fabricante: "DriveMax",
        codigo: "TRM-JH-034",
        imagem: "/imagens/freio/juntaHomocinetica/img33.jpg",
        fichaTecnica: {
            dimensoes: "Aprox. 120 mm x 100 mm, estriado conforme aplicação",
            peso: "1,5 kg",
            material: "Aço temperado com gaiola e esferas internas"
        },
        estoque: 18,
        compatibilidade: "Veículos com semieixo e transmissão homocinética conforme aplicação.",
        caracteristica: "Permite transmissão de torque em ângulo, mantendo tração suave e segura.",
        descricao: "Junta homocinética indicada para corrigir estalos em curvas, vibração na aceleração ou folga no semieixo. Peça essencial para conforto, tração e segurança do conjunto."
    },
    {
        id: 34,
        titulo: "Kit de rolamento de roda",
        garantia: "6 meses",
        preco: "R$ 249,90",
        categoria: "Rodas e rolamentos",
        fabricante: "BearingPro",
        codigo: "ROD-KR-035",
        imagem: "/imagens/freio/kitRolamentoRoda/img34.jpg",
        fichaTecnica: {
            dimensoes: "Kit com rolamentos e retentores conforme aplicação",
            peso: "1,1 kg",
            material: "Aço de rolamento com retentores em borracha técnica"
        },
        estoque: 24,
        compatibilidade: "Cubos de roda dianteiros ou traseiros conforme medida e aplicação.",
        caracteristica: "Reduz atrito, suporta carga de rodagem e mantém giro seguro da roda.",
        descricao: "Kit de rolamento de roda para manutenção preventiva ou corretiva. Recomendado quando há ruído, folga, aquecimento no cubo ou vibração durante a rodagem."
    },
    {
        id: 35,
        titulo: "Bieleta de suspensão",
        garantia: "6 meses",
        preco: "R$ 219,90",
        categoria: "Suspensão",
        fabricante: "SuspensionPro",
        codigo: "SUS-BI-036",
        imagem: "/imagens/freio/bieletaSuspensao/img35.jpg",
        fichaTecnica: {
            dimensoes: "Aprox. 180 mm x 80 mm, terminais articulados",
            peso: "0,7 kg",
            material: "Aço carbono com coifas de borracha"
        },
        estoque: 26,
        compatibilidade: "Sistemas de suspensão com barra estabilizadora conforme aplicação.",
        caracteristica: "Liga a barra estabilizadora à suspensão, reduzindo inclinação e melhorando estabilidade.",
        descricao: "Bieleta de suspensão indicada para eliminar ruídos, folgas e instabilidade em curvas. Substituição recomendada quando há coifas rasgadas, terminais frouxos ou batidas na suspensão."
    },
    {
        id: 36,
        titulo: "Amortecedor dianteiro",
        garantia: "12 meses",
        preco: "R$ 549,90",
        categoria: "Suspensão",
        fabricante: "ShockMaster",
        codigo: "SUS-AD-037",
        imagem: "/imagens/freio/amortecedorDianteiro/img36.jpg",
        fichaTecnica: {
            dimensoes: "Aprox. 450 mm x 80 mm, haste reforçada",
            peso: "3,9 kg",
            material: "Aço carbono, óleo hidráulico e vedações de alta resistência"
        },
        estoque: 20,
        compatibilidade: "Suspensão dianteira de veículos comerciais e utilitários conforme aplicação.",
        caracteristica: "Controla impactos, reduz oscilações e melhora a estabilidade em frenagens e curvas.",
        descricao: "Amortecedor dianteiro para reposição em veículos com perda de estabilidade, vazamento, ruído ou desgaste irregular de pneus. Garante melhor conforto, controle e segurança na condução."
    },
    {
        id: 37,
        titulo: "Amortecedor traseiro",
        garantia: "12 meses",
        preco: "R$ 519,90",
        categoria: "Suspensão",
        fabricante: "ShockMaster",
        codigo: "SUS-AT-038",
        imagem: "/imagens/freio/amortecedorTraseiro/img37.jpg",
        fichaTecnica: {
            dimensoes: "Aprox. 480 mm x 80 mm, fixação conforme aplicação",
            peso: "3,7 kg",
            material: "Aço carbono, fluido hidráulico e buchas de borracha"
        },
        estoque: 18,
        compatibilidade: "Suspensão traseira de veículos comerciais, vans e caminhões leves.",
        caracteristica: "Estabiliza o eixo traseiro, reduz balanço da carroceria e melhora conforto sob carga.",
        descricao: "Amortecedor traseiro ideal para veículos que carregam peso ou trafegam em pisos irregulares. Ajuda a manter contato dos pneus com o solo e reduz desgaste de componentes da suspensão."
    },
    {
        id: 38,
        titulo: "Coxim do amortecedor",
        garantia: "6 meses",
        preco: "R$ 149,90",
        categoria: "Suspensão",
        fabricante: "RubberMax",
        codigo: "SUS-CA-039",
        imagem: "/imagens/freio/coximAmortecedor/img38.jpg",
        fichaTecnica: {
            dimensoes: "Aprox. 100 mm x 80 mm, furação conforme aplicação",
            peso: "0,6 kg",
            material: "Borracha vulcanizada com base metálica"
        },
        estoque: 30,
        compatibilidade: "Conjuntos de amortecedor dianteiro ou traseiro conforme aplicação.",
        caracteristica: "Absorve vibrações, reduz ruídos e protege a fixação superior do amortecedor.",
        descricao: "Coxim do amortecedor para reposição em veículos com ruídos na suspensão, vibração interna ou desgaste da fixação. Peça importante para conforto, segurança e preservação do amortecedor."
    }
];

export async function seedProdutos() {
    await produtos.bulkCreate(itens, {
        updateOnDuplicate: [
            "titulo",
            "garantia",
            "preco",
            "categoria",
            "fabricante",
            "codigo",
            "imagem",
            "fichaTecnica",
            "estoque",
            "compatibilidade",
            "caracteristica",
            "descricao"
        ]
    });
}
