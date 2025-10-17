import { AppRoutes } from './routes/AppRoutes'
import { Header } from './components/Header/Header'
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop'
import { Footer } from './components/Footer/Footer'

export function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <AppRoutes />
    </>
  )
}
