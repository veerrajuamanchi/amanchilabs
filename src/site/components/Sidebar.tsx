import type { KeyboardEvent } from 'react'
import { Brand } from '../Brand'
import { MailIcon } from '../Icons'
import type { PanelId } from '../hooks/useHashRouter'
import { NavItem } from './NavItem'
import './Sidebar.css'

type Props = { activePanel: PanelId; navigate: (panel: PanelId) => void }

const NAV_ITEMS: { id: PanelId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'wealth', label: 'WealthPrivate' },
  { id: 'derma', label: 'DermaPrivate' },
  { id: 'principles', label: 'Principles' },
]

export function Sidebar({ activePanel, navigate }: Props) {
  function handleNavKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    const links = Array.from(event.currentTarget.querySelectorAll<HTMLAnchorElement>('[data-sidebar-link]'))
    const index = links.indexOf(document.activeElement as HTMLAnchorElement)
    if (index < 0) return
    event.preventDefault()
    const nextIndex = (index + (event.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length
    links[nextIndex].focus()
  }

  return (
    <aside className="sidebar">
      <div className="sidebar__brand"><Brand /></div>
      <nav className="sidebar__nav" aria-label="Primary navigation" onKeyDown={handleNavKeyDown}>
        <div className="sidebar__links">
          {NAV_ITEMS.map(({ id, label }) => (
            <NavItem key={id} id={id} label={label} active={activePanel === id} navigate={navigate} />
          ))}
        </div>
        <div className="sidebar__foot">
          <NavItem
            id="contact"
            label="Contact"
            active={activePanel === 'contact'}
            navigate={navigate}
            icon={<MailIcon className="sidebar__mail-icon" />}
            className="sidebar__contact"
          />
          <p className="sidebar__copy">© 2026 Amanchi Labs</p>
        </div>
      </nav>
    </aside>
  )
}
