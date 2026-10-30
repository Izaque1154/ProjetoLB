import type { IconType } from "react-icons";
import {
  FiActivity,
  FiArrowLeft,
  FiCalendar,
  FiFileText,
  FiFlag,
  FiGitCommit,
  FiHash,
  FiMail,
  FiMessageCircle,
  FiPaperclip,
  FiPhone,
  FiTool,
  FiTruck,
  FiUser,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api, { apiRoutes } from "../../services/api";
import type { SolicitacaoOrcamento } from "../../types/orcamentoInterface";
import type { Orcamento } from "../../types/orcamentoInterface";

import styles from "../css/cssAdmin/verSolicitacao.module.css";

interface DetailCardProps {
  icon: IconType;
  label: string;
  value: string;
}
const listaStatus: string[] = ['novo', 'em analise', 'orçamento criado', 'aguardando aprovação', 'aprovado', 'finalizado'];

//Criar uma função para verificar a posição do status atual na lista de status e retornar o próximo status.
function getNextStatus(currentStatus: string): number | null {
  const currentIndex = listaStatus.indexOf(currentStatus.toLowerCase());
  if (currentIndex === -1 || currentIndex === listaStatus.length - 1) {
    return null; // Retorna null se o status atual não estiver na lista ou se for o último status.
  }
  console.log("Current Index:", currentIndex);
  return currentIndex;
}

  //Funções auxiliares para renderizar os detalhes da solicitação.
function DetailCard({ icon: Icon, label, value }: DetailCardProps) {
  return (
    <article className={styles.detail_card}>
      <Icon aria-hidden="true" />
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </article>
  );
}

function formatarData(data: string): string {
  const dataFormatada = data.split("T")[0].split("-").reverse().join("/");

  return dataFormatada;
}


function VerSolicitacao() {
  const navigate = useNavigate();
  const [dados, setDados] = useState<SolicitacaoOrcamento | null | undefined>(null);
  const [fotoSelecionada, setFotoSelecionada] = useState<string | null>(null);
  const [dadosOrcamento, setDadosOrcamento] = useState<Orcamento | null>(null);

  const { id } = useParams();
  const urlImage = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!id) {
      return;
    }

    
    let componenteAtivo = true;

    api
      .get<{ solicitacao: SolicitacaoOrcamento }>(
        apiRoutes.solicitacoes.adminDetalhe(id),
      )
      .then((response) => {
        if (componenteAtivo) {
          console.log('R: ', response.data.solicitacao.foto);
          setDados(response.data.solicitacao)
          console.log("Solicitação carregada:", response.data.solicitacao);
        }
      })
      .catch((erro) => console.error("Erro ao buscar solicitação:", erro));

      api.patch(apiRoutes.solicitacoes.adminStatus(id), { status: getNextStatus(dados?.status || "null") === 0 ? "em analise" : ""})
      .then((response) => {
        console.log("Status atualizado para 'em analise':", response.data);
      })
      .catch((erro) => console.error("Erro ao atualizar status:", erro));

      api.get(apiRoutes.orcamentos.buscarOrcamentoSolicitacao(id))
      .then((response) => {
        if (componenteAtivo) {
          console.log("Orçamento carregado:", response.data);
          setDadosOrcamento(response.data);
        } 
      })
      .catch((erro) => console.error("Erro ao buscar orçamento:", erro));

    return () => {
      componenteAtivo = false;
    };
  }, [id]);

  return (
    <div className={styles.page}>
      {/* Identificação e ações principais da solicitação. */}
      <header className={styles.page_header}>
        <div className={styles.heading_group}>
          <nav className={styles.breadcrumb} aria-label="Navegação estrutural">
            <span>Orçamentos</span>
            <i>/</i>
            <span>Solicitações</span>
            <i>/</i>
            <strong>Visualizar</strong>
          </nav>

          <div className={styles.title_row}>
            <h1>Solicitação #{dados?.id}</h1>
            <span className={styles.status_badge}>{dados?.status}</span>
          </div>
        </div>

        {
          dadosOrcamento ?
            <div className={styles.header_actions}>

              <button className={styles.secondary_button} 
              type="button"
              onClick={() => navigate("/admin/orçamentos")}
              >
                <FiArrowLeft aria-hidden="true" />
                voltar
              </button>

              <button
                className={styles.primary_button}
                type="button"
                onClick={() => navigate("/admin/fazerOrcamento/" + dados?.id)}
              >
                <FiFileText aria-hidden="true" />
                ver orçamento
              </button>

              <button
                className={styles.primary_button}
                type="button"
                onClick={() => navigate("/admin/fazerOrcamento/" + dados?.id)}
              >
                <FiFileText aria-hidden="true" />
                Editar orçamento
              </button>

            </div>
          :
          <div className={styles.header_actions}>
              <button className={styles.secondary_button} 
              type="button"
              onClick={() => navigate("/admin/orçamentos")}
              >
                <FiArrowLeft aria-hidden="true" />
                Voltar
              </button>
              <button
                className={styles.primary_button}
                type="button"
                onClick={() => navigate("/admin/fazerOrcamento/" + dados?.id)}
              >
                <FiFileText aria-hidden="true" />
                Criar orçamento
              </button>
            </div>
  }

      </header>

      <div className={styles.content_grid}>
        <main className={styles.main_column}>
          {/* Dados enviados pelo cliente. */}
          <section className={`${styles.panel} ${styles.request_panel}`}>
            <header className={styles.section_header}>
              <FiFileText aria-hidden="true" />
              <h2>Dados da Solicitação</h2>
            </header>

            <div className={styles.details_grid}>
              <DetailCard
                icon={FiUser}
                label="Cliente"
                value={dados?.nome ?? "---"}
              />
              <DetailCard
                icon={FiPhone}
                label="Telefone"
                value={dados?.usuario.telefone ?? "---"}
              />
              <DetailCard
                icon={FiMail}
                label="E-mail"
                value={dados?.usuario.email ?? "---"}
              />
              <DetailCard
                icon={FiTruck}
                label="Veículo"
                value={dados?.veiculo ?? "---"}
              />
              <DetailCard icon={FiHash} label="Placa" value={dados?.placa ?? "---"} />
              <DetailCard
                icon={FiGitCommit}
                label="Chassi"
                value={dados?.chassi ?? "---"}
              />
              <DetailCard
                icon={FiActivity}
                label="Quilometragem"
                value={String(dados?.quilometragem) === "null" ? "---" : String(dados?.quilometragem)}
              />
              <DetailCard
                icon={FiTool}
                label="Serviço solicitado"
                value={dados?.servico?.nome ?? "---"}
              />
              <DetailCard
                icon={FiCalendar}
                label="Data da solicitação"
                value={formatarData(String(dados?.createdAt)) ?? "---"}
              />
              <DetailCard icon={FiFlag} label="Prioridade" value="Normal" />

              <article className={styles.attachment_card}>
                <FiPaperclip aria-hidden="true" />
                <span>Anexo / Foto</span>
                <div className={styles.thumbnails}>
                  {
                    Array.isArray(dados?.foto) ? 
                    dados?.foto.map((foto: string) => {
                      return(
                      <img src={`${urlImage}${String(foto)}`} alt="fotos clientes" onClick={() => setFotoSelecionada(foto)} className={styles.thumbnail} />
                      )
                    })
                    :
                     "---"
                  }
                </div>
                {fotoSelecionada && (
                  <div
                    className={styles.modalFoto}
                    onClick={() => setFotoSelecionada(null)}
                  >
                    <img
                      src={`${urlImage}${fotoSelecionada}`}
                      alt="Foto ampliada"
                      className={styles.fotoAmpliada}
                      onClick={(e) => e.stopPropagation()}
                    />

                    <button
                      className={styles.fecharFoto}
                      onClick={() => setFotoSelecionada(null)}
                    >
                      ×
                    </button>
                  </div>
                )}
              </article>

              <article className={styles.text_card}>
                <FiMessageCircle aria-hidden="true" />
                <div>
                  <span>Descrição do problema</span>
                  <p>
                    {dados?.descricao ?? "---"}
                  </p>
                </div>
              </article>

              <article className={styles.text_card}>
                <FiFileText aria-hidden="true" />
                <div>
                  <span>Observações do cliente</span>
                  <p>
                    Veículo utilizado para trabalho diário. Solicita retorno o
                    quanto antes.
                  </p>
                </div>
              </article>
            </div>
          </section>

        </main>
      </div>

    </div>
  );
}

export default VerSolicitacao;
