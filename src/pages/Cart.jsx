import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../utils/formatters'

function Cart() {
  const {
    items,
    itemCount,
    subtotal,
    clearCart,
    removeFromCart,
    updateQuantity,
  } = useCart()

  return (
    <div className="page cart-page">
      <div className="cart-page-header">
        <div>
          <h1>Mon panier</h1>
          <p>{itemCount} article(s) dans votre panier</p>
        </div>

        {items.length > 0 ? (
          <button type="button" className="text-button" onClick={clearCart}>
            Vider le panier
          </button>
        ) : null}
      </div>

      {items.length === 0 ? (
        <section className="panel empty-panel">
          <h2>Votre panier est vide</h2>
          <p>Ajoutez des pieces depuis le catalogue pour preparer votre commande.</p>
          <Link to="/catalogue" className="button button-primary">
            Continuer mes achats
          </Link>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-items">
            {items.map((item) => (
              <article key={item.id} className="panel cart-item">
                <img src={item.image} alt={item.nom} className="cart-item-image" />

                <div className="cart-item-body">
                  <p className="product-meta">
                    {item.categorie} - {item.marque}
                  </p>
                  <h2>{item.nom}</h2>

                  <div className="quantity-control">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-item-summary">
                  <button
                    type="button"
                    className="icon-button"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Retirer ${item.nom}`}
                  >
                    x
                  </button>
                  <span>{formatPrice(item.prix)} l unite</span>
                  <strong>{formatPrice(item.prix * item.quantity)}</strong>
                </div>
              </article>
            ))}
          </section>

          <aside className="panel cart-summary">
            <h2>Recapitulatif</h2>

            <div className="summary-row">
              <span>Sous-total</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <div className="summary-row">
              <span>Livraison</span>
              <strong>Offerte</strong>
            </div>

            <div className="summary-total">
              <span>Total TTC</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>

            <button type="button" className="button button-primary">
              Passer la commande
            </button>
            <Link to="/catalogue" className="button button-secondary">
              Continuer mes achats
            </Link>
          </aside>
        </div>
      )}
    </div>
  )
}

export default Cart
