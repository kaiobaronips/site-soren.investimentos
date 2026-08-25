import { useState, type FormEvent } from 'react'
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
  const [whatsapp, setWhatsapp] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const wa = whatsappUrl()

  const etapaContato = passo === PERGUNTAS.length
  const pergunta = etapaContato ? null : PERGUNTAS[passo]

  function responder(chave: string, valor: string) {
    setRespostas((r) => ({ ...r, [chave]: valor }))
    setPasso((p) => p + 1)
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const dados = { ...respostas, ...Object.fromEntries(new FormData(form)) }

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
        body: JSON.stringify(dados),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('ok')
    } catch {
      setStatus('erro')
    }
  }

  return (
    <div className="m-auto w-full px-8 py-14 sm:px-12">
      {/* Progresso */}
      <div className="flex items-center gap-4">
        <span className="t-eyebrow shrink-0 text-primary">
          {String(passo + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-positive/15">
          <span
            className="block h-px bg-primary transition-[width] duration-300 ease-out"
            style={{ width: `${((passo + 1) / TOTAL) * 100}%` }}
          />
        </span>
      </div>

      {pergunta ? (
        <>
          <h2
            id={tituloId}
            className="t-display mt-8 text-pretty text-[clamp(1.25rem,3.4vw,1.6rem)] text-positive"
          >
            {pergunta.rotulo}
          </h2>

          <div className="mt-7 grid gap-2">
            {pergunta.opcoes.map((opcao) => {
              const ativa = respostas[pergunta.chave] === opcao
              return (
                <button
                  key={opcao}
                  type="button"
                  onClick={() => responder(pergunta.chave, opcao)}
                  className={`border px-4 py-3 text-left text-[0.8125rem] leading-snug transition-colors duration-200 ${
                    ativa
                      ? 'border-primary bg-primary text-negative'
                      : 'border-positive/15 text-positive/80 hover:border-primary hover:text-positive'
                  }`}
                >
                  {opcao}
                </button>
              )
            })}
          </div>
        </>
      ) : (
        <>
          <h2
            id={tituloId}
            className="t-display mt-8 text-pretty text-[clamp(1.25rem,3.4vw,1.6rem)] text-positive"
          >
            Para finalizar, como podemos te contatar?
          </h2>
          <p className="mt-3 text-pretty text-xs leading-relaxed text-positive/65">
            Responda as perguntas abaixo para receber atendimento de um assessor
            exclusivo Soren Investimentos.
          </p>

          <form onSubmit={onSubmit} className="mt-7 grid gap-5">
            <Campo nome="nome" rotulo="Nome completo" required autoComplete="name" />
            <Campo nome="email" rotulo="E-mail" type="email" required autoComplete="email" />

            <label className="block">
              <span className="t-eyebrow text-positive/70">WhatsApp</span>
              <input
                type="tel"
                name="whatsapp"
                required
                inputMode="numeric"
                autoComplete="tel"
                placeholder="(11) 99999-9999"
                value={whatsapp}
                onChange={(e) => setWhatsapp(mascaraWhatsapp(e.target.value))}
                pattern="\(\d{2}\) \d{5}-\d{4}"
                title="Use o formato (11) 99999-9999"
                className="mt-2 w-full border-b border-primary/20 bg-transparent pb-2 text-sm text-positive transition-colors duration-200 placeholder:text-positive/35 focus:border-primary focus:outline-none"
              />
            </label>

            <button
              type="submit"
              disabled={status === 'enviando'}
              className="group mt-1 inline-flex items-center justify-center gap-3 bg-primary px-6 py-4 text-[0.625rem] font-bold uppercase tracking-[0.1em] text-negative transition-colors duration-200 hover:bg-accent disabled:opacity-60 sm:text-[0.6875rem] sm:tracking-[0.16em]"
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

      {passo > 0 && (
        <button
          type="button"
          onClick={() => setPasso((p) => p - 1)}
          className="mt-8 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-positive/45 underline-offset-4 transition-colors duration-200 hover:text-positive/80 hover:underline"
        >
          ← Voltar
        </button>
      )}
    </div>
  )
}

function Campo({
  nome,
  rotulo,
  type = 'text',
  required,
  autoComplete,
}: {
  nome: string
  rotulo: string
  type?: string
  required?: boolean
  autoComplete?: string
}) {
  return (
    <label className="block">
      <span className="t-eyebrow text-positive/70">{rotulo}</span>
      <input
        type={type}
        name={nome}
        required={required}
        autoComplete={autoComplete}
        className="mt-2 w-full border-b border-primary/20 bg-transparent pb-2 text-sm text-positive transition-colors duration-200 focus:border-primary focus:outline-none"
      />
    </label>
  )
}
