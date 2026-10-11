import { useEffect } from 'react'
import type { PanelId, OverviewSection } from '../hooks/useHashRouter'
import { ArrowIcon } from '../Icons'
import './OverviewPanel.css'

type Props = { navigate: (panel: PanelId) => void; section: OverviewSection | null }

export function OverviewPanel({ navigate, section }: Props) {
  useEffect(() => {
    if (!section) return
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => {
          const target = document.getElementById(section === 'vision' ? 'overview-heading' : 'overview-' + section)
          if (section === 'vision') target?.closest('.panel-canvas')?.scrollTo({ top: 0 })
          else target?.scrollIntoView({ block: 'start' })
          target?.focus({ preventScroll: true })
        })
      })
    })
    return () => cancelAnimationFrame(frame)
  }, [section])

  return (
    <section className="overview-panel" aria-labelledby="overview-heading">
      <div className="overview-panel__hero">
        <p className="overview-panel__eyebrow">AMANCHI LABS</p>
        <h1 className="overview-panel__heading" id="overview-heading" tabIndex={-1}>
          Your life is personal.<br /><em>Your technology should respect that.</em>
        </h1>
        <p className="overview-panel__sub">
          We believe powerful software shouldn't require you to hand over your personal information.
        </p>
        <p className="overview-panel__sub overview-panel__positioning">
          Amanchi Labs builds intelligent, local-first applications. Our design goal is to store and process your personal information on your device, without requiring you to upload your personal documents to Amanchi Labs servers.
        </p>
        <button className="overview-panel__cta" type="button" onClick={() => navigate('principles')}>
          Explore our philosophy <ArrowIcon aria-hidden="true" />
        </button>
      </div>
      <nav className="overview-panel__section-nav" aria-label="Overview sections">
        <a href="#overview/vision" aria-current={section === 'vision' ? 'location' : undefined}>Our Vision</a>
        <a href="#overview/why" aria-current={section === 'why' ? 'location' : undefined}>Why It Matters</a>
        <a href="#overview/approach" aria-current={section === 'approach' ? 'location' : undefined}>Our Approach</a>
        <a href="#products">Products</a>
        <a href="#contact">Contact</a>
      </nav>
      <p className="overview-panel__signature"><span>Private by Design. Local by Default.</span><span>Your Data. Your Device. Your Control.</span></p>
      <section className="overview-panel__section" aria-labelledby="overview-why">
        <p className="overview-panel__eyebrow">01 / WHY IT MATTERS</p>
        <h2 id="overview-why" tabIndex={-1}>Your life is not a dataset.</h2>
        <div className="overview-panel__prose">
          <p>Your financial records, conversations, routines, and personal documents are parts of your life. Using an application shouldn't automatically mean turning them into another company's stored asset.</p>
          <p>Connected services can be valuable. But collecting more information can increase exposure &mdash; sometimes discovered only through a breach notification. Keeping information locally doesn't eliminate security risks; the goal is meaningful choice, not a guarantee.</p>
        </div>
      </section>
      <section className="overview-panel__section overview-panel__approach" aria-labelledby="overview-approach">
        <p className="overview-panel__eyebrow">02 / OUR APPROACH</p>
        <h2 id="overview-approach" tabIndex={-1}>Local-first by design. AI-enabled by choice.</h2>
        <p className="overview-panel__prose">These are our design intentions, not a claim that every product already works this way.</p>
        <div className="overview-panel__principles">
          <div><h3>Not everything needs the cloud.</h3><p>Modern devices can do many useful tasks locally. When information doesn't need to leave your device, design to keep it there.</p></div>
          <div><h3>AI on your terms.</h3><p>AI can make personal applications more useful without needing your entire personal history. We design external AI integrations to be optional and initiated by you, with clear information about what is sent and why.</p><p>The intended model is a request from your app to the AI provider used by that integration, without routing personal request content through Amanchi Labs servers. Your app may prepare and send the request and display the response. External providers may process or retain submitted information under their own terms and privacy policies.</p><p>Your information stays yours. AI remains your choice.</p></div>
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
              <div className="overview-panel__provider"><strong>External AI provider</strong><span>Optional integration</span><span>Information you authorize</span></div>
            </div>
            <figcaption>
              <p>Our design intention: your application and personal information remain on your device. When you initiate an optional external AI feature, your app sends the information needed for that request to the provider used by the integration. We aim to keep personal AI-request content out of Amanchi Labs servers.</p>
              <p>The provider may process or retain submitted information under its own policies. Your app still handles the request and response; server non-involvement does not mean Amanchi Labs software is uninvolved.</p>
              <p>Illustrative design philosophy. Storage, available providers, consent, routing, backups, and telemetry vary by application and require product-specific verification.</p>
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
