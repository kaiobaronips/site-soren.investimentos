import { Section } from './ui'
import { useModais } from './ModaisContext'
import { EquipeOrbit } from './EquipeOrbit'

export function Experiencia() {
  const { abrirDiagnostico } = useModais()

  return (
    // O espaço que o bloco ocupa ao subir vem do padding deste wrapper, e não
    // de uma margem na seção: margem é transparente e deixaria passar o branco
    // do body atrás do vídeo. Com o padding aqui, esse trecho fica cinza.
    // São 270px = metade da altura definida em lg:min-h-[540px] no vídeo; sem
    // isso o bloco invade a seção de cima, já que translate desloca o desenho
    // mas não reserva espaço no layout. Ao mudar aquela altura, ajustar aqui.
    <div className="bg-card lg:pt-[270px]">
      <Section id="experiencia" className="bg-primary text-negative lg:pb-64">
        {/*
          Card de texto e vídeo formam um bloco único e colado, centralizado na
          página. O bloco inteiro sobe metade da própria altura para fora do
          verde: -mt-28 primeiro cancela o padding-top do <Section> (py-28 a
          partir de md), levando o bloco à borda verde real; só então o
          -translate-y-1/2 sobe exatos 50% — sem esse passo, metade do
          deslocamento se perderia dentro do padding.
        */}
        <div className="mx-auto grid max-w-6xl overflow-hidden lg:-mt-28 lg:-translate-y-1/2 lg:grid-cols-2">
          <div className="flex flex-col justify-start bg-background px-8 py-14 md:px-12 md:py-16 lg:px-14">
            <h2 className="t-display text-balance text-[clamp(1.55rem,2.8vw,2.35rem)] font-light text-positive">
              O que fazemos pode{' '}
              <span className="text-accent">mudar a forma como você decide</span>
            </h2>
            <p className="mt-5 max-w-sm text-pretty text-xs leading-relaxed text-positive md:text-sm">
              Nosso trabalho é ser o guia da sua jornada patrimonial,
              <br />
              presente nas
              decisões que realmente importam.
            </p>

            <button
              type="button"
              onClick={abrirDiagnostico}
              className="group mt-auto inline-flex w-fit items-center gap-3 rounded-full bg-primary px-7 py-4 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-negative transition-colors duration-200 hover:bg-accent"
            >
              Iniciar diagnóstico
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </button>
          </div>

          <div className="relative min-h-[280px] bg-positive sm:min-h-[360px] lg:min-h-[540px]">
            <video
              className="absolute inset-0 size-full object-cover"
              controls
              playsInline
              preload="metadata"
              poster="/experiencia-institucional.jpg"
            >
              <source src="/experiencia-institucional.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="relative left-1/2 w-[calc(100vw-2.5rem)] max-w-[1800px] -translate-x-1/2 lg:-mt-28">
          <div className="max-w-2xl lg:ml-[3%]">
            <p className="t-display text-balance text-[clamp(2rem,3.8vw,3.5rem)] font-light text-negative">
              Uma <span className="text-accent">equipe</span> que enxerga
              <br />
              o patrimônio por inteiro.
            </p>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-negative md:text-xl">
              Diferentes especialidades.
              <br />
              Uma única direção.
            </p>
          </div>

          <div className="mt-12 lg:mt-20">
            <EquipeOrbit />
          </div>
        </div>
      </Section>
    </div>
  )
}
