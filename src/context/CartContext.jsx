import { useEffect, useMemo, useState } from 'react'
import CartContext from './cartContext'

const CART_STORAGE_KEY = 'motoparts-cart'

function readStoredCart() {
  const storedCart = window.localStorage.getItem(CART_STORAGE_KEY)

  if (!storedCart) {
    return []
  }

  try {
    return JSON.parse(storedCart)
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => readStoredCart())

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function addToCart(product) {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id)

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }

      return [
        ...currentItems,
        {
          id: product.id,
          nom: product.nom,
          marque: product.marque,
          categorie: product.categorie,
          image: product.image,
          prix: Number(product.prix) || 0,
          quantity: 1,
        },
      ]
    })
  }

  function updateQuantity(productId, nextQuantity) {
    if (nextQuantity <= 0) {
      removeFromCart(productId)
      return
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity: nextQuantity } : item,
      ),
    )
  }

  function removeFromCart(productId) {
    setItems((currentItems) => currentItems.filter((item) => item.id !== productId))
  }

  function clearCart() {
    setItems([])
  }

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  )
  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.prix * item.quantity, 0),
    [items],
  )

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
