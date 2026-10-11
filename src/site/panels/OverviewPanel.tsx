import type { PanelId } from '../hooks/useHashRouter'
import { ArrowIcon } from '../Icons'
import './OverviewPanel.css'

type Props = { navigate: (panel: PanelId) => void }

export function OverviewPanel({ navigate }: Props) {
  return (
    <section className="overview-panel" aria-labelledby="overview-heading">
      <div className="overview-panel__hero">
        <p className="overview-panel__eyebrow">AMANCHI LABS</p>
        <h1 className="overview-panel__heading" id="overview-heading">
          Your life is personal.<br /><em>Your technology should respect that.</em>
        </h1>
        <p className="overview-panel__sub">
          We believe useful software shouldn't require you to surrender control of your personal information.
        </p>
        <p className="overview-panel__sub overview-panel__positioning">
          Amanchi Labs builds thoughtful, local-first applications designed to keep more of your information on your own device &mdash; and put you in charge of what you choose to share.
        </p>
        <button className="overview-panel__cta" type="button" onClick={() => navigate('principles')}>
          Explore our philosophy <ArrowIcon aria-hidden="true" />
        </button>
      </div>
      <p className="overview-panel__signature"><span>Private by Design. Local by Default.</span><span>Your Data. Your Device. Your Control.</span></p>
      <section className="overview-panel__section" aria-labelledby="overview-why">
        <p className="overview-panel__eyebrow">01 / WHY IT MATTERS</p>
        <h2 id="overview-why">Your life is not a dataset.</h2>
        <div className="overview-panel__prose">
          <p>Your financial records, conversations, routines, and personal documents are parts of your life. Using an application shouldn't automatically mean turning them into another company's stored asset.</p>
          <p>Connected services can be valuable. But collecting more information can increase exposure &mdash; sometimes discovered only through a breach notification. Keeping information locally doesn't eliminate security risks; the goal is meaningful choice, not a guarantee.</p>
        </div>
      </section>
      <section className="overview-panel__section overview-panel__approach" aria-labelledby="overview-approach">
        <p className="overview-panel__eyebrow">02 / OUR APPROACH</p>
        <h2 id="overview-approach">Useful software. Less unnecessary exposure.</h2>
        <p className="overview-panel__prose">These are our design intentions, not a claim that every product already works this way.</p>
        <div className="overview-panel__principles">
          <div><h3>Not everything needs the cloud.</h3><p>Modern devices can do many useful tasks locally. When information doesn't need to leave your device, design to keep it there.</p></div>
          <div><h3>Intelligence without unnecessary exposure.</h3><p>AI shouldn't need your entire personal history. Make external assistance optional and user-initiated, with clarity about what is sent and why.</p></div>
          <div><h3>Your information remains yours.</h3><p>Design for clear storage choices and meaningful control over access, retention, sharing, export, and deletion.</p></div>
        </div>
        <div className="overview-panel__architecture">
          <h3 id="overview-architecture">Your information. Your decision.</h3>
          <figure aria-labelledby="overview-architecture">
            <div className="overview-panel__flow">
              <div className="overview-panel__person"><strong>You</strong><span>Choose your information</span></div>
              <ArrowIcon className="overview-panel__local-arrow" aria-hidden="true" />
              <div className="overview-panel__device"><strong>Your device</strong><span>Local storage<br />and processing</span><small>Local workflow</small></div>
              <div className="overview-panel__connection">Optional transfer<span className="overview-panel__transfer-line" aria-hidden="true"><ArrowIcon /></span>Only with permission</div>
              <div className="overview-panel__provider"><strong>Optional AI</strong><span>Selected information,<br />with permission</span><span>External provider</span></div>
            </div>
            <figcaption>
              <p>Our design intention: your information remains on your device by default. When you choose to use an external AI feature, selected information may be sent to the provider. You should always know what is being shared and why.</p>
              <p>Illustrative design philosophy, not a verified representation of every Amanchi Labs product. Other transfers, including backups, integrations, or telemetry, vary by product.</p>
            </figcaption>
          </figure>
        </div>
        <div className="overview-panel__discovery">
          <p>One philosophy. A family of personal applications.</p>
          <p>We envision tools for finances, personal routines, documents, and everyday life built around the same principle: your information remains under your control.</p>
          <button className="overview-panel__cta" type="button" onClick={() => navigate('products')}>
            Explore our products <ArrowIcon aria-hidden="true" />
          </button>
        </div>
      </section>
    </section>
  )
}
