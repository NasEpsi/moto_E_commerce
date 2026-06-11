import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../services/firestoreService'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true)
        setError('')
        const loadedProduct = await getProductById(id)

        if (!loadedProduct) {
          setError('Produit introuvable.')
          return
        }

        setProduct(loadedProduct)
      } catch {
        setError("Impossible de charger la fiche produit pour l'instant.")
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  if (loading) {
    return <p className="status-card">Chargement du produit...</p>
  }

  if (error || !product) {
    return (
      <div className="page">
        <p className="status-card error">{error || 'Produit introuvable.'}</p>
        <Link to="/" className="button button-secondary">
          Retour au catalogue
        </Link>
      </div>
    )
  }

  return (
    <div className="page">
      <Link to="/" className="back-link">
        Retour au catalogue
      </Link>

      <section className="detail-card">
        <div className="detail-image">
          <img src={product.image} alt={product.nom} />
        </div>

        <div className="detail-content">
          <span className="product-badge">{product.categorie}</span>
          <h1>{product.nom}</h1>
          <p className="detail-brand">Marque : {product.marque}</p>
          <p className="detail-price">{product.prix.toFixed(2)} EUR</p>

          <div className="detail-block">
            <h2>Attributs</h2>
            <ul className="detail-list">
              {Object.entries(product.attributs ?? {}).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}</strong>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="detail-block">
            <h2>Compatibilites</h2>
            <div className="compatibility-list">
              {(product.compatibilites ?? []).map((compatibility) => (
                <span key={compatibility} className="compatibility-item">
                  {compatibility}
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
