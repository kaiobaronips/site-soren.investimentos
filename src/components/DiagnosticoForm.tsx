import { useEffect, useRef, useState, type FormEvent } from 'react'
import { contato, whatsappUrl } from '../content/site'

/**
 * PREENCHER: endpoint que recebe o diagnóstico (Formspree, Vercel Function, CRM).
 * Enquanto estiver vazio, o envio cai no fallback de WhatsApp/e-mail em vez de
 * fingir que enviou — mesma regra do formulário da seção de contato.
 */
const ENDPOINT = ''

type Pergunta = {
  chave: string
  rotulo: string
  opcoes: string[]
}

/** Perguntas replicadas do diagnóstico de soreninvestimentos.com.br. */
const PERGUNTAS: Pergunta[] = [
  {
    chave: 'perfil',
    rotulo: 'Qual é o seu perfil hoje?',
    opcoes: [
      'Empresário / sócio de empresa',
      'Profissional liberal (médico, advogado, engenheiro)',
      'Executivo / alta liderança',
      'Investidor pessoa física',
      'Outro',
    ],
  },
  {
    chave: 'patrimonio',
    rotulo: 'Qual o volume aproximado que você tem disponível para investir hoje?',
    opcoes: [
      'Até R$ 100 mil',
      'R$ 100 mil a R$ 300 mil',
      'R$ 300 mil a R$ 500 mil',
      'R$ 500 mil a R$ 700 mil',
      'Acima de R$ 700 mil',
    ],
  },
  {
    chave: 'situacao',
    rotulo: 'Como está organizado seu patrimônio hoje?',
    opcoes: [
      'Concentrado em renda fixa / CDB / Tesouro',
      'Parcialmente diversificado, mas sem estratégia clara',
      'Tenho carteira estruturada, mas quero mais rentabilidade',
      'Tenho sócio ou gestor, mas não estou satisfeito com os resultados',
    ],
  },
  {
    chave: 'dor',
    rotulo: 'Qual é o seu maior problema com seus investimentos hoje?',
    opcoes: [
      'Rentabilidade abaixo do que eu precisaria',
      'Não sei onde colocar o dinheiro com segurança',
      'Tenho capital parado sem uma estratégia definida',
      'Quero exposição a ativos alternativos mas não sei como acessar',
      'Meus ativos estão todos no mesmo lugar e isso me preocupa',
    ],
  },
  {
    chave: 'objetivo',
    rotulo: 'O que você quer alcançar nos próximos 3 anos?',
    opcoes: [
      'Multiplicar patrimônio com risco calculado',
      'Ter renda passiva previsível e crescente',
      'Participar de negócios reais com alto potencial de retorno',
      'Construir legado e proteção patrimonial para a família',
      'Reduzir dependência do meu negócio principal como única fonte',
    ],
  },
  {
    chave: 'alternativos',
    rotulo: 'Você já investiu ou tem interesse em algum desses ativos?',
    opcoes: [
      'Private equity / participação em empresas',
      'Fundos exclusivos ou multimercado',
      'Venture builders / startups',
      'Fundos imobiliários ou ativos reais',
      'Nunca investi em alternativos, mas quero entender',
    ],
  },
  {
    chave: 'horizonte',
    rotulo: 'Como você pensa sobre liquidez?',
    opcoes: [
      'Preciso de liquidez imediata, não posso travar capital',
      'Consigo travar parte do capital por 12 a 24 meses',
      'Tenho capital de longo prazo, aceito travar por 3 a 5 anos',
      'Tenho capital separado para ilíquido de alto retorno',
    ],
  },
  {
    chave: 'urgencia',
    rotulo: 'O que te fez buscar isso agora?',
    opcoes: [
      'Acabei de ter um evento de liquidez (venda de empresa, herança, bônus)',
      'Estou insatisfeito com meu gestor atual',
      'Sinto que estou perdendo oportunidades que não tenho acesso',
      'Quero organizar tudo antes que fique mais complexo',
      'Só estou pesquisando por enquanto',
    ],
  },
]

/** A etapa de contato vem depois das perguntas. */
const TOTAL = PERGUNTAS.length + 1

type Status = 'idle' | 'enviando' | 'ok' | 'erro'

