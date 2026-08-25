import { whatsappUrl } from '../content/site'

const VIDEO_SRC = '/hero.mp4'
const POSTER_SRC = '/hero-poster.jpg'

export function Hero() {
  const wa = whatsappUrl()

  return (
    <section id="topo" className="relative isolate flex min-h-dvh items-end overflow-hidden bg-brand-deep text-white">
      <video
        className="absolute inset-0 -z-20 size-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={POSTER_SRC}
        aria-hidden="true"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/25" />

      <div className="mx-auto w-full max-w-[1380px] px-5 pb-6 pt-28 md:px-8 md:pb-8 xl:px-10">
        <div className="max-w-6xl pb-10 md:pb-12">
          <h1 className="t-display max-w-[1120px] tracking-tighter text-[clamp(3rem,5vw,4.8rem)] font-light text-white">
            Sua jornada tem um plano.
            <br />
            <span className="text-bronze">Seu plano tem direção.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/76 md:text-lg">
            A Soren transforma patrimônio, comportamento e objetivos em uma estratégia
            clara para construir, proteger e perpetuar o que importa.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={wa ?? '#contato'}
              {...(wa ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-brand-deep transition-opacity duration-200 hover:opacity-90"
            >
              Monte seu plano
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#metodo"
              className="inline-flex items-center rounded-full border border-white/45 px-7 py-3.5 text-sm text-white transition-colors duration-200 hover:bg-white/10"
            >
              Conheça a Soren
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
