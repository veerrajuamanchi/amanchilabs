import { useCallback, useEffect, useState } from 'react'

export type PanelId = 'overview' | 'products' | 'wealth' | 'derma' | 'principles' | 'contact'
export type OverviewSection = 'vision' | 'why' | 'approach'
type Route = { activePanel: PanelId; overviewSection: OverviewSection | null }

const VALID_PANELS: readonly PanelId[] = ['overview', 'products', 'wealth', 'derma', 'principles', 'contact']

function parseRouteFromHash(hash: string): Route {
  const raw = hash.replace(/^#/, '')
  if (raw === 'overview/vision' || raw === 'overview/why' || raw === 'overview/approach') {
    return { activePanel: 'overview', overviewSection: raw.split('/')[1] as OverviewSection }
  }
  return { activePanel: VALID_PANELS.includes(raw as PanelId) ? raw as PanelId : 'overview', overviewSection: null }
}

export function useHashRouter(): Route & { navigate: (panel: PanelId) => void } {
  const [route, setRoute] = useState<Route>(() =>
    parseRouteFromHash(window.location.hash)
  )

  useEffect(() => {
    function onHashChange() {
      setRoute(parseRouteFromHash(window.location.hash))
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // Setting window.location.hash fires hashchange natively.
  // Never use history.pushState here — it does NOT fire hashchange.
  const navigate = useCallback((panel: PanelId) => {
    window.location.hash = '#' + panel
  }, [])

  return { ...route, navigate }
}
