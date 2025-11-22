import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ProductProvider } from './context/ProductContext'
import { CartProvider } from './context/CartContext'
import { SidebarProvider } from './components/ui/sidebar'
import { UserProvider } from './context/UserContext'
import { OrderProvider } from './context/OrderContext'

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
        <SidebarProvider>
            <UserProvider>
                <ProductProvider>
                    <OrderProvider>
                        <CartProvider>
                            <App />
                        </CartProvider>
                    </OrderProvider>
                </ProductProvider>
            </UserProvider>
        </SidebarProvider>
    </BrowserRouter>
)
