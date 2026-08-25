import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

/** Atraso da abertura automática, para não competir com a pintura do hero. */
const ATRASO_MS = 700

export type EtapaModal = 'fechado' | 'abertura' | 'diagnostico'

type Modais = {
  etapa: EtapaModal
  abrirDiagnostico: () => void
  fechar: () => void
}

const ModaisContext = createContext<Modais | null>(null)

/**
 * O estado dos modais vive aqui, e não dentro do modal, porque o header também
 * precisa abrir o diagnóstico — e ele é irmão do modal na árvore, não pai.
 */
export function ModaisProvider({ children }: { children: ReactNode }) {
  const [etapa, setEtapa] = useState<EtapaModal>('fechado')

  useEffect(() => {
    const t = window.setTimeout(() => setEtapa('abertura'), ATRASO_MS)
    return () => window.clearTimeout(t)
  }, [])

  const abrirDiagnostico = useCallback(() => setEtapa('diagnostico'), [])
  const fechar = useCallback(() => setEtapa('fechado'), [])

  const valor = useMemo(
    () => ({ etapa, abrirDiagnostico, fechar }),
    [etapa, abrirDiagnostico, fechar],
  )

  return <ModaisContext.Provider value={valor}>{children}</ModaisContext.Provider>
}

export function useModais(): Modais {
  const ctx = useContext(ModaisContext)
  if (!ctx) throw new Error('useModais precisa estar dentro de <ModaisProvider>')
  return ctx
}
