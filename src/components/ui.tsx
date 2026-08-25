import type { ReactNode } from 'react'

export function Pill({ children }: { children: ReactNode }) {
  return <span className="pill">{children}</span>
}

export function Section({
  id,
  children,
  className = '',
  tone = 'void',
}: {
  id?: string
  children: ReactNode
  className?: string
  tone?: 'void' | 'forest'
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-28 px-5 py-20 md:px-8 md:py-28 xl:px-10 ${tone === 'forest' ? 'bg-forest' : 'bg-void'} ${className}`}
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
  pill,
  linha1,
  virada,
  texto,
  centro = false,
}: {
  pill: string
  linha1: string
  virada?: string
  texto?: string
  centro?: boolean
}) {
  return (
    <div className={centro ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <Pill>{pill}</Pill>
      <h2 className="t-display mt-7 text-[clamp(2.15rem,4.5vw,4rem)] text-balance text-bone">
        {linha1}
        {virada && (
          <>
            <br />
            <span className="t-turn text-brand">{virada}</span>
          </>
        )}
      </h2>
      {texto && (
        <p className={`mt-6 max-w-xl text-pretty text-base leading-relaxed text-slate md:text-lg ${centro ? 'mx-auto' : ''}`}>
          {texto}
        </p>
      )}
    </div>
  )
}
