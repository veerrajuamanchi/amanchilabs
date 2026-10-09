import type { KeyboardEvent, MouseEvent, ReactNode } from 'react'
import type { PanelId } from '../hooks/useHashRouter'
import './NavItem.css'

type Props = {
  id: PanelId
  label: string
  active: boolean
  navigate: (panel: PanelId) => void
  icon?: ReactNode
  className?: string
}

export function NavItem({ id, label, active, navigate, icon, className = '' }: Props) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    navigate(id)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLAnchorElement>) {
    if (event.key === ' ') {
      event.preventDefault()
      navigate(id)
    }
  }

  return (
    <a
      href={'#' + id}
      className={`nav-item${active ? ' nav-item--active' : ''}${className ? ' ' + className : ''}`}
      aria-current={active ? 'page' : undefined}
      data-sidebar-link
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {icon}
      {label}
    </a>
  )
}
