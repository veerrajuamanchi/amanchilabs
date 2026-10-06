import { useEffect, useState } from 'react'
import { Brand } from './Brand'
import { ArrowIcon, ExternalIcon } from './Icons'
import { products } from './products'

const product = products.find((item) => item.featured)!

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])
  const close = () => setMenuOpen(false)
  return (
    <header className="site-header" id="top">
      <div className="nav-shell">
        <Brand />
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="primary-nav" onClick={() => setMenuOpen((open) => !open)}>
          <span /><span />
        </button>
        <nav id="primary-nav" className={`primary-nav${menuOpen ? ' is-open' : ''}`} aria-label="Primary navigation">
          <a href="#products" onClick={close}>Products</a>
          <a href="#philosophy" onClick={close}>Philosophy</a>
          <a href="#about" onClick={close}>About</a>
          <a href="#contact" onClick={close}>Contact</a>
          <a className="nav-cta" href="#products" onClick={close}>Explore products <ArrowIcon /></a>
        </nav>
      </div>
    </header>
  )
}

function RoutinePhone({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`phone-shell${compact ? ' phone-compact' : ''}`} role="img" aria-label="Illustrative DermaPrivate app interface">
      <div className="phone-screen">
        <div className="phone-topline"><span className="tiny-wordmark">derma<span>private</span></span><span className="tiny-avatar">A</span></div>
        <div className="phone-date">TUESDAY · 8:00 AM</div>
        <h3>Your morning,<br />in good order.</h3>
        <div className="phone-routine-title"><span>Morning routine</span><span className="routine-count">04 steps</span></div>
        <div className="phone-step"><span className="step-dot dot-cream" /><span>Gentle cleanser</span><small>01</small></div>
        <div className="phone-step"><span className="step-dot dot-lilac" /><span>Hydrating serum</span><small>02</small></div>
        <div className="phone-step"><span className="step-dot dot-green" /><span>Daily moisturizer</span><small>03</small></div>
        <div className="phone-step"><span className="step-dot dot-gold" /><span>Sun protection</span><small>04</small></div>
        <div className="phone-insight"><span className="insight-check">✓</span><div><b>Routine check</b><small>Review your ingredient notes</small></div><span className="insight-arrow">↗</span></div>
        <div className="phone-tabs"><span className="tab-active"><i>◦</i>Today</span><span><i>◇</i>Products</span><span><i>☼</i>Settings</span></div>
      </div>
      <div className="phone-button phone-button-left" /><div className="phone-button phone-button-right" />
    </div>
  )
}

function HeroArtwork() {
  return (
    <div className="hero-art" role="img" aria-label="Amanchi Labs identity alongside an illustrative DermaPrivate routine interface">
      <div className="art-grid" />
      <div className="art-caption"><span className="caption-dot" />A considered kind of technology</div>
      <div className="orbit orbit-one" /><div className="orbit orbit-two" />
      <div className="art-mark"><svg viewBox="0 0 112 112" aria-hidden="true"><path d="M56 4 104 32v48l-48 28L8 80V32L56 4Z"/><path d="m56 24 28 16v32L56 88 28 72V40l28-16Z"/></svg><span>AMANCHI<br />LABS</span></div>
      <div className="hero-phone"><RoutinePhone compact /></div>
      <div className="floating-note note-ai"><span className="note-symbol">✳</span><span><b>AI, on your terms</b><small>Nothing happens without you</small></span></div>
      <div className="floating-note note-local"><span className="local-shape">⌂</span><span><b>Local-first thinking</b><small>Designed for your control</small></span></div>
      <span className="art-index">01 <i>/</i> A PRODUCT STUDIO</span>
    </div>
  )
}

function Hero() {
  return (
    <section className="hero wrap" aria-labelledby="hero-heading">
      <div className="hero-copy reveal">
        <p className="eyebrow"><span className="eyebrow-line" />A thoughtful technology studio</p>
        <h1 id="hero-heading">Intelligent apps.<br /><em>Private by design.</em></h1>
        <p className="hero-lede">We build thoughtful mobile products that use technology and AI to make everyday life simpler, while keeping people in control.</p>
        <div className="hero-actions"><a className="button button-dark" href="#products">Explore our products <ArrowIcon /></a><a className="quiet-link" href="#philosophy">Our philosophy <span>↓</span></a></div>
        <div className="hero-footnote"><span className="footnote-mark">✳</span><span>Private by design. Intelligent by choice.<br /><b>Built for people.</b></span></div>
      </div>
      <HeroArtwork />
      <div className="hero-side-label">USEFUL SOFTWARE, MADE THOUGHTFULLY</div>
    </section>
  )
}

