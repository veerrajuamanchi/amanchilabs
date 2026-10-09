import { products } from '../products'
import type { PanelId } from '../hooks/useHashRouter'
import { ArrowIcon, ExternalIcon } from '../Icons'
import { WealthMockup } from '../mockups/WealthMockup'
import { RoutinePhone } from '../mockups/RoutinePhone'
import './OverviewPanel.css'

type Props = { navigate: (panel: PanelId) => void }

export function OverviewPanel({ navigate }: Props) {
  return (
    <section className="overview-panel" aria-labelledby="overview-heading">
      <div className="overview-panel__hero">
        <p className="overview-panel__eyebrow">Products for a more private world</p>
        <h1 className="overview-panel__heading" id="overview-heading">
          Technology that<br /><em>puts people first.</em>
        </h1>
        <p className="overview-panel__sub">
          Amanchi Labs builds thoughtful applications for health, wealth, and everyday life — designed to give people ownership, control, and peace of mind.
        </p>
        <button className="overview-panel__cta" type="button" onClick={() => navigate('wealth')} aria-label="Explore our products — view WealthPrivate">
          Explore our products <ArrowIcon className="overview-panel__cta-icon" />
        </button>
      </div>
      <div className="overview-panel__cards">
        {products.map((product) => (
          <article key={product.id} className={`product-card${product.dark ? ' product-card--dark' : ' product-card--light'}`}>
            <div className="product-card__content">
              <p className="product-card__name">{product.name}</p>
              <h2 className="product-card__tagline">{product.tagline}</h2>
              <p className="product-card__desc">{product.descriptor}</p>
              {product.status === 'in-development' ? (
                <button className="product-card__btn" type="button" onClick={() => navigate('wealth')} aria-label={`View WealthPrivate — ${product.tagline}`}>
                  Learn more <ArrowIcon className="product-card__btn-icon" />
                </button>
              ) : (
                <a className="product-card__btn" href={product.url} target="_blank" rel="noopener noreferrer" aria-label={`Explore ${product.name} — opens in a new tab`}>
                  Learn more <ExternalIcon className="product-card__btn-icon" />
                </a>
              )}
            </div>
            <div className="product-card__preview">
              {product.id === 'wealth' ? <WealthMockup /> : <RoutinePhone />}
            </div>
            <div className="product-card__trust">
              {product.trustPoints.map((point) => (
                <span key={point} className="product-card__trust-item">{point}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
