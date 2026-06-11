import { useEffect, useState } from 'react'
import ProductForm from '../components/ProductForm'
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from '../services/firestoreService'

function Admin() {
  const [products, setProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [formKey, setFormKey] = useState(0)

  async function loadProducts() {
    try {
      setLoading(true)
      setError('')
      const loadedProducts = await getProducts()
      setProducts(loadedProducts)
    } catch {
      setError("Impossible de charger la gestion du catalogue pour l'instant.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let isCancelled = false

    getProducts()
      .then((loadedProducts) => {
        if (isCancelled) {
          return
        }

        setProducts(loadedProducts)
      })
      .catch(() => {
        if (isCancelled) {
          return
        }

        setError("Impossible de charger la gestion du catalogue pour l'instant.")
      })
      .finally(() => {
        if (isCancelled) {
          return
        }

        setLoading(false)
      })

    return () => {
      isCancelled = true
    }
  }, [])

  async function handleSubmit(productData) {
    try {
      setIsSubmitting(true)
      setError('')
      setMessage('')

      if (editingProduct) {
        await updateProduct(editingProduct.id, productData)
        setMessage('Produit mis a jour avec succes.')
      } else {
        await createProduct(productData)
        setMessage('Produit ajoute avec succes.')
        setFormKey((currentValue) => currentValue + 1)
      }

      setEditingProduct(null)
      await loadProducts()
    } catch {
      setError("Impossible d'enregistrer le produit.")
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete(productId) {
    const confirmed = window.confirm(
      'Voulez-vous vraiment supprimer ce produit ?',
    )

    if (!confirmed) {
      return
    }

    try {
      setError('')
      setMessage('')
      await deleteProduct(productId)
      setMessage('Produit supprime avec succes.')

      if (editingProduct?.id === productId) {
        setEditingProduct(null)
      }

      await loadProducts()
    } catch {
      setError('Impossible de supprimer ce produit.')
    }
  }

  return (
    <div className="page admin-page">
      <section className="admin-header">
        <div>
          <p className="eyebrow">Administration</p>
          <h1>Gestion du catalogue</h1>
          <p>
            Ajoutez, modifiez ou supprimez des pieces moto depuis une interface
            simple.
          </p>
        </div>

        <div className="hero-highlight">
          <span>Stockage</span>
          <strong>Firestore</strong>
          <p>Les changements sont enregistres dans la collection `produits`.</p>
        </div>
      </section>

      <section className="admin-layout">
        <div className="admin-panel">
          <div className="section-heading">
            <div>
              <h2>{editingProduct ? 'Modifier un produit' : 'Ajouter un produit'}</h2>
              <p>
                Remplissez les champs principaux puis saisissez les attributs et
                compatibilites ligne par ligne.
              </p>
            </div>
          </div>

          <ProductForm
            key={editingProduct?.id ?? `new-product-${formKey}`}
            initialProduct={editingProduct}
            onSubmit={handleSubmit}
            onCancel={() => {
              setEditingProduct(null)
              setFormKey((currentValue) => currentValue + 1)
            }}
            isSubmitting={isSubmitting}
          />

          {message ? <p className="status-card success">{message}</p> : null}
          {error ? <p className="status-card error">{error}</p> : null}
        </div>

        <div className="admin-panel">
          <div className="section-heading">
            <div>
              <h2>Produits existants</h2>
              <p>{products.length} produit(s) dans le catalogue</p>
            </div>
          </div>

          {loading ? <p className="status-card">Chargement des produits...</p> : null}

          {!loading ? (
            <div className="admin-product-list">
              {products.map((product) => (
                <article key={product.id} className="admin-product-card">
                  <img src={product.image} alt={product.nom} />
                  <div>
                    <h3>{product.nom}</h3>
                    <p>
                      {product.marque} • {product.categorie}
                    </p>
                    <strong>{product.prix.toFixed(2)} EUR</strong>
                  </div>
                  <div className="admin-card-actions">
                    <button
                      type="button"
                      className="button button-secondary"
                      onClick={() => setEditingProduct(product)}
                    >
                      Modifier
                    </button>
                    <button
                      type="button"
                      className="button button-danger"
                      onClick={() => handleDelete(product.id)}
                    >
                      Supprimer
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  )
}

export default Admin
