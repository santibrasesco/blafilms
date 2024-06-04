import { createRoot } from 'react-dom/client'
import React from 'react'

import './index.css'
import App from './App'

const domNode = document.getElementById('root')
const root = createRoot(domNode)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
