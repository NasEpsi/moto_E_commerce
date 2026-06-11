import { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import ProductForm from '../components/ProductForm'
import { auth } from '../firebase'
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from '../services/firestoreService'
import { formatPrice } from '../utils/formatters'

function Admin() {
  const navigate = useNavigate()
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
      setError('Impossible de charger les produits pour le moment.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let isCancelled = false

    getProducts()
      .then((loadedProducts) => {
        if (!isCancelled) {
          setProducts(loadedProducts)
          setError('')
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setError('Impossible de charger les produits pour le moment.')
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
  }, [])

  async function handleLogout() {
    await signOut(auth)
    navigate('/login', { replace: true })
  }

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
    if (!window.confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      return
    }

    try {
      setError('')
      setMessage('')
      await deleteProduct(productId)
      setMessage('Produit supprime avec succes.')

      if (editingProduct?.id === productId) {
        setEditingProduct(null)
        setFormKey((currentValue) => currentValue + 1)
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
          <p className="section-kicker">Espace administrateur</p>
          <h1>Gestion du catalogue</h1>
          <p>Ajoutez, modifiez ou retirez les produits affichés dans le catalogue.</p>
        </div>

        <button type="button" className="button button-secondary" onClick={handleLogout}>
          Déconnexion
        </button>
      </section>

      <section className="admin-layout">
        <div className="panel admin-panel">
          <div className="section-heading">
            <div>
              <h2>{editingProduct ? 'Modifier un produit' : 'Ajouter un produit'}</h2>
              <p>Renseignez les informations du nouveau produit.</p>
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

          {message ? <div className="form-feedback success">{message}</div> : null}
          {error ? <div className="form-feedback error">{error}</div> : null}
        </div>

        <div className="panel admin-panel">
          <div className="section-heading admin-list-heading">
            <div>
              <h2>Produits existants</h2>
            </div>
            <p>{products.length} produits</p>
          </div>

          {loading ? <div className="panel page-message">Chargement des produits...</div> : null}

          {!loading ? (
            <div className="admin-product-list">
              {products.map((product) => (
                <article key={product.id} className="admin-product-card">
                  <img src={product.image} alt={product.nom} />

                  <div className="admin-product-content">
                    <h3>{product.nom}</h3>
                    <p>
                      {product.marque} - {product.categorie} - {formatPrice(product.prix)}
                    </p>
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
