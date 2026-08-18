import {
  FiCheckCircle,
  FiChevronRight,
  FiClipboard,
  FiDollarSign,
  FiFileText,
  FiLock,
  FiSearch,
  FiSend,
  FiShield,
  FiUploadCloud,
  FiUser,
  FiZap,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import styles from "./css/orcamento.module.css";
import { useState } from "react";
import api,{ apiRoutes } from "../services/api";

function OrcamentoCliente() {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [veiculo, setVeiculo] = useState("");
  const [servicoId, setServicoId] = useState("");
  const [descricao, setDescricao] = useState("");
  const [urgencia, setUrgencia] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [placa, setPlaca] = useState("");
  const [chassi, setChassi] = useState("");

  const formData = new FormData();

  const backgroundImage = `linear-gradient(90deg, rgba(0, 11, 28, 0.97) 0%, rgba(0, 18, 40, 0.80) 48%, rgba(0, 10, 24, 0.93) 100%), url("${import.meta.env.BASE_URL}imagens/of.jpg")`;

  //função para enviar o formulário de orçamento
  async function enviarOrcamento(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    try{

      formData.append("nome", nomeCompleto);
      formData.append("telefone", telefone);
      formData.append("email", email);
      formData.append("veiculo", veiculo);
      formData.append("servicoId", servicoId);
      formData.append("descricao", descricao);
      formData.append("urgencia", urgencia);
      formData.append("placa", placa);
      formData.append("chassi", chassi);
      if (foto) {
        formData.append("foto", foto, foto.name);
      }
      for (const [chave, valor] of formData.entries()) {
        console.log(chave, valor);
      }

      const response = await api.post(apiRoutes.budget.enviar, formData);

      console.log("Orçamento enviado com sucesso!", response);
      

    } catch (error) {
      console.error("Erro ao enviar o orçamento:", error);
    }
  }

  return (
    <section className={styles.page} style={{ backgroundImage }}>
      <div className={styles.content}>
        <div className={styles.topGrid}>
          <aside className={styles.intro}>
            <h1>
              Solicite seu
              <span>Orçamento</span>
            </h1>

            <p className={styles.introText}>
              Preencha o formulário ao lado e solicite um orçamento para
              manutenção, reparo, balanceamento e demais serviços de cardans.
              Nossa equipe especializada analisará sua solicitação e retornará
              com a melhor solução para o seu veículo.
            </p>

            <div className={styles.benefits}>
              <div className={styles.benefit}>
                <span className={styles.benefitIcon}><FiZap /></span>
                <div>
                  <h2>Resposta rápida</h2>
                  <p>Retornamos seu orçamento o mais rápido possível.</p>
                </div>
              </div>

              <div className={styles.benefit}>
                <span className={styles.benefitIcon}><FiUser /></span>
                <div>
                  <h2>Atendimento especializado</h2>
                  <p>Profissionais experientes prontos para entender e resolver seu problema.</p>
                </div>
              </div>

              <div className={styles.benefit}>
                <span className={styles.benefitIcon}><FiShield /></span>
                <div>
                  <h2>Peças e serviços de qualidade</h2>
                  <p>Trabalhamos com peças de alta performance e serviços com garantia.</p>
                </div>
              </div>

              <div className={styles.benefit}>
                <span className={styles.benefitIcon}><FiDollarSign /></span>
                <div>
                  <h2>Orçamento sem compromisso</h2>
                  <p>Solicite seu orçamento gratuitamente, sem compromisso.</p>
                </div>
              </div>
            </div>
          </aside>

          <form className={styles.formCard} onSubmit={enviarOrcamento}>
            <h2 className={styles.formTitle}>
              <FiFileText />
              Formulário de Orçamento
            </h2>

            <div className={styles.fields}>
              <label className={styles.field}>
                <span>Nome completo *</span>
                <input type="text" onChange={(e) => setNomeCompleto(e.target.value)} name="nome" placeholder="Digite seu nome completo" required />
              </label>

              <label className={styles.field}>
                <span>Telefone / WhatsApp *</span>
                <input type="tel" onChange={(e) => setTelefone(e.target.value)} name="telefone" placeholder="(11) 99999-9999" required />
              </label>

              <label className={styles.field}>
                <span>E-mail *</span>
                <input type="email" onChange={(e) => setEmail(e.target.value)} name="email" placeholder="seu@email.com" required />
              </label>

              <label className={styles.field}>
                <span>Veículo / Modelo *</span>
                <input type="text" onChange={(e) => setVeiculo(e.target.value)} name="veiculo"  placeholder="Ex: Caminhão Scania R450, Hilux 2021" required />
              </label>

              <label className={styles.field}>
                <span>Placa( opcional )</span>
                <input type="text" onChange={(e) => setPlaca(e.target.value)} name="placa"  placeholder="Ex: ABC-1234" />
              </label>

              <label className={styles.field}>
                <span>Chassi(chassi)</span>
                <input type="text" onChange={(e) => setChassi(e.target.value)} name="chassi"  placeholder="Ex: 1HGBH41JXMN109186" />
              </label>

              <label className={`${styles.field} ${styles.fullWidth}`}>
                <span>Serviço desejado *</span>
                <select name="servicoId" onChange={(e) => setServicoId(e.target.value)} defaultValue="" required>
                  <option value="" disabled>Selecione o serviço</option>
                  <option value="1">Manutenção de cardan</option>
                  <option value="2">Balanceamento</option>
                  <option value="3">Usinagem</option>
                  <option value="4">Reparo de peças</option>
                  <option value="5">Outro serviço</option>
                </select>
              </label>

              <label className={`${styles.field} ${styles.fullWidth}`}>
                <span>Descrição do problema *</span>
                <textarea
                  onChange={(e) => setDescricao(e.target.value)}
                  name="descricao"
                  placeholder="Descreva o problema, barulhos, vibrações ou qualquer detalhe importante."
                  rows={3}
                  required
                />
              </label>

              <label className={styles.field}>
                <span>Urgência</span>
                <select name="urgencia" onChange={(e) => setUrgencia(e.target.value)} defaultValue="">
                  <option value="" disabled>Selecione a urgência</option>
                  <option value="normal">Normal</option>
                  <option value="prioritaria">Prioritária</option>
                  <option value="urgente">Urgente</option>
                </select>
              </label>

              <div className={styles.field}>
                <span>Adicionar foto (opcional)</span>
                <label className={styles.upload} htmlFor="foto-orcamento">
                  <FiUploadCloud />
                  <span>
                    <strong>{foto ? foto.name : "Clique para selecionar uma foto"}</strong>
                    <small>PNG, JPG ou JPEG até 10MB</small>
                  </span>
                  <input
                    id="foto-orcamento"
                    name="foto"
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={(e) => {
                      const arquivo = e.target.files?.[0];

                      if (arquivo) {
                        setFoto(arquivo);
                        console.log(e.target.files);
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            <button className={styles.submitButton} type="submit">
              <FiSend />
              Enviar Orçamento
            </button>

            <p className={styles.privacy}>
              <FiLock />
              Seus dados estão protegidos. Não compartilhamos suas informações.
            </p>
          </form>
        </div>

        <section className={styles.howItWorks} aria-labelledby="como-funciona">
          <h2 id="como-funciona">Como funciona</h2>

          <div className={styles.steps}>
            <article className={styles.step}>
              <span className={styles.stepIcon}><FiClipboard /></span>
              <div><h3>1. Preencha o formulário</h3><p>Informe seus dados, o veículo e descreva o problema.</p></div>
              <FiChevronRight className={styles.arrow} />
            </article>
            <article className={styles.step}>
              <span className={styles.stepIcon}><FiSearch /></span>
              <div><h3>2. Nossa equipe analisa</h3><p>Nossos especialistas avaliam sua solicitação com atenção.</p></div>
              <FiChevronRight className={styles.arrow} />
            </article>
            <article className={styles.step}>
              <span className={styles.stepIcon}><FiCheckCircle /></span>
              <div><h3>3. Você recebe o orçamento</h3><p>Enviamos a melhor solução com preço justo e prazo de execução.</p></div>
            </article>
          </div>
        </section>

        <section className={styles.whatsappCard}>
          <span className={styles.whatsappIcon}><FaWhatsapp /></span>
          <div className={styles.whatsappCopy}>
            <h2>Prefere falar com a gente?</h2>
            <p>Chame no WhatsApp e tire suas dúvidas agora mesmo.</p>
          </div>
          <a href="https://wa.me/5511987654321" target="_blank" rel="noreferrer">
            <FaWhatsapp /> (11) 98765-4321
          </a>
        </section>
      </div>
    </section>
  );
}

export default OrcamentoCliente;

