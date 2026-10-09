// src/site/components/StatusBadge.tsx
import './shared.css'

type Props = { label: string }

export function StatusBadge({ label }: Props) {
  return <span className="status-badge">{label}</span>
}
