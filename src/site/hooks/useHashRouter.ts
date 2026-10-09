import { useCallback, useEffect, useState } from 'react'

export type PanelId = 'overview' | 'wealth' | 'derma' | 'principles' | 'contact'

const VALID_PANELS: readonly PanelId[] = ['overview', 'wealth', 'derma', 'principles', 'contact']

function parsePanelFromHash(hash: string): PanelId {
  const raw = hash.replace(/^#/, '')
  return (VALID_PANELS.includes(raw as PanelId) ? raw : 'overview') as PanelId
}

export function useHashRouter(): { activePanel: PanelId; navigate: (panel: PanelId) => void } {
  const [activePanel, setActivePanel] = useState<PanelId>(() =>
    parsePanelFromHash(window.location.hash)
  )

  useEffect(() => {
    function onHashChange() {
      setActivePanel(parsePanelFromHash(window.location.hash))
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // Setting window.location.hash fires hashchange natively.
  // Never use history.pushState here — it does NOT fire hashchange.
  const navigate = useCallback((panel: PanelId) => {
    window.location.hash = '#' + panel
  }, [])

  return { activePanel, navigate }
}