const principles = [
  { number: '01', title: 'Private by design', body: 'Privacy belongs in the architecture from the first sketch, not in a paragraph added at the end.', icon: '◈' },
  { number: '02', title: 'Intelligent by choice', body: 'AI can help when it adds something. It should be visible, optional, and never quietly in charge.', icon: '✳' },
  { number: '03', title: 'You stay in control', body: 'A suggestion is a starting point. People decide what to save, change, or leave behind.', icon: '↗' },
  { number: '04', title: 'Made for real life', body: 'Focused tools for ordinary moments—carefully made, useful, and easy to understand.', icon: '⌂' },
]

function Philosophy() {
  return (
    <section id="philosophy" className="philosophy section-pad" aria-labelledby="philosophy-title">
      <div className="wrap philosophy-layout">
        <div className="section-lead reveal"><p className="eyebrow"><span className="eyebrow-line" />What we believe</p><h2 id="philosophy-title">Technology should<br />work <em>for you.</em></h2><p className="section-intro-copy">We build around one simple idea: technology should be intelligent without becoming intrusive.</p><a href="#how-we-build" className="underlined-link">How we build <ArrowIcon /></a></div>
        <div className="principle-list">
          {principles.map((principle) => <article className="principle reveal" key={principle.number}><span className="principle-no">{principle.number}</span><div className="principle-copy"><h3>{principle.title}</h3><p>{principle.body}</p></div><span className="principle-icon" aria-hidden="true">{principle.icon}</span></article>)}
        </div>
      </div>
    </section>
  )
}

function ProductCard() {
  return (
    <article className="featured-product reveal">
      <div className="product-visual">
        <div className="product-visual-grain" />
        <div className="product-label"><span>01</span><span>FLAGSHIP PRODUCT</span></div>
        <div className="product-orb" />
        <div className="product-phone"><RoutinePhone /></div>
        <div className="product-stamp"><span>YOUR SKIN</span><i>✳</i><span>YOUR ROUTINE</span><i>✳</i><span>YOUR CONTROL</span></div>
      </div>
      <div className="product-details">
        <p className="eyebrow"><span className="status-mark" />{product.category}</p>
        <h3>{product.name}<sup>®</sup></h3>
        <p className="product-tagline">Your skin. Your routine.<br /><em>Your control.</em></p>
        <p className="product-description">{product.description}</p>
        <div className="product-attributes"><span>Routine planning</span><span>Ingredient-aware</span><span>Optional AI</span></div>
        <a className="button button-dark" href={product.url} target="_blank" rel="noreferrer">Explore DermaPrivate <ExternalIcon /></a>
        <p className="product-disclaimer">Cosmetic skincare education and routine organization. Not medical advice.</p>
      </div>
    </article>
  )
}

function Products() {
  const futureProducts = products.filter((item) => !item.featured)
  return (
    <section className="products section-pad" id="products" aria-labelledby="products-title">
      <div className="wrap">
        <div className="products-heading reveal"><div><p className="eyebrow"><span className="eyebrow-line" />Our growing portfolio</p><h2 id="products-title">Products we're<br /><em>building.</em></h2></div><p className="products-intro">A growing collection of focused mobile apps designed around privacy, simplicity, and useful intelligence.</p></div>
        <ProductCard />
        {futureProducts.length > 0 ? <div className="future-products">{futureProducts.map((item) => <article className="future-product" key={item.name} data-accent={item.accent}>{item.image && <img src={item.image} alt={item.name} loading="lazy" />}<span className="future-status"><i />{item.status}</span><h3>{item.name}</h3><p className="future-category">{item.category}</p><p>{item.description}</p>{item.url && <a className="underlined-link" href={item.url}>Explore product <ArrowIcon /></a>}</article>)}</div> : <div className="portfolio-foot"><span>More focused tools are taking shape.</span><span className="portfolio-status"><i />IN DEVELOPMENT</span></div>}
      </div>
    </section>
  )
}

function DermaMoment() {
  return (
    <section className="derma-moment section-pad" aria-labelledby="derma-title">
      <div className="wrap derma-layout">
        <div className="derma-copy reveal"><p className="eyebrow eyebrow-light"><span className="eyebrow-line" />A closer look · DermaPrivate</p><h2 id="derma-title">Care for your routine.<br /><em>Clarity for your choices.</em></h2><p className="derma-lede">A calmer way to organize the products you use, understand routine details, and decide what works for you.</p><div className="derma-steps"><div><span>01</span><b>Organize</b><small>Keep products and routine windows together.</small></div><div><span>02</span><b>Understand</b><small>Review ingredient-aware findings and order.</small></div><div><span>03</span><b>Decide</b><small>AI may assist. You review every suggestion.</small></div><div><span>04</span><b>Keep it private</b><small>Core planning is designed with local-first control.</small></div></div><a className="button button-light" href={product.url} target="_blank" rel="noreferrer">Visit DermaPrivate <ExternalIcon /></a></div>
        <div className="derma-stage reveal"><div className="stage-ring" /><div className="stage-shadow" /><div className="stage-phone"><RoutinePhone /></div><div className="stage-card stage-card-top"><span>Morning</span><b>4 thoughtful steps</b><small>Organized around your routine</small></div><div className="stage-card stage-card-bottom"><span className="stage-check">✓</span><div><b>Suggestion, not a decision</b><small>Review, then choose what feels right</small></div></div><div className="stage-caption">AN ILLUSTRATIVE PRODUCT PREVIEW</div></div>
      </div>
    </section>
  )
}

