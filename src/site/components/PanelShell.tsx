import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { PanelId } from '../hooks/useHashRouter'
import './PanelShell.css'

type Props = { activePanel: PanelId; children: ReactNode }

export function PanelShell({ activePanel, children }: Props) {
  const mainRef = useRef<HTMLElement>(null)
  const previous = useRef({ activePanel, children })
  const [outgoing, setOutgoing] = useState<{ activePanel: PanelId; children: ReactNode } | null>(null)
  const [hasSwitched, setHasSwitched] = useState(false)

  useLayoutEffect(() => {
    if (previous.current.activePanel === activePanel) return

    const oldPanel = previous.current
    previous.current = { activePanel, children }
    setHasSwitched(true)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOutgoing(null)
      return
    }

    setOutgoing(oldPanel)
    const timeout = window.setTimeout(() => setOutgoing(null), 150)
    return () => window.clearTimeout(timeout)
  }, [activePanel])

  useLayoutEffect(() => {
    if (previous.current.activePanel === activePanel) previous.current.children = children
  }, [activePanel, children])

  useEffect(() => {
    if (!hasSwitched) return
    // Let navigation drawers finish closing before moving focus into the new panel.
    let secondFrame = 0
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => mainRef.current?.focus({ preventScroll: true }))
    })
    return () => {
      cancelAnimationFrame(firstFrame)
      cancelAnimationFrame(secondFrame)
    }
  }, [activePanel, hasSwitched])

  return (
    <main ref={mainRef} className="panel-shell" id="main-content" tabIndex={-1}>
      {outgoing && (
        <div className="panel-canvas panel-canvas--outgoing" aria-hidden="true" inert>
          {outgoing.children}
        </div>
      )}
      <div
        key={activePanel}
        className={`panel-canvas${hasSwitched ? ' panel-canvas--incoming' : ''}`}
        aria-live="polite"
        aria-atomic="true"
      >
        {children}
      </div>
    </main>
  )
}
