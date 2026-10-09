import { ConceptualLabel } from '../components/ConceptualLabel'
import './WealthMockup.css'

const DOCUMENT_TYPES = [
  'Bank statement',
  'Investment summary',
  'Tax document',
  'Insurance policy',
]

export function WealthMockup() {
  return (
    <div className="wealth-mockup" role="img" aria-label="Illustrative WealthPrivate document interface">
      <div className="wealth-mockup__chrome">
        <div className="wealth-mockup__header">
          <span className="wealth-mockup__app-name">WealthPrivate</span>
          <span className="wealth-mockup__header-mark" aria-hidden="true" />
        </div>

        <div className="wealth-mockup__section-label">Documents</div>
        <div className="wealth-mockup__doc-list">
          {DOCUMENT_TYPES.map((label) => (
            <div className="wealth-mockup__doc-row" key={label}>
              <span className="wealth-mockup__doc-icon" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="1" width="11" height="14" rx="1.5" stroke="currentColor" />
                  <path d="M5 5h5M5 8h5M5 11h3" stroke="currentColor" strokeLinecap="round" />
                </svg>
              </span>
              <span className="wealth-mockup__doc-label">{label}</span>
              <span className="wealth-mockup__doc-chevron" aria-hidden="true">›</span>
            </div>
          ))}
        </div>

        <div className="wealth-mockup__trace">
          <span className="wealth-mockup__trace-mark" aria-hidden="true" />
          <div className="wealth-mockup__trace-copy">
            <span className="wealth-mockup__trace-title">Source trace</span>
            <span className="wealth-mockup__trace-detail">Original document reference</span>
          </div>
          <span className="wealth-mockup__trace-icon" aria-hidden="true">↗</span>
        </div>
      </div>
      <ConceptualLabel dark />
    </div>
  )
}
