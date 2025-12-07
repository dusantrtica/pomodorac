import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App, WithTimer } from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <WithTimer>
        <App />
      </WithTimer>
    </Provider>
  </StrictMode>,
)
