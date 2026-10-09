// src/site/components/AttributeChip.tsx
import './shared.css'

type Props = { label: string; dark?: boolean }

export function AttributeChip({ label, dark = false }: Props) {
  return <span className={`attr-chip${dark ? ' attr-chip--dark' : ''}`}>{label}</span>
}
