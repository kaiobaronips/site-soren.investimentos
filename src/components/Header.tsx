import { useEffect, useState } from 'react'
import { SorenMark } from './SorenMark'
import { institucional, navegacao, whatsappUrl } from '../content/site'

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
          ? 'border-forest-line bg-white text-bone shadow-sm'
          : 'border-white/20 bg-transparent text-white'
      }`}
      onMouseLeave={() => setMenu(null)}
    >
      <div className="mx-auto flex h-[104px] w-full max-w-[1380px] items-center gap-6 px-5 md:px-8 xl:px-10">
        <a href="#topo" className="flex shrink-0 items-center gap-3" aria-label="Soren Investimentos — início">
          <SorenMark className="h-8 w-auto" />
          {institucional.corretoraParceira && (
            <>
              <span aria-hidden="true" className={`hidden h-7 w-px sm:block ${claro ? 'bg-forest-line' : 'bg-white/35'}`} />
              <span className={`hidden max-w-20 text-[0.55rem] font-bold leading-tight sm:block ${claro ? 'text-slate' : 'text-white/70'}`}>
                AGENTE AUTÔNOMO
                <br />
                {institucional.corretoraParceira.toUpperCase()}
              </span>
            </>
          )}
        </a>

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
                    ? 'text-bronze'
                    : claro
                      ? 'text-bone hover:text-bronze focus-visible:text-bronze'
                      : 'text-white/90 hover:text-bronze focus-visible:text-bronze'
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
              claro ? 'border-forest-line text-bone hover:border-brand' : 'border-white/45 text-white hover:bg-white/10'
            }`}
          >
            Fale conosco
          </a>
          <a
            href={wa ?? '#contato'}
            {...(wa ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white transition-opacity duration-200 hover:opacity-85"
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
          className={`ml-auto flex size-11 shrink-0 items-center justify-center rounded-full border xl:hidden ${claro ? 'border-forest-line' : 'border-white/40'}`}
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
          className={`absolute inset-x-0 top-full hidden border-b border-forest-line bg-white shadow-sm transition-[opacity,transform] duration-200 ease-out xl:block ${
            menu === item.rotulo
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-2 opacity-0'
          }`}
        >
          <div className="mx-auto grid min-h-[320px] w-full max-w-[1380px] grid-cols-[0.95fr_2fr] px-10 py-14">
            <div className="pr-14">
              <p className="t-display max-w-sm text-balance text-[1.65rem] leading-[1.16] text-bone">
                Soluções Soren para a{' '}
                <span className="text-brand">construção e evolução da sua jornada.</span>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-y-10">
              {item.filhos.map((filho) => (
                <a
                  key={filho.rotulo}
                  href={filho.href}
                  onClick={() => setMenu(null)}
                  className="group min-h-20 border-l-2 border-forest-line px-8 py-1 transition-colors duration-[400ms] ease-out hover:border-bronze focus-visible:border-bronze"
                >
                  <span className="block transition-transform duration-[400ms] ease-out group-hover:-translate-x-4 group-focus-visible:-translate-x-4">
                    <span className="font-display block text-lg text-bone transition-colors duration-[400ms] group-hover:text-bronze group-focus-visible:text-bronze">
                      {filho.rotulo}
                    </span>
                    <span className="mt-4 block max-w-sm text-pretty text-sm leading-relaxed text-slate transition-colors duration-[400ms] group-hover:text-bronze group-focus-visible:text-bronze">
                      {filho.descricao}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null)}

      <div id="menu-mobile" className={`overflow-y-auto bg-white text-bone xl:hidden ${aberto ? 'max-h-[calc(100dvh-104px)] border-t border-forest-line' : 'max-h-0'}`}>
        <nav className="flex flex-col px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-3" aria-label="Navegação mobile">
          {navegacao.map((item) => (
            <div key={item.rotulo} className="border-b border-forest-line py-5">
              <a href={item.href} onClick={() => setAberto(false)} className="t-display block text-2xl">
                {item.rotulo}
              </a>
              {item.filhos && (
                <div className="mt-3 grid gap-2">
                  {item.filhos.map((filho) => (
                    <a key={filho.rotulo} href={filho.href} onClick={() => setAberto(false)} className="text-sm text-slate">
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
            className="mt-7 rounded-full bg-brand px-6 py-4 text-center text-sm font-bold text-white"
          >
            Iniciar diagnóstico
          </a>
        </nav>
      </div>
    </header>
  )
}
