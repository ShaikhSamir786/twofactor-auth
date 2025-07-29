import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './service/routes.jsx'
import { SessionProvider } from './context/sessioncontext.jsx'

function App() {
  return (
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  )
}

export default App
