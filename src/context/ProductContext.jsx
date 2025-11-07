import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const stored = localStorage.getItem("products");
    return stored ? JSON.parse(stored) : [];
  });

  function deleteProduct(id){
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  return (
    <ProductContext.Provider value={{ products, setProducts, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
