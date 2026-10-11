import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { ArrowIcon, ExternalIcon } from './Icons'
import type { OverviewSection, PanelId } from './hooks/useHashRouter'
import './CompanyView.css'

type Props = { activePanel: PanelId; overviewSection: OverviewSection | null }
type View = PanelId | 'why' | 'approach'

const sections = [
  { view: 'overview', hash: '#overview', label: 'Our Vision' },
  { view: 'why', hash: '#overview/why', label: 'Why It Matters' },
  { view: 'approach', hash: '#overview/approach', label: 'Our Approach' },
  { view: 'principles', hash: '#principles', label: 'Principles' },
  { view: 'products', hash: '#products', label: 'Products' },
  { view: 'contact', hash: '#contact', label: 'Contact' },
] as const

function Action({ href, children, external = false }: { href: string; children: ReactNode; external?: boolean }) {
  return <a className="company-view__action" href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>{children}{external ? <ExternalIcon aria-hidden="true" /> : <ArrowIcon aria-hidden="true" />}</a>
}

function ViewContent({ view }: { view: View }) {
  switch (view) {
    case 'overview': return <>
      <p className="company-view__eyebrow">OUR VISION</p>
      <h2 id="selected-heading" tabIndex={-1}>Your app. Your device. Your information.</h2>
      <div className="company-view__copy"><p>We believe powerful software should work for you without requiring you to hand over your personal information.</p><p>Our goal is intelligent, local-first applications that work independently on your device, without requiring an account, cloud storage of personal documents, or a constant internet connection.</p><p>When you want more intelligence, optional external AI integrations put that choice in your hands. Product capabilities and requirements vary; these are design goals.</p></div>
      <Action href="#overview/why">Why It Matters</Action>
    </>
    case 'why': return <>
      <p className="company-view__eyebrow">WHY IT MATTERS</p><h2 id="selected-heading" tabIndex={-1}>Your life is not a dataset.</h2>
      <div className="company-view__copy"><p>Your financial records, routines, conversations, and personal documents are parts of your life. Using an application shouldn't automatically turn them into another company's stored asset.</p><p>Connected services can be valuable. But convenience should come with understandable choices about where information goes and who can access it.</p><p>Local processing can reduce unnecessary exposure. It doesn't eliminate security risks, and external AI providers have their own data-handling policies.</p></div>
      <p className="company-view__statement">Useful software. Meaningful independence.</p><Action href="#overview/approach">Our Approach</Action>
    </>
    case 'approach': return <>
      <p className="company-view__eyebrow">OUR APPROACH</p><h2 id="selected-heading" tabIndex={-1}>Local-first by design. AI-enabled by choice.</h2>
      <p className="company-view__copy">Design for personal information to stay on your device. When you initiate an optional AI request, your app sends authorized information to the external provider used by that integration.</p>
      <figure aria-label="Conceptual local workflow with a separate optional external AI transfer">
        <div className="company-view__flow"><div><strong>You</strong><span>Choose your information</span></div><ArrowIcon className="company-view__local-arrow" aria-hidden="true" /><div className="company-view__device"><strong>Your device</strong><span>Personal application<br />Local storage and processing</span></div><div className="company-view__transfer">Optional transfer<span className="company-view__dashed" aria-hidden="true"><ArrowIcon /></span>Only when you initiate</div><div className="company-view__provider"><strong>External AI</strong><span>Authorized information<br />Provider policies apply</span></div></div>
        <figcaption><p>Your information stays on your device by default. When you choose to use an external AI integration, your app sends the information you authorize directly to that AI service provider. The provider's own privacy and retention policies apply.</p><p>This is the design standard for Amanchi Labs applications: local-first processing, personal information under your control, and external AI only when you choose.</p></figcaption>
      </figure><Action href="#principles">Explore our principles</Action>
    </>
    case 'principles': return <>
      <p className="company-view__eyebrow">PRINCIPLES</p><h2 id="selected-heading" tabIndex={-1}>Technology should work for you.</h2>
      <div className="company-view__grid"><div><h3>Private by design</h3><p>Design to store and process personal information on your device, minimizing unnecessary collection and centralized storage of personal documents.</p></div><div><h3>AI on your terms</h3><p>Design optional, user-initiated AI integrations that explain what is sent to the external provider. Provider policies still apply.</p></div><div><h3>You stay in control</h3><p>Make storage and sharing understandable, and design meaningful choices about what to retain, send, export, or remove.</p></div><div><h3>Made for real life</h3><p>Useful personal tools should not require unnecessary accounts or uploads. These are design goals, not universal product guarantees.</p></div></div><Action href="#products">Explore our products</Action>
    </>
    case 'products': return <>
      <p className="company-view__eyebrow">PRODUCTS</p><h2 id="selected-heading" tabIndex={-1}>Personal applications. A shared philosophy.</h2>
      <div className="company-view__grid"><div><p className="company-view__eyebrow">IN DEVELOPMENT</p><h3>WealthPrivate</h3><p>A financial application being developed to help organize personal documents and understand your financial history.</p><Action href="#wealth">Discover WealthPrivate</Action></div><div><p className="company-view__eyebrow">IN TESTING</p><h3>DermaPrivate</h3><p>Explore skincare planning, personal routines, and ingredient-aware information.</p><Action href="#derma">Discover DermaPrivate</Action></div></div>
      <p className="company-view__copy">Local-first by design. AI-enabled by choice. Available integrations and data-handling practices vary by product.</p><Action href="#overview">Back to Our Vision</Action>
    </>
    case 'contact': return <>
      <p className="company-view__eyebrow">CONTACT</p><h2 id="selected-heading" tabIndex={-1}>Let's build something useful.</h2><p className="company-view__copy">Thoughtful questions, product feedback, or a good idea for a useful app &mdash; we'd like to hear from you.</p>
      <div className="company-view__contacts"><a href="mailto:founder@amanchilabs.com?subject=Hello%20Amanchi%20Labs"><span>Partnerships &amp; business</span>founder@amanchilabs.com</a><a href="mailto:support@amanchilabs.com?subject=Product%20support"><span>Product support</span>support@amanchilabs.com</a></div><Action href="#overview">Back to Our Vision</Action>
      <p className="company-view__disclosure">&copy; 2026 Amanchi Labs &middot; Independent product studio &middot; <a href="/privacy.html">Website privacy notice</a></p>
    </>
    case 'wealth': return <>
      <p className="company-view__eyebrow">WEALTHPRIVATE / IN DEVELOPMENT</p><h2 id="selected-heading" tabIndex={-1}>Your wealth. Your data. Your control.</h2>
      <div className="company-view__detail"><div><h3>A clearer view of your financial life.</h3><p>WealthPrivate is being developed to help organize personal financial documents and understand the history behind them.</p><p>Local-first by design. AI-enabled by choice. The aim is to work with information on your device, with optional external AI assistance when you initiate it.</p></div><div><h3>Built around your information.</h3><ul><li>Personal financial documents and their history</li><li>Clear connections to original sources</li><li>Optional AI with understandable data-sharing choices</li></ul></div></div>
      <p className="company-view__disclosure">Design direction, not a released-feature guarantee. Actual storage, source tracing, AI routing, consent, and provider behavior require product-specific verification.</p><div className="company-view__actions"><Action href="mailto:founder@amanchilabs.com?subject=WealthPrivate%20inquiry">Get in touch about WealthPrivate</Action><a className="company-view__return" href="#products">Back to Products</a></div>
    </>
    case 'derma': return <>
      <p className="company-view__eyebrow">DERMAPRIVATE / IN TESTING</p><h2 id="selected-heading" tabIndex={-1}>Personalized skincare. On your terms.</h2>
      <div className="company-view__detail"><div><h3>Make room for your routine.</h3><p>Explore skincare planning, personal routines, and ingredient-aware information in a focused personal application.</p><p>Our design goal is local-first planning with optional, user-initiated AI assistance, rather than requiring your entire personal history to be uploaded.</p></div><div><h3>Your decisions come first.</h3><ul><li>A thoughtful approach to daily skincare routines</li><li>Ingredient information to support understanding</li><li>AI assistance as a choice, not a requirement</li></ul></div></div>
      <p className="company-view__disclosure">Product capabilities and integrations vary. External AI providers may process or retain submitted information under their own policies.</p><div className="company-view__actions"><Action href="https://dermaprivate-website.onrender.com/index.html" external>Explore DermaPrivate</Action><a className="company-view__return" href="#products">Back to Products</a></div>
    </>
  }
}

