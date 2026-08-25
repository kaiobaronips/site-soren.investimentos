import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Barreira } from './components/Barreira'
import { Metodo } from './components/Metodo'
import { Caminho } from './components/Caminho'
import { Solucoes } from './components/Solucoes'
import { Niveis } from './components/Niveis'
import { Essencial } from './components/Essencial'
import { Experiencia } from './components/Experiencia'
import { Equipe } from './components/Equipe'
import { Contato } from './components/Contato'
import { Footer } from './components/Footer'
import { WhatsAppFab } from './components/WhatsAppFab'
import { AberturaModal } from './components/AberturaModal'
import { ModaisProvider } from './components/ModaisContext'

export default function App() {
  return (
    <ModaisProvider>
      <Header />
      <main>
        <Hero />
        <Barreira />
        <Metodo />
        <Caminho />
        <Solucoes />
        <Niveis />
        <Experiencia />
        <Equipe />
        <Essencial />
        <Contato />
      </main>
      <Footer />
      <WhatsAppFab />
      <AberturaModal />
    </ModaisProvider>
  )
}
