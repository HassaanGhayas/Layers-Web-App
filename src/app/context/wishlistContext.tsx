'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";

// Define the type for a wishlist item
interface WishlistItem {
    id: string;
    name: string;
    price: number;
    color: string;
    size: string;
    image: string;
    quantity: number;
  }

// Define the type for the Wishlist Context
interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

// Create context with default value
const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// Wishlist Provider Component
export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  // Update localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      const updatedWishlist = [...prev, item];
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist)); // Save immediately
      toast.success(`Added to Wishlist!`);
      return updatedWishlist;
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => {
      const updatedWishlist = prev.filter((item) => item.id !== id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist)); // Save immediately
      toast.error(`Removed from Wishlist!`);
      return updatedWishlist;
    });
  };

  const isInWishlist = (id: string) => wishlist.some((item) => item.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

// Custom hook for using wishlist
export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
