import { AttributeChip } from '../components/AttributeChip'
import { RoutinePhone } from '../mockups/RoutinePhone'
import { ExternalIcon } from '../Icons'
import './DermaPanel.css'

const DERMAPRIVATE_URL = 'https://dermaprivate-website.onrender.com/index.html'

export function DermaPanel() {
  return (
    <section className="derma-panel" aria-labelledby="derma-heading">
      <div className="derma-panel__copy">
        <p className="derma-panel__eyebrow">DermaPrivate</p>
        <h1 className="derma-panel__heading" id="derma-heading">
          Personalized<br />skincare.<br /><em>On your terms.</em>
        </h1>
        <p className="derma-panel__desc">
          Plan and understand your skincare routine with ingredient-aware intelligence. AI may assist — you decide what to keep.
        </p>
        <div className="derma-panel__chips">
          <AttributeChip label="Routine planning" />
          <AttributeChip label="Ingredient-aware" />
          <AttributeChip label="Optional AI" />
        </div>
        <a
          className="derma-panel__cta"
          href={DERMAPRIVATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Explore DermaPrivate — opens in a new tab"
        >
          Explore DermaPrivate <ExternalIcon className="derma-panel__cta-icon" />
        </a>
        <p className="derma-panel__trust">Core planning is local-first. AI is optional and user-initiated.</p>
      </div>
      <div className="derma-panel__visual">
        <RoutinePhone />
      </div>
    </section>
  )
}
