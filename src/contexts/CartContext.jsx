import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

export const useCart = () => useContext(CartContext)

const STORAGE_KEY = 'fakestore_cart'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    // I hydrate the cart from localStorage so reloads keep my items.
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      }

      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: Number(product.price) || 0,
          image: product.image || '',
          qty: 1
        }
      ]
    })
  }

  const updateQty = (id, qty) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty } : item
        )
        .filter((item) => item.qty > 0)
    )
  }

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => setItems([])

  const total = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      ),
    [items]
  )

  const value = {
    items,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    total
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
