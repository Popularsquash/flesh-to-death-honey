import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { trpc } from "@/lib/trpc";

// Generate a session ID for guest users
function getSessionId(): string {
  let sessionId = localStorage.getItem("cart_session_id");
  if (!sessionId) {
    sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem("cart_session_id", sessionId);
  }
  return sessionId;
}

interface CartItem {
  id: number;
  variantId: number;
  quantity: number;
  variant: {
    id: number;
    productId: number;
    printfulSyncVariantId: number | null;
    printfulVariantId: number;
    name: string;
    sku: string | null;
    retailPrice: number;
    currency: string;
    imageUrl: string | null;
    size: string | null;
    color: string | null;
    inStock: number;
  };
  product: {
    id: number;
    printfulSyncProductId: number | null;
    name: string;
    description: string | null;
    thumbnailUrl: string | null;
    isActive: number;
  };
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  total: number;
  isLoading: boolean;
  addToCart: (variantId: number, quantity?: number) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refetch: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [sessionId] = useState(getSessionId);
  
  const { data: cartData, isLoading, refetch } = trpc.cart.get.useQuery(
    { sessionId },
    { 
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );

  const addMutation = trpc.cart.add.useMutation({
    onSuccess: () => refetch(),
  });

  const updateMutation = trpc.cart.updateQuantity.useMutation({
    onSuccess: () => refetch(),
  });

  const removeMutation = trpc.cart.remove.useMutation({
    onSuccess: () => refetch(),
  });

  const clearMutation = trpc.cart.clear.useMutation({
    onSuccess: () => refetch(),
  });

  const items: CartItem[] = cartData || [];
  const itemCount = items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
  const total = items.reduce((sum: number, item: CartItem) => sum + item.variant.retailPrice * item.quantity, 0);

  const addToCart = async (variantId: number, quantity = 1) => {
    await addMutation.mutateAsync({ variantId, quantity, sessionId });
  };

  const updateQuantity = async (cartItemId: number, quantity: number) => {
    await updateMutation.mutateAsync({ cartItemId, quantity, sessionId });
  };

  const removeFromCart = async (cartItemId: number) => {
    await removeMutation.mutateAsync({ cartItemId, sessionId });
  };

  const clearCart = async () => {
    await clearMutation.mutateAsync({ sessionId });
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        total,
        isLoading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refetch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
