const VIDEO_SRC = '/hero.mp4'
const POSTER_SRC = '/hero-poster.jpg'

export function Hero() {
  return (
    <section id="topo" className="relative isolate flex min-h-dvh items-end overflow-hidden bg-primary text-negative">
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

      <div className="mx-auto w-full max-w-[1380px] px-5 pb-6 pt-28 md:px-8 md:pb-8 xl:px-10">
        <div className="max-w-6xl pb-10 md:pb-12">
          <h1 className="t-display max-w-[1120px] tracking-tighter text-[clamp(2.45rem,4.2vw,3.95rem)] font-light text-negative">
            Sua jornada tem um plano.
            <br />
            <span className="text-card">Seu plano tem direção.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-negative md:text-lg">
            A Soren transforma patrimônio, comportamento e objetivos
            <br />
            em uma estratégia clara para construir, proteger e perpetuar o que importa.
          </p>

        </div>
      </div>
    </section>
  )
}
