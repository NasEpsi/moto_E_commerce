import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-card-media">
        <img src={product.image} alt={product.nom} />
      </div>

      <div className="product-card-body">
        <span className="product-badge">{product.categorie}</span>
        <h3>{product.nom}</h3>
        <p className="product-brand">{product.marque}</p>
        <div className="product-card-footer">
          <strong>{product.prix.toFixed(2)} EUR</strong>
          <Link to={`/produit/${product.id}`} className="button button-secondary">
            Voir le detail
          </Link>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
