import "bootstrap/dist/css/bootstrap.min.css";
import { FaWhatsapp } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import styles from "./css/home.module.css"
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <main className={styles.containerMain}>
        <div className={styles.section}>
          <h1 className={styles.h1}>Bem-vindo à <p className={styles.lbColor}>LB Cardans!</p></h1>
          <p className={styles.p}>
            Na <b className={styles.wordColor}>LB Cardans</b>, somos especializados em serviços de <b>manutenção e reparo de cardans</b>, <br />oferecendo soluções rápidas e eficientes para veículos de todos os tipos.
            <br />Com mais de <b>15 anos de experiência no mercado</b>, <br />nossa equipe altamente qualificada garante o máximo desempenho e segurança para o seu veículo. <br />
            Oferecemos uma ampla gama de serviços, incluindo <b>troca e reparo de cardans</b>,<br /> alinhamento e balanceamento, tudo realizado com tecnologia de ponta e peças de alta qualidade. <br />
            Atendimento personalizado e preços justos, além de um ambiente acolhedor, <br />fazem da LB Cardans a escolha ideal para quem busca confiança e qualidade em serviços automotivos. <br />
            <b>Entre em contato conosco</b> e descubra como podemos cuidar do seu veículo com excelência!
          </p>
        </div>
        <div className={styles.section2}>
            <div className={styles.sectionOficina}>
              <button className={styles.oficina} onClick={()=> navigate("/oficina")}>Oficina</button>
            </div>
            <div className={styles.containerContato}>
              <div className={styles.contato}><FaPhoneAlt /></div>
              <div className={styles.contato}><FaWhatsapp /></div>
              <div className={styles.contato}><SiGmail /></div>
            </div>
          </div>
      </main>
    </div>
  )
}

export default Home
