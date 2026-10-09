// src/site/components/ConceptualLabel.tsx
import './shared.css'

type Props = { dark?: boolean }

export function ConceptualLabel({ dark = false }: Props) {
  return (
    <span className={`conceptual-label${dark ? ' conceptual-label--dark' : ''}`}>
      Illustrative — not a representation of released software.
    </span>
  )
}