export function CompanyView({ activePanel, overviewSection }: Props) {
  const view: View = activePanel === 'overview' && overviewSection && overviewSection !== 'vision' ? overviewSection : activePanel
  const headingRef = useRef<HTMLDivElement>(null)
  const previousView = useRef<View | null>(null)
  useEffect(() => {
    const shouldFocus = previousView.current !== null || (activePanel === 'overview' && overviewSection !== null)
    previousView.current = view
    if (!shouldFocus) return
    let secondFrame = 0
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => headingRef.current?.querySelector<HTMLElement>('#selected-heading')?.focus({ preventScroll: true }))
    })
    return () => { cancelAnimationFrame(firstFrame); cancelAnimationFrame(secondFrame) }
  }, [view, activePanel, overviewSection])
  return <main className="company-view" data-view={view} id="main-content" tabIndex={-1}>
    <header className="company-view__introduction">
      <nav className="company-view__navigation" aria-label="Company sections" onKeyDown={event => {
        if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return
        const links = Array.from(event.currentTarget.querySelectorAll<HTMLAnchorElement>('a'))
        const index = links.indexOf(document.activeElement as HTMLAnchorElement)
        if (index < 0) return
        event.preventDefault()
        links[(index + (event.key === 'ArrowRight' ? 1 : -1) + links.length) % links.length].focus()
      }}>{sections.map(section => <a key={section.view} href={section.hash} aria-current={view === section.view ? 'location' : undefined} data-parent-active={section.view === 'products' && (view === 'wealth' || view === 'derma') ? '' : undefined}>{section.label}</a>)}</nav>
      <h1>Your life is personal.<br /><em>Your technology should respect that.</em></h1>
      <p>Intelligent, local-first applications designed around ownership, independence, and optional AI.</p>
    </header>
    <div className="company-view__content" key={view} ref={headingRef}>
      <article className="company-view__article" aria-labelledby="selected-heading"><ViewContent view={view} /></article>
      <footer className="company-view__signature"><strong>Private by Design. Local by Default.</strong><span>Your Data. Your Device. Your Control.</span></footer>
    </div>
    <p className="company-view__announcement" role="status">{view === 'overview' ? 'Our Vision' : view === 'why' ? 'Why It Matters' : view === 'approach' ? 'Our Approach' : view === 'wealth' ? 'WealthPrivate' : view === 'derma' ? 'DermaPrivate' : view.charAt(0).toUpperCase() + view.slice(1)}</p>
  </main>
}