import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent, SyntheticEvent } from 'react'
import type { PanelId } from '../hooks/useHashRouter'
import './MobileNav.css'

type Props = { activePanel: PanelId; navigate: (panel: PanelId) => void }

const NAV_ITEMS: { id: PanelId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'wealth', label: 'WealthPrivate' },
  { id: 'derma', label: 'DermaPrivate' },
  { id: 'principles', label: 'Principles' },
  { id: 'contact', label: 'Contact' },
]

export function MobileNav({ activePanel, navigate }: Props) {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const drawer = drawerRef.current
    const main = document.getElementById('main-content')
    main?.setAttribute('inert', '')
    drawer?.querySelector<HTMLAnchorElement>('a')?.focus()

    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        return
      }
      if (event.key !== 'Tab' || !drawer) return

      const links = Array.from(drawer.querySelectorAll<HTMLAnchorElement>('a'))
      if (!links.length) return
      const first = links[0]
      const last = links[links.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      main?.removeAttribute('inert')
      toggleRef.current?.focus()
    }
  }, [open])

  // Hash changes can also come from browser back and forward.
  useEffect(() => { setOpen(false) }, [activePanel])

  useEffect(() => {
    const media = window.matchMedia('(max-width: 1023px)')
    function onWidthChange() { if (!media.matches) setOpen(false) }
    media.addEventListener('change', onWidthChange)
    return () => media.removeEventListener('change', onWidthChange)
  }, [])

  function handleNavClick(event: SyntheticEvent<HTMLAnchorElement>, id: PanelId) {
    event.preventDefault()
    navigate(id)
    setOpen(false)
  }

  function handleNavKeyDown(event: KeyboardEvent<HTMLAnchorElement>, id: PanelId) {
    if (event.key === ' ') handleNavClick(event, id)
  }

  return (
    <>
      <header className="mobile-nav">
        <span className="mobile-nav__brand">AMANCHI LABS</span>
        <button
          ref={toggleRef}
          className="mobile-nav__toggle"
          type="button"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={() => setOpen(value => !value)}
        >
          <span className={`mobile-nav__hamburger${open ? ' is-open' : ''}`} aria-hidden="true">
            <span /><span /><span />
          </span>
        </button>
      </header>
      {open && (
        <div ref={drawerRef} className="mobile-drawer" id="mobile-drawer" role="dialog" aria-label="Navigation menu" aria-modal="true">
          <nav aria-label="Primary navigation">
            {NAV_ITEMS.map(({ id, label }) => (
              <a
                key={id}
                href={'#' + id}
                className={`mobile-drawer__item${activePanel === id ? ' is-active' : ''}`}
                aria-current={activePanel === id ? 'page' : undefined}
                onClick={event => handleNavClick(event, id)}
                onKeyDown={event => handleNavKeyDown(event, id)}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
