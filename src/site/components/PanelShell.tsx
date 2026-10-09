import type { ReactNode } from 'react'
import type { PanelId } from '../hooks/useHashRouter'
import './PanelShell.css'

type Props = { activePanel: PanelId; children: ReactNode }

export function PanelShell({ children }: Props) {
  return (
    <main className="panel-shell" id="main-content" tabIndex={-1}>
      <div className="panel-canvas" aria-live="polite" aria-atomic="true">
        {children}
      </div>
    </main>
  )
}
