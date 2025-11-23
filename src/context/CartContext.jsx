import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loadingCart, setLoadingCart] = useState(false);
  const [user, setUser] = useState(null);

  // Ensure user loads correctly in production
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    setUser(u);
  }, []);

  function getCart() {
    if (!user?._id) return;

    setLoadingCart(true);

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/user/getCart/${user._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.cart) {
          setCart(res.data.cart.products || []);
        } else {
          setCart([]);
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => setLoadingCart(false));
  }

  function addToCart(product) {
    if (!user?._id) return toast.error("Please login first");

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/user/addToCart`,
        {
          userId: user._id,
          productId: product._id,
          quantity: 1,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setCart(res.data.products || []);
        toast.success(`${product.name} added to cart`);
      })
      .catch((e) => console.log(e));
  }

  function updateCartItem(productId, quantity) {
    if (!user?._id) return;

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/user/updateCart`,
        {
          userId: user._id,
          productId,
          quantity,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setCart(res.data.products || []);
      })
      .catch((e) => console.log(e));
  }

  function removeFromCart(productId) {
    if (!user?._id) return;

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/user/removeFromCart`,
        {
          userId: user._id,
          productId,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setCart(res.data.products || []);
        toast.warning(`Item removed`);
      })
      .catch((e) => console.log(e));
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        loadingCart,
        getCart,
        addToCart,
        updateCartItem,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
