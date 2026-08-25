import type { ReactNode } from 'react'

export function Section({
  id,
  children,
  className = '',
}: {
  id?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-28 bg-background px-5 py-20 md:px-8 md:py-28 xl:px-10 ${className}`}
    >
      <div className="mx-auto w-full max-w-[1380px]">{children}</div>
    </section>
  )
}

export function Reveal({
  children,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return <div className={className}>{children}</div>
}

/** Título de seção: etiqueta institucional + headline editorial. */
export function SectionHead({
  linha1,
  virada,
  texto,
  centro = false,
  textoClassName = '',
}: {
  linha1: string
  virada?: string
  texto?: string
  centro?: boolean
  textoClassName?: string
}) {
  return (
    <div className={centro ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <h2 className="t-display text-[clamp(2.15rem,4.5vw,4rem)] text-balance text-positive">
        {linha1}
        {virada && (
          <>
            <br />
            <span className="t-turn text-positive">{virada}</span>
          </>
        )}
      </h2>
      {texto && (
        <p className={`mt-6 max-w-xl text-pretty text-base leading-relaxed text-positive md:text-lg ${centro ? 'mx-auto' : ''} ${textoClassName}`}>
          {texto}
        </p>
      )}
    </div>
  )
}
