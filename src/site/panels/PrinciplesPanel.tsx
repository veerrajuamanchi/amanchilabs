import './PrinciplesPanel.css'

const principles = [
  { number: '01', title: 'Private by design', body: 'Privacy belongs in the architecture from the first sketch, not in a policy paragraph at the end.' },
  { number: '02', title: 'Intelligent by choice', body: 'AI should improve understanding and reduce effort — visible, optional, and never quietly in charge.' },
  { number: '03', title: 'You stay in control', body: 'A suggestion is a starting point. People decide what to save, change, or leave behind.' },
  { number: '04', title: 'Made for real life', body: 'Focused tools for ordinary moments — carefully made, useful, and easy to understand.' },
]

export function PrinciplesPanel() {
  return (
    <section className="principles-panel" aria-labelledby="principles-heading">
      <div className="principles-panel__inner">
        <div className="principles-panel__lead">
          <p className="principles-panel__eyebrow">What we believe</p>
          <h1 className="principles-panel__heading" id="principles-heading">
            Technology should<br />work <em>for you.</em>
          </h1>
          <p className="principles-panel__sub">
            Amanchi Labs builds software for the most personal parts of life — where trust is earned, not assumed.
          </p>
        </div>
        <div className="principles-panel__grid">
          {principles.map((p) => (
            <article className="principle-card" key={p.number}>
              <span className="principle-card__number">{p.number}</span>
              <h2 className="principle-card__title">{p.title}</h2>
              <p className="principle-card__body">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
