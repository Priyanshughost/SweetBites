import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [uploading, setUploading] = useState(false)

  function deleteProduct(id) {
  setUploading(true);

  axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/admin/deleteProduct/${id}`,
    {},                                      // empty body
    { withCredentials: true }               // config (cookies)
  )
    .then(res => {
      toast.success(res.data?.message);
      if (res.data?.success) {
        setProducts(prev => prev.filter(p => p._id !== id));
      }
    })
    .catch(err => {
      toast.error(err.response?.data?.message || "Failed to delete product");
    })
    .finally(() => setUploading(false));
}



  return (
    <ProductContext.Provider value={{ products, setProducts, deleteProduct, uploading, setUploading }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}

