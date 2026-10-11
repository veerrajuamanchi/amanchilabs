import { AttributeChip } from '../components/AttributeChip'
import { StatusBadge } from '../components/StatusBadge'
import { WealthMockup } from '../mockups/WealthMockup'
import { ArrowIcon } from '../Icons'
import type { PanelId } from '../hooks/useHashRouter'
import './WealthPanel.css'

type Props = { navigate: (panel: PanelId) => void }

export function WealthPanel({ navigate: _navigate }: Props) {
  return (
    <section className="wealth-panel" aria-labelledby="wealth-heading">
      <div className="wealth-panel__copy">
        <StatusBadge label="IN DEVELOPMENT" />
        <h1 className="wealth-panel__heading" id="wealth-heading">
          Your wealth.<br />Your data.<br />Your control.
        </h1>
        <p className="wealth-panel__desc">
          Turn scattered financial documents into a private, source-backed history of your financial life — organized on your device.
        </p>
        <div className="wealth-panel__chips">
          <AttributeChip label="Local-first" dark />
          <AttributeChip label="Source-traced" dark />
          <AttributeChip label="Optional AI" dark />
        </div>
        <a
          className="wealth-panel__cta"
          href="mailto:founder@amanchilabs.com?subject=WealthPrivate%20inquiry"
          aria-label="Email founder@amanchilabs.com to get in touch about WealthPrivate"
        >
          Get in touch <ArrowIcon className="wealth-panel__cta-icon" />
        </a>
        <p className="wealth-panel__trust">
          WealthPrivate is being designed to organize financial information on your device, with optional AI integrations that aim to avoid routing personal request content through Amanchi Labs servers.
        </p>
      </div>
      <div className="wealth-panel__visual">
        <WealthMockup />
      </div>
    </section>
  )
}
