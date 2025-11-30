import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./css/detalhesPecas.module.css";
import { MdError } from "react-icons/md";
import ScrollToTop from "./scroll";
import { useNavigate } from "react-router-dom";

function Pecas(){
    const navigate = useNavigate()
    const [ imagem, setImagem ] = useState<string>("")
    const [erro, setErro] = useState<string>("")
    const { id } = useParams()
    const [itemCarrinho, setItemCarrinho] = useState<boolean>()
  useEffect(() => {
      setErro(styles.hideErro)
  }, []);
  

    const imgPecas: string[] =["barraLonga", "barraCurta", "colunaDirecao", "tensor", "buchaTensor", "bombaHidraulica", "tomadaForca", "cardan", "rolamentoCardan",
         "cruzetaCardan", "macacoHidraulico", "pistao", "reparoPistao", "mangaEixo", "reparoMangaEixo", "caixaTransmissao", "flange", "diferencial", "tamborFreio", "usinagem",
         "fabricacaoPeca", "cuica", "catraca", "valvulaPedal", "valvulaManeco", "valvulaRele", "valvulaLimitadoraPressao", "valvulaEqualizadoraFreio", "cilindroMestreFreio",         // id: 28
         "servoFreioAr", "kitReparoCilindroMestre", "cuboRodaDianteiro", "cuboRodaTraseiro", "juntaHomocinetica", "kitRolamentoRoda", "bieletaSuspensao", "amortecedorDianteiro",        //
         "amortecedorTraseiro", "coximAmortecedor"]
    const imagemEnter: string = `${import.meta.env.BASE_URL}imagens/${Number(id) >= 21? "freio": "tornearia"}/${imgPecas[Number(id)]}/img${id}.jpg`
    const imagemEnter1: string = `${import.meta.env.BASE_URL}imagens/${Number(id) >= 21? "freio": "tornearia"}/${imgPecas[Number(id)]}/img01.jpg`
    const imagemEnter2: string = `${import.meta.env.BASE_URL}imagens/${Number(id) >= 21? "freio": "tornearia"}/${imgPecas[Number(id)]}/img02.jpg`
    const imagemEnter3: string = `${import.meta.env.BASE_URL}imagens/${Number(id) >= 21? "freio": "tornearia"}/${imgPecas[Number(id)]}/img03.jpg`

const pecas = [
  // === ITENS ORIGINAIS (mantidos) ===
  {
    id: 0,
    titulo: "Barra longa de direção",
    garantia: "3 meses",
    preco: "587,99R$",
    categoria: "Direção",
    fabricante: "AutoParts LTDA",
    codigo: "DIR-001",
    imagem: "/imagens/barra_longa.jpg",
    fichaTecnica: {
      dimensoes: "120 x 15 cm",
      peso: "7,2kg",
      material: "Aço forjado"
    },
    estoque: 12,
    compatibilidade: "Caminhões e veículos pesados",
    caracteristica: "Peça de alta durabilidade utilizada no sistema de direção, garantindo firmeza e precisão no controle do veículo. Possui tratamento térmico anticorrosivo e acabamento zincado para maior vida útil.",
    descricao: "A barra longa de direção é fabricada em aço forjado, proporcionando resistência e segurança. Ideal para caminhões e veículos pesados, sua construção robusta oferece estabilidade e precisão em manobras, reduzindo o desgaste de outros componentes do sistema."
  },
  {
    id: 1,
    titulo: "Barra curta de direção",
    garantia: "3 meses",
    preco: "486,89R$",
    categoria: "Direção",
    fabricante: "MetalTruck",
    codigo: "DIR-002",
    imagem: "/imagens/barra_curta.jpg",
    fichaTecnica: {
      dimensoes: "80 x 10 cm",
      peso: "5,5kg",
      material: "Aço carbono"
    },
    estoque: 15,
    compatibilidade: "Veículos leves e médios",
    caracteristica: "Responsável por transmitir o movimento da direção às rodas com precisão, garantindo estabilidade e segurança em altas velocidades.",
    descricao: "A barra curta de direção é essencial para o bom funcionamento do sistema de direção, feita em aço carbono de alta resistência. Oferece desempenho duradouro, reduzindo folgas e vibrações no volante."
  },
  {
    id: 2,
    titulo: "Coluna de Direção",
    garantia: "6 meses",
    preco: "495,50R$",
    fichaTecnica: {
      dimensoes: "75 x 12 cm",
      peso: "6kg",
      material: "Ferro fundido"
    },
    estoque: 8,
    caracteristica: "Liga o volante ao sistema de direção, com articulação de segurança.",
    descricao: "Coluna de direção reforçada, garantindo segurança e suavidade na condução."
  },
  {
    id: 3,
    titulo: "Braço tensor simples",
    garantia: "3 meses",
    preco: "876,67R$",
    fichaTecnica: {
      dimensoes: "50 x 8 cm",
      peso: "3,2kg",
      material: "Aço temperado"
    },
    estoque: 10,
    caracteristica: "Mantém o alinhamento da suspensão e absorve impactos durante o uso.",
    descricao: "O braço tensor simples é ideal para caminhões e ônibus, proporcionando estabilidade e segurança na direção."
  },
  {
    id: 4,
    titulo: "Bucha de braço tensor",
    garantia: "3 meses",
    preco: "279,90R$",
    fichaTecnica: {
      dimensoes: "10 x 6 cm",
      peso: "0,8kg",
      material: "Borracha vulcanizada"
    },
    estoque: 30,
    caracteristica: "Absorve vibrações e reduz ruídos no sistema de suspensão.",
    descricao: "A bucha de braço tensor é desenvolvida para garantir conforto e durabilidade em estradas irregulares."
  },
  {
    id: 5,
    titulo: "Bomba Hidraulica",
    garantia: "6 meses",
    preco: "429,59R$",
    fichaTecnica: {
      dimensoes: "25 x 20 cm",
      peso: "4kg",
      material: "Alumínio fundido"
    },
    estoque: 6,
    caracteristica: "Garante o fluxo de fluido no sistema hidráulico com pressão estável.",
    descricao: "A bomba hidráulica é projetada para oferecer desempenho confiável e duradouro em sistemas de direção hidráulica."
  },
  {
    id: 6,
    titulo: "Tomada de Força",
    garantia: "6 meses",
    preco: "2.284,99R$",
    fichaTecnica: {
      dimensoes: "35 x 25 cm",
      peso: "9,5kg",
      material: "Aço fundido"
    },
    estoque: 5,
    caracteristica: "Permite a transferência de potência do motor para equipamentos auxiliares.",
    descricao: "A tomada de força é utilizada em caminhões e máquinas agrícolas, oferecendo alto desempenho e resistência."
  },
  {
    id: 7,
    titulo: "Eixo Cardan",
    garantia: "6 meses",
    preco: "2.087,46R$",
    fichaTecnica: {
      dimensoes: "150 x 12 cm",
      peso: "15kg",
      material: "Aço tubular"
    },
    estoque: 4,
    caracteristica: "Transmite torque entre componentes mecânicos distantes.",
    descricao: "O eixo cardan garante a transferência de força do motor para o diferencial de forma estável e eficiente."
  },
  {
    id: 8,
    titulo: "Rolamento de Cardan",
    garantia: "3 meses",
    preco: "383,98R$",
    fichaTecnica: {
      dimensoes: "12 x 12 cm",
      peso: "1kg",
      material: "Aço de rolamento"
    },
    estoque: 20,
    caracteristica: "Peça fundamental no suporte e rotação do eixo cardan.",
    descricao: "Rolamento de cardan com lubrificação selada, proporcionando maior durabilidade e desempenho silencioso."
  },
  {
    id: 9,
    titulo: "Cruzeta de Cardan",
    garantia: "3 meses",
    preco: "43,90R$",
    fichaTecnica: {
      dimensoes: "8 x 8 cm",
      peso: "0,7kg",
      material: "Aço temperado"
    },
    estoque: 50,
    caracteristica: "Faz a ligação entre os eixos do cardan permitindo o movimento angular.",
    descricao: "Cruzeta de cardan reforçada, com pinos de alta precisão e graxeira para lubrificação eficiente."
  },
  {
    id: 10,
    titulo: "Macaco Hidraulico",
    garantia: "12 meses",
    preco: "587,99R$",
    fichaTecnica: {
      dimensoes: "35 x 25 cm",
      peso: "11kg",
      material: "Aço inoxidável"
    },
    estoque: 25,
    caracteristica: "Utilizado para elevação de veículos com facilidade e segurança.",
    descricao: "Macaco hidráulico portátil, ideal para oficinas e uso automotivo, com capacidade de elevação de até 5 toneladas."
  },
  {
    id: 11,
    titulo: "Pistão",
    garantia: "3 meses",
    preco: "2.489,89R$",
    fichaTecnica: {
      dimensoes: "15 x 10 cm",
      peso: "2,5kg",
      material: "Alumínio"
    },
    estoque: 18,
    caracteristica: "Componente essencial do motor, responsável pela compressão do combustível.",
    descricao: "Pistão de alta performance, com revestimento antifricção, ideal para motores a diesel e gasolina."
  },
  {
    id: 12,
    titulo: "Reparo para Pistão",
    garantia: "3 meses",
    preco: "274,99R$",
    fichaTecnica: {
      dimensoes: "10 x 5 cm",
      peso: "0,4kg",
      material: "Aço + borracha"
    },
    estoque: 22,
    caracteristica: "Kit completo para manutenção de pistões desgastados.",
    descricao: "O reparo para pistão contém anéis e vedantes de alta qualidade para restauração do desempenho original."
  },
  {
    id: 13,
    titulo: "Manga de Eixo",
    garantia: "6 meses",
    preco: "1.478,78R$",
    fichaTecnica: {
      dimensoes: "40 x 30 cm",
      peso: "12kg",
      material: "Ferro fundido"
    },
    estoque: 7,
    caracteristica: "Componente que conecta o eixo da roda à suspensão.",
    descricao: "Manga de eixo reforçada, projetada para suportar grandes cargas e manter o alinhamento perfeito das rodas."
  },
  {
    id: 14,
    titulo: "Reparo de Manga de Eixo",
    garantia: "3 meses",
    preco: "595,98R$",
    fichaTecnica: {
      dimensoes: "18 x 10 cm",
      peso: "1,2kg",
      material: "Aço e borracha"
    },
    estoque: 16,
    caracteristica: "Substitui peças danificadas da manga de eixo, prolongando sua vida útil.",
    descricao: "Reparo de manga de eixo desenvolvido para encaixe preciso e durabilidade superior."
  },
  {
    id: 15,
    titulo: "Caixa de Transmissão",
    garantia: "12 meses",
    preco: "678,35R$",
    fichaTecnica: {
      dimensoes: "70 x 50 cm",
      peso: "25kg",
      material: "Aço fundido"
    },
    estoque: 3,
    caracteristica: "Responsável pela troca de marchas do veículo.",
    descricao: "Caixa de transmissão de alta precisão, garantindo trocas suaves e maior eficiência no consumo de combustível."
  },
  {
    id: 16,
    titulo: "Flange de Cardan",
    garantia: "3 meses",
    preco: "876,54R$",
    fichaTecnica: {
      dimensoes: "15 x 15 cm",
      peso: "1,8kg",
      material: "Aço carbono"
    },
    estoque: 12,
    caracteristica: "Faz a união entre o cardan e o diferencial.",
    descricao: "Flange de cardan fabricada com precisão, oferecendo vedação e fixação seguras."
  },
  {
    id: 17,
    titulo: "Diferencial",
    garantia: "12 meses",
    preco: "989,99R$",
    fichaTecnica: {
      dimensoes: "60 x 40 cm",
      peso: "30kg",
      material: "Ferro fundido"
    },
    estoque: 4,
    caracteristica: "Distribui a força do motor entre as rodas.",
    descricao: "O diferencial garante melhor tração e estabilidade, mesmo em curvas e terrenos irregulares."
  },
  {
    id: 18,
    titulo: "Tambor de Freio",
    garantia: "6 meses",
    preco: "275,43R$",
    fichaTecnica: {
      dimensoes: "30 x 30 cm",
      peso: "8kg",
      material: "Ferro fundido"
    },
    estoque: 14,
    caracteristica: "Componente essencial do sistema de frenagem.",
    descricao: "Tambor de freio de alta resistência térmica, garantindo frenagem estável e duradoura."
  },
  {
    id: 19,
    titulo: "Usinagem",
    garantia: "3 meses",
    preco: "--R$",
    fichaTecnica: {
      dimensoes: "Sob medida",
      peso: "--",
      material: "Variável"
    },
    estoque: 0,
    caracteristica: "Serviço personalizado de usinagem sob demanda.",
    descricao: "Usinagem de precisão para peças industriais e automotivas conforme especificações do cliente."
  },
  {
    id: 20,
    titulo: "Tornearia Industrial",
    garantia: "3 meses",
    preco: "--R$",
    fichaTecnica: {
      dimensoes: "Sob medida",
      peso: "--",
      material: "Variável"
    },
    estoque: 0,
    caracteristica: "Serviço de torneamento de peças metálicas e mecânicas.",
    descricao: "Tornearia especializada em componentes industriais de alta precisão e acabamento técnico."
  },
  {
    id: 21,
    titulo: "Cuíca de Freio",
    garantia: "6 meses",
    preco: "774,99R$",
    fichaTecnica: {
      dimensoes: "28 x 20 cm",
      peso: "5,3kg",
      material: "Aço e alumínio"
    },
    estoque: 9,
    caracteristica: "Atua como servo-freio pneumático para veículos pesados.",
    descricao: "A cuíca de freio aumenta a força aplicada nos freios, proporcionando frenagens mais eficientes."
  },
  {
    id: 22,
    titulo: "Catraca de Freio",
    garantia: "6 meses",
    preco: "587,99R$",
    fichaTecnica: {
      dimensoes: "22 x 12 cm",
      peso: "3kg",
      material: "Aço carbono"
    },
    estoque: 11,
    caracteristica: "Permite o ajuste automático das lonas de freio.",
    descricao: "Catraca de freio de alta durabilidade, essencial para a manutenção do sistema de frenagem pneumático."
  },
  {
    id: 23,
    titulo: "Válvula Pedal de Freio",
    garantia: "6 meses",
    preco: "197,67R$",
    fichaTecnica: {
      dimensoes: "18 x 10 cm",
      peso: "1,5kg",
      material: "Alumínio"
    },
    estoque: 13,
    caracteristica: "Controla a pressão do ar no sistema de freios.",
    descricao: "Válvula pedal de freio com resposta precisa e construção leve, ideal para caminhões e ônibus."
  },
  {
    id: 24,
    titulo: "Válvula Maneco Freio de Mão",
    garantia: "6 meses",
    preco: "688,59R$",
    fichaTecnica: {
      dimensoes: "20 x 14 cm",
      peso: "2kg",
      material: "Alumínio"
    },
    estoque: 10,
    caracteristica: "Comando pneumático do freio de estacionamento.",
    descricao: "Válvula maneco desenvolvida para operação suave e segura do freio de mão em veículos pesados."
  },
  {
    id: 25,
    titulo: "Válvula Relê",
    garantia: "6 meses",
    preco: "125,45R$",
    fichaTecnica: {
      dimensoes: "15 x 10 cm",
      peso: "1kg",
      material: "Alumínio"
    },
    estoque: 18,
    caracteristica: "Regula o fluxo de ar entre o pedal e as câmaras de freio.",
    descricao: "Válvula relê com corpo em alumínio leve e resistência à corrosão, garantindo resposta rápida no sistema pneumático."
  },
    {
    id: 26,
    titulo: "Amortecedor Dianteiro",
    garantia: "12 meses",
    preco: "489,99R$",
    categoria: "Suspensão",
    fabricante: "ShockMaster",
    codigo: "SUS-101",
    imagem: "/imagens/amortecedor_dianteiro.jpg",
    fichaTecnica: {
      dimensoes: "45 x 8 cm",
      peso: "3,8kg",
      material: "Aço e alumínio"
    },
    estoque: 20,
    compatibilidade: "Caminhões leves e ônibus urbanos",
    caracteristica: "Absorve impactos e vibrações causadas por irregularidades da pista, mantendo o contato constante das rodas com o solo. Possui pistão pressurizado com tecnologia de válvula dupla, aumentando a estabilidade do veículo.",
    descricao: "O amortecedor dianteiro da ShockMaster oferece excelente absorção de impactos e estabilidade. Fabricado com tecnologia avançada e materiais resistentes, é ideal para garantir conforto, dirigibilidade e segurança em qualquer tipo de estrada."
  },
  {
    id: 27,
    titulo: "Amortecedor Traseiro",
    garantia: "12 meses",
    preco: "459,99R$",
    categoria: "Suspensão",
    fabricante: "ShockMaster",
    codigo: "SUS-102",
    imagem: "/imagens/amortecedor_traseiro.jpg",
    fichaTecnica: {
      dimensoes: "48 x 8 cm",
      peso: "3,5kg",
      material: "Aço carbono"
    },
    estoque: 18,
    compatibilidade: "Caminhões e vans",
    caracteristica: "Dissipa a energia gerada por trepidações e cargas, aumentando o conforto e prolongando a vida útil dos pneus. Equipado com óleo sintético de longa duração.",
    descricao: "O amortecedor traseiro garante uma condução mais suave e estável, mesmo em terrenos acidentados. Desenvolvido com tecnologia de vedação reforçada, oferece excelente durabilidade e performance mesmo sob carga máxima."
  },
  {
    id: 28,
    titulo: "Bomba de Combustível",
    garantia: "6 meses",
    preco: "324,90R$",
    categoria: "Motor",
    fabricante: "FuelPro",
    codigo: "MOT-201",
    imagem: "/imagens/bomba_combustivel.jpg",
    fichaTecnica: {
      dimensoes: "20 x 15 cm",
      peso: "2kg",
      material: "Aço e plástico ABS"
    },
    estoque: 25,
    compatibilidade: "Motores a diesel e gasolina",
    caracteristica: "Responsável por enviar o combustível do tanque ao motor com pressão adequada. Possui filtro integrado e corpo vedado contra vazamentos.",
    descricao: "A bomba de combustível FuelPro oferece desempenho confiável e silencioso, garantindo fluxo constante de combustível e economia de energia. Ideal para caminhões e veículos comerciais que exigem alto desempenho contínuo."
  },
  {
    id: 29,
    titulo: "Radiador de Arrefecimento",
    garantia: "12 meses",
    preco: "789,90R$",
    categoria: "Sistema de Arrefecimento",
    fabricante: "CoolTech",
    codigo: "ARF-301",
    imagem: "/imagens/radiador.jpg",
    fichaTecnica: {
      dimensoes: "65 x 45 cm",
      peso: "6,8kg",
      material: "Alumínio e cobre"
    },
    estoque: 9,
    compatibilidade: "Caminhões e tratores",
    caracteristica: "Dissipa o calor do motor mantendo a temperatura ideal de funcionamento. Tubulações reforçadas com aletas de alta eficiência térmica.",
    descricao: "O radiador de arrefecimento CoolTech é projetado para máxima dissipação térmica e durabilidade. Seu design leve e eficiente reduz o consumo de energia e evita superaquecimento, garantindo longa vida útil ao motor."
  },
  {
    id: 30,
    titulo: "Embreagem Completa",
    garantia: "12 meses",
    preco: "1.249,99R$",
    categoria: "Transmissão",
    fabricante: "GearForce",
    codigo: "TRM-401",
    imagem: "/imagens/embreagem.jpg",
    fichaTecnica: {
      dimensoes: "35 x 35 cm",
      peso: "8,5kg",
      material: "Aço e cerâmica"
    },
    estoque: 6,
    compatibilidade: "Caminhões e ônibus",
    caracteristica: "Permite o engate e desengate suave da transmissão, com molas reforçadas e disco de fricção de alta resistência térmica.",
    descricao: "O kit de embreagem GearForce é fabricado com materiais premium, garantindo respostas rápidas e durabilidade mesmo sob uso severo. Ideal para frotas comerciais e veículos de carga pesada."
  },
  {
    id: 31,
    titulo: "Filtro de Óleo",
    garantia: "3 meses",
    preco: "49,99R$",
    categoria: "Manutenção",
    fabricante: "LubeMaster",
    codigo: "MAN-501",
    imagem: "/imagens/filtro_oleo.jpg",
    fichaTecnica: {
      dimensoes: "10 x 8 cm",
      peso: "0,3kg",
      material: "Aço e papel sintético"
    },
    estoque: 100,
    compatibilidade: "Motores a diesel e gasolina",
    caracteristica: "Remove impurezas e partículas do óleo lubrificante, protegendo os componentes internos do motor. Possui válvula antirretorno e vedação em borracha nitrílica.",
    descricao: "O filtro de óleo LubeMaster garante limpeza eficiente e aumento da vida útil do motor. Ideal para manutenção preventiva e redução do consumo de combustível."
  },
  {
    id: 32,
    titulo: "Filtro de Ar",
    garantia: "3 meses",
    preco: "39,99R$",
    categoria: "Manutenção",
    fabricante: "LubeMaster",
    codigo: "MAN-502",
    imagem: "/imagens/filtro_ar.jpg",
    fichaTecnica: {
      dimensoes: "25 x 20 cm",
      peso: "0,4kg",
      material: "Papel filtrante e borracha"
    },
    estoque: 75,
    compatibilidade: "Caminhões leves e pesados",
    caracteristica: "Filtra o ar de admissão, impedindo a entrada de poeira e resíduos no motor. Possui estrutura reforçada com vedação perimetral.",
    descricao: "O filtro de ar LubeMaster aumenta a eficiência do motor e reduz o desgaste de válvulas e pistões. Substituição simples e manutenção econômica."
  },
  {
    id: 33,
    titulo: "Kit de Correia Dentada",
    garantia: "6 meses",
    preco: "269,99R$",
    categoria: "Motor",
    fabricante: "PowerBelt",
    codigo: "MOT-202",
    imagem: "/imagens/kit_correia.jpg",
    fichaTecnica: {
      dimensoes: "30 x 25 cm",
      peso: "1,2kg",
      material: "Borracha reforçada e metal"
    },
    estoque: 15,
    compatibilidade: "Motores 2.0 a 3.5",
    caracteristica: "Responsável pela sincronização precisa entre virabrequim e comando de válvulas. Kit completo com tensionador e rolamento.",
    descricao: "O kit de correia dentada PowerBelt garante desempenho confiável e evita falhas críticas no motor. Desenvolvido para máxima durabilidade e fácil instalação."
  },
  {
    id: 34,
    titulo: "Alternador 12V",
    garantia: "12 meses",
    preco: "978,90R$",
    categoria: "Elétrica",
    fabricante: "VoltTech",
    codigo: "ELT-601",
    imagem: "/imagens/alternador.jpg",
    fichaTecnica: {
      dimensoes: "22 x 18 cm",
      peso: "5kg",
      material: "Alumínio e cobre"
    },
    estoque: 8,
    compatibilidade: "Caminhões leves e utilitários",
    caracteristica: "Gera energia elétrica para recarregar a bateria e alimentar o sistema elétrico do veículo. Rotor balanceado e rolamentos selados.",
    descricao: "O alternador VoltTech é construído com componentes de alta performance, oferecendo carga estável e baixo ruído. Ideal para aplicações profissionais e veículos de longo percurso."
  },
  {
    id: 35,
    titulo: "Motor de Partida",
    garantia: "12 meses",
    preco: "1.198,99R$",
    categoria: "Elétrica",
    fabricante: "VoltTech",
    codigo: "ELT-602",
    imagem: "/imagens/motor_partida.jpg",
    fichaTecnica: {
      dimensoes: "28 x 20 cm",
      peso: "7,2kg",
      material: "Aço e cobre"
    },
    estoque: 10,
    compatibilidade: "Motores a diesel até 6 cilindros",
    caracteristica: "Responsável por girar o motor até a combustão iniciar. Possui ímã permanente e engrenagem reforçada.",
    descricao: "O motor de partida VoltTech combina potência e durabilidade. Projetado para veículos de carga, garante acionamento rápido e confiável em qualquer condição climática."
  },
  {
    id: 36,
    titulo: "Sensor de Velocidade",
    garantia: "6 meses",
    preco: "148,90R$",
    categoria: "Eletrônica",
    fabricante: "TechDrive",
    codigo: "ELE-701",
    imagem: "/imagens/sensor_velocidade.jpg",
    fichaTecnica: {
      dimensoes: "8 x 4 cm",
      peso: "0,2kg",
      material: "Plástico ABS e cobre"
    },
    estoque: 30,
    compatibilidade: "Veículos pesados e médios",
    caracteristica: "Converte o movimento do eixo em sinal elétrico para o painel e central eletrônica. Resistência a vibrações e temperaturas extremas.",
    descricao: "O sensor de velocidade TechDrive garante medições precisas, otimizando o desempenho do sistema eletrônico do veículo. Ideal para substituição em frotas e oficinas."
  },
  {
    id: 37,
    titulo: "Sensor de Temperatura do Motor",
    garantia: "6 meses",
    preco: "98,50R$",
    categoria: "Eletrônica",
    fabricante: "TechDrive",
    codigo: "ELE-702",
    imagem: "/imagens/sensor_temperatura.jpg",
    fichaTecnica: {
      dimensoes: "6 x 3 cm",
      peso: "0,15kg",
      material: "Latão e plástico"
    },
    estoque: 40,
    compatibilidade: "Motores a diesel e gasolina",
    caracteristica: "Monitora a temperatura do líquido de arrefecimento e envia dados à ECU para controle térmico.",
    descricao: "Sensor de alta precisão e rápida resposta térmica, garantindo o funcionamento ideal do motor e prevenção contra superaquecimento."
  },
  {
    id: 38,
    titulo: "Jogo de Pastilhas de Freio",
    garantia: "6 meses",
    preco: "229,99R$",
    categoria: "Freio",
    fabricante: "BrakeMax",
    codigo: "FRM-801",
    imagem: "/imagens/pastilhas_freio.jpg",
    fichaTecnica: {
      dimensoes: "15 x 8 cm",
      peso: "2kg",
      material: "Cerâmica e aço"
    },
    estoque: 22,
    compatibilidade: "Veículos de médio porte",
    caracteristica: "Pastilhas de alta fricção com baixo ruído e desgaste controlado. Suporte metálico reforçado e sensores de desgaste integrados.",
    descricao: "O jogo de pastilhas BrakeMax proporciona frenagens seguras e silenciosas, com longa durabilidade e excelente dissipação térmica. Ideal para quem busca desempenho e segurança."
  },
  {
    id: 39,
    titulo: "Disco de Freio Ventilado",
    garantia: "6 meses",
    preco: "399,99R$",
    categoria: "Freio",
    fabricante: "BrakeMax",
    codigo: "FRM-802",
    imagem: "/imagens/disco_freio.jpg",
    fichaTecnica: {
      dimensoes: "32 x 32 cm",
      peso: "6kg",
      material: "Ferro fundido ventilado"
    },
    estoque: 15,
    compatibilidade: "Caminhões leves e vans",
    caracteristica: "Dissipação térmica eficiente e resistência à fadiga. Furos radiais auxiliam na refrigeração e frenagem precisa.",
    descricao: "O disco de freio ventilado BrakeMax oferece performance superior e durabilidade prolongada. Fabricado com ligas de alta resistência para suportar temperaturas extremas."
  },
  {
    id: 40,
    titulo: "Cilindro Mestre de Freio",
    garantia: "6 meses",
    preco: "349,90R$",
    categoria: "Freio",
    fabricante: "BrakeMax",
    codigo: "FRM-803",
    imagem: "/imagens/cilindro_mestre.jpg",
    fichaTecnica: {
      dimensoes: "20 x 10 cm",
      peso: "2,2kg",
      material: "Alumínio fundido"
    },
    estoque: 12,
    compatibilidade: "Veículos a ar e hidráulicos",
    caracteristica: "Controla a pressão do fluido no sistema hidráulico de freio. Pistões internos tratados com níquel para evitar corrosão.",
    descricao: "O cilindro mestre BrakeMax assegura resposta rápida e pedal firme. Ideal para reposição em sistemas de freio hidráulico de caminhões e ônibus."
  },
  {
    id: 41,
    titulo: "Mangueira de Combustível Reforçada",
    garantia: "6 meses",
    preco: "79,90R$",
    categoria: "Motor",
    fabricante: "FuelPro",
    codigo: "MOT-203",
    imagem: "/imagens/mangueira_combustivel.jpg",
    fichaTecnica: {
      dimensoes: "1 metro (diâmetro 1,2cm)",
      peso: "0,4kg",
      material: "Borracha nitrílica reforçada"
    },
    estoque: 100,
    compatibilidade: "Todos os tipos de motores",
    caracteristica: "Resistente a altas temperaturas e pressão. Ideal para condução de combustível e óleo.",
    descricao: "A mangueira FuelPro é projetada para durabilidade extrema e resistência a produtos químicos. Indicada para sistemas de combustível em veículos e equipamentos industriais."
  },
  {
    id: 42,
    titulo: "Kit de Retentores do Motor",
    garantia: "6 meses",
    preco: "189,99R$",
    categoria: "Motor",
    fabricante: "SealMax",
    codigo: "MOT-204",
    imagem: "/imagens/kit_retentores.jpg",
    fichaTecnica: {
      dimensoes: "Pacote com 10 peças",
      peso: "0,6kg",
      material: "Borracha sintética e metal"
    },
    estoque: 18,
    compatibilidade: "Motores a diesel até 3.0",
    caracteristica: "Evita vazamentos de óleo e fluidos, garantindo vedação total das juntas internas do motor.",
    descricao: "O kit de retentores SealMax contém peças de alta resistência térmica e química, projetadas para manter o motor livre de vazamentos e operar com máxima eficiência."
  },
  {
    id: 43,
    titulo: "Kit de Parafusos de Roda",
    garantia: "6 meses",
    preco: "99,90R$",
    categoria: "Rodas",
    fabricante: "AutoParts LTDA",
    codigo: "ROD-901",
    imagem: "/imagens/parafusos_roda.jpg",
    fichaTecnica: {
      dimensoes: "Pacote com 20 unidades",
      peso: "1,5kg",
      material: "Aço zincado"
    },
    estoque: 35,
    compatibilidade: "Caminhões e vans",
    caracteristica: "Rosca tratada contra corrosão e cabeça reforçada para torque elevado. Ideal para fixação de rodas com segurança máxima.",
    descricao: "O kit de parafusos AutoParts garante encaixe perfeito e resistência em uso prolongado. Fabricados conforme padrões industriais de segurança."
  },
  {
    id: 44,
    titulo: "Tambor de Embreagem",
    garantia: "6 meses",
    preco: "1.089,99R$",
    categoria: "Transmissão",
    fabricante: "GearForce",
    codigo: "TRM-402",
    imagem: "/imagens/tambor_embreagem.jpg",
    fichaTecnica: {
      dimensoes: "40 x 35 cm",
      peso: "10kg",
      material: "Aço temperado"
    },
    estoque: 5,
    compatibilidade: "Caixas de transmissão manuais",
    caracteristica: "Responsável pela transmissão do torque entre o eixo do motor e o conjunto de engrenagens. Balanceado dinamicamente para evitar vibrações.",
    descricao: "O tambor de embreagem GearForce é produzido com materiais premium e submetido a testes rigorosos de resistência, garantindo alto desempenho e durabilidade."
  },
  {
    id: 45,
    titulo: "Suporte de Motor",
    garantia: "12 meses",
    preco: "274,90R$",
    categoria: "Motor",
    fabricante: "MountPro",
    codigo: "MOT-205",
    imagem: "/imagens/suporte_motor.jpg",
    fichaTecnica: {
      dimensoes: "18 x 12 cm",
      peso: "2,8kg",
      material: "Aço e borracha"
    },
    estoque: 14,
    compatibilidade: "Motores médios e grandes",
    caracteristica: "Suporte com isolamento de vibrações e absorção de impacto. Borracha vulcanizada para maior durabilidade.",
    descricao: "O suporte de motor MountPro reduz ruídos e vibrações, oferecendo estabilidade e conforto ao veículo. Ideal para substituição em sistemas desgastados."
  }
];

  useEffect(() =>{
    axios.post("https://dockerlb.onrender.com/itemCarrinho", {peca: id}, {withCredentials:true})
    .then((res) => setItemCarrinho(res.data.msg))
    .catch(() => console.log("Nenhum item no carrinho"))
  }, [])

    async function carrinho(){
        try{
            await axios.post("https://dockerlb.onrender.com/carrinho", {peca: id}, {withCredentials: true})
            setItemCarrinho(true)
        }catch(erro){
            console.log("erro ao buscar o carrinho: ", erro)
            setErro(styles.showErro)
            setTimeout(() =>{
              setErro(styles.hideErro)
            }, 2000)
        }
    }

    async function contratar() {
      try{
        await axios.post("https://dockerlb.onrender.com/perfil", {}, {withCredentials:true})
        navigate("/servico", {state: `/peca/${id}`})
      }catch(erro){
      setErro(styles.showErro)
            setTimeout(() =>{
              setErro(styles.hideErro)
            }, 2000)
        }
    }

  return(
        <div className={styles.container}>
           <div className={erro}>
                <div className={styles.warning}><MdError /></div>
                <p className={styles.erroP}>é necessário estar logado</p>
            </div>
          <ScrollToTop/>
            {pecas.map(p => (
                p.id.toString() === id?.toString() ?
                <main className={styles.main}>
                    <div className={styles.box}>
                        <div className={styles.info}>
                            <div className={styles.containerT}>
                                <h2 className={styles.titulo}> {p.titulo}</h2> 
                            </div>
                            <div className={styles.containerP}>
                                <h2 className={styles.preco}>{p.preco}</h2>
                            </div>
                            <div className={styles.containerG}>
                                <h5 className={styles.Hgarantia}>Garantia: </h5>
                                <p className={styles.garantia}>{p.garantia}</p>
                            </div>
                            <div className={styles.containerD}>
                                <h3 className={styles.Hdescricao}>Descrição: </h3>
                                <p className={styles.descricao}>{p.descricao}</p>
                            </div>
                            <div className={styles.containerC}>
                                <h3 className={styles.Hcaracteristica}>Caracteristicas: </h3>
                                <p className={styles.caracteristicas}>{p.caracteristica}</p>
                            </div>
                            <div className={styles.containerF}>
                                <h3 className={styles.HfichaTecnica}>Ficha tecnica: </h3>
                                <ul className={styles.LfichaTecnica}>
                                    <li className={styles.fichaTecnica}>Dimensões: {p.fichaTecnica.dimensoes}</li>
                                    <li className={styles.fichaTecnica}>Peso: {p.fichaTecnica.peso}</li>
                                    <li className={styles.fichaTecnica}>Material: {p.fichaTecnica.material}</li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.imagem}>
                            <div className={styles.imagens}>
                                <ul className={styles.listaImagem}>
                                    <li className={styles.imagensLista}>
                                        <img src={`${import.meta.env.BASE_URL}imagens/${Number(id) >= 21? "freio": "tornearia"}/${imgPecas[Number(id)]}/img01.jpg`} onMouseEnter={() => {
                                            setImagem(imagemEnter1)
                                        }} alt="imagem peça" className={styles.img} />
                                    </li>
                                    <li className={styles.imagensLista}>
                                        <img src={`${import.meta.env.BASE_URL}imagens/${Number(id) >= 21? "freio": "tornearia"}/${imgPecas[Number(id)]}/img02.jpg`} onMouseEnter={() => {
                                            setImagem(imagemEnter2)
                                        }}  alt="imagem peça" className={styles.img} />
                                    </li>
                                    <li className={styles.imagensLista}>
                                        <img src={`${import.meta.env.BASE_URL}imagens/${Number(id) >= 21? "freio": "tornearia"}/${imgPecas[Number(id)]}/img03.jpg`} onMouseEnter={() => {
                                            setImagem(imagemEnter3)
                                        }}  alt="imagem peça" className={styles.img} />
                                    </li>
                                    <li className={styles.imagensLista}>
                                        <img src={`${import.meta.env.BASE_URL}imagens/${Number(id) >= 21? "freio": "tornearia"}/${imgPecas[Number(id)]}/img${id}.jpg`} onMouseEnter={() => {
                                            setImagem(imagemEnter)
                                        }}  alt="imagem peça" className={styles.img} />
                                    </li>
                                </ul>
                            </div>
                            <div className={styles.pImagem}>
                                <img src={!imagem ? `${import.meta.env.BASE_URL}imagens/${Number(id) >= 21? "freio": "tornearia"}/${imgPecas[Number(id)]}/img${id}.jpg` : imagem} alt="imagem peça" className={styles.img1} />
                            </div>
                            <div className={styles.containerE}>
                                <h6 className={styles.Hestoque}>Estoque: {p.estoque}</h6>
                            </div>
                            <button className={styles.contratar} onClick={() => contratar()}>Contratar</button>
                            {
                                !itemCarrinho ?
                                    <button className={styles.carrinho} onClick={() => carrinho()}>Adicionar ao carrinho</button>
                                :
                                    <div><p>Item adicionado ao carrinho</p></div>
                            }
                        </div>
                    </div>
                </main>
                :
                null
            ))}
        </div>
    )
}

export default Pecas