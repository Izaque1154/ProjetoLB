import type { ChangeEvent, FormEvent } from "react";
import { useMemo, useState } from "react";
import type { IconType } from "react-icons";
import {
  FiActivity,
  FiAlertCircle,
  FiBell,
  FiBriefcase,
  FiCheck,
  FiCheckCircle,
  FiChevronRight,
  FiClock,
  FiCloud,
  FiDatabase,
  FiFileText,
  FiGlobe,
  FiHash,
  FiKey,
  FiLink2,
  FiLock,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiMonitor,
  FiMoon,
  FiPackage,
  FiRefreshCw,
  FiRotateCcw,
  FiSave,
  FiSettings,
  FiShield,
  FiSliders,
  FiSun,
  FiUploadCloud,
  FiUserCheck,
  FiZap,
} from "react-icons/fi";
import styles from "../css/cssAdmin/configuraçoesAdmin.module.css";

type SettingsSection =
  | "company"
  | "budgets"
  | "notifications"
  | "security"
  | "integrations"
  | "appearance";
type ThemeMode = "dark" | "light" | "system";
type InterfaceDensity = "compact" | "comfortable";
type AccentColor = "blue" | "cyan" | "green" | "violet";
type FeedbackTone = "success" | "error" | "info";

interface CompanySettings {
  logoUrl: string;
  tradeName: string;
  legalName: string;
  cnpj: string;
  email: string;
  phone: string;
  website: string;
  zipCode: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
}

interface BudgetSettings {
  prefix: string;
  nextNumber: number;
  validityDays: number;
  warrantyMonths: number;
  maxDiscount: number;
  paymentTerms: string;
  includeTechnicalReport: boolean;
  showStockAvailability: boolean;
  allowOnlineApproval: boolean;
  defaultNotes: string;
}

interface NotificationSettings {
  emailChannel: boolean;
  whatsappChannel: boolean;
  browserChannel: boolean;
  newBudget: boolean;
  statusUpdates: boolean;
  stockAlerts: boolean;
  overdueFollowUps: boolean;
  dailyDigest: boolean;
  recipientEmail: string;
  digestTime: string;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  loginAlerts: boolean;
  strongPasswords: boolean;
  auditLog: boolean;
  sessionTimeout: string;
  ipRestriction: boolean;
  allowedIps: string;
}

interface IntegrationSettings {
  whatsapp: boolean;
  smtp: boolean;
  drive: boolean;
  erp: boolean;
}

interface AppearanceSettings {
  theme: ThemeMode;
  density: InterfaceDensity;
  accent: AccentColor;
  compactSidebar: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
}

interface SettingsState {
  company: CompanySettings;
  budgets: BudgetSettings;
  notifications: NotificationSettings;
  security: SecuritySettings;
  integrations: IntegrationSettings;
  appearance: AppearanceSettings;
}

interface SectionDefinition {
  id: SettingsSection;
  label: string;
  description: string;
  icon: IconType;
}

interface ToggleRowProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  icon?: IconType;
}

interface Feedback {
  tone: FeedbackTone;
  message: string;
}

const sectionDefinitions: SectionDefinition[] = [
  {
    id: "company",
    label: "Empresa",
    description: "Identidade e contato",
    icon: FiBriefcase,
  },
  {
    id: "budgets",
    label: "Orçamentos",
    description: "Regras comerciais",
    icon: FiFileText,
  },
  {
    id: "notifications",
    label: "Notificações",
    description: "Canais e alertas",
    icon: FiBell,
  },
  {
    id: "security",
    label: "Segurança",
    description: "Acesso e proteção",
    icon: FiShield,
  },
  {
    id: "integrations",
    label: "Integrações",
    description: "Serviços conectados",
    icon: FiLink2,
  },
  {
    id: "appearance",
    label: "Aparência",
    description: "Tema e interface",
    icon: FiSliders,
  },
];

const initialSettings: SettingsState = {
  company: {
    logoUrl: "/imagens/lbLogo.png",
    tradeName: "LB Cardans",
    legalName: "LB Cardans Serviços Automotivos Ltda.",
    cnpj: "12.345.678/0001-90",
    email: "contato@lbcardans.com",
    phone: "(16) 3976-2250",
    website: "www.lbcardans.com.br",
    zipCode: "14080-000",
    street: "Avenida Brasil",
    number: "1250",
    district: "Vila Carvalho",
    city: "Ribeirão Preto",
    state: "SP",
  },
  budgets: {
    prefix: "ORC",
    nextNumber: 128,
    validityDays: 10,
    warrantyMonths: 6,
    maxDiscount: 10,
    paymentTerms: "Pix, cartão ou transferência bancária",
    includeTechnicalReport: true,
    showStockAvailability: true,
    allowOnlineApproval: true,
    defaultNotes:
      "Valores sujeitos à confirmação após inspeção técnica. Peças substituídas possuem garantia conforme as condições descritas no orçamento.",
  },
  notifications: {
    emailChannel: true,
    whatsappChannel: true,
    browserChannel: false,
    newBudget: true,
    statusUpdates: true,
    stockAlerts: true,
    overdueFollowUps: true,
    dailyDigest: false,
    recipientEmail: "admin@lbcardans.com",
    digestTime: "18:00",
  },
  security: {
    twoFactorAuth: false,
    loginAlerts: true,
    strongPasswords: true,
    auditLog: true,
    sessionTimeout: "60",
    ipRestriction: false,
    allowedIps: "",
  },
  integrations: {
    whatsapp: true,
    smtp: true,
    drive: false,
    erp: false,
  },
  appearance: {
    theme: "dark",
    density: "comfortable",
    accent: "blue",
    compactSidebar: false,
    reducedMotion: false,
    highContrast: false,
  },
};

