/**
 * Fonte única de conteúdo.
 *
 * A voz e a narrativa seguem o site atual (soreninvestimentos.com.br):
 * filosófica, aforística, centrada em decisão — não em produto.
 * Campos marcados com PREENCHER carregam afirmação institucional ou
 * regulatória e estão vazios de propósito.
 */

type Contato = {
  whatsapp: { numero: string; mensagem: string }
  email: string
  telefone: string
  endereco: { linha1: string; cidade: string }
  linkedin: string
  instagram: string
}

export const contato: Contato = {
  whatsapp: {
    // PREENCHER: DDI+DDD+número, só dígitos. Ex.: 5544999999999
    numero: '',
    mensagem: 'Olá! Vim pelo site da Soren e quero fazer o diagnóstico.',
  },
  email: '', // PREENCHER
  telefone: '', // PREENCHER
  endereco: { linha1: '', cidade: '' }, // PREENCHER
  linkedin: '', // PREENCHER
  instagram: '', // PREENCHER
}

type Institucional = {
  razaoSocial: string
  cnpj: string
  corretoraParceira: string
}

export const institucional: Institucional = {
  razaoSocial: '', // PREENCHER
  cnpj: '', // PREENCHER
  corretoraParceira: 'XP Investimentos', // PREENCHER: confirmar vínculo
}

export const whatsappUrl = (): string | null => {
  if (!contato.whatsapp.numero) return null
  return `https://wa.me/${contato.whatsapp.numero}?text=${encodeURIComponent(
    contato.whatsapp.mensagem,
  )}`
}

/* ------------------------------------------------------------------ */
/* Navegação — mega-menu no padrão Blue3: rótulo + descrição por item   */
/* ------------------------------------------------------------------ */

export type SubItem = { rotulo: string; descricao: string; href: string }
export type NavItem = { rotulo: string; href: string; filhos?: SubItem[] }

export const navegacao: NavItem[] = [
  {
    rotulo: 'Para você',
    href: '#metodo',
    filhos: [
      { rotulo: 'O método', descricao: 'Os quatro princípios que sustentam a estratégia.', href: '#metodo' },
      { rotulo: 'Seu caminho', descricao: 'Do primeiro contato ao acompanhamento contínuo.', href: '#caminho' },
      { rotulo: 'Níveis de patrimônio', descricao: 'Cada estágio pede uma estrutura diferente.', href: '#niveis' },
    ],
  },
  {
    rotulo: 'Soluções',
    href: '#solucoes',
    filhos: [
      { rotulo: 'Mercado tradicional', descricao: 'Renda fixa, variável, fundos e previdência sob regulação CVM.', href: '#solucoes' },
      { rotulo: 'Mercado privado', descricao: 'Private equity e venture capital fora da bolsa.', href: '#solucoes' },
      { rotulo: 'Real estate', descricao: 'Imobiliário como classe de ativo, do papel ao tijolo.', href: '#solucoes' },
      { rotulo: 'Consórcio', descricao: 'Alavancagem patrimonial sem juros, quando faz sentido.', href: '#solucoes' },
      { rotulo: 'Educacional', descricao: 'Formação de investidores e de assessores.', href: '#solucoes' },
    ],
  },
  { rotulo: 'A Soren', href: '#essencial' },
  { rotulo: 'Contato', href: '#contato' },
]

/* ------------------------------------------------------------------ */

export type Principio = { letra: string; titulo: string; texto: string }

/** Os quatro P. Modelo de estratégia da casa. */
export const principios: Principio[] = [
  {
    letra: 'P',
    titulo: 'Paciência',
    texto:
      'O tempo é a variável mais poderosa do mercado. Crescer 1% ao mês por dez anos vale mais do que 10% em um mês.',
  },
  {
    letra: 'P',
    titulo: 'Planejamento',
    texto:
      'Sem definição clara de para onde, é difícil chegar. Planejar é decidir, com critério, o destino de cada real do patrimônio.',
  },
  {
    letra: 'P',
    titulo: 'Persistência',
    texto:
      'Quem constrói patrimônio real não é quem mais acerta — é quem mais persiste. Estratégia que não se sustenta no tempo é ruído.',
  },
  {
    letra: 'P',
    titulo: 'Propósito',
    texto:
      'Sem propósito claro, o crescimento não tem rumo nem significado. Patrimônio sem destino é acúmulo, não construção.',
  },
]

export type Etapa = { numero: string; titulo: string; texto: string }

