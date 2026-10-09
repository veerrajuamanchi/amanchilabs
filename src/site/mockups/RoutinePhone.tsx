import { ConceptualLabel } from '../components/ConceptualLabel'
import './RoutinePhone.css'

const ROUTINE_STEPS = [
  'Gentle cleanser',
  'Hydrating serum',
  'Daily moisturizer',
  'Sun protection',
]

export function RoutinePhone() {
  return (
    <div className="routine-phone">
      <div className="routine-phone__shell" role="img" aria-label="Illustrative DermaPrivate morning routine interface">
        <div className="routine-phone__screen">
          <div className="routine-phone__topbar">
            <span className="routine-phone__wordmark">derma<em>private</em></span>
            <span className="routine-phone__avatar" aria-hidden="true" />
          </div>

          <div className="routine-phone__period">MORNING</div>
          <h3 className="routine-phone__greeting">Your morning,<br />in good order.</h3>

          <div className="routine-phone__routine-header">Morning routine</div>
          <div className="routine-phone__steps">
            {ROUTINE_STEPS.map((label) => (
              <div className="routine-phone__step" key={label}>
                <span className="routine-phone__step-dot" aria-hidden="true" />
                <span className="routine-phone__step-label">{label}</span>
              </div>
            ))}
          </div>

          <div className="routine-phone__note">
            <span className="routine-phone__note-icon" aria-hidden="true">◇</span>
            <div>
              <b>Ingredient notes</b>
              <small>A place to review product details</small>
            </div>
          </div>
        </div>
        <div className="routine-phone__home-bar" aria-hidden="true" />
      </div>
      <ConceptualLabel />
    </div>
  )
}
