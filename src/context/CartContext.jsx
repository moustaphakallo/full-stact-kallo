import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("pocketshop-cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("pocketshop-cart", JSON.stringify(items));
  }, [items]);

  function addToCart(product) {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);

      if (existing) {
        if (existing.qty >= product.stock) return prev;

        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item,
        );
      }

      return [...prev, { product, qty: 1 }];
    });
  }

  function removeFromCart(productId) {
    setItems((prev) =>
      prev.filter((item) => item.product.id !== productId),
    );
  }

  function changeQuantity(productId, quantity) {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id !== productId) return item;
          const nextQuantity = Math.max(
            0,
            Math.min(quantity, item.product.stock),
          );
          return { ...item, qty: nextQuantity };
        })
        .filter((item) => item.qty > 0),
    );
  }

  function clearCart() {
    setItems([]);
  }

  const count = items.reduce((total, item) => total + item.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, changeQuantity, clearCart, count }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé à l'intérieur de CartProvider");
  }
  return context;
}
