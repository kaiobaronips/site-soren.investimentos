import { ModalShell } from './ModalShell'
import { DiagnosticoForm } from './DiagnosticoForm'
import { useModais } from './ModaisContext'

export function AberturaModal() {
  const { etapa, abrirDiagnostico, fechar } = useModais()

  if (etapa === 'fechado') return null

  // A key força a remontagem do shell na troca de etapa, para a animação de
  // entrada tocar de novo — sem ela o painel é reaproveitado e entra sem efeito.
  return (
    <ModalShell
      key={etapa}
      rotuladoPor={`modal-${etapa}-titulo`}
      variante={etapa === 'diagnostico' ? 'lateral' : 'centro'}
      onFechar={fechar}
    >
      {etapa === 'abertura' ? (
        <div className="px-8 py-14 text-center sm:px-12 sm:py-0">
          <h2
            id="modal-abertura-titulo"
            className="t-display text-pretty text-[clamp(1.4rem,4.4vw,1.9rem)] text-positive"
          >
            O maior erro financeiro não é perder dinheiro.
            <br className="hidden sm:block" />{' '}
            É não <span className="t-turn italic text-primary">decidir</span> o que fazer com ele.
          </h2>

          <p className="mx-auto mt-6 max-w-md text-pretty text-sm leading-relaxed text-positive/65 md:text-base">
            A Soren estrutura patrimônios com disciplina de quem sabe que ganhar
            dinheiro não é sobre sorte.
          </p>

          <div className="mt-10 flex flex-col items-center gap-5">
            <button
              type="button"
              onClick={abrirDiagnostico}
              className="group inline-flex items-center gap-3 bg-primary px-6 py-4 text-[0.625rem] font-bold uppercase tracking-[0.1em] text-negative transition-colors duration-200 hover:bg-accent sm:text-[0.6875rem] sm:tracking-[0.16em] md:px-10"
            >
              Diagnóstico comportamental e financeiro
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </button>

            <button
              type="button"
              onClick={fechar}
              className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-positive/45 underline-offset-4 transition-colors duration-200 hover:text-positive/80 hover:underline"
            >
              Continuar para o site
            </button>
          </div>
        </div>
      ) : (
        <DiagnosticoForm tituloId="modal-diagnostico-titulo" />
      )}
    </ModalShell>
  )
}