const integrationCatalog: Array<{
  id: keyof IntegrationSettings;
  name: string;
  description: string;
  detail: string;
  icon: IconType;
}> = [
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    description: "Envio de orçamentos e atualizações de status.",
    detail: "(16) 99765-6006",
    icon: FiMessageCircle,
  },
  {
    id: "smtp",
    name: "Servidor de e-mail",
    description: "Mensagens transacionais e alertas administrativos.",
    detail: "smtp.lbcardans.com",
    icon: FiMail,
  },
  {
    id: "drive",
    name: "Google Drive",
    description: "Backup automático de laudos, anexos e relatórios.",
    detail: "Nenhuma conta vinculada",
    icon: FiCloud,
  },
  {
    id: "erp",
    name: "ERP / API externa",
    description: "Sincronização de estoque e dados financeiros.",
    detail: "Aguardando configuração",
    icon: FiDatabase,
  },
];

const accentOptions: Array<{
  id: AccentColor;
  label: string;
  className: string;
}> = [
  { id: "blue", label: "Azul", className: styles.swatch_blue },
  { id: "cyan", label: "Ciano", className: styles.swatch_cyan },
  { id: "green", label: "Verde", className: styles.swatch_green },
  { id: "violet", label: "Violeta", className: styles.swatch_violet },
];

function ToggleRow({
  id,
  label,
  description,
  checked,
  onChange,
  icon: Icon,
}: ToggleRowProps) {
  return (
    <label className={styles.toggle_row} htmlFor={id}>
      <span className={styles.toggle_copy}>
        {Icon && (
          <span className={styles.toggle_icon} aria-hidden="true">
            <Icon />
          </span>
        )}
        <span>
          <strong>{label}</strong>
          <small>{description}</small>
        </span>
      </span>

      <span className={styles.toggle_control}>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span className={styles.toggle_track} aria-hidden="true">
          <span />
        </span>
      </span>
    </label>
  );
}

