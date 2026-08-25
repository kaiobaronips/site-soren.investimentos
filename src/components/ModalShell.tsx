import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

const FOCAVEIS =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'

/** Precisa acompanhar a duração das animações de saída definidas no CSS abaixo. */
const SAIDA_MS = 320

type Props = {
  /** Id do elemento que dá nome ao diálogo, para o aria-labelledby. */
  rotuladoPor: string
  /**
   * 'centro': quadrado centralizado, entra subindo.
   * 'lateral': painel colado à direita ocupando a altura toda, entra deslizando.
   */
  variante: 'centro' | 'lateral'
  onFechar: () => void
  children: ReactNode
}

/**
 * Casca compartilhada dos modais: define a regra de layout única — quadrado,
 * cantos retos, sem sombra, branco levemente translúcido e barra verde no topo.
 * Concentra também travamento de scroll, foco preso e fechamento por Esc.
 */
export function ModalShell({ rotuladoPor, variante, onFechar, children }: Props) {
  const painelRef = useRef<HTMLDivElement>(null)
  const focoAnterior = useRef<HTMLElement | null>(null)
  const [saindo, setSaindo] = useState(false)

  /**
   * Fechar desmonta o modal na hora, então a animação de saída não teria como
   * rodar. Aqui a saída é marcada primeiro e o desmonte só acontece depois.
   */
  const iniciarSaida = useCallback(() => {
    const semAnimacao = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (semAnimacao) {
      onFechar()
      return
    }
    setSaindo(true)
  }, [onFechar])

  useEffect(() => {
    if (!saindo) return
    const t = window.setTimeout(onFechar, SAIDA_MS)
    return () => window.clearTimeout(t)
  }, [saindo, onFechar])

  useEffect(() => {
    focoAnterior.current = document.activeElement as HTMLElement | null
    painelRef.current?.focus()

    const larguraBarra = window.innerWidth - document.documentElement.clientWidth
    const overflowAnterior = document.body.style.overflow
    const paddingAnterior = document.body.style.paddingRight
    document.body.style.overflow = 'hidden'
    // Compensa a barra de rolagem para o header fixo não saltar ao travar o scroll.
    if (larguraBarra > 0) document.body.style.paddingRight = `${larguraBarra}px`

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        iniciarSaida()
        return
      }
      if (e.key !== 'Tab') return

      const painel = painelRef.current
      if (!painel) return
      const focaveis = painel.querySelectorAll<HTMLElement>(FOCAVEIS)
      if (focaveis.length === 0) return
      const primeiro = focaveis[0]
      const ultimo = focaveis[focaveis.length - 1]

      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault()
        ultimo.focus()
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault()
        primeiro.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflowAnterior
      document.body.style.paddingRight = paddingAnterior
      focoAnterior.current?.focus?.()
    }
  }, [iniciarSaida])

  const lateral = variante === 'lateral'

  const posicaoOverlay = lateral
    ? 'items-stretch justify-end'
    : 'items-center justify-center px-5 py-10'

  // No lateral o alinhamento é 'start' + margem automática no conteúdo: com
  // justify-center o topo é cortado quando o conteúdo passa da altura da tela.
  const entradaPainel = lateral
    ? '[animation:modalDesliza_420ms_cubic-bezier(0.16,1,0.3,1)_both]'
    : '[animation:modalSobe_900ms_cubic-bezier(0.22,1,0.36,1)_120ms_both]'

  const saidaPainel = lateral
    ? '[animation:modalDeslizaSai_320ms_cubic-bezier(0.4,0,1,1)_both]'
    : '[animation:modalSobeSai_320ms_cubic-bezier(0.4,0,1,1)_both]'

  const painel = lateral
    ? `h-full max-w-[560px] justify-start overflow-y-auto ${saindo ? saidaPainel : entradaPainel}`
    : `max-w-[560px] justify-center sm:aspect-square ${saindo ? saidaPainel : entradaPainel}`

  const entradaFundo = lateral
    ? '[animation:modalFade_240ms_ease-out_both]'
    : '[animation:modalFade_600ms_ease-out_both]'

  return (
    <div
      className={`fixed inset-0 z-[70] flex overflow-hidden bg-positive/70 ${
        saindo
          ? 'pointer-events-none [animation:modalFadeSai_320ms_ease-in_both]'
          : entradaFundo
      } ${posicaoOverlay}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) iniciarSaida()
      }}
    >
      <div
        ref={painelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={rotuladoPor}
        tabIndex={-1}
        className={`relative flex w-full flex-col border-t-[6px] border-primary bg-background/85 focus:outline-none ${painel}`}
      >
        <button
          type="button"
          onClick={iniciarSaida}
          aria-label="Fechar"
          className="absolute right-0 top-0 flex size-12 items-center justify-center text-positive/60 transition-colors duration-200 hover:bg-positive/5 hover:text-positive"
        >
          <svg viewBox="0 0 14 14" aria-hidden="true" className="size-3.5">
            <path d="M1 1l12 12M13 1L1 13" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>

        {children}
      </div>

      <style>{`
        @keyframes modalFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        /* Fade suave: a opacidade domina e o deslocamento é só um apoio. */
        @keyframes modalSobe {
          from { opacity: 0; transform: translateY(10px); }
          60%  { opacity: 1; }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalDesliza {
          from { opacity: 0; transform: translateX(64px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* Saída: mais curta que a entrada, para fechar não parecer travado. */
        @keyframes modalFadeSai {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        @keyframes modalSobeSai {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(8px); }
        }
        @keyframes modalDeslizaSai {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(64px); }
        }
      `}</style>
    </div>
  )
}
