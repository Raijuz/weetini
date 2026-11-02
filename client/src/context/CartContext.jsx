import { createContext, useContext, useState, useEffect, useMemo } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('weetini_cart')
        if (saved) {
          const parsed = JSON.parse(saved)
          if (Array.isArray(parsed)) return parsed
        }
      } catch (e) {
        console.warn('Error reading cart from localStorage', e)
      }
    }
    return []
  })

  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('weetini_cart', JSON.stringify(cart))
    } catch (e) {
      console.warn('Error saving cart to localStorage', e)
    }
  }, [cart])

  // Clear toast timeout
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null)
      }, 2600)
      return () => clearTimeout(timer)
    }
  }, [toastMessage])

  const showToast = (message) => {
    setToastMessage(message)
  }

  const addToCart = (newItem) => {
    setCart((prevCart) => {
      // Find if an identical item exists (same product, size, ice, sugar, toppings)
      const existingIndex = prevCart.findIndex((item) => item.id === newItem.id)

      if (existingIndex > -1) {
        const updated = [...prevCart]
        const existing = updated[existingIndex]
        const newQuantity = existing.quantity + (newItem.quantity || 1)
        updated[existingIndex] = {
          ...existing,
          quantity: newQuantity,
          totalPrice: existing.unitPrice * newQuantity,
        }
        return updated
      } else {
        return [
          {
            ...newItem,
            quantity: newItem.quantity || 1,
            totalPrice: newItem.unitPrice * (newItem.quantity || 1),
          },
          ...prevCart,
        ]
      }
    })

    showToast(newItem.name)
  }

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity,
            totalPrice: item.unitPrice * quantity,
          }
        }
        return item
      })
    )
  }

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId))
  }

  const clearCart = () => {
    setCart([])
  }

  const totalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.quantity || 0), 0)
  }, [cart])

  const totalAmount = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.totalPrice || 0), 0)
  }, [cart])

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  const openCheckout = () => {
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }
  const closeCheckout = () => setIsCheckoutOpen(false)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        totalAmount,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
        isCheckoutOpen,
        setIsCheckoutOpen,
        openCheckout,
        closeCheckout,
        toastMessage,
        setToastMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
