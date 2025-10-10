import { AppRoutes } from './routes/AppRoutes'
import { Header } from './components/Header/Header'
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop'

export function App() {
  return (
    <>
      <ScrollToTop />
      <Header />

      <AppRoutes />
    </>
  )
}
