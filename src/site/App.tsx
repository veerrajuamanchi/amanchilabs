import { useHashRouter } from './hooks/useHashRouter'
import { Sidebar } from './components/Sidebar'
import { MobileNav } from './components/MobileNav'
import { CompanyView } from './CompanyView'

export default function App() {
  const { activePanel, navigate, overviewSection } = useHashRouter()
  return (
    <>
      <Sidebar activePanel={activePanel} navigate={navigate} />
      <MobileNav activePanel={activePanel} navigate={navigate} />
      <CompanyView activePanel={activePanel} overviewSection={overviewSection} />
    </>
  )
}
