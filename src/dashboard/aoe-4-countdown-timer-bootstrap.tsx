import React from 'react'
import { createRoot } from 'react-dom/client'
import { CountdownTimer } from './CountdownTimer'

const root = createRoot(document.getElementById('root')!)
root.render(<CountdownTimer />)
