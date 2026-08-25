import { SorenMark } from './SorenMark'
import { contato, institucional, navegacao, verticais } from '../content/site'

const ANO = new Date().getFullYear()

export function Footer() {
  const parceira = institucional.corretoraParceira

  return (
    <footer className="bg-brand-deep text-white/70">
      <div className="mx-auto w-full max-w-[1380px] px-5 py-20 md:px-8 md:py-24 xl:px-10">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <SorenMark className="h-8 w-auto text-white" />
            <p className="mt-7 max-w-xs text-pretty text-sm leading-relaxed text-white/55">
              Arquitetura de legados. Estruturamos patrimônios com decisões claras,
              dados e direção.
            </p>

            <div className="mt-8 flex gap-5">
              {contato.linkedin && (
                <a
                  href={contato.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold uppercase text-white/55 transition-colors duration-200 hover:text-bronze-lit"
                >
                  LinkedIn
                </a>
              )}
              {contato.instagram && (
                <a
                  href={contato.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold uppercase text-white/55 transition-colors duration-200 hover:text-bronze-lit"
                >
                  Instagram
                </a>
              )}
            </div>
          </div>

          <nav>
            <p className="text-xs font-bold uppercase text-white/40">Navegação</p>
            <ul className="mt-6 space-y-3.5">
              {navegacao.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-white/60 transition-colors duration-200 hover:text-white"
                  >
                    {item.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav>
            <p className="text-xs font-bold uppercase text-white/40">Soluções</p>
            <ul className="mt-6 space-y-3.5">
              {verticais.map((v) => (
                <li key={v.id}>
                  <a
                    href="#solucoes"
                    className="text-sm text-white/60 transition-colors duration-200 hover:text-white"
                  >
                    {v.nome}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/*
          Aviso regulatório. Texto-base para escritório de assessoria de
          investimentos (Resolução CVM 178). PREENCHER razão social, CNPJ e
          confirmar o vínculo com a corretora antes de publicar — e submeter à
          área de compliance da parceira, que costuma exigir aprovação prévia de
          material de divulgação.
        */}
        <div className="mt-20 border-t border-white/15 pt-10">
          <div className="max-w-5xl space-y-4 text-xs leading-relaxed text-white/42">
            <p>
              {institucional.razaoSocial || '[Razão social]'}
              {institucional.cnpj ? `, inscrita no CNPJ sob o nº ${institucional.cnpj},` : ','} é
              um escritório de assessoria de investimentos credenciado
              {parceira ? ` à ${parceira}` : ' à corretora parceira'}, atuando no
              mercado financeiro nos termos da Resolução CVM nº 178/2023.
            </p>
            <p>
              A assessoria de investimentos é atividade de intermediação e
              distribuição. O escritório não realiza a custódia de valores ou
              ativos, não administra carteiras e não possui poder discricionário
              sobre os recursos dos clientes — toda decisão de investimento é do
              próprio investidor.
            </p>
            <p>
              Investimentos envolvem risco de perda, inclusive do capital
              aplicado. Rentabilidade passada não representa garantia de
              rentabilidade futura. Nenhum produto apresentado neste site
              constitui oferta, recomendação personalizada ou garantia de
              retorno. Leia atentamente os documentos do produto — lâmina,
              regulamento e prospecto — antes de investir.
            </p>
            <p>
              Produtos de mercado privado, private equity e real estate podem
              apresentar baixa liquidez e ser destinados exclusivamente a
              investidores qualificados ou profissionais, conforme a regulação
              aplicável. Consórcio é modalidade de aquisição de bens, não é
              investimento e não possui garantia de rentabilidade.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-white/15 pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <p>© {ANO} Soren Investimentos. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="transition-colors duration-200 hover:text-white">
                Política de privacidade
              </a>
              <a href="#" className="transition-colors duration-200 hover:text-white">
                Termos de uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