/** Aplica a máscara (99) 99999-9999 usada na validação do site. */
function mascaraWhatsapp(valor: string): string {
  const d = valor.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ''
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

export function DiagnosticoForm({ tituloId }: { tituloId: string }) {
  const [passo, setPasso] = useState(0)
  const [respostas, setRespostas] = useState<Record<string, string>>({})
  // Todos os campos controlados: com nome/e-mail soltos, voltar uma etapa e
  // avançar de novo apagava os dois e mantinha só o WhatsApp.
  const [dados, setDados] = useState({ nome: '', email: '', whatsapp: '' })
  const [status, setStatus] = useState<Status>('idle')
  const wa = whatsappUrl()

  const etapaContato = passo === PERGUNTAS.length
  const pergunta = etapaContato ? null : PERGUNTAS[passo]

  const raizRef = useRef<HTMLDivElement>(null)
  const tituloRef = useRef<HTMLHeadingElement>(null)
  const primeiraEtapa = useRef(true)

  // Ao trocar de etapa o botão clicado desmonta e o foco cai no body, o que
  // quebra o Tab do modal e deixa leitor de tela sem referência. Além disso o
  // scroll do painel fica onde estava, podendo abrir a etapa nova no meio.
  useEffect(() => {
    if (primeiraEtapa.current) {
      primeiraEtapa.current = false
      return
    }
    raizRef.current?.closest('[role="dialog"]')?.scrollTo({ top: 0 })
    tituloRef.current?.focus()
    // Sem isso, o aviso de "Recebido" continuava na tela ao voltar e avançar.
    setStatus('idle')
  }, [passo])

  function responder(chave: string, valor: string) {
    setRespostas((r) => ({ ...r, [chave]: valor }))
    setPasso((p) => p + 1)
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const envio = { ...respostas, ...dados }

    const corpo = [
      'Diagnóstico comportamental e financeiro',
      '',
      `Nome: ${dados.nome}`,
      `E-mail: ${dados.email}`,
      `WhatsApp: ${dados.whatsapp}`,
      '',
      ...PERGUNTAS.map((p) => `${p.rotulo}\n→ ${respostas[p.chave] ?? '—'}`),
    ].join('\n')

    if (!ENDPOINT) {
      if (wa) {
        window.open(`${wa.split('?')[0]}?text=${encodeURIComponent(corpo)}`, '_blank')
      } else if (contato.email) {
        window.location.href = `mailto:${contato.email}?subject=${encodeURIComponent(
          'Diagnóstico comportamental e financeiro',
        )}&body=${encodeURIComponent(corpo)}`
      } else {
        setStatus('erro')
        return
      }
      setStatus('ok')
      return
    }

    setStatus('enviando')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(envio),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('ok')
    } catch {
      setStatus('erro')
    }
  }

  return (
    // min-h-full + m-auto no bloco central: o conteúdo fica centralizado no
    // espaço livre e o rodapé encosta na base do painel, sem depender de
    // quantos cards a etapa tem.
    <div
      ref={raizRef}
      className="flex min-h-full w-full flex-col bg-background px-7 pt-12 sm:px-12 sm:pt-14"
    >
      {/* Progresso ancorado no topo, fora do bloco que se centraliza. */}
      <div className="shrink-0">
        <div className="flex justify-end pr-10 text-[0.6875rem] text-positive/45">
          <span className="shrink-0 tabular-nums">
            Etapa {String(passo + 1).padStart(2, '0')} de {String(TOTAL).padStart(2, '0')}
          </span>
        </div>

        <div
          role="progressbar"
          aria-label="Progresso do diagnóstico"
          aria-valuemin={1}
          aria-valuemax={TOTAL}
          aria-valuenow={passo + 1}
          className="mt-5 h-px overflow-hidden bg-positive/10"
        >
          <span
            className="block h-px origin-left bg-primary transition-transform duration-200 ease-out"
            style={{ transform: `scaleX(${(passo + 1) / TOTAL})` }}
          />
        </div>
      </div>

      <div className="m-auto w-full py-10">

        {pergunta ? (
          <>
            <h2
              ref={tituloRef}
              tabIndex={-1}
              id={tituloId}
              className="t-display max-w-md text-balance text-[clamp(1.65rem,4.2vw,2.15rem)] text-positive focus:outline-none"
            >
              {pergunta.rotulo}
            </h2>
            <p className="mt-4 text-pretty text-xs leading-relaxed text-positive/50">
              Escolha a alternativa que melhor representa o seu momento atual.
            </p>

            <div className="mt-7 grid">
              {pergunta.opcoes.map((opcao, indice) => {
                const ativa = respostas[pergunta.chave] === opcao
                return (
                  <button
                    key={opcao}
                    type="button"
                    onClick={() => responder(pergunta.chave, opcao)}
                    aria-pressed={ativa}
                    data-selected={ativa}
                    className="group relative flex w-full items-start gap-4 py-4 text-left text-positive/75 transition-colors duration-200 hover:text-primary focus-visible:text-primary data-[selected=true]:text-primary"
                  >
                    <span className="w-6 shrink-0 pt-0.5 text-[0.625rem] tabular-nums text-positive/30 transition-colors duration-200 group-hover:text-accent group-focus-visible:text-accent group-data-[selected=true]:text-accent">
                      {String(indice + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 text-pretty text-[0.9375rem] leading-snug">
                      {opcao}
                    </span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 translate-x-[-4px] text-primary opacity-0 transition-[opacity,transform] duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 group-data-[selected=true]:translate-x-0 group-data-[selected=true]:opacity-100"
                    >
                      →
                    </span>
                    <span
                      aria-hidden="true"
                      data-last={indice === pergunta.opcoes.length - 1}
                      className="absolute inset-x-0 bottom-0 h-px bg-positive/10 data-[last=true]:bg-transparent"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-200 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 group-data-[selected=true]:scale-x-100"
                    />
                  </button>
                )
              })}
            </div>
          </>
        ) : (
          <>
            <h2
              ref={tituloRef}
              tabIndex={-1}
              id={tituloId}
              className="t-display max-w-md text-balance text-[clamp(1.65rem,4.2vw,2.15rem)] text-positive focus:outline-none"
            >
              Para finalizar, como podemos te contatar?
            </h2>
            <p className="mt-4 max-w-md text-pretty text-xs leading-relaxed text-positive/55">
              Responda as perguntas abaixo para receber atendimento de um assessor
              exclusivo Soren Investimentos.
            </p>

            <form onSubmit={onSubmit} className="mt-7 grid gap-5">
              <Campo
                nome="nome"
                rotulo="Nome completo"
                required
                autoComplete="name"
                valor={dados.nome}
                onChange={(v) => setDados((d) => ({ ...d, nome: v }))}
              />
              <Campo
                nome="email"
                rotulo="E-mail"
                type="email"
                required
                autoComplete="email"
                valor={dados.email}
                onChange={(v) => setDados((d) => ({ ...d, email: v }))}
              />
              <Campo
                nome="whatsapp"
                rotulo="WhatsApp"
                type="tel"
                required
                autoComplete="tel"
                inputMode="numeric"
                placeholder="(11) 99999-9999"
                pattern="\(\d{2}\) \d{5}-\d{4}"
                title="Use o formato (11) 99999-9999"
                valor={dados.whatsapp}
                onChange={(v) => setDados((d) => ({ ...d, whatsapp: mascaraWhatsapp(v) }))}
              />

              <button
                type="submit"
                disabled={status === 'enviando'}
                className="group mt-2 inline-flex items-center justify-center gap-3 rounded-full bg-primary px-6 py-4 text-[0.625rem] font-bold uppercase tracking-[0.1em] text-negative transition-colors duration-200 hover:bg-accent disabled:opacity-60 sm:text-[0.6875rem] sm:tracking-[0.16em]"
              >
                {status === 'enviando' ? 'Enviando…' : 'Receber diagnóstico'}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </button>

              <p aria-live="polite" className="min-h-4 text-[0.6875rem] leading-relaxed text-positive/60">
                {status === 'ok' && 'Recebido. Um assessor entra em contato em breve.'}
                {status === 'erro' && 'Não foi possível enviar. Tente pelo WhatsApp.'}
              </p>
            </form>
          </>
        )}
      </div>

      {/*
        Rodapé colado na base do painel. É sticky, e não só o último item da
        coluna, porque na etapa de contato o conteúdo passa da altura da tela e
        o botão ficava abaixo da dobra. O fundo opaco cobre o que passa por trás.
      */}
      <div className="sticky bottom-0 z-10 mt-10 flex min-h-5 shrink-0 items-center bg-background pb-9 pt-5 sm:pb-11">
        {passo > 0 && (
          <button
            type="button"
            onClick={() => setPasso((p) => p - 1)}
            className="group inline-flex items-center gap-3 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-positive/45 transition-colors duration-200 hover:text-primary"
          >
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
            Voltar
          </button>
        )}
      </div>
    </div>
  )
}

function Campo({
  nome,
  rotulo,
  valor,
  onChange,
  type = 'text',
  required,
  autoComplete,
  inputMode,
  placeholder,
  pattern,
  title,
}: {
  nome: string
  rotulo: string
  valor: string
  onChange: (valor: string) => void
  type?: string
  required?: boolean
  autoComplete?: string
  inputMode?: 'numeric' | 'text' | 'tel' | 'email'
  placeholder?: string
  pattern?: string
  title?: string
}) {
  return (
    <label className="block">
      <span className="t-eyebrow text-positive/70">{rotulo}</span>
      <input
        type={type}
        name={nome}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        pattern={pattern}
        title={title}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border-b border-primary/20 bg-transparent pb-2 text-sm text-positive transition-colors duration-200 placeholder:text-positive/35 focus:border-primary focus:outline-none"
      />
    </label>
  )
}
