import { contato, navegacao, verticais } from '../content/site'

const ANO = new Date().getFullYear()

const linksSoren = [
  { rotulo: 'Sobre a Soren', href: '#essencial' },
  { rotulo: 'Nossa equipe', href: '#equipe' },
  { rotulo: 'Método Soren', href: '#metodo' },
  { rotulo: 'Jornada patrimonial', href: '#caminho' },
  { rotulo: 'Diagnóstico', href: '#contato' },
  { rotulo: 'Contato', href: '#contato' },
]

const linksParaVoce = navegacao
  .find((item) => item.rotulo === 'Para você')
  ?.filhos?.map((item) => ({ rotulo: item.rotulo, href: item.href })) ?? [
  { rotulo: 'O método', href: '#metodo' },
  { rotulo: 'Seu caminho', href: '#caminho' },
  { rotulo: 'Níveis de patrimônio', href: '#niveis' },
]

const linksEmpresa = verticais.map((item) => ({
  rotulo: item.nome,
  href: '#solucoes',
}))

const redes = [
  { nome: 'Instagram', url: contato.instagram, tipo: 'instagram' },
  { nome: 'LinkedIn', url: contato.linkedin, tipo: 'linkedin' },
] as const

export function Footer() {
  const telefone = contato.telefone || 'Atendimento pelo formulário'
  const email = contato.email || 'contato via diagnóstico Soren'
  const whatsapp = contato.whatsapp.numero || telefone
  const whatsappHref = contato.whatsapp.numero
    ? `https://wa.me/${contato.whatsapp.numero}`
    : '#contato'

  return (
    <footer className="bg-positive text-negative">
      <div className="mx-auto w-full max-w-[1380px] px-5 py-20 md:px-8 md:py-28 xl:px-10">
        <div className="mb-24 flex items-start justify-between md:mb-28">
          <a href="#topo" aria-label="Soren Investimentos — início" className="block">
            <img
              src="/logo1.png"
              alt=""
              aria-hidden="true"
              className="h-14 w-auto object-contain md:h-16"
            />
          </a>
        </div>

        <div className="grid gap-14 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1.15fr] xl:gap-24">
          <FooterNav titulo="A Soren" links={linksSoren} />
          <FooterNav titulo="Para você" links={linksParaVoce} />
          <FooterNav titulo="Para sua empresa" links={linksEmpresa} />

          <div className="xl:pl-4">
            <p className="t-display text-balance text-[1.35rem] font-light text-negative md:text-[1.5rem]">
              Central Oficial de Atendimento
            </p>

            <div className="mt-7 space-y-4 text-[1.0625rem] leading-relaxed text-negative/45 md:text-[1.125rem]">
              <p>
                WhatsApp:{' '}
                <a href={whatsappHref} className="transition-colors duration-200 hover:text-accent">
                  {whatsapp}
                </a>
              </p>
              <p>
                <a
                  href={contato.email ? `mailto:${contato.email}` : '#contato'}
                  className="transition-colors duration-200 hover:text-accent"
                >
                  {email}
                </a>
              </p>
            </div>

            <div className="mt-14">
              <p className="t-display text-[1.35rem] font-light text-negative md:text-[1.5rem]">
                Siga a Soren
              </p>
              <div className="mt-7 flex items-center gap-7">
                {redes.map((rede) => (
                  <SocialLink key={rede.nome} rede={rede} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/*
          Aviso regulatório. Texto-base para escritório de assessoria de
          investimentos (Resolução CVM 178). PREENCHER razão social, CNPJ e
          confirmar o vínculo com a corretora antes de publicar — e submeter à
          área de compliance da parceira, que costuma exigir aprovação prévia de
          material de divulgação.
        */}
        <div className="mt-24 border-t border-negative/10 pt-10 md:mt-28">
          <div className="max-w-5xl space-y-4 text-xs leading-relaxed text-negative/45">
            <p>
              Jrp Servicos Administrativos LTDA 53.185.431/0001-36, é um
              escritório de assessoria de investimentos com assessores autônomos
              credenciados à XP Investimentos, atuando no mercado financeiro nos
              termos da Resolução CVM nº 178/2023.
            </p>
            <p>
              A assessoria de investimentos é atividade de intermediação e
              distribuição. O escritório não realiza a custódia de valores ou
              ativos, não administra carteiras e não possui poder discricionário
              sobre os recursos dos clientes — toda decisão de investimento é do
              próprio investidor.
            </p>
            <p>
              Investimentos envolvem risco de perda, inclusive do capital
              aplicado. Rentabilidade passada não representa garantia de
              rentabilidade futura. Nenhum produto apresentado neste site
              constitui oferta, recomendação personalizada ou garantia de
              retorno. Leia atentamente os documentos do produto — lâmina,
              regulamento e prospecto — antes de investir.
            </p>
            <p>
              Produtos de mercado privado, private equity e real estate podem
              apresentar baixa liquidez e ser destinados exclusivamente a
              investidores qualificados ou profissionais, conforme a regulação
              aplicável. Consórcio é modalidade de aquisição de bens, não é
              investimento e não possui garantia de rentabilidade.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-negative/10 pt-8 text-xs text-negative/40 sm:flex-row sm:items-center sm:justify-between">
            <p>© {ANO} Soren Investimentos. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="transition-colors duration-200 hover:text-negative">
                Política de privacidade
              </a>
              <a href="#" className="transition-colors duration-200 hover:text-negative">
                Termos de uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

type FooterLink = { rotulo: string; href: string }

function FooterNav({ titulo, links }: { titulo: string; links: FooterLink[] }) {
  return (
    <nav aria-label={titulo}>
      <p className="t-display text-[1.35rem] font-light text-negative md:text-[1.5rem]">
        {titulo}
      </p>
      <ul className="mt-8 space-y-4">
        {links.map((item) => (
          <li key={`${titulo}-${item.rotulo}`}>
            <a
              href={item.href}
              className="text-[1.0625rem] leading-relaxed text-negative/45 transition-colors duration-200 hover:text-accent md:text-[1.125rem]"
            >
              {item.rotulo}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function SocialLink({ rede }: { rede: (typeof redes)[number] }) {
  const icon = rede.tipo === 'instagram' ? <InstagramIcon /> : <LinkedinIcon />

  if (!rede.url) {
    return (
      <span
        aria-label={`${rede.nome} da Soren ainda não configurado`}
        role="img"
        className="flex size-7 items-center justify-center text-negative/35"
      >
        {icon}
      </span>
    )
  }

  return (
    <a
      href={rede.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={rede.nome}
      className="flex size-7 items-center justify-center text-negative transition-colors duration-200 hover:text-accent"
    >
      {icon}
    </a>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7">
      <path
        d="M5.3 8.8h3.2V19H5.3V8.8Zm1.6-4.9a1.85 1.85 0 1 1 0 3.7 1.85 1.85 0 0 1 0-3.7ZM10.7 8.8h3.1v1.4h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5V19h-3.2v-4.9c0-1.2 0-2.7-1.6-2.7s-1.9 1.3-1.9 2.6v5h-3.2V8.8Z"
        fill="currentColor"
      />
    </svg>
  )
}