const buildSteps = [
  ['Start with the problem', 'Real everyday friction comes first. Technology has to earn its place.'],
  ['Keep it focused', 'We make room for the features that matter and let the rest go.'],
  ['Use AI deliberately', 'AI should improve understanding and reduce effort, with clear choices at every step.'],
  ["Respect the user's data", 'When information can stay on the device, we consider that first.'],
  ['Ship, learn, improve', 'Products get better through real use and careful iteration.'],
]

function HowWeBuild() {
  return (
    <section id="how-we-build" className="how section-pad" aria-labelledby="how-title"><div className="wrap how-layout"><div className="how-heading reveal"><p className="eyebrow"><span className="eyebrow-line" />A little intention goes a long way</p><h2 id="how-title">We build<br /><em>with care.</em></h2><p>How a product behaves matters just as much as what it can do.</p></div><div className="build-list">{buildSteps.map(([title, body], index) => <article className="build-row reveal" key={title}><span className="build-number">0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
  )
}

function Privacy() {
  return (
    <section className="privacy section-pad" id="privacy" aria-labelledby="privacy-title"><div className="wrap privacy-layout"><div className="privacy-quote reveal"><p className="eyebrow eyebrow-light"><span className="eyebrow-line" />A principle, put into practice</p><h2 id="privacy-title">Privacy isn't a feature.<br /><em>It's a design decision.</em></h2><p>Amanchi Labs builds products with privacy considered from the beginning.</p><div className="privacy-lockup"><span>◈</span><b>Private by design.<br />Intelligent by choice.</b></div></div><div className="privacy-detail reveal"><p>Where practical, we favor local-first architecture, transparent choices, and user-controlled AI interactions.</p><div className="privacy-point"><span>01</span><p>Keep useful information close to the person using it, wherever practical.</p></div><div className="privacy-point"><span>02</span><p>Make optional AI interactions visible and user initiated.</p></div><div className="privacy-point"><span>03</span><p>Explain how a product behaves in plain language, without promises we cannot make.</p></div></div></div></section>
  )
}

function About() {
  return (
    <section className="about section-pad" id="about" aria-labelledby="about-title"><div className="wrap about-layout"><div className="about-label reveal"><p className="eyebrow"><span className="eyebrow-line" />About Amanchi Labs</p><span className="about-seal">INDEPENDENT<br />PRODUCT STUDIO<br /><b>◈</b></span></div><div className="about-copy reveal"><h2 id="about-title">A small studio.<br /><em>A growing portfolio.</em></h2><p>Amanchi Labs is building a portfolio of focused mobile applications for people who want useful technology without giving up control of their information or their experience.</p><p>We make our own products with a point of view: software should make life clearer, respect its place in it, and leave the person in charge.</p></div></div></section>
  )
}

function Contact() {
  return (
    <section className="contact section-pad" id="contact" aria-labelledby="contact-title"><div className="wrap contact-inner reveal"><div className="contact-overline"><span className="contact-star">✳</span><span>A NOTE FROM THE STUDIO</span></div><div className="contact-main"><h2 id="contact-title">Let's build<br /><em>something useful.</em></h2><div className="contact-side"><p>Thoughtful questions, product feedback, or a good idea for a useful app—we'd like to hear from you.</p><a className="contact-link" href="mailto:hello@amanchilabs.com?subject=Hello%20Amanchi%20Labs">Write to the studio <ArrowIcon /></a></div></div></div></section>
  )
}

function Footer() {
  return (
    <footer className="site-footer"><div className="wrap"><div className="footer-main"><div className="footer-branding"><Brand footer /><p>Private by design.<br />Intelligent by choice.<br /><span>Built for people.</span></p></div><div className="footer-nav"><div><span>EXPLORE</span><a href="#products">Products</a><a href="#philosophy">Philosophy</a><a href="#about">About</a></div><div><span>GET IN TOUCH</span><a href="#contact">Contact</a><a href="#privacy">Privacy</a><a href="mailto:hello@amanchilabs.com?subject=Terms%20of%20use">Terms</a></div></div></div><div className="footer-bottom"><span>© 2026 Amanchi Labs. All rights reserved.</span><span className="footer-location">INDEPENDENTLY MADE <i>✳</i> INTENTIONALLY</span><a href="#top">Back to top ↑</a></div></div></footer>
  )
}

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('.reveal')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    }), { threshold: 0.12, rootMargin: '0px 0px -35px 0px' })
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])
}

export default function App() {
  useReveal()
  return <><Header /><main id="main"><Hero /><Philosophy /><Products /><DermaMoment /><HowWeBuild /><Privacy /><About /><Contact /></main><Footer /></>
}
