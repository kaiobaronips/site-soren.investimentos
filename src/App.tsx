import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Barreira } from './components/Barreira'
import { Metodo } from './components/Metodo'
import { Caminho } from './components/Caminho'
import { Solucoes } from './components/Solucoes'
import { Niveis } from './components/Niveis'
import { Essencial } from './components/Essencial'
import { Contato } from './components/Contato'
import { Footer } from './components/Footer'
import { WhatsAppFab } from './components/WhatsAppFab'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Barreira />
        <Metodo />
        <Caminho />
        <Solucoes />
        <Niveis />
        <Essencial />
        <Contato />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
