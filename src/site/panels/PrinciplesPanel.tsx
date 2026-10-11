import './PrinciplesPanel.css'

const principles = [
  { number: '01', title: 'Private by design', body: 'Design to store and process personal information on your device, minimizing unnecessary collection and centralized storage of personal documents.' },
  { number: '02', title: 'AI on your terms', body: 'Design optional, user-initiated AI integrations that explain what is sent to the external provider. Provider policies still apply.' },
  { number: '03', title: 'You stay in control', body: 'Make storage and sharing understandable, and design meaningful choices about what to retain, send, export, or remove.' },
  { number: '04', title: 'Made for real life', body: 'Useful personal tools should not require unnecessary accounts or uploads. These are design goals, not universal product guarantees.' },
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