export const caminho: Etapa[] = [
  { numero: '01', titulo: 'Primeiro contato', texto: 'Entendemos o seu momento e se há aderência com a nossa forma de trabalhar.' },
  { numero: '02', titulo: 'Diagnóstico', texto: 'Análise comportamental e financeira. Onde o patrimônio está e o que o está travando.' },
  { numero: '03', titulo: 'Estratégia e plano', texto: 'Reunião com o planejamento construído: alocação, prazos e critérios de decisão.' },
  { numero: '04', titulo: 'Decisão e execução', texto: 'Aprovação sua e início da implementação. A decisão é sempre do investidor.' },
  { numero: '05', titulo: 'Acompanhamento', texto: 'Monitoramento contínuo, rebalanceamento e ajuste de rota.' },
]

export type Nivel = { rotulo: string; titulo: string; texto: string }

export const niveis: Nivel[] = [
  { rotulo: 'Entrada', titulo: 'Organização e clareza', texto: 'Estrutura financeira, reserva e o primeiro desenho de alocação.' },
  { rotulo: 'Crescimento', titulo: 'Diversificação com disciplina', texto: 'Ampliação das classes de ativo sem perder o critério que sustenta a carteira.' },
  { rotulo: 'Escala', titulo: 'Estruturas imobiliárias', texto: 'Real estate, operações estruturadas e soluções de maior complexidade.' },
  { rotulo: 'Alta renda', titulo: 'Holdings e proteção', texto: 'Estrutura societária, alavancagem calculada e planejamento sucessório sob medida.' },
]

export type Vertical = {
  id: string
  indice: string
  nome: string
  resumo: string
  detalhe: string
  itens: string[]
}

export const verticais: Vertical[] = [
  {
    id: 'tradicional',
    indice: '01',
    nome: 'Mercado tradicional',
    resumo: 'Renda fixa, renda variável, fundos e previdência sob regulação CVM.',
    detalhe:
      'A base de qualquer patrimônio. Carteira desenhada a partir do seu perfil, horizonte e objetivo — não a partir da prateleira do mês.',
    itens: [
      'Renda fixa bancária e de crédito privado',
      'Renda variável e fundos listados',
      'Fundos de investimento e previdência',
      'Produtos estruturados e internacional',
    ],
  },
  {
    id: 'privado',
    indice: '02',
    nome: 'Mercado privado',
    resumo: 'Private equity e venture capital: acesso ao que não está na bolsa.',
    detalhe:
      'Baixa liquidez e horizonte longo, para a parcela do patrimônio que pode esperar. Tese clara antes de qualquer alocação.',
    itens: ['Private equity', 'Venture capital', 'Operações estruturadas', 'Co-investimento'],
  },
  {
    id: 'real-estate',
    indice: '03',
    nome: 'Real estate',
    resumo: 'Imobiliário como classe de ativo — do papel ao tijolo.',
    detalhe:
      'Diversificação real e renda recorrente. Localização, contrato, inquilino e liquidez vêm antes da rentabilidade projetada.',
    itens: ['Fundos imobiliários', 'Desenvolvimento e incorporação', 'Renda recorrente', 'Operações estruturadas'],
  },
  {
    id: 'consorcio',
    indice: '04',
    nome: 'Consórcio',
    resumo: 'Alavancagem patrimonial sem juros — quando faz sentido, e só quando faz.',
    detalhe:
      'Consórcio não é investimento, é ferramenta de aquisição. No contexto certo, é das formas mais eficientes de formar patrimônio.',
    itens: ['Imóveis', 'Veículos e frota', 'Estratégia de lance', 'Planejamento de aquisição'],
  },
  {
    id: 'educacional',
    indice: '05',
    nome: 'Educacional',
    resumo: 'Formação de investidores e de assessores. Quem entende decide melhor.',
    detalhe:
      'Conteúdo, mentoria e formação continuada. Nosso trabalho não é decidir por você — é fazer você entender a decisão.',
    itens: ['Formação de investidores', 'Mentoria para assessores', 'Conteúdo e encontros', 'Educação patrimonial familiar'],
  },
]

export const essencial: string[] = [
  'Clareza para decidir',
  'Estratégia para construir',
  'Acompanhamento para sustentar',
  'Visão integrada para evoluir',
]

/**
 * PREENCHER: números auditáveis. Enquanto `valor` estiver vazio a seção não
 * renderiza — de propósito. Estimativa publicada como fato é risco de compliance.
 */
export type Indicador = { valor: string; sufixo: string; legenda: string }

export const indicadores: Indicador[] = [
  { valor: '', sufixo: '', legenda: 'Patrimônio sob assessoria' },
  { valor: '', sufixo: '', legenda: 'Famílias assessoradas' },
  { valor: '', sufixo: '', legenda: 'Anos de mercado' },
]
