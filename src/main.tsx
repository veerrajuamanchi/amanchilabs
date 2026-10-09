import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './site/App'
import './styles.css'

document.querySelector<HTMLAnchorElement>('.skip-link')?.addEventListener('click', event => {
  event.preventDefault()
  document.getElementById('main-content')?.focus({ preventScroll: true })
})

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
