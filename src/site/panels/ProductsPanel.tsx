import { ArrowIcon } from '../Icons'
import type { PanelId } from '../hooks/useHashRouter'
import './ProductsPanel.css'

type Props = { navigate: (panel: PanelId) => void }

export function ProductsPanel({ navigate }: Props) {
  return (
    <section className="products-panel" aria-labelledby="products-heading">
      <p className="products-panel__eyebrow">AMANCHI LABS / PRODUCTS</p>
      <h1 id="products-heading" className="products-panel__heading">
        Personal applications.<br /><em>A shared philosophy.</em>
      </h1>
      <p className="products-panel__intro">Explore the applications we're building for financial information and personal routines.</p>
      <div className="products-panel__list">
        <article className="products-panel__product">
          <p className="products-panel__eyebrow">IN DEVELOPMENT</p>
          <h2>WealthPrivate</h2>
          <p>A financial application being developed to help organize personal documents and understand your financial history.</p>
          <button className="products-panel__action" type="button" onClick={() => navigate('wealth')}>
            Discover WealthPrivate <ArrowIcon aria-hidden="true" />
          </button>
        </article>
        <article className="products-panel__product">
          <p className="products-panel__eyebrow">SKINCARE &amp; PERSONAL ROUTINES</p>
          <h2>DermaPrivate</h2>
          <p>Explore skincare planning, personal routines, and ingredient-aware information.</p>
          <button className="products-panel__action" type="button" onClick={() => navigate('derma')}>
            Discover DermaPrivate <ArrowIcon aria-hidden="true" />
          </button>
        </article>
      </div>
      <p className="products-panel__intro">Each Amanchi Labs application is designed with privacy in mind. Features and data-handling practices vary by product; explore each application to learn how it works.</p>
      <button className="products-panel__action" type="button" onClick={() => navigate('overview')}>
        Back to Overview <ArrowIcon className="products-panel__back-icon" aria-hidden="true" />
      </button>
    </section>
  )
}