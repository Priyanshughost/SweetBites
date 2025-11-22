import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loadingCart, setLoadingcart] = useState(false)
  const user = JSON.parse(localStorage.getItem("user"))


  function getCart() {
    // toast.info("From Get Cart")
    setLoadingcart(true)
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/getCart/${user._id}`)
      .then(res => {
        // console.log(res)
        if (res.data.message) {
          toast.info(res.data.message)
          setCart([])
        }

        if (res.data.cart) {
          setCart(res.data.cart.products)
        }
        setLoadingcart(false)
      })
      .catch(e => {
        console.log(e)
        setLoadingcart(false)
      })
  }

  function addToCart(product) {
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/addToCart`, { userId: user?._id, productId: product?._id, quantity: 1 })
      .then(res => {
        setCart(res.data.products)
        toast.success(`${product.name} is added to cart`)
      })
      .catch(e => {
        console.log(e)
      })
  }

  function updateCartItem(id, quantity) {
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/updateCart`, { userId: user._id, productId: id, quantity })
      .then(res => {
        // console.log(res.data)
        setCart(res.data.products)
      })
      .catch(e => {
        console.log(e)
      })
  }

  function removeFromCart(product) {
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/removeFromCart`, { userId: user._id, productId: product._id})
      .then(res => {
        setCart(res.data.products)
        toast.warning(`${product.name} removed`)
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <CartContext.Provider value={{ cart, setCart, getCart, addToCart, updateCartItem, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
