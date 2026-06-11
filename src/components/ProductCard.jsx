import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../utils/formatters'

function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <article className="product-card">
      <div className="product-card-media">
        <img src={product.image} alt={product.nom} />
      </div>

      <div className="product-card-body">
        <p className="product-meta">
          <span className="product-badge">{product.categorie}</span>
          <span>{product.marque}</span>
        </p>
        <h3>{product.nom}</h3>
        <p className="product-brand">
          {(product.attributs?.description ??
            'Piece selectionnee pour la fiabilite et la performance.')
            .slice(0, 92)}
        </p>

        <div className="product-card-footer">
          <strong>{formatPrice(product.prix)}</strong>

          <div className="card-actions">
            <button
              type="button"
              className="button button-ghost"
              onClick={() => addToCart(product)}
            >
              Ajouter
            </button>
            <Link to={`/produit/${product.id}`} className="button button-primary">
              Voir le detail
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