function ConfiguracoesAdmin() {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("company");
  const [savedSettings, setSavedSettings] =
    useState<SettingsState>(initialSettings);
  const [draftSettings, setDraftSettings] =
    useState<SettingsState>(initialSettings);
  const [lastSaved, setLastSaved] = useState("Hoje, 09:42");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const hasChanges = useMemo(
    () => JSON.stringify(savedSettings) !== JSON.stringify(draftSettings),
    [draftSettings, savedSettings],
  );

  const currentSection =
    sectionDefinitions.find((section) => section.id === activeSection) ??
    sectionDefinitions[0];
  const CurrentSectionIcon = currentSection.icon;

  function updateSetting<
    Section extends keyof SettingsState,
    Key extends keyof SettingsState[Section],
  >(
    section: Section,
    key: Key,
    value: SettingsState[Section][Key],
  ) {
    setDraftSettings((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [key]: value,
      },
    }));
    setFeedback(null);

    const errorKey = `${String(section)}.${String(key)}`;
    setErrors((current) => {
      if (!current[errorKey]) return current;

      const nextErrors = { ...current };
      delete nextErrors[errorKey];
      return nextErrors;
    });
  }

  function validateSettings() {
    const nextErrors: Record<string, string> = {};
    const { company, notifications } = draftSettings;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!company.tradeName.trim()) {
      nextErrors["company.tradeName"] = "Informe o nome fantasia.";
    }

    if (!company.legalName.trim()) {
      nextErrors["company.legalName"] = "Informe a razão social.";
    }

    if (!emailPattern.test(company.email)) {
      nextErrors["company.email"] = "Informe um e-mail válido.";
    }

    if (!company.phone.trim()) {
      nextErrors["company.phone"] = "Informe o telefone principal.";
    }

    if (
      notifications.emailChannel &&
      !emailPattern.test(notifications.recipientEmail)
    ) {
      nextErrors["notifications.recipientEmail"] =
        "Informe um destinatário válido.";
    }

    setErrors(nextErrors);
    return nextErrors;
  }

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validateSettings();
    const errorKeys = Object.keys(validationErrors);

    if (errorKeys.length > 0) {
      const firstSection = errorKeys[0].split(".")[0] as SettingsSection;
      setActiveSection(firstSection);
      setFeedback({
        tone: "error",
        message: "Revise os campos destacados antes de salvar.",
      });
      return;
    }

    setSavedSettings(draftSettings);
    setLastSaved(
      `Hoje, ${new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })}`,
    );
    setFeedback({
      tone: "success",
      message: "Configurações salvas com sucesso.",
    });
  }

  function handleDiscardChanges() {
    setDraftSettings(savedSettings);
    setErrors({});
    setFeedback({
      tone: "info",
      message: "Alterações não salvas foram descartadas.",
    });
  }

  function handleLogoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/") || file.size > 2 * 1024 * 1024) {
      setFeedback({
        tone: "error",
        message: "Escolha uma imagem JPG, PNG ou WEBP de até 2 MB.",
      });
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      updateSetting("company", "logoUrl", String(reader.result));
    };
    reader.readAsDataURL(file);
  }

  function renderCompanySettings() {
    const { company } = draftSettings;

    return (
      <>
        <section className={styles.settings_group}>
          <div className={styles.group_heading}>
            <div>
              <span className={styles.group_eyebrow}>Perfil institucional</span>
              <h3>Identidade da empresa</h3>
              <p>Dados exibidos nos orçamentos, relatórios e comunicações.</p>
            </div>
          </div>

          <div className={styles.logo_editor}>
            <div className={styles.logo_preview}>
              <img src={company.logoUrl} alt="Logo atual da LB Cardans" />
            </div>

            <div className={styles.logo_copy}>
              <strong>Logo da empresa</strong>
              <span>JPG, PNG ou WEBP. Tamanho máximo de 2 MB.</span>
              <label className={styles.upload_button}>
                <FiUploadCloud aria-hidden="true" />
                Trocar logo
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleLogoChange}
                />
              </label>
            </div>
          </div>

          <div className={styles.field_grid}>
            <label className={styles.field_group}>
              <span>Nome fantasia</span>
              <input
                value={company.tradeName}
                onChange={(event) =>
                  updateSetting("company", "tradeName", event.target.value)
                }
                aria-invalid={Boolean(errors["company.tradeName"])}
              />
              {errors["company.tradeName"] && (
                <small className={styles.field_error}>
                  {errors["company.tradeName"]}
                </small>
              )}
            </label>

            <label className={styles.field_group}>
              <span>Razão social</span>
              <input
                value={company.legalName}
                onChange={(event) =>
                  updateSetting("company", "legalName", event.target.value)
                }
                aria-invalid={Boolean(errors["company.legalName"])}
              />
              {errors["company.legalName"] && (
                <small className={styles.field_error}>
                  {errors["company.legalName"]}
                </small>
              )}
            </label>

            <label className={styles.field_group}>
              <span>CNPJ</span>
              <input
                value={company.cnpj}
                onChange={(event) =>
                  updateSetting("company", "cnpj", event.target.value)
                }
                inputMode="numeric"
              />
            </label>

            <label className={styles.field_group}>
              <span>Site</span>
              <span className={styles.input_with_icon}>
                <FiGlobe aria-hidden="true" />
                <input
                  value={company.website}
                  onChange={(event) =>
                    updateSetting("company", "website", event.target.value)
                  }
                />
              </span>
            </label>
          </div>
        </section>

        <section className={styles.settings_group}>
          <div className={styles.group_heading}>
            <div className={styles.group_title_with_icon}>
              <span className={styles.group_icon}>
                <FiMail aria-hidden="true" />
              </span>
              <div>
                <h3>Contato principal</h3>
                <p>Canal usado nos documentos e mensagens enviadas ao cliente.</p>
              </div>
            </div>
          </div>

          <div className={styles.field_grid}>
            <label className={styles.field_group}>
              <span>E-mail comercial</span>
              <input
                type="email"
                value={company.email}
                onChange={(event) =>
                  updateSetting("company", "email", event.target.value)
                }
                aria-invalid={Boolean(errors["company.email"])}
              />
              {errors["company.email"] && (
                <small className={styles.field_error}>
                  {errors["company.email"]}
                </small>
              )}
            </label>

            <label className={styles.field_group}>
              <span>Telefone</span>
              <input
                value={company.phone}
                onChange={(event) =>
                  updateSetting("company", "phone", event.target.value)
                }
                inputMode="tel"
                aria-invalid={Boolean(errors["company.phone"])}
              />
              {errors["company.phone"] && (
                <small className={styles.field_error}>
                  {errors["company.phone"]}
                </small>
              )}
            </label>
          </div>
        </section>

        <section className={styles.settings_group}>
          <div className={styles.group_heading}>
            <div className={styles.group_title_with_icon}>
              <span className={styles.group_icon}>
                <FiMapPin aria-hidden="true" />
              </span>
              <div>
                <h3>Endereço</h3>
                <p>Localização da unidade responsável pelo atendimento.</p>
              </div>
            </div>
          </div>

          <div className={styles.address_grid}>
            <label className={styles.field_group}>
              <span>CEP</span>
              <input
                value={company.zipCode}
                onChange={(event) =>
                  updateSetting("company", "zipCode", event.target.value)
                }
                inputMode="numeric"
              />
            </label>

            <label className={`${styles.field_group} ${styles.address_street}`}>
              <span>Logradouro</span>
              <input
                value={company.street}
                onChange={(event) =>
                  updateSetting("company", "street", event.target.value)
                }
              />
            </label>

            <label className={styles.field_group}>
              <span>Número</span>
              <input
                value={company.number}
                onChange={(event) =>
                  updateSetting("company", "number", event.target.value)
                }
              />
            </label>

            <label className={styles.field_group}>
              <span>Bairro</span>
              <input
                value={company.district}
                onChange={(event) =>
                  updateSetting("company", "district", event.target.value)
                }
              />
            </label>

            <label className={`${styles.field_group} ${styles.address_city}`}>
              <span>Cidade</span>
              <input
                value={company.city}
                onChange={(event) =>
                  updateSetting("company", "city", event.target.value)
                }
              />
            </label>

            <label className={styles.field_group}>
              <span>Estado</span>
              <select
                value={company.state}
                onChange={(event) =>
                  updateSetting("company", "state", event.target.value)
                }
              >
                <option value="SP">São Paulo</option>
                <option value="MG">Minas Gerais</option>
                <option value="PR">Paraná</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="GO">Goiás</option>
              </select>
            </label>
          </div>
        </section>
      </>
    );
  }

  function renderBudgetSettings() {
    const { budgets } = draftSettings;
    const budgetCode = `${budgets.prefix || "ORC"}-${String(
      Math.max(0, budgets.nextNumber),
    ).padStart(5, "0")}`;

    return (
      <>
        <section className={styles.settings_group}>
          <div className={styles.group_heading}>
            <div>
              <span className={styles.group_eyebrow}>Documento comercial</span>
              <h3>Numeração e validade</h3>
              <p>Defina o padrão aplicado aos novos orçamentos.</p>
            </div>

            <div className={styles.code_preview}>
              <FiHash aria-hidden="true" />
              <span>
                Próximo código
                <strong>{budgetCode}</strong>
              </span>
            </div>
          </div>

          <div className={styles.field_grid_three}>
            <label className={styles.field_group}>
              <span>Prefixo</span>
              <input
                value={budgets.prefix}
                maxLength={6}
                onChange={(event) =>
                  updateSetting(
                    "budgets",
                    "prefix",
                    event.target.value.toUpperCase(),
                  )
                }
              />
            </label>

            <label className={styles.field_group}>
              <span>Próximo número</span>
              <input
                type="number"
                min="1"
                value={budgets.nextNumber}
                onChange={(event) =>
                  updateSetting(
                    "budgets",
                    "nextNumber",
                    Number(event.target.value),
                  )
                }
              />
            </label>

            <label className={styles.field_group}>
              <span>Validade</span>
              <span className={styles.input_with_suffix}>
                <input
                  type="number"
                  min="1"
                  max="90"
                  value={budgets.validityDays}
                  onChange={(event) =>
                    updateSetting(
                      "budgets",
                      "validityDays",
                      Number(event.target.value),
                    )
                  }
                />
                <span>dias</span>
              </span>
            </label>

            <label className={styles.field_group}>
              <span>Garantia padrão</span>
              <span className={styles.input_with_suffix}>
                <input
                  type="number"
                  min="0"
                  max="36"
                  value={budgets.warrantyMonths}
                  onChange={(event) =>
                    updateSetting(
                      "budgets",
                      "warrantyMonths",
                      Number(event.target.value),
                    )
                  }
                />
                <span>meses</span>
              </span>
            </label>

            <label className={styles.field_group}>
              <span>Desconto máximo</span>
              <span className={styles.input_with_suffix}>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={budgets.maxDiscount}
                  onChange={(event) =>
                    updateSetting(
                      "budgets",
                      "maxDiscount",
                      Number(event.target.value),
                    )
                  }
                />
                <span>%</span>
              </span>
            </label>

            <label className={styles.field_group}>
              <span>Condições de pagamento</span>
              <input
                value={budgets.paymentTerms}
                onChange={(event) =>
                  updateSetting("budgets", "paymentTerms", event.target.value)
                }
              />
            </label>
          </div>
        </section>

        <section className={styles.settings_group}>
          <div className={styles.group_heading}>
            <div>
              <h3>Conteúdo do orçamento</h3>
              <p>Informações incluídas automaticamente no documento.</p>
            </div>
          </div>

          <div className={styles.toggle_list}>
            <ToggleRow
              id="budget-technical-report"
              icon={FiFileText}
              label="Anexar laudo técnico"
              description="Inclui o diagnóstico e os serviços recomendados."
              checked={budgets.includeTechnicalReport}
              onChange={(checked) =>
                updateSetting("budgets", "includeTechnicalReport", checked)
              }
            />
            <ToggleRow
              id="budget-stock"
              icon={FiPackage}
              label="Exibir disponibilidade"
              description="Mostra ao cliente se as peças estão disponíveis em estoque."
              checked={budgets.showStockAvailability}
              onChange={(checked) =>
                updateSetting("budgets", "showStockAvailability", checked)
              }
            />
            <ToggleRow
              id="budget-online-approval"
              icon={FiCheckCircle}
              label="Permitir aprovação on-line"
              description="Adiciona ao orçamento a ação para aceitar ou recusar a proposta."
              checked={budgets.allowOnlineApproval}
              onChange={(checked) =>
                updateSetting("budgets", "allowOnlineApproval", checked)
              }
            />
          </div>
        </section>

        <section className={styles.settings_group}>
          <div className={styles.group_heading}>
            <div>
              <h3>Observações padrão</h3>
              <p>Texto inserido no rodapé dos novos orçamentos.</p>
            </div>
          </div>

          <label className={styles.field_group}>
            <span>Mensagem padrão</span>
            <textarea
              rows={5}
              maxLength={500}
              value={budgets.defaultNotes}
              onChange={(event) =>
                updateSetting("budgets", "defaultNotes", event.target.value)
              }
            />
            <small className={styles.character_count}>
              {budgets.defaultNotes.length}/500 caracteres
            </small>
          </label>
        </section>
      </>
    );
  }

  function renderNotificationSettings() {
    const { notifications } = draftSettings;
    const enabledChannels = [
      notifications.emailChannel,
      notifications.whatsappChannel,
      notifications.browserChannel,
    ].filter(Boolean).length;

    return (
      <>
        <section className={styles.settings_group}>
          <div className={styles.group_heading}>
            <div>
              <span className={styles.group_eyebrow}>Entrega</span>
              <h3>Canais de notificação</h3>
              <p>Escolha por onde a equipe recebe os alertas operacionais.</p>
            </div>
            <span className={styles.group_badge}>
              {enabledChannels} {enabledChannels === 1 ? "canal ativo" : "canais ativos"}
            </span>
          </div>

          <div className={styles.channel_grid}>
            <label
              className={`${styles.channel_option} ${
                notifications.emailChannel ? styles.channel_option_active : ""
              }`}
            >
              <input
                type="checkbox"
                checked={notifications.emailChannel}
                onChange={(event) =>
                  updateSetting(
                    "notifications",
                    "emailChannel",
                    event.target.checked,
                  )
                }
              />
              <span className={styles.channel_icon}>
                <FiMail aria-hidden="true" />
              </span>
              <span>
                <strong>E-mail</strong>
                <small>Caixa administrativa</small>
              </span>
              <FiCheck className={styles.channel_check} aria-hidden="true" />
            </label>

            <label
              className={`${styles.channel_option} ${
                notifications.whatsappChannel
                  ? styles.channel_option_active
                  : ""
              }`}
            >
              <input
                type="checkbox"
                checked={notifications.whatsappChannel}
                onChange={(event) =>
                  updateSetting(
                    "notifications",
                    "whatsappChannel",
                    event.target.checked,
                  )
                }
              />
              <span className={styles.channel_icon}>
                <FiMessageCircle aria-hidden="true" />
              </span>
              <span>
                <strong>WhatsApp</strong>
                <small>Número comercial</small>
              </span>
              <FiCheck className={styles.channel_check} aria-hidden="true" />
            </label>

            <label
              className={`${styles.channel_option} ${
                notifications.browserChannel
                  ? styles.channel_option_active
                  : ""
              }`}
            >
              <input
                type="checkbox"
                checked={notifications.browserChannel}
                onChange={(event) =>
                  updateSetting(
                    "notifications",
                    "browserChannel",
                    event.target.checked,
                  )
                }
              />
              <span className={styles.channel_icon}>
                <FiMonitor aria-hidden="true" />
              </span>
              <span>
                <strong>Navegador</strong>
                <small>Alertas neste dispositivo</small>
              </span>
              <FiCheck className={styles.channel_check} aria-hidden="true" />
            </label>
          </div>
        </section>

        <section className={styles.settings_group}>
          <div className={styles.group_heading}>
            <div>
              <h3>Eventos monitorados</h3>
              <p>Controle quais atividades geram uma notificação.</p>
            </div>
          </div>

          <div className={styles.toggle_list}>
            <ToggleRow
              id="notification-new-budget"
              icon={FiFileText}
              label="Novo orçamento recebido"
              description="Avisa quando um cliente envia uma nova solicitação."
              checked={notifications.newBudget}
              onChange={(checked) =>
                updateSetting("notifications", "newBudget", checked)
              }
            />
            <ToggleRow
              id="notification-status"
              icon={FiRefreshCw}
              label="Mudanças de status"
              description="Acompanha respostas, aprovações e finalizações."
              checked={notifications.statusUpdates}
              onChange={(checked) =>
                updateSetting("notifications", "statusUpdates", checked)
              }
            />
            <ToggleRow
              id="notification-stock"
              icon={FiPackage}
              label="Alertas de estoque"
              description="Notifica quando um produto atinge o estoque mínimo."
              checked={notifications.stockAlerts}
              onChange={(checked) =>
                updateSetting("notifications", "stockAlerts", checked)
              }
            />
            <ToggleRow
              id="notification-followups"
              icon={FiClock}
              label="Follow-ups vencidos"
              description="Lembra a equipe sobre contatos e retornos pendentes."
              checked={notifications.overdueFollowUps}
              onChange={(checked) =>
                updateSetting("notifications", "overdueFollowUps", checked)
              }
            />
            <ToggleRow
              id="notification-digest"
              icon={FiActivity}
              label="Resumo diário"
              description="Consolida as principais atividades do dia em uma mensagem."
              checked={notifications.dailyDigest}
              onChange={(checked) =>
                updateSetting("notifications", "dailyDigest", checked)
              }
            />
          </div>
        </section>

        <section className={styles.settings_group}>
          <div className={styles.group_heading}>
            <div>
              <h3>Destino e horário</h3>
              <p>Preferências para e-mails e resumos programados.</p>
            </div>
          </div>

          <div className={styles.field_grid}>
            <label className={styles.field_group}>
              <span>E-mail destinatário</span>
              <input
                type="email"
                value={notifications.recipientEmail}
                onChange={(event) =>
                  updateSetting(
                    "notifications",
                    "recipientEmail",
                    event.target.value,
                  )
                }
                disabled={!notifications.emailChannel}
                aria-invalid={Boolean(
                  errors["notifications.recipientEmail"],
                )}
              />
              {errors["notifications.recipientEmail"] && (
                <small className={styles.field_error}>
                  {errors["notifications.recipientEmail"]}
                </small>
              )}
            </label>

            <label className={styles.field_group}>
              <span>Horário do resumo</span>
              <input
                type="time"
                value={notifications.digestTime}
                onChange={(event) =>
                  updateSetting(
                    "notifications",
                    "digestTime",
                    event.target.value,
                  )
                }
                disabled={!notifications.dailyDigest}
              />
            </label>
          </div>
        </section>
      </>
    );
  }

  function renderSecuritySettings() {
    const { security } = draftSettings;
    const securityLevel = [
      security.twoFactorAuth,
      security.loginAlerts,
      security.strongPasswords,
      security.auditLog,
    ].filter(Boolean).length;

    return (
      <>
        <section className={styles.security_summary}>
          <span className={styles.security_summary_icon}>
            <FiShield aria-hidden="true" />
          </span>
          <div>
            <span className={styles.group_eyebrow}>Proteção da conta</span>
            <h3>
              {securityLevel >= 4
                ? "Proteção avançada"
                : securityLevel >= 2
                  ? "Proteção intermediária"
                  : "Proteção básica"}
            </h3>
            <p>
              {securityLevel} de 4 recursos essenciais estão habilitados.
            </p>
          </div>
          <div className={styles.security_meter} aria-hidden="true">
            {[1, 2, 3, 4].map((step) => (
              <span
                key={step}
                className={step <= securityLevel ? styles.meter_active : ""}
              />
            ))}
          </div>
        </section>

        <section className={styles.settings_group}>
          <div className={styles.group_heading}>
            <div>
              <h3>Autenticação e acesso</h3>
              <p>Políticas aplicadas aos usuários administrativos.</p>
            </div>
          </div>

          <div className={styles.toggle_list}>
            <ToggleRow
              id="security-2fa"
              icon={FiKey}
              label="Autenticação em dois fatores"
              description="Solicita um segundo código ao entrar no painel."
              checked={security.twoFactorAuth}
              onChange={(checked) =>
                updateSetting("security", "twoFactorAuth", checked)
              }
            />
            <ToggleRow
              id="security-login-alerts"
              icon={FiBell}
              label="Alertas de novo acesso"
              description="Envia um aviso quando a conta é usada em outro dispositivo."
              checked={security.loginAlerts}
              onChange={(checked) =>
                updateSetting("security", "loginAlerts", checked)
              }
            />
            <ToggleRow
              id="security-passwords"
              icon={FiLock}
              label="Exigir senhas fortes"
              description="Aplica tamanho mínimo e combinação de caracteres."
              checked={security.strongPasswords}
              onChange={(checked) =>
                updateSetting("security", "strongPasswords", checked)
              }
            />
            <ToggleRow
              id="security-audit"
              icon={FiActivity}
              label="Registrar atividades"
              description="Mantém um histórico das ações administrativas."
              checked={security.auditLog}
              onChange={(checked) =>
                updateSetting("security", "auditLog", checked)
              }
            />
          </div>
        </section>

        <section className={styles.settings_group}>
          <div className={styles.group_heading}>
            <div>
              <h3>Sessões e rede</h3>
              <p>Limites de tempo e acesso à área administrativa.</p>
            </div>
          </div>

          <div className={styles.field_grid}>
            <label className={styles.field_group}>
              <span>Encerrar sessão após</span>
              <select
                value={security.sessionTimeout}
                onChange={(event) =>
                  updateSetting(
                    "security",
                    "sessionTimeout",
                    event.target.value,
                  )
                }
              >
                <option value="30">30 minutos</option>
                <option value="60">1 hora</option>
                <option value="240">4 horas</option>
                <option value="480">8 horas</option>
              </select>
            </label>

            <div className={styles.current_session}>
              <span className={styles.session_icon}>
                <FiMonitor aria-hidden="true" />
              </span>
              <span>
                <strong>Sessão atual</strong>
                <small>Windows · Ribeirão Preto, SP</small>
              </span>
              <span className={styles.current_badge}>Atual</span>
            </div>
          </div>

          <div className={styles.network_settings}>
            <ToggleRow
              id="security-ip"
              icon={FiGlobe}
              label="Restringir por endereço IP"
              description="Permite acesso somente a partir das redes informadas."
              checked={security.ipRestriction}
              onChange={(checked) =>
                updateSetting("security", "ipRestriction", checked)
              }
            />

            {security.ipRestriction && (
              <label className={styles.field_group}>
                <span>Endereços IP permitidos</span>
                <textarea
                  rows={3}
                  placeholder="192.168.1.10, 200.150.20.0/24"
                  value={security.allowedIps}
                  onChange={(event) =>
                    updateSetting(
                      "security",
                      "allowedIps",
                      event.target.value,
                    )
                  }
                />
                <small className={styles.field_hint}>
                  Separe múltiplos endereços com vírgulas.
                </small>
              </label>
            )}
          </div>
        </section>

        <section className={styles.account_strip}>
          <span className={styles.account_avatar}>A</span>
          <span>
            <strong>Administrador principal</strong>
            <small>admin@lbcardans.com · Senha atualizada há 18 dias</small>
          </span>
          <span className={styles.account_role}>
            <FiUserCheck aria-hidden="true" />
            Acesso total
          </span>
        </section>
      </>
    );
  }

  function renderIntegrationSettings() {
    const { integrations } = draftSettings;
    const connectedCount = Object.values(integrations).filter(Boolean).length;

    return (
      <>
        <section className={styles.settings_group}>
          <div className={styles.group_heading}>
            <div>
              <span className={styles.group_eyebrow}>Ecossistema</span>
              <h3>Serviços conectados</h3>
              <p>Gerencie os canais e sistemas usados pela operação.</p>
            </div>
            <span className={styles.group_badge}>
              {connectedCount} de {integrationCatalog.length} conectados
            </span>
          </div>

          <div className={styles.integration_grid}>
            {integrationCatalog.map((integration) => {
              const IntegrationIcon = integration.icon;
              const isConnected = integrations[integration.id];

              return (
                <article
                  className={`${styles.integration_card} ${
                    isConnected ? styles.integration_card_connected : ""
                  }`}
                  key={integration.id}
                >
                  <div className={styles.integration_header}>
                    <span className={styles.integration_icon}>
                      <IntegrationIcon aria-hidden="true" />
                    </span>
                    <span
                      className={`${styles.integration_status} ${
                        isConnected
                          ? styles.integration_status_connected
                          : styles.integration_status_inactive
                      }`}
                    >
                      <span />
                      {isConnected ? "Conectado" : "Inativo"}
                    </span>
                  </div>

                  <div className={styles.integration_copy}>
                    <h4>{integration.name}</h4>
                    <p>{integration.description}</p>
                    <span>{integration.detail}</span>
                  </div>

                  <button
                    type="button"
                    className={
                      isConnected
                        ? styles.integration_secondary_button
                        : styles.integration_primary_button
                    }
                    onClick={() =>
                      updateSetting(
                        "integrations",
                        integration.id,
                        !isConnected,
                      )
                    }
                  >
                    {isConnected ? "Desativar" : "Ativar integração"}
                    <FiChevronRight aria-hidden="true" />
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.integration_notice}>
          <span>
            <FiZap aria-hidden="true" />
          </span>
          <div>
            <strong>API da LB Cardans</strong>
            <p>
              A chave de integração e os webhooks ficam disponíveis após a
              configuração do serviço externo.
            </p>
          </div>
          <span className={styles.api_badge}>API v1</span>
        </section>
      </>
    );
  }

  function renderAppearanceSettings() {
    const { appearance } = draftSettings;
    const previewTheme =
      appearance.theme === "system" ? "dark" : appearance.theme;

    return (
      <>
        <section className={styles.settings_group}>
          <div className={styles.group_heading}>
            <div>
              <span className={styles.group_eyebrow}>Interface</span>
              <h3>Tema do painel</h3>
              <p>Escolha como a área administrativa deve ser exibida.</p>
            </div>
          </div>

          <div className={styles.theme_options} role="group" aria-label="Tema">
            <button
              type="button"
              className={
                appearance.theme === "dark" ? styles.option_active : ""
              }
              aria-pressed={appearance.theme === "dark"}
              onClick={() => updateSetting("appearance", "theme", "dark")}
            >
              <FiMoon aria-hidden="true" />
              <span>
                <strong>Escuro</strong>
                <small>Ideal para baixa luminosidade</small>
              </span>
              <span className={styles.option_check}>
                <FiCheck aria-hidden="true" />
              </span>
            </button>

            <button
              type="button"
              className={
                appearance.theme === "light" ? styles.option_active : ""
              }
              aria-pressed={appearance.theme === "light"}
              onClick={() => updateSetting("appearance", "theme", "light")}
            >
              <FiSun aria-hidden="true" />
              <span>
                <strong>Claro</strong>
                <small>Maior contraste em ambientes claros</small>
              </span>
              <span className={styles.option_check}>
                <FiCheck aria-hidden="true" />
              </span>
            </button>

            <button
              type="button"
              className={
                appearance.theme === "system" ? styles.option_active : ""
              }
              aria-pressed={appearance.theme === "system"}
              onClick={() => updateSetting("appearance", "theme", "system")}
            >
              <FiMonitor aria-hidden="true" />
              <span>
                <strong>Sistema</strong>
                <small>Acompanha a preferência do dispositivo</small>
              </span>
              <span className={styles.option_check}>
                <FiCheck aria-hidden="true" />
              </span>
            </button>
          </div>
        </section>

        <section className={styles.settings_group}>
          <div className={styles.appearance_columns}>
            <div>
              <div className={styles.group_heading}>
                <div>
                  <h3>Cor de destaque</h3>
                  <p>Aplicada às ações e estados selecionados.</p>
                </div>
              </div>

              <div className={styles.color_options}>
                {accentOptions.map((accent) => (
                  <button
                    type="button"
                    key={accent.id}
                    className={`${styles.color_option} ${
                      appearance.accent === accent.id
                        ? styles.color_option_active
                        : ""
                    }`}
                    aria-label={`Usar destaque ${accent.label}`}
                    aria-pressed={appearance.accent === accent.id}
                    onClick={() =>
                      updateSetting("appearance", "accent", accent.id)
                    }
                  >
                    <span className={accent.className}>
                      <FiCheck aria-hidden="true" />
                    </span>
                    {accent.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className={styles.group_heading}>
                <div>
                  <h3>Densidade</h3>
                  <p>Define o espaçamento entre os elementos.</p>
                </div>
              </div>

              <div
                className={styles.segmented_control}
                role="group"
                aria-label="Densidade da interface"
              >
                <button
                  type="button"
                  className={
                    appearance.density === "compact"
                      ? styles.segment_active
                      : ""
                  }
                  aria-pressed={appearance.density === "compact"}
                  onClick={() =>
                    updateSetting("appearance", "density", "compact")
                  }
                >
                  Compacta
                </button>
                <button
                  type="button"
                  className={
                    appearance.density === "comfortable"
                      ? styles.segment_active
                      : ""
                  }
                  aria-pressed={appearance.density === "comfortable"}
                  onClick={() =>
                    updateSetting("appearance", "density", "comfortable")
                  }
                >
                  Confortável
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.settings_group}>
          <div className={styles.group_heading}>
            <div>
              <h3>Preferências visuais</h3>
              <p>Ajustes adicionais de navegação e acessibilidade.</p>
            </div>
          </div>

          <div className={styles.toggle_list}>
            <ToggleRow
              id="appearance-sidebar"
              icon={FiSliders}
              label="Barra lateral compacta"
              description="Reduz a largura da navegação principal."
              checked={appearance.compactSidebar}
              onChange={(checked) =>
                updateSetting("appearance", "compactSidebar", checked)
              }
            />
            <ToggleRow
              id="appearance-motion"
              icon={FiActivity}
              label="Reduzir movimentos"
              description="Limita transições e animações da interface."
              checked={appearance.reducedMotion}
              onChange={(checked) =>
                updateSetting("appearance", "reducedMotion", checked)
              }
            />
            <ToggleRow
              id="appearance-contrast"
              icon={FiSun}
              label="Contraste reforçado"
              description="Aumenta a diferença entre textos, bordas e fundos."
              checked={appearance.highContrast}
              onChange={(checked) =>
                updateSetting("appearance", "highContrast", checked)
              }
            />
          </div>
        </section>

        <section className={styles.preview_section}>
          <div className={styles.group_heading}>
            <div>
              <h3>Pré-visualização</h3>
              <p>Amostra das preferências selecionadas.</p>
            </div>
          </div>

          <div
            className={`${styles.interface_preview} ${
              previewTheme === "light"
                ? styles.preview_light
                : styles.preview_dark
            } ${styles[`preview_accent_${appearance.accent}`]} ${
              appearance.density === "compact" ? styles.preview_compact : ""
            }`}
          >
            <div className={styles.preview_sidebar}>
              <span className={styles.preview_logo}>LB</span>
              <span className={styles.preview_nav_active} />
              <span />
              <span />
              <span />
            </div>
            <div className={styles.preview_main}>
              <div className={styles.preview_header}>
                <span />
                <span />
              </div>
              <div className={styles.preview_cards}>
                <span />
                <span />
                <span />
              </div>
              <div className={styles.preview_table}>
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  function renderActiveSection() {
    switch (activeSection) {
      case "company":
        return renderCompanySettings();
      case "budgets":
        return renderBudgetSettings();
      case "notifications":
        return renderNotificationSettings();
      case "security":
        return renderSecuritySettings();
      case "integrations":
        return renderIntegrationSettings();
      case "appearance":
        return renderAppearanceSettings();
      default:
        return null;
    }
  }

  const FeedbackIcon =
    feedback?.tone === "success"
      ? FiCheckCircle
      : feedback?.tone === "error"
        ? FiAlertCircle
        : FiRefreshCw;

  return (
    <div className={styles.settings_page}>
      <section className={styles.settings_overview}>
        <div className={styles.overview_identity}>
          <span className={styles.overview_icon}>
            <FiSettings aria-hidden="true" />
          </span>
          <div>
            <span className={styles.overview_eyebrow}>Workspace administrativo</span>
            <h2>Central de configurações</h2>
            <p>LB Cardans · Unidade Ribeirão Preto</p>
          </div>
        </div>

        <dl className={styles.overview_metadata}>
          <div>
            <dt>Ambiente</dt>
            <dd>
              <span className={styles.online_dot} />
              Produção
            </dd>
          </div>
          <div>
            <dt>Último salvamento</dt>
            <dd>{lastSaved}</dd>
          </div>
        </dl>

        <div className={styles.overview_actions}>
          <span
            className={`${styles.change_status} ${
              hasChanges ? styles.change_status_dirty : ""
            }`}
          >
            {hasChanges ? (
              <>
                <span />
                Alterações pendentes
              </>
            ) : (
              <>
                <FiCheckCircle aria-hidden="true" />
                Tudo atualizado
              </>
            )}
          </span>

          <button
            type="button"
            className={styles.secondary_button}
            onClick={handleDiscardChanges}
            disabled={!hasChanges}
          >
            <FiRotateCcw aria-hidden="true" />
            Desfazer
          </button>

          <button
            type="submit"
            form="admin-settings-form"
            className={styles.primary_button}
            disabled={!hasChanges}
          >
            <FiSave aria-hidden="true" />
            Salvar alterações
          </button>
        </div>
      </section>

      <div className={styles.settings_workspace}>
        <aside className={styles.settings_nav}>
          <div className={styles.nav_heading}>
            <span>Preferências</span>
            <small>{sectionDefinitions.length} seções</small>
          </div>

          <nav aria-label="Seções de configuração">
            {sectionDefinitions.map((section) => {
              const SectionIcon = section.icon;
              const isActive = section.id === activeSection;

              return (
                <button
                  key={section.id}
                  type="button"
                  className={`${styles.nav_button} ${
                    isActive ? styles.nav_button_active : ""
                  }`}
                  onClick={() => setActiveSection(section.id)}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className={styles.nav_icon}>
                    <SectionIcon aria-hidden="true" />
                  </span>
                  <span>
                    <strong>{section.label}</strong>
                    <small>{section.description}</small>
                  </span>
                  <FiChevronRight
                    className={styles.nav_chevron}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </nav>

          <div className={styles.nav_security}>
            <FiShield aria-hidden="true" />
            <span>
              <strong>Área protegida</strong>
              <small>Último acesso hoje, 09:18</small>
            </span>
          </div>
        </aside>

        <form
          id="admin-settings-form"
          className={styles.settings_form}
          onSubmit={handleSave}
          noValidate
        >
          <header className={styles.section_header}>
            <span className={styles.section_icon}>
              <CurrentSectionIcon aria-hidden="true" />
            </span>
            <div>
              <span>Configurações</span>
              <h2>{currentSection.label}</h2>
              <p>{currentSection.description}</p>
            </div>
          </header>

          <div className={styles.section_content}>{renderActiveSection()}</div>

          <footer className={styles.form_footer}>
            <div className={styles.footer_status} aria-live="polite">
              {feedback ? (
                <span className={styles[`feedback_${feedback.tone}`]}>
                  <FeedbackIcon aria-hidden="true" />
                  {feedback.message}
                </span>
              ) : hasChanges ? (
                <span>
                  <span className={styles.unsaved_dot} />
                  Existem alterações não salvas.
                </span>
              ) : (
                <span>
                  <FiCheckCircle aria-hidden="true" />
                  Configurações atualizadas.
                </span>
              )}
            </div>

            <div className={styles.footer_actions}>
              <button
                type="button"
                className={styles.secondary_button}
                onClick={handleDiscardChanges}
                disabled={!hasChanges}
              >
                <FiRotateCcw aria-hidden="true" />
                Descartar
              </button>
              <button
                type="submit"
                className={styles.primary_button}
                disabled={!hasChanges}
              >
                <FiSave aria-hidden="true" />
                Salvar alterações
              </button>
            </div>
          </footer>
        </form>
      </div>
    </div>
  );
}

export default ConfiguracoesAdmin;
