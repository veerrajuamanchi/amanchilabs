import { useHashRouter } from './hooks/useHashRouter'
import { Sidebar } from './components/Sidebar'
import { MobileNav } from './components/MobileNav'
import { PanelShell } from './components/PanelShell'
import { PrinciplesPanel } from './panels/PrinciplesPanel'
import { ContactPanel } from './panels/ContactPanel'
import { WealthPanel } from './panels/WealthPanel'
import { DermaPanel } from './panels/DermaPanel'
import type { PanelId } from './hooks/useHashRouter'

function renderPanel(activePanel: PanelId, navigate: (panel: PanelId) => void) {
  switch (activePanel) {
    case 'principles': return <PrinciplesPanel />
    case 'contact': return <ContactPanel />
    case 'wealth': return <WealthPanel navigate={navigate} />
    case 'derma': return <DermaPanel />
    default: return (
      <div style={{ padding: '40px', fontFamily: 'var(--font-ui)' }}>
        <p>Active panel: <strong>{activePanel}</strong></p>
      </div>
    )
  }
}

export default function App() {
  const { activePanel, navigate } = useHashRouter()
  return (
    <>
      <Sidebar activePanel={activePanel} navigate={navigate} />
      <MobileNav activePanel={activePanel} navigate={navigate} />
      <PanelShell activePanel={activePanel}>
        {renderPanel(activePanel, navigate)}
      </PanelShell>
    </>
  )
}
