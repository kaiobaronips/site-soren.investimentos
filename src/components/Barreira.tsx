import { Section } from './ui'

const momentos = [
  {
    titulo: 'Construir',
    texto: 'Transformar renda e capacidade de poupança em patrimônio com método, prazo e intenção.',
  },
  {
    titulo: 'Proteger',
    texto: 'Organizar riscos, liquidez e estruturas para que o patrimônio atravesse diferentes ciclos.',
  },
  {
    titulo: 'Perpetuar',
    texto: 'Conectar sucessão, propósito e legado para que o que foi construído continue fazendo sentido.',
  },
]

export function Barreira() {
  return (
    <Section id="barreira" className="overflow-hidden pb-0 md:pb-0">
      <div className="grid gap-12 pb-16 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24 lg:pb-24">
        <div>
          <h2 className="t-display max-w-2xl text-balance text-[clamp(2.4rem,5vw,4.8rem)] text-positive">
            Patrimônio não é uma coleção de produtos.
          </h2>
        </div>

        <div className="flex max-w-2xl flex-col justify-end lg:pb-2">
          <p className="font-display text-pretty text-lg font-light leading-relaxed tracking-[-0.05em] text-positive md:text-xl">
            É um sistema de decisões que precisa acompanhar sua vida, seus riscos e o futuro que você quer construir.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3">
        {momentos.map((momento) => (
          <article
            key={momento.titulo}
            className="min-h-64 border-b border-l border-primary/15 px-7 py-8 md:min-h-72 md:border-b-0 md:px-10 md:py-9 lg:px-12"
          >
            <h3 className="t-display text-balance text-[clamp(1.5rem,2.1vw,2rem)] font-light text-positive">
              {momento.titulo}
            </h3>
            <p className="mt-12 max-w-sm text-pretty text-[0.9375rem] font-light leading-relaxed text-positive md:mt-14">
              {momento.texto}
            </p>
          </article>
        ))}
      </div>
    </Section>
  )
}
