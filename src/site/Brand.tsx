import './Brand.css'
import type { MouseEventHandler } from 'react'

type BrandProps = { footer?: boolean; onClick?: MouseEventHandler<HTMLAnchorElement> }

export function Brand({ footer = false, onClick }: BrandProps) {
  return (
    <a className={`brand${footer ? ' brand-footer' : ''}`} href="#overview" aria-label="Amanchi Labs — go to overview" onClick={onClick}>
      <img src={footer ? '/brand/logo-footer.png' : '/brand/logo-header.png'} width="640" height="100" alt="" />
    </a>
  )
}
