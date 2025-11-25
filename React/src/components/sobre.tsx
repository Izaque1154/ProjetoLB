import styles from "./css/Sobre.module.css"

function Sobre(){
  return(
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.titulo}>Sobre a LB-Cardans</h1>
                <h2 className={styles.subTitulo}>Quem Somos</h2>
                <p  className={styles.paragrafo}>
                    A <strong>LB-Cardns</strong> é uma <strong>tornearia mecânica</strong> com foco na <strong>manutenção, fabricação e reparo de cardans</strong>, oferecendo soluções precisas e confiáveis para veículos leves, pesados e aplicações industriais. <br />
                    Atuamos com responsabilidade e comprometimento, buscando sempre a <strong>melhor performance e durabilidade</strong> para cada peça que passa pela nossa oficina. <br />
                    Com uma equipe experiente e estrutura preparada, atendemos tanto clientes particulares quanto empresas, sempre com foco em <strong>qualidade, agilidade e confiança</strong>. <br />
                    Na <strong>LB-Cardns</strong>, o nosso compromisso é com o funcionamento do seu equipamento — do jeito certo, no tempo certo.
                </p>
                <h2  className={styles.subTitulo}>🔧 Nossa Especialidade</h2>
                    <p className={styles.paragrafo}>
                        Na <strong>LB-Cardns</strong>, somos especializados em serviços de <strong>tornearia mecânica com foco em cardans</strong>. <br />
                        Trabalhamos com a <strong>fabricação, manutenção e recuperação</strong> de cardans automotivos e industriais. <br />
                        Garantimos que cada peça atenda aos <strong>mais altos padrões de qualidade e segurança</strong>. <br />
                        Nosso compromisso é oferecer soluções <strong>precisas e duráveis</strong> para veículos leves, pesados e equipamentos que exigem <strong>desempenho mecânico confiável</strong>. <br />
                        Quer ver alguns dos projetos e peças que já passaram por aqui? Dá uma olhada na nossa <a href="/oficina">oficina</a> — ela mostra um pouco do que somos capazes de fazer.
                    </p>
                    <h2  className={styles.subTitulo}>🛠️ Como começou</h2>
                    <p className={styles.paragrafo}>
                        A história da <strong>LB-Cardns</strong> começou com a união entre <strong>experiência em mecânica de precisão</strong> e a paixão por resolver problemas técnicos com <strong>qualidade</strong> e <strong>eficiência</strong>. <br />
                        O projeto nasceu com o objetivo de atender uma <strong>demanda crescente por serviços especializados em cardans</strong> — e desde então, vem se consolidando como referência pela dedicação e pelo <strong>atendimento direto ao cliente</strong>. <br />
                        O que começou como um pequeno espaço de oficina, hoje é uma <strong>estrutura sólida</strong>, equipada para atender com <strong>agilidade</strong> e <strong>confiança</strong>.
                    </p>
                    <h2  className={styles.subTitulo}>👨‍🔧 Equipe</h2>
                    <p className={styles.paragrafo}>
                        Contamos com uma <strong>equipe técnica qualificada</strong> e comprometida com cada serviço executado. <br />
                        São profissionais com experiência em <strong>usinagem, solda, balanceamento</strong> e <strong>montagem</strong>, sempre buscando <strong>excelência</strong> em cada detalhe. <br />
                        Além da técnica, valorizamos o <strong>atendimento humano, direto e transparente</strong>, que é a base do relacionamento com nossos clientes. <br />
                    </p>
                    <h2  className={styles.subTitulo}>Como entrar em contato</h2>
                    <p className={styles.paragrafo}>
                        Se você precisa de um <strong>orçamento</strong>, tem <strong>dúvidas</strong> ou quer saber mais sobre os nossos serviços, estamos prontos para te atender. <br />
                        Você pode entrar em contato com a <strong>LB-Cardns</strong> pelos seguintes canais: <br /> <br />
                        <ul className={styles.containerLista}>
                            <li className={styles.lista}>📧 <strong>E-mail:</strong> <a href="/contato" className={styles.a}>abc123@gmail.com</a></li>
                            <li className={styles.lista}>📞 <strong>Telefone:</strong> <a href="/contato" className={styles.a}> (21) 99999-9999</a></li>
                            <li className={styles.lista}>💬 <strong>WhatsApp:</strong> <a href="/contato" className={styles.a}>(21) 99999-9999</a></li>
                        </ul>
                        <strong>Nosso atendimento é rápido e direto</strong> — fale com a gente e vamos encontrar a <strong>melhor solução para o seu cardan</strong>.
                    </p>
            </main>
        </div>
    )
}

export default Sobre