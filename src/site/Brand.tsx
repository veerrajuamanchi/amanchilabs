type BrandProps = { footer?: boolean }

export function Brand({ footer = false }: BrandProps) {
  return (
    <a className={`brand${footer ? ' brand-footer' : ''}`} href="#top" aria-label="Amanchi Labs home">
      <svg className="brand-mark" viewBox="0 0 36 36" aria-hidden="true">
        <path d="M18 3.5 31.5 11.25v13.5L18 32.5 4.5 24.75v-13.5L18 3.5Z" />
        <path d="m18 10 7.2 4.1v7.8L18 26l-7.2-4.1v-7.8L18 10Z" />
      </svg>
      <span>AMANCHI<span className="brand-space"> </span>LABS</span>
    </a>
  )
}
