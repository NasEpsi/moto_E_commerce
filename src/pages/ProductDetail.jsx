import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { getProductById } from '../services/firestoreService'
import { formatPrice } from '../utils/formatters'

function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isCancelled = false

    getProductById(id)
      .then((loadedProduct) => {
        if (isCancelled) {
          return
        }

        if (!loadedProduct) {
          setError('Produit introuvable.')
          return
        }

        setProduct(loadedProduct)
        setError('')
      })
      .catch(() => {
        if (!isCancelled) {
          setError('Impossible de charger la fiche produit pour le moment.')
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setLoading(false)
        }
      })

    return () => {
      isCancelled = true
    }
  }, [id])

  const technicalAttributes = useMemo(
    () =>
      Object.entries(product?.attributs ?? {}).filter(([key]) => key !== 'description'),
    [product],
  )

  if (loading) {
    return (
      <div className="page">
        <div className="panel page-message">Chargement du produit...</div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="page">
        <div className="form-feedback error">{error || 'Produit introuvable.'}</div>
        <Link to="/catalogue" className="button button-secondary">
          Retour au catalogue
        </Link>
      </div>
    )
  }

  return (
    <div className="page">
      <Link to="/catalogue" className="back-link">
        Retour au catalogue
      </Link>

      <section className="detail-page-layout">
        <div className="detail-image">
          <img src={product.image} alt={product.nom} />
        </div>

        <div className="detail-content">
          <p className="product-meta">
            <span className="product-badge">{product.categorie}</span>
            <span>{product.marque}</span>
          </p>
          <h1>{product.nom}</h1>
          <p className="detail-description">
            {product.attributs?.description ??
              'Piece selectionnee pour offrir un excellent compromis entre durabilite, precision et fiabilite au quotidien.'}
          </p>

          <div className="detail-price-row">
            <p className="detail-price">{formatPrice(product.prix)}</p>
            <span>TTC</span>
          </div>

          <div className="detail-actions">
            <button
              type="button"
              className="button button-primary"
              onClick={() => addToCart(product)}
            >
              Ajouter au panier
            </button>
            <Link to="/panier" className="button button-secondary">
              Voir le panier
            </Link>
          </div>

          <div className="detail-block">
            <h2>Caracteristiques techniques</h2>
            {technicalAttributes.length > 0 ? (
              <ul className="detail-list">
                {technicalAttributes.map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}</strong>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="detail-placeholder">
                Les informations techniques seront precisees pour cette reference.
              </p>
            )}
          </div>

          <div className="detail-block">
            <h2>Compatibilites moto</h2>
            <div className="compatibility-list">
              {(product.compatibilites ?? []).map((compatibility) => (
                <span key={compatibility} className="compatibility-item">
                  + {compatibility}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductDetail
