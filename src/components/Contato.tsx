import { useState, type FormEvent } from 'react'
import { contato, verticais, whatsappUrl } from '../content/site'
import { Reveal, Section, SectionHead } from './ui'

/**
 * PREENCHER: endpoint que recebe o formulário (Formspree, Vercel Function, CRM).
 * Enquanto estiver vazio, o submit cai no fallback de WhatsApp/e-mail em vez de
 * fingir que enviou.
 */
const ENDPOINT = ''

type Status = 'idle' | 'enviando' | 'ok' | 'erro'

export function Contato() {
  const [status, setStatus] = useState<Status>('idle')
  const wa = whatsappUrl()

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const dados = Object.fromEntries(new FormData(form))

    if (!ENDPOINT) {
      // Sem backend configurado: leva a conversa para o canal que existe.
      const corpo = [
        `Nome: ${dados.nome}`,
        `E-mail: ${dados.email}`,
        `Telefone: ${dados.telefone}`,
        `Interesse: ${dados.interesse}`,
        '',
        String(dados.mensagem ?? ''),
      ].join('\n')

      if (wa) {
        window.open(`${wa.split('?')[0]}?text=${encodeURIComponent(corpo)}`, '_blank')
      } else if (contato.email) {
        window.location.href = `mailto:${contato.email}?subject=${encodeURIComponent(
          'Contato pelo site',
        )}&body=${encodeURIComponent(corpo)}`
      } else {
        setStatus('erro')
        return
      }
      setStatus('ok')
      form.reset()
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
      form.reset()
    } catch {
      setStatus('erro')
    }
  }

  return (
    <Section id="contato" tone="forest">
      <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <Reveal>
          <div>
            <SectionHead
              pill="Contato"
              linha1="A primeira conversa"
              virada="não custa nada."
              texto="Um diagnóstico honesto do seu momento patrimonial. Se não fizermos sentido para você, dizemos isso na primeira reunião."
            />

            <div className="mt-12 space-y-6">
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 text-bone transition-colors duration-200 hover:text-brand"
                >
                  <span className="t-eyebrow w-24 shrink-0 text-slate">WhatsApp</span>
                  <span className="text-[0.9375rem]">Falar agora</span>
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              )}
              {contato.email && (
                <a
                  href={`mailto:${contato.email}`}
                  className="flex items-center gap-4 text-bone transition-colors duration-200 hover:text-brand"
                >
                  <span className="t-eyebrow w-24 shrink-0 text-slate">E-mail</span>
                  <span className="text-[0.9375rem]">{contato.email}</span>
                </a>
              )}
              {contato.telefone && (
                <a
                  href={`tel:${contato.telefone.replace(/\D/g, '')}`}
                  className="flex items-center gap-4 text-bone transition-colors duration-200 hover:text-brand"
                >
                  <span className="t-eyebrow w-24 shrink-0 text-slate">Telefone</span>
                  <span className="text-[0.9375rem]">{contato.telefone}</span>
                </a>
              )}
              {contato.endereco.linha1 && (
                <p className="flex items-start gap-4 text-bone">
                  <span className="t-eyebrow w-24 shrink-0 pt-1 text-slate">Escritório</span>
                  <span className="text-[0.9375rem] leading-relaxed">
                    {contato.endereco.linha1}
                    {contato.endereco.cidade && (
                      <>
                        <br />
                        {contato.endereco.cidade}
                      </>
                    )}
                  </span>
                </p>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form onSubmit={onSubmit} className="grid gap-7 rounded-2xl border border-forest-line bg-white p-6 shadow-sm md:p-10">
            <div className="grid gap-7 sm:grid-cols-2">
              <Campo nome="nome" rotulo="Nome" required autoComplete="name" />
              <Campo nome="email" rotulo="E-mail" type="email" required autoComplete="email" />
            </div>
            <div className="grid gap-7 sm:grid-cols-2">
              <Campo nome="telefone" rotulo="Telefone" type="tel" required autoComplete="tel" />
              <label className="group block">
                <span className="t-eyebrow text-slate">Interesse</span>
                <select
                  name="interesse"
                  defaultValue=""
                  className="mt-3 w-full appearance-none border-b border-forest-line bg-transparent pb-3 text-sm text-bone transition-colors duration-200 focus:border-brand focus:outline-none"
                >
                  <option value="" className="bg-white">
                    Selecione
                  </option>
                  {verticais.map((v) => (
                    <option key={v.id} value={v.nome} className="bg-white">
                      {v.nome}
                    </option>
                  ))}
                  <option value="Não sei ainda" className="bg-white">
                    Não sei ainda
                  </option>
                </select>
              </label>
            </div>

            <label className="block">
              <span className="t-eyebrow text-slate">Mensagem</span>
              <textarea
                name="mensagem"
                rows={4}
                className="mt-3 w-full resize-none border-b border-forest-line bg-transparent pb-3 text-sm text-bone transition-colors duration-200 placeholder:text-slate/60 focus:border-brand focus:outline-none"
                placeholder="Conte brevemente sobre o seu momento."
              />
            </label>

            <label className="flex items-start gap-3 text-xs leading-relaxed text-slate">
              <input
                type="checkbox"
                name="consentimento"
                required
                className="mt-1 size-4 shrink-0 accent-[#0b563f]"
              />
              <span>
                Autorizo a Soren a tratar meus dados para retorno deste contato,
                conforme a Lei Geral de Proteção de Dados.
              </span>
            </label>

            <div className="mt-2 flex flex-wrap items-center gap-5">
              <button
                type="submit"
                disabled={status === 'enviando'}
                className="group inline-flex items-center gap-2.5 rounded-full bg-brand px-8 py-4 text-sm font-bold text-white transition-opacity duration-200 hover:opacity-85 disabled:opacity-50"
              >
                {status === 'enviando' ? 'Enviando…' : 'Enviar'}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </button>

              <p aria-live="polite" className="text-xs text-slate">
                {status === 'ok' && 'Recebido. Retornamos em breve.'}
                {status === 'erro' && 'Não foi possível enviar. Tente pelo WhatsApp.'}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
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
      <span className="t-eyebrow text-slate">{rotulo}</span>
      <input
        type={type}
        name={nome}
        required={required}
        autoComplete={autoComplete}
        className="mt-3 w-full border-b border-forest-line bg-transparent pb-3 text-sm text-bone transition-colors duration-200 focus:border-brand focus:outline-none"
      />
    </label>
  )
}
