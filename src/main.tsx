import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { hideSplash, wireBackButton } from './native.ts'
import './styles.css'

const root = document.getElementById('root')
if (!root) throw new Error('#root is missing from index.html')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// After the first paint, not on a timer: the splash covers exactly the gap it should.
requestAnimationFrame(() => {
  void hideSplash()
})
void wireBackButton()
