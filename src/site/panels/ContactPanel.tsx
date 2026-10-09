import './ContactPanel.css'

export function ContactPanel() {
  return (
    <section className="contact-panel" aria-labelledby="contact-heading">
      <div className="contact-panel__inner">
        <p className="contact-panel__eyebrow">A note from the studio</p>
        <h1 className="contact-panel__heading" id="contact-heading">
          Let's build<br /><em>something useful.</em>
        </h1>
        <p className="contact-panel__sub">
          Thoughtful questions, product feedback, or a good idea for a useful app — we'd like to hear from you.
        </p>
        <div className="contact-panel__options">
          <a
            className="contact-panel__link"
            href="mailto:founder@amanchilabs.com?subject=Hello%20Amanchi%20Labs"
            aria-label="Email founder@amanchilabs.com for partnerships and business inquiries"
          >
            <span className="contact-panel__link-label">Partnerships &amp; business</span>
            <span className="contact-panel__link-email">founder@amanchilabs.com</span>
          </a>
          <a
            className="contact-panel__link"
            href="mailto:support@amanchilabs.com?subject=Product%20support"
            aria-label="Email support@amanchilabs.com for product support and customer assistance"
          >
            <span className="contact-panel__link-label">Product support</span>
            <span className="contact-panel__link-email">support@amanchilabs.com</span>
          </a>
        </div>
        <p className="contact-panel__foot">© 2026 Amanchi Labs · Independent product studio</p>
      </div>
    </section>
  )
}
