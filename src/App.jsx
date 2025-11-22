import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { CartProvider } from './context/CartContext'
import { ProductProvider } from './context/ProductContext'
import { Toaster } from './components/ui/sonner'

function App() {
  return (
    <>
      <AppRoutes />
      <Toaster richColors position="top-right" duration={1000} />
    </>
  )
}

export default App