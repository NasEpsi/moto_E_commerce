import { useEffect, useState } from 'react'
import CategoryFilter from '../components/CategoryFilter'
import ProductCard from '../components/ProductCard'
import SearchBar from '../components/SearchBar'
import { getProducts } from '../services/firestoreService'

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchName, setSearchName] = useState('')
  const [searchBrand, setSearchBrand] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Toutes')

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        setError('')
        const loadedProducts = await getProducts()
        setProducts(loadedProducts)
      } catch (error) {
        console.error("Erreur Firestore :", error)
        setError(`Erreur : ${error.message}`)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const categories = [...new Set(products.map((product) => product.categorie))].sort()

  const filteredProducts = products.filter((product) => {
    const matchesName = (product.nom || '')
      .toLowerCase()
      .includes(searchName.toLowerCase())

    const matchesBrand = (product.marque || '')
      .toLowerCase()
      .includes(searchBrand.toLowerCase())
    const matchesCategory =
      selectedCategory === 'Toutes' || product.categorie === selectedCategory

    return matchesName && matchesBrand && matchesCategory
  })

  return (
    <div className="page">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">MotoParts Catalog</p>
          <h1>Catalogue responsive de pieces moto avec React et Firestore</h1>
          <p className="hero-copy">
            Recherchez rapidement des pieces par nom, marque et categorie, puis
            consultez leur fiche detaillee.
          </p>
        </div>

        <div className="hero-highlight">
          <span>Collection</span>
          <strong>produits</strong>
          <p>Catalogue charge directement depuis Firestore.</p>
        </div>
      </section>

      <SearchBar
        searchName={searchName}
        searchBrand={searchBrand}
        onSearchNameChange={setSearchName}
        onSearchBrandChange={setSearchBrand}
      />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {loading ? <p className="status-card">Chargement du catalogue...</p> : null}
      {error ? <p className="status-card error">{error}</p> : null}

      {!loading && !error ? (
        <section className="catalog-section">
          <div className="section-heading">
            <div>
              <h2>Produits disponibles</h2>
              <p>{filteredProducts.length} produit(s) affiche(s)</p>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="status-card">
              Aucun produit ne correspond a votre recherche.
            </p>
          )}
        </section>
      ) : null}
    </div>
  )
}

export default Home
