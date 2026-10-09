import { useHashRouter, type PanelId } from './hooks/useHashRouter'
import { Sidebar } from './components/Sidebar'
import { MobileNav } from './components/MobileNav'
import { PanelShell } from './components/PanelShell'
import { OverviewPanel } from './panels/OverviewPanel'
import { WealthPanel } from './panels/WealthPanel'
import { DermaPanel } from './panels/DermaPanel'
import { PrinciplesPanel } from './panels/PrinciplesPanel'
import { ContactPanel } from './panels/ContactPanel'

function renderPanel(activePanel: PanelId, navigate: (panel: PanelId) => void) {
  switch (activePanel) {
    case 'overview': return <OverviewPanel navigate={navigate} />
    case 'wealth': return <WealthPanel navigate={navigate} />
    case 'derma': return <DermaPanel />
    case 'principles': return <PrinciplesPanel />
    case 'contact': return <ContactPanel />
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
