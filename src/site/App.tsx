import { useHashRouter } from './hooks/useHashRouter'
import { Sidebar } from './components/Sidebar'
import { MobileNav } from './components/MobileNav'
import { PanelShell } from './components/PanelShell'

export default function App() {
  const { activePanel, navigate } = useHashRouter()
  return (
    <>
      <Sidebar activePanel={activePanel} navigate={navigate} />
      <MobileNav activePanel={activePanel} navigate={navigate} />
      <PanelShell activePanel={activePanel}>
        <div style={{ padding: '40px', fontFamily: 'var(--font-ui)' }}>
          <p>Active panel: <strong>{activePanel}</strong></p>
        </div>
      </PanelShell>
    </>
  )
}
