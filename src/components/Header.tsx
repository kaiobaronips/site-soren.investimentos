import { useEffect, useState } from 'react'
import { navegacao, whatsappUrl } from '../content/site'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [aberto, setAberto] = useState(false)
  const [menu, setMenu] = useState<string | null>(null)
  const wa = whatsappUrl()
  const claro = scrolled || aberto || menu !== null

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = aberto ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [aberto])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
        claro
          ? 'border-primary/15 bg-background text-positive shadow-sm shadow-primary/10'
          : 'border-negative/20 bg-transparent text-negative'
      }`}
      onMouseLeave={() => setMenu(null)}
    >
      <div
        className={`mx-auto flex w-full max-w-[1380px] items-center gap-6 px-5 transition-[height] duration-300 ease-out md:px-8 xl:px-10 ${
          scrolled ? 'h-20' : 'h-[104px]'
        }`}
      >
        <div className="flex shrink-0 items-start gap-6">
          <a href="#topo" className="flex shrink-0 items-center" aria-label="Soren Investimentos — início">
            <img
              src={claro ? '/logo2.png' : '/logo1.png'}
              alt=""
              aria-hidden="true"
              className="h-8 w-auto object-contain md:h-9"
            />
          </a>

          <span
            aria-hidden="true"
            className={`hidden h-5 w-px shrink-0 sm:block ${claro ? 'bg-primary/20' : 'bg-negative/35'}`}
          />

          <svg
            viewBox="0 0 500 451"
            role="img"
            aria-label="XP Investimentos"
            className="-ml-3 hidden h-5 w-auto shrink-0 sm:block"
          >
            <path
              d="m363.85 348.31h56.578c21.159 0 35.879-9.6598 35.879-29.439 0-19.779-14.719-29.439-35.879-29.439h-56.578zm0 102.58h75.437c40.018 0 60.718-20.7 60.718-60.718v-41.858h-1.38c-11.5 34.959-41.398 45.538-76.817 45.538h-56.118c-1.38 0-1.8403 0.45939-1.8403 1.8394zm-106.26-132.01 57.957 56.118v-112.24zm-196.87 132.01h254.83v-12.88c0-22.539 7.8205-35.418 25.759-42.318v-1.38h-71.297c-3.6796 0-5.0596-0.45939-7.8196-3.2194l-37.259-38.639-38.638 39.098c-1.8403 1.8403-3.2202 2.76-6.8999 2.76h-57.498c-3.2194 0-3.2194-1.8394-1.38-3.6796l73.597-71.297-74.977-72.678c-1.8394-1.8394-1.38-3.6796 1.8403-3.6796h57.957c3.2202 0 4.6002 0.46029 6.4396 2.76l40.479 40.479 38.178-40.479c1.8403-1.8394 3.2202-2.76 5.9802-2.76h151.33c34.959 0 65.777 11.5 77.277 46.458h1.38v-228.61c0-40.018-20.7-60.717-60.718-60.717h-378.56c-40.018 0-60.717 20.699-60.717 60.717v329.81c0 39.558 20.699 60.258 60.717 60.258z"
              fill="currentColor"
              opacity={claro ? '0.85' : '1'}
            />
          </svg>
        </div>

        <nav className="ml-auto hidden items-center gap-7 xl:flex" aria-label="Navegação principal">
          {navegacao.map((item) => (
            <div
              key={item.rotulo}
              onMouseEnter={() => setMenu(item.filhos ? item.rotulo : null)}
              onFocus={() => setMenu(item.filhos ? item.rotulo : null)}
            >
              <a
                href={item.href}
                className={`font-display flex items-center gap-1.5 py-7 text-sm transition-colors duration-200 ${
                  menu === item.rotulo
                    ? 'text-accent'
                    : claro
                      ? 'text-positive hover:text-accent focus-visible:text-accent'
                      : 'text-negative/90 hover:text-accent focus-visible:text-accent'
                }`}
              >
                {item.rotulo}
                {item.filhos && (
                  <svg viewBox="0 0 10 6" aria-hidden="true" className={`size-2.5 transition-transform duration-200 ${menu === item.rotulo ? 'rotate-180' : ''}`}>
                    <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                )}
              </a>
            </div>
          ))}
        </nav>

        <div className="ml-auto hidden shrink-0 items-center gap-2 md:flex xl:ml-3">
          <a
            href="#contato"
            className={`rounded-full border px-5 py-2.5 text-sm transition-colors duration-200 ${
              claro ? 'border-primary/20 text-positive hover:border-primary' : 'border-negative/45 text-negative hover:bg-negative/10'
            }`}
          >
            Fale conosco
          </a>
          <a
            href={wa ?? '#contato'}
            {...(wa ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={`rounded-full border px-5 py-2.5 text-sm font-bold transition-colors duration-200 ${
              claro
                ? 'border-primary bg-primary text-negative hover:opacity-85'
                : 'border-negative bg-transparent text-negative hover:bg-negative/10'
            }`}
          >
            Iniciar diagnóstico
          </a>
        </div>

        <button
          type="button"
          onClick={() => setAberto((valor) => !valor)}
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          className={`ml-auto flex size-11 shrink-0 items-center justify-center rounded-full border xl:hidden ${claro ? 'border-primary/20' : 'border-negative/40'}`}
        >
          <span className="flex flex-col gap-[5px]">
            <span className={`block h-px w-4 bg-current transition-transform duration-200 ${aberto ? 'translate-y-[3px] rotate-45' : ''}`} />
            <span className={`block h-px w-4 bg-current transition-transform duration-200 ${aberto ? '-translate-y-[3px] -rotate-45' : ''}`} />
          </span>
        </button>
      </div>

      {navegacao.map((item) => item.filhos ? (
        <div
          key={item.rotulo}
          onMouseEnter={() => setMenu(item.rotulo)}
          aria-hidden={menu !== item.rotulo}
          inert={menu !== item.rotulo}
          className={`absolute inset-x-0 top-full hidden border-b border-primary/15 bg-background shadow-sm shadow-primary/10 transition-[opacity,transform] duration-200 ease-out xl:block ${
            menu === item.rotulo
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-2 opacity-0'
          }`}
        >
          <div className="mx-auto grid min-h-[320px] w-full max-w-[1380px] grid-cols-[0.95fr_2fr] px-10 py-14">
            <div className="pr-14">
              <p className="t-display max-w-sm text-balance text-[1.65rem] font-light leading-[1.16] text-positive">
                Soluções Soren para a{' '}
                <span className="text-accent">construção e evolução da sua jornada.</span>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-y-10">
              {item.filhos.map((filho) => (
                <a
                  key={filho.rotulo}
                  href={filho.href}
                  onClick={() => setMenu(null)}
                  className="group min-h-20 border-l border-positive/10 px-8 py-1 transition-colors duration-[400ms] ease-out hover:border-accent focus-visible:border-accent"
                >
                  <span className="block transition-transform duration-[400ms] ease-out group-hover:-translate-x-4 group-focus-visible:-translate-x-4">
                    <span className="font-display block text-lg text-positive transition-colors duration-[400ms] group-hover:text-accent group-focus-visible:text-accent">
                      {filho.rotulo}
                    </span>
                    <span className="mt-4 block max-w-sm text-pretty text-sm leading-relaxed text-positive transition-colors duration-[400ms] group-hover:text-accent group-focus-visible:text-accent">
                      {filho.descricao}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null)}

      <div id="menu-mobile" className={`overflow-y-auto bg-background text-positive xl:hidden ${aberto ? 'max-h-[calc(100dvh-104px)] border-t border-primary/15' : 'max-h-0'}`}>
        <nav className="flex flex-col px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-3" aria-label="Navegação mobile">
          {navegacao.map((item) => (
            <div key={item.rotulo} className="border-b border-primary/15 py-5">
              <a href={item.href} onClick={() => setAberto(false)} className="t-display block text-2xl">
                {item.rotulo}
              </a>
              {item.filhos && (
                <div className="mt-3 grid gap-2">
                  {item.filhos.map((filho) => (
                    <a key={filho.rotulo} href={filho.href} onClick={() => setAberto(false)} className="text-sm text-positive/70">
                      {filho.rotulo}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a
            href={wa ?? '#contato'}
            {...(wa ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            onClick={() => setAberto(false)}
            className="mt-7 rounded-full bg-primary px-6 py-4 text-center text-sm font-bold text-negative"
          >
            Iniciar diagnóstico
          </a>
        </nav>
      </div>
    </header>
  )
}
