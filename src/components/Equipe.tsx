import { Section } from './ui'

const frentes = [
  {
    imagem: '/equipe-planejamento.jpg',
    titulo: 'Planejamento patrimonial',
    texto: 'Diagnóstico, objetivos e desenho da estratégia.',
    posicao: 'object-center',
  },
  {
    imagem: '/equipe-estrategia.jpg',
    titulo: 'Estratégia de investimentos',
    texto: 'Alocação, risco e oportunidades sob o mesmo critério.',
    posicao: 'object-center',
  },
  {
    imagem: '/equipe-relacionamento.jpg',
    titulo: 'Relacionamento e jornada',
    texto: 'Presença para acompanhar decisões e mudanças de rota.',
    posicao: 'object-center',
  },
]

export function Equipe() {
  return (
    <Section id="equipe">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div>
          <p className="t-eyebrow text-accent">Especialistas por perto</p>
          <h2 className="t-display mt-7 max-w-xl text-balance text-[clamp(2.35rem,4.7vw,4.4rem)] text-positive">
            Uma equipe que enxerga o patrimônio por inteiro.
          </h2>
        </div>
        <div className="flex max-w-2xl flex-col justify-end">
          <p className="text-pretty text-xl leading-relaxed text-positive md:text-2xl">
            Diferentes especialidades. Uma única direção.
          </p>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-positive">
            A Soren conecta planejamento, mercado e relacionamento para que você não precise coordenar decisões isoladas.
          </p>
          <p className="t-eyebrow mt-7 text-positive/35">Imagens ilustrativas — substituir por retratos oficiais</p>
        </div>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {frentes.map((frente, indice) => (
          <article key={frente.titulo} className="group relative min-h-[520px] overflow-hidden bg-card">
            <img
              src={frente.imagem}
              alt="Imagem ilustrativa de profissional em ambiente corporativo"
              loading="lazy"
              className={`absolute inset-0 size-full object-cover ${frente.posicao} transition-transform duration-200 group-hover:scale-[1.02]`}
            />
            <div className="absolute inset-x-0 bottom-0 bg-primary p-7 text-negative md:p-8">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <h3 className="t-display text-balance text-2xl text-negative">{frente.titulo}</h3>
                  <p className="mt-3 max-w-sm text-pretty text-sm leading-relaxed text-negative/65">{frente.texto}</p>
                </div>
                <span className="text-xs tabular-nums text-accent">0{indice + 1}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 grid min-h-[440px] overflow-hidden bg-primary lg:grid-cols-[1.25fr_0.75fr]">
        <img
          src="/equipe-time.jpg"
          alt="Imagem ilustrativa de uma equipe em reunião"
          loading="lazy"
          className="size-full min-h-[340px] object-cover"
        />
        <div className="flex flex-col justify-between p-8 text-negative md:p-12">
          <p className="t-eyebrow text-accent">Trabalho integrado</p>
          <blockquote className="t-display mt-16 text-balance text-3xl text-negative md:text-4xl">
            “Uma boa estratégia começa quando todos olham para o mesmo futuro.”
          </blockquote>
          <a href="#contato" className="group mt-10 inline-flex items-center gap-3 self-start text-sm text-negative">
            Converse com a Soren
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </Section>
  )
}
