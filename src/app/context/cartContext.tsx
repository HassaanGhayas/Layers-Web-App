"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

interface CartItem {
  id: string;
  name: string;
  price: number;
  color: string;
  size: string;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem, quantity: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: CartItem, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === product.id && item.size === product.size && item.color === product.color
      );

      let updatedCart;
      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item.id === product.id && item.size === product.size && item.color === product.color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity }];
        toast.success(`Product has been added to your cart!`);
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update storage
      return updatedCart;
    });
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (item) => !(item.id === productId && item.size === size && item.color === color)
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update storage
      toast.error(`Product has been remove from your cart!`);
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
